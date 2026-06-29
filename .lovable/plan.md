## WhatsCoach — Landing + Chat com IA

Vou construir o WhatsCoach em duas partes integradas no mesmo app:

### 1. Landing Page de venda (`/`)
Estilo premium estilo WhatsApp/fitness com a paleta do workspace (azul profundo + laranja neon + verde WhatsApp).

Seções:
- **Hero**: "Seu personal trainer no WhatsApp. Treino simples, todo dia, sem desculpa." + CTA "Começar agora" (R$47/mês)
- **Como funciona**: 3 passos (Onboarding → Treino personalizado → Acompanhamento diário)
- **Benefícios**: cards com ícones (treino diário, IA personalizada, sem academia obrigatória, etc.)
- **Demo do chat**: mock visual de conversa estilo WhatsApp mostrando o agente em ação
- **Planos**: R$47/mês (Essencial) e R$97/mês (Pro)
- **FAQ**
- **CTA final** + Footer
- Botão flutuante "Experimentar grátis" → leva ao chat

### 2. Chat funcional com IA (`/chat`)
- Autenticação obrigatória (email/senha + Google) — Lovable Cloud
- Conversa única contínua por usuário (sem threads)
- Interface estilo WhatsApp: bolhas verdes do usuário, bolhas brancas do coach, header com avatar do "Coach", composer no fundo
- IA: `google/gemini-3-flash-preview` via Lovable AI Gateway, streaming
- System prompt = o CORE PROMPT do WhatsCoach (onboarding obrigatório → treino → acompanhamento)
- Mensagens persistidas no banco; ao logar, o usuário continua de onde parou
- O agente lê o histórico completo a cada turno para manter personalização

### 3. Backend (Lovable Cloud)
Tabelas:
- `profiles` (id, user_id, display_name, criado em signup via trigger)
- `coach_messages` (id, user_id, role, content, created_at) — uma "conversa única" por usuário
- RLS: cada usuário só vê o que é seu

Server function (`createServerFn`) `chatCoach`:
- Protegida com `requireSupabaseAuth`
- Recebe mensagens (UIMessage[])
- Carrega histórico do usuário
- Chama `streamText` com system prompt do WhatsCoach
- Persiste user message + resposta final no banco (`onFinish`)
- Retorna `toUIMessageStreamResponse`

### 4. UI components
- AI Elements: `conversation`, `message`, `prompt-input`, `shimmer`
- Estilo customizado WhatsApp (não bolha azul padrão — verde no user, neutra no assistente)
- Markdown leve nas respostas
- Indicador "digitando..." enquanto streaming

### 5. SEO
- Title/desc/OG no `/` focados em conversão
- `sitemap.xml` + `robots.txt`

### Detalhes técnicos
- TanStack Start file-routes: `/`, `/auth`, `/_authenticated/chat`
- Provider Lovable AI Gateway em `src/lib/ai-gateway.server.ts`
- Server fn em `src/lib/coach.functions.ts`
- Login com Google via `lovable.auth.signInWithOAuth` + email/senha
- Mobile-first (público acessa pelo celular)

### O que NÃO entra agora
- Integração real com WhatsApp Business API (custo/aprovação Meta) — o "chat WhatsApp-style" roda dentro do app web. Posso adicionar como fase 2.
- Pagamento real (Stripe/Paddle) — botões de plano levam ao cadastro/chat por enquanto; me avisa se quer ativar pagamentos.

Aprova pra eu construir?
