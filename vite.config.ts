import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-expect-error JavaScript handlers are shared with Netlify Functions.
import chatHandler from './api/chat.js';
// @ts-expect-error JavaScript handlers are shared with Netlify Functions.
import speechHandler from './api/speech.js';
// @ts-expect-error JavaScript handlers are shared with Netlify Functions.
import matchHandler from './api/match.js';

function localApiPlugin(): Plugin {
  return {
    name: 'portfolio-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', (req, res) => {
        void chatHandler(req, res);
      });
      server.middlewares.use('/api/speech', (req, res) => {
        void speechHandler(req, res);
      });
      server.middlewares.use('/api/match', (req, res) => {
        void matchHandler(req, res);
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const serverEnv = loadEnv(mode, '.', '');
  const runtimeProcess = (
    globalThis as typeof globalThis & {
      process?: { env: Record<string, string | undefined> };
    }
  ).process;
  for (const key of [
    'GEMINI_API_KEY',
    'GEMINI_MODEL',
    'GROQ_API_KEY',
    'GROQ_MODEL',
    'ELEVENLABS_API_KEY',
    'ELEVENLABS_MODEL',
  ]) {
    const envValue = serverEnv[key] ?? Object.entries(serverEnv)
      .find(([name]) => name.toLowerCase() === key.toLowerCase())?.[1];
    if (runtimeProcess && !runtimeProcess.env[key] && envValue) {
      runtimeProcess.env[key] = envValue;
    }
  }

  return {
    plugins: [react(), localApiPlugin()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
