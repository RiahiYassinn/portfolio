import { readJsonBody, requirePost, sendJson } from "./_lib/http.js";
import { getServerEnv } from "./_lib/env.js";
import { portfolioContext } from "./_lib/portfolio-context.js";

export const config = { maxDuration: 60 };

const reportSchema = `{
  "matchPercentage": 0,
  "roleTitle": "Extracted or inferred role title",
  "summary": "A concise 2-3 sentence fit assessment.",
  "matchingSkills": ["skill 1"],
  "missingOrGaps": ["gap 1"],
  "projectAlignment": "A short paragraph connecting relevant projects to the role."
}`;

function buildPrompt(jobDescription) {
  return `You are an expert technical recruiter and career advisor. Compare the job description with the candidate facts below. Return only a valid JSON object matching this schema, with no markdown:
${reportSchema}

Rules: matchPercentage must be a number from 0 to 100; matchingSkills and missingOrGaps must be arrays of strings. Do not invent experience that is not in the portfolio facts.

Portfolio facts:
${portfolioContext}

Job description:
${jobDescription}`;
}

function parseReport(text) {
  const cleaned = text.replace(/```(?:json)?/gi, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("The AI provider returned an invalid match report.");

  const report = JSON.parse(cleaned.slice(start, end + 1));
  if (
    !report ||
    typeof report.matchPercentage !== "number" ||
    typeof report.roleTitle !== "string" ||
    typeof report.summary !== "string" ||
    !Array.isArray(report.matchingSkills) ||
    !Array.isArray(report.missingOrGaps) ||
    typeof report.projectAlignment !== "string"
  ) {
    throw new Error("The AI provider returned an incomplete match report.");
  }

  return {
    matchPercentage: Math.max(0, Math.min(100, Math.round(report.matchPercentage))),
    roleTitle: report.roleTitle,
    summary: report.summary,
    matchingSkills: report.matchingSkills.filter((item) => typeof item === "string"),
    missingOrGaps: report.missingOrGaps.filter((item) => typeof item === "string"),
    projectAlignment: report.projectAlignment,
  };
}

async function providerFailure(response, provider) {
  const payload = await response.json().catch(() => ({}));
  const upstreamMessage = payload.error?.message || payload.message;
  const message = typeof upstreamMessage === "string"
    ? upstreamMessage
        .replace(/(?:Bearer\s+)?(?:AIza[\w-]{20,}|gsk_[\w-]{20,}|sk-[\w-]{20,})/gi, "[redacted]")
        .replace(/\s+/g, " ")
        .slice(0, 200)
    : "The provider did not return an error description.";
  const error = new Error(message);
  error.provider = provider;
  error.status = response.status;
  throw error;
}

function formatProviderFailure(error, provider) {
  if (error.provider === provider) return `${provider} (${error.status}): ${error.message}`;
  if (error.message === `${provider} is not configured.`) return `${provider}: API key is missing.`;
  if (error.name === "TimeoutError" || error.name === "AbortError") return `${provider}: request timed out.`;
  return `${provider}: ${error.message || "request failed before a response was received."}`;
}

async function generateWithGemini(prompt) {
  const apiKey = getServerEnv("GEMINI_API_KEY");
  if (!apiKey) throw new Error("Gemini is not configured.");

  const model = getServerEnv("GEMINI_MODEL", "gemini-2.5-flash");
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 1_000,
          responseMimeType: "application/json",
        },
      }),
      signal: AbortSignal.timeout(30_000),
    },
  );

  if (!response.ok) await providerFailure(response, "Gemini");
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("");
  if (!text) throw new Error("Gemini returned an empty response.");
  return parseReport(text);
}

async function generateWithGroq(prompt) {
  const apiKey = getServerEnv("GROQ_API_KEY");
  if (!apiKey) throw new Error("Groq is not configured.");

  const model = getServerEnv("GROQ_MODEL", "openai/gpt-oss-20b");
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_completion_tokens: 1_000,
      response_format: { type: "json_object" },
      reasoning_effort: "low",
    }),
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) await providerFailure(response, "Groq");
  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (typeof text !== "string" || !text.trim()) throw new Error("Groq returned an empty response.");
  return parseReport(text);
}

export default async function matchHandler(req, res) {
  if (!requirePost(req, res)) return;

  try {
    const body = await readJsonBody(req);
    const jobDescription = typeof body.jobDescription === "string" ? body.jobDescription.trim() : "";
    if (!jobDescription || jobDescription.length < 20) {
      return sendJson(res, 400, { error: "Please provide a valid job description (at least 20 characters)." });
    }

    const prompt = buildPrompt(jobDescription);
    let geminiError;
    try {
      const report = await generateWithGemini(prompt);
      return sendJson(res, 200, { report, provider: "gemini" });
    } catch (error) {
      geminiError = error;
    }

    try {
      const report = await generateWithGroq(prompt);
      return sendJson(res, 200, { report, provider: "groq" });
    } catch (groqError) {
      const failures = [
        formatProviderFailure(geminiError, "Gemini"),
        formatProviderFailure(groqError, "Groq"),
      ];
      console.error("Match providers failed:", failures.join("; "));
      return sendJson(res, 502, {
        error: `Could not generate the match report. ${failures.join(" ")}`,
      });
    }
  } catch (error) {
    const statusCode = error.statusCode || 502;
    const message = statusCode === 400 || statusCode === 413
      ? error.message
      : "Could not process the job description. Please try again.";
    return sendJson(res, statusCode, { error: message });
  }
}
