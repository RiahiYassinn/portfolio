# Portfolio

## Run locally

Install dependencies and start Vite:

```sh
npm install
npm run dev
```

The Vite development plugin serves `/api/chat`, `/api/speech`, and `/api/match` locally. Copy
`.env.example` to `.env.local` and set the Gemini, Groq, and
ElevenLabs credentials. Keep API keys server-side; never prefix them with
`VITE_`.

## AI portfolio guide

Gemini is the primary chat provider; Groq is used if Gemini is unavailable.
Answers are grounded in the portfolio context in
`api/_lib/portfolio-context.js`. Speech uses ElevenLabs Flash v2.5 with the
fixed Harry – Fierce Warrior English voice. The ElevenLabs key never reaches
the browser.

## Deploy to Netlify

The included `netlify.toml` builds the Vite site, routes `/api/*` to Netlify
Functions, and configures the SPA fallback. Set `GEMINI_API_KEY`,
`GROQ_API_KEY`, and `ELEVENLABS_API_KEY` in the Netlify site's environment
variables, then redeploy. Optional model and voice overrides are listed in
`.env.example`.
