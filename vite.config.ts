// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
// - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
// componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
// error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Deploy na Netlify: o preset padrão do Nitro neste config é o Cloudflare.
  // Aqui trocamos para o preset "netlify", que gera a Netlify Function de SSR
  // e os assets estáticos. O preset precisa ficar aqui (em código) porque a
  // variável de ambiente SERVER_PRESET não é lida por este config.
  nitro: { preset: "netlify" },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
