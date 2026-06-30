# Deploy na Netlify

Este projeto é um app **TanStack Start** (SSR via Nitro). O preset padrão do
`@lovable.dev/vite-tanstack-config` é o Cloudflare, por isso o `vite.config.ts`
deste repositório define o preset **netlify** em código:

```ts
export default defineConfig({
  nitro: { preset: "netlify" },
  // ...
});
```

> Importante: a variável de ambiente `SERVER_PRESET` **não** é lida por este
> config, por isso o preset precisa ficar no `vite.config.ts`. O preset netlify
> gera a Netlify Function de SSR e os assets estáticos em `dist/`.

## 1. Conectar o repositório

1. Acesse [app.netlify.com](https://app.netlify.com) e faça login.
2. **Add new site → Import an existing project**.
3. Escolha o provedor Git e selecione o repositório `treino-r-pido`.
4. A Netlify lê o `netlify.toml` e já preenche o build:
   - **Build command:** `bun run build`
   - **Publish directory:** `dist`

## 2. Variáveis de ambiente

Em **Site settings → Build & deploy → Environment → Environment variables**,
adicione as variáveis listadas em `.env.example`:

- `SUPABASE_PROJECT_ID`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_URL`
- `VITE_SUPABASE_PROJECT_ID`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_URL`

> As variáveis com prefixo `VITE_` são expostas no bundle do cliente; as demais
> ficam apenas no servidor. Use os valores do seu projeto Supabase.

## 3. Deploy

Clique em **Deploy site**. A cada push na branch `main`, a Netlify refaz o build
e publica automaticamente.

## Build local (opcional)

```bash
bun install
bun run build
```

O resultado fica em `dist/` (assets) com a função serverless de SSR gerada
pelo preset netlify do Nitro.
