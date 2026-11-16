# AI chat and voice

The browser sends chat history to `/api/chat`. This endpoint calls Gemini first
and tries Groq if Gemini fails. The system instructions and resume facts are
kept in `api/_lib/portfolio-context.js`; update that file when portfolio facts
change. Only the latest 16 user/assistant messages are sent to a model.

Voice replies use ElevenLabs Flash v2.5 with the account's premade Harry –
Fierce Warrior English voice (`SOYHLrjzK2X1ezoPC6cr`). The client posts reply
text to `/api/speech`; the fixed voice ID and ElevenLabs key stay server-side.

## Local setup

Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY`, `GROQ_API_KEY`,
and `ELEVENLABS_API_KEY`. Do not rename them to `VITE_*` variables.

Start Vite with `npm run dev`. The plugin in `vite.config.ts` loads server-only
variables from `.env.local` for local API requests.

## Vercel production setup

Vercel deploys the handlers in the root `api/` directory as serverless
functions. `vercel.json` configures the Vite build, SPA fallback, and longer
timeouts for the AI chat and job match endpoints. Add `GEMINI_API_KEY`,
`GROQ_API_KEY`, and `ELEVENLABS_API_KEY` to the Vercel project's environment
variables, then redeploy. Optional model overrides include `GEMINI_MODEL`,
`GROQ_MODEL`, and `ELEVENLABS_MODEL` (default `eleven_flash_v2_5`).
