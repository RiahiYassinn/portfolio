import { readJsonBody, requirePost, sendJson } from "./_lib/http.js";
import { getServerEnv } from "./_lib/env.js";
import { systemInstruction } from "./_lib/portfolio-context.js";

export const config = { maxDuration: 60 };

const MAX_HISTORY_MESSAGES = 16;
const MAX_MESSAGE_LENGTH = 2_500;

async function providerFailure(response, provider) {
  const payload = await response.json().catch(() => ({}));
  const upstreamMessage = payload.error?.message || payload.message;
  const message = typeof upstreamMessage === "string"
    ? upstreamMessage
        .replace(/(?:Bearer\s+)?(?:AIza[\w-]{20,}|gsk_[\w-]{20,}|sk-[\w-]{20,})/gi, "[redacted]")
        .replace(/\s+/g, " ")
        .slice(0, 240)
    : "The provider did not return an error description.";
  const error = new Error(message);
  error.provider = provider;
  error.status = response.status;
  throw error;
}

function formatProviderFailure(error, provider) {
  if (error.provider !== provider) {
    if (error.message === `${provider} is not configured.`) {
      return `${provider}: API key is missing from the server environment.`;
    }
    if (error.name === "TimeoutError" || error.name === "AbortError") {
      return `${provider}: request timed out.`;
    }
    return `${provider}: request failed before a response was received.`;
  }

  return `${provider} (${error.status}): ${error.message}`;
}

function validateMessages(value) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error("Send a question to start the conversation.");
  }

  const messages = value.slice(-MAX_HISTORY_MESSAGES).map((message) => {
    if (
      !message ||
      !["user", "assistant"].includes(message.role) ||
      typeof message.content !== "string"
    ) {
      throw new Error("The conversation contains an invalid message.");
    }

    const content = message.content.trim();
    if (!content || content.length > MAX_MESSAGE_LENGTH) {
      throw new Error("Each message must be between 1 and 2,500 characters.");
    }

    return { role: message.role, content };
  });

  if (messages.at(-1)?.role !== "user") {
    throw new Error("The latest conversation message must be a user question.");
  }

  return messages;
}

async function askGemini(messages) {
  const apiKey = getServerEnv("GEMINI_API_KEY");
  if (!apiKey) throw new Error("Gemini is not configured.");

  const model = getServerEnv("GEMINI_MODEL", "gemini-2.5-flash");
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: messages.map((message) => ({
          role: message.role === "assistant" ? "model" : "user",
          parts: [{ text: message.content }],
        })),
        generationConfig: { temperature: 0.35, maxOutputTokens: 350 },
      }),
      signal: AbortSignal.timeout(30_000),
    },
  );

  if (!response.ok) await providerFailure(response, "Gemini");
  const data = await response.json();
  const answer = data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("")
    .trim();
  if (!answer) throw new Error("Gemini returned an empty response.");
  return answer;
}

async function askGroq(messages) {
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
      messages: [
        { role: "system", content: systemInstruction },
        ...messages,
      ],
      temperature: 0.35,
      max_completion_tokens: 350,
      reasoning_effort: "low",
    }),
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) await providerFailure(response, "Groq");
  const data = await response.json();
  const answer = data.choices?.[0]?.message?.content?.trim();
  if (!answer) throw new Error("Groq returned an empty response.");
  return answer;
}

export default async function chatHandler(req, res) {
  if (!requirePost(req, res)) return;

  try {
    const body = await readJsonBody(req);
    const messages = validateMessages(body.messages);

    let geminiError;
    try {
      const answer = await askGemini(messages);
      return sendJson(res, 200, { answer, provider: "gemini" });
    } catch (error) {
      geminiError = error;
    }

    try {
      const answer = await askGroq(messages);
      return sendJson(res, 200, { answer, provider: "groq" });
    } catch (groqError) {
      const failures = [
        formatProviderFailure(geminiError, "Gemini"),
        formatProviderFailure(groqError, "Groq"),
      ];
      console.error("Chat providers failed:", failures.join("; "));
      return sendJson(res, 502, {
        error: `The portfolio assistant is temporarily unavailable. ${failures.join(" ")}`,
      });
    }
  } catch (error) {
    const statusCode = error.statusCode || (error.message?.startsWith("Each message") || error.message?.startsWith("Send a question") || error.message?.startsWith("The conversation") ? 400 : 502);
    const message = statusCode === 400 || statusCode === 413
      ? error.message
      : "The portfolio assistant is temporarily unavailable. Please try again shortly.";
    return sendJson(res, statusCode, { error: message });
  }
}
