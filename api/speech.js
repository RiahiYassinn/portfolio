import { readJsonBody, requirePost, sendJson } from "./_lib/http.js";
import { getServerEnv } from "./_lib/env.js";

export default async function speechHandler(req, res) {
  if (!requirePost(req, res)) return;

  try {
    const { text } = await readJsonBody(req);
    if (typeof text !== "string" || !text.trim() || text.length > 4_000) {
      return sendJson(res, 400, { error: "Speech text must be between 1 and 4,000 characters." });
    }

    const apiKey = getServerEnv("ELEVENLABS_API_KEY");
    if (!apiKey) {
      return sendJson(res, 503, { error: "Set ELEVENLABS_API_KEY in the server environment to enable speech." });
    }

    const voiceId = "SOYHLrjzK2X1ezoPC6cr";
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=mp3_22050_32`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text: text.trim(),
          model_id: getServerEnv("ELEVENLABS_MODEL", "eleven_flash_v2_5"),
          language_code: "en",
          voice_settings: {
            stability: 0.72,
            similarity_boost: 0.82,
            style: 0.15,
            use_speaker_boost: true,
            speed: 0.94,
          },
        }),
        signal: AbortSignal.timeout(30_000),
      },
    );

    if (!response.ok) {
      const failure = await response.json().catch(() => ({}));
      const detail = failure.detail || {};
      const providerCode = detail.code || detail.status;

      if (response.status === 401) {
        return sendJson(res, 503, { error: "ElevenLabs rejected the server API key. Check ELEVENLABS_API_KEY in your environment settings." });
      }
      if (response.status === 403) {
        return sendJson(res, 403, { error: "Your ElevenLabs plan or voice permissions do not allow this request." });
      }
      if (response.status === 402) {
        return sendJson(res, 402, {
          error: providerCode === "insufficient_credits"
            ? "ElevenLabs reports that this account needs credits for this voice request."
            : "ElevenLabs requires payment, credits, or account access for this voice request.",
        });
      }
      if (response.status === 429) {
        return sendJson(res, 429, { error: "ElevenLabs has reached this account's rate or character limit." });
      }
      if (response.status === 404 || response.status === 422) {
        return sendJson(res, 422, { error: "ElevenLabs rejected this voice. Choose another voice from the list." });
      }
      return sendJson(res, 502, { error: `ElevenLabs speech request failed (HTTP ${response.status}).` });
    }

    const audio = Buffer.from(await response.arrayBuffer());
    res.statusCode = 200;
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "no-store");
    return res.end(audio);
  } catch {
    return sendJson(res, 502, { error: "ElevenLabs speech generation failed. Check the API key, voice, and account quota." });
  }
}
