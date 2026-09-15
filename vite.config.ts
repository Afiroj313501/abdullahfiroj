import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import handler from "./api/ask.ts";

function askApiMiddleware(mode: string) {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    name: "ask-api-middleware",
    configureServer(server: { middlewares: { use: (path: string, middleware: (request: { method?: string; on: (event: string, callback: (...args: unknown[]) => void) => void }, response: { statusCode: number; setHeader: (name: string, value: string) => void; end: (body: string) => void }) => void) => void } }) {
      server.middlewares.use("/api/ask", (request, response) => {
        const runtimeEnv = loadEnv(mode, process.cwd(), "");
        process.env.GEMINI_API_KEY = runtimeEnv.GEMINI_API_KEY || env.GEMINI_API_KEY;
        process.env.GEMINI_MODEL = runtimeEnv.GEMINI_MODEL || env.GEMINI_MODEL;
        let body = "";
        request.on("data", (chunk) => { body += String(chunk); });
        request.on("end", async () => {
          const result = JSON.parse(body || "{}");
          const apiResponse = {
            status: (code: number) => ({
              json: (payload: unknown) => {
                response.statusCode = code;
                response.setHeader("Content-Type", "application/json");
                response.end(JSON.stringify(payload));
              },
            }),
          };
          await handler({ method: request.method, body: result }, apiResponse);
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), askApiMiddleware(mode)],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
}));