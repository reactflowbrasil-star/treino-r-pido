import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Check,
  Dumbbell,
  MessageCircle,
  Sparkles,
  Timer,
  Trophy,
  Zap,
  Star,
  ChevronDown,
  Play,
  Flame,
  Target,
  Shield,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImg from "@/assets/hero-athlete.jpg";
import coachAvatar from "@/assets/coach-avatar.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WhatsCoach — Personal trainer com IA no WhatsApp | R$47/mês" },
      {
        name: "description",
        content: "Treino personalizado com IA, acompanhamento diário no WhatsApp e resultado visível. R$47/mês.",
      },
      { property: "og:title", content: "WhatsCoach — Personal trainer no WhatsApp" },
      { property: "og:description", content: "Treino simples, todo dia, sem desculpa. R$47/mês." },
    ],
  }),
  component: LandingPage,
});

const DEMO_CHAT = [
  { from: "coach", text: "Oi! 💪 Bora montar seu plano? Qual é o seu objetivo?" },
  { from: "user", text: "Quero emagrecer e ganhar disposição" },
  { from: "coach", text: "Fechou! Quantos dias por semana consegue treinar?" },
  { from: "user", text: "3 a 4 dias, em casa" },
  { from: "coach", text: "Seu plano tá pronto 🔥\nDia 1 — Pernas\n• Agachamento 4x12\n• Afundo 3x10\nBora hoje? Vai levar 30min!" },
  { from: "user", text: "Feito! 💪" },
  { from: "coach", text: "Aí sim! Você já tá melhor que semana passada 🚀 Amanhã a gente aumenta!" },
];

const TESTIMONIALS = [
  {
    name: "Fernanda M.",
    role: "Perdeu 12kg em 4 meses",
    text: "Nunca mantive constância assim. Parece que tem alguém me cobrando de verdade.",
    stars: 5,
    avatar: "F",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Carlos R.",
    role: "Ganhou massa sem academia",
    text: "4 meses em casa e mais resultado do que anos de academia. O coach adapta tudo.",
    stars: 5,
    avatar: "C",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Ana P.",
    role: "Condicionamento em 60 dias",
    text: "Fácil, objetivo, sem enrolação. Treino curto todo dia — perfeito pra quem tem filhos.",
    stars: 5,
    avatar: "A",
    color: "from-orange-500 to-red-500",
  },
];

function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <Benefits />
      <ChatDemo />
      <Testimonials />
      <Pricing />
      <Guarantee />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className={\`sticky top-0 z-50 border-b transition-all duration-300 \${scrolled ? "border-border/60 bg-background/95 backdrop-blur-xl shadow-card" : "border-transparent bg-transparent"}\`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
            <Dumbbell className="h-5 w-5 text-primary-foreground" />
          </span>
          WhatsCoach
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#como-funciona" className="hover:text-foreground transition-colors">Como funciona</a>
          <a href="#depoimentos" className="hover:text-foreground transition-colors">Depoimentos</a>
          <a href="#planos" className="hover:text-foreground transition-colors">Planos</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/auth" className="hidden text-sm text-muted-foreground hover:text-foreground md:block transition-colors">
            Entrar
          </Link>
          <Link to="/auth">
            <Button size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
              Começar grátis
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-0 top-32 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-whatsapp/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-24 pt-16 md:grid-cols-2 md:items-center md:pb-36 md:pt-24">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Personal trainer com IA • R$47/mês
          </div>

          <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            Seu personal trainer{" "}
            <span className="text-gradient-primary">no WhatsApp</span>,{" "}
            todo dia. 💪
          </h1>

          <p className="max-w-lg text-base text-muted-foreground md:text-lg leading-relaxed">
            Treino personalizado, acompanhamento diário e ajustes inteligentes — tudo pelo WhatsApp.
            Sem academia obrigatória, sem app pesado. Comece em 2 minutos.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/auth" className="contents">
              <Button size="lg" className="h-14 bg-gradient-primary px-8 text-base font-bold text-primary-foreground shadow-glow hover:opacity-95">
                Começar agora — R$47/mês <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="#como-funciona" className="contents">
              <Button size="lg" variant="outline" className="h-14 border-border/60 bg-surface/40 text-base backdrop-blur">
                <Play className="mr-2 h-4 w-4 text-primary" /> Ver como funciona
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            {["Sem fidelidade", "Cancele quando quiser", "7 dias de garantia"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-whatsapp" /> {t}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-6 rounded-3xl bg-gradient-primary opacity-20 blur-3xl" />
          <div className="relative rounded-3xl border border-border/60 bg-chat-bg shadow-card overflow-hidden">
            <div className="flex items-center gap-3 border-b border-border/40 bg-surface/60 px-4 py-3">
              <div className="relative">
                <img src={coachAvatar} alt="Coach" className="h-10 w-10 rounded-full object-cover" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-whatsapp border-2 border-chat-bg" />
              </div>
              <div>
                <div className="text-sm font-semibold">WhatsCoach 🏋️</div>
                <div className="text-xs text-whatsapp">online agora</div>
              </div>
            </div>
            <div className="space-y-3 p-4">
              {DEMO_CHAT.slice(0, 5).map((m, i) => (
                <div key={i} className={m.from === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div className={m.from === "user"
                    ? "max-w-[82%] whitespace-pre-line rounded-2xl rounded-br-sm bg-bubble-user px-3 py-2 text-sm text-bubble-user-foreground"
                    : "max-w-[82%] whitespace-pre-line rounded-2xl rounded-bl-sm bg-bubble-coach px-3 py-2 text-sm text-bubble-coach-foreground"
                  }>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/40 animate-bounce">
        <ChevronDown className="h-5 w-5" />
      </div>
    </section>
  );
}

function SocialProof() {
  const stats = [
    { v: "+2.300", l: "treinos enviados" },
    { v: "94%", l: "retenção mensal" },
    { v: "4.9★", l: "avaliação média" },
    { v: "< 2min", l: "para começar" },
  ];
  return (
    <section className="border-y border-border/40 bg-surface/40 py-10">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-4 text-center md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="space-y-1">
            <div className="font-display text-2xl font-extrabold text-primary md:text-3xl">{s.v}</div>
            <div className="text-xs text-muted-foreground md:text-sm">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: MessageCircle,
      title: "1. Conta seu objetivo",
      desc: "Onboarding rápido pelo WhatsApp — objetivo, nível e disponibilidade. Uma pergunta por vez.",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Dumbbell,
      title: "2. Recebe seu plano",
      desc: "Treino personalizado pra seus dias, tempo e equipamento disponível. Simples e direto.",
      color: "bg-whatsapp/10 text-whatsapp",
    },
    {
      icon: Flame,
      title: "3. Treina + check-in",
      desc: "Acompanhamento diário, ajustes automáticos e motivação constante do seu coach.",
      color: "bg-accent/10 text-accent",
    },
  ];

  return (
    <section id="como-funciona" className="mx-auto max-w-6xl px-4 py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <Zap className="h-3.5 w-3.5 text-primary" /> Simples assim
        </span>
        <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">Como funciona</h2>
        <p className="mt-3 text-muted-foreground">3 passos. Sem complicação. Resultado de verdade.</p>
      </div>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.title} className="group relative rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:border-primary/30 hover:shadow-glow">
            <div className={\`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl \${s.color}\`}>
              <s.icon className="h-6 w-6" />
            </div>
            <div className="absolute -top-3 right-6 grid h-7 w-7 place-items-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground">
              {i + 1}
            </div>
            <h3 className="font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    { icon: Timer, title: "Treino de 20–40min", desc: "Cabe na sua rotina, mesmo nos dias mais corridos.", color: "text-primary" },
    { icon: Dumbbell, title: "Em casa ou academia", desc: "Adapta ao que você tem disponível agora.", color: "text-whatsapp" },
    { icon: Target, title: "IA que aprende com você", desc: "Ajusta carga, exercícios e ritmo com base no seu feedback.", color: "text-accent" },
    { icon: Trophy, title: "Resultado em semanas", desc: "Consistência diária bate perfeição esporádica.", color: "text-primary" },
    { icon: Shield, title: "Sem lesão", desc: "Exercícios adaptados ao seu nível para evitar dores e lesões.", color: "text-whatsapp" },
    { icon: Users, title: "Suporte diário", desc: "Seu coach está online todo dia. Basta mandar mensagem.", color: "text-accent" },
  ];

  return (
    <section className="bg-surface/30 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Por que funciona
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            Feito pra <span className="text-gradient-primary">não desistir</span>
          </h2>
          <p className="mt-3 text-muted-foreground">Tudo pensado para você manter o ritmo sem precisar de força de vontade.</p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-card">
              <div className={\`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-surface \${item.color}\`}>
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-semibold">{item.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChatDemo() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <MessageCircle className="h-3.5 w-3.5 text-whatsapp" /> Conversa real
          </span>
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Conversa real. <br />
            <span className="text-gradient-primary">Resultado real.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Sem app pesado, sem planilha. Você só responde uma mensagem por dia
            e o WhatsCoach cuida do resto — treino, motivação e ajustes.
          </p>
          <ul className="space-y-3 text-sm">
            {[
              "Onboarding em 2 minutos",
              "Treino enviado todo dia no horário que você escolher",
              "Ajusta quando você reclama ou pede substituição",
              "Comemora cada conquista com você",
              "Lembra quando você sumiu — sem julgamento",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-whatsapp" />
                <span className="text-muted-foreground">{t}</span>
              </li>
            ))}
          </ul>
          <Link to="/auth">
            <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
              Começar agora <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="rounded-3xl border border-border bg-chat-bg p-4 shadow-card">
          <div className="flex items-center gap-3 border-b border-border/60 pb-3">
            <div className="relative">
              <img src={coachAvatar} alt="" width={36} height={36} className="h-10 w-10 rounded-full object-cover" loading="lazy" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-whatsapp border-2 border-chat-bg" />
            </div>
            <div>
              <div className="text-sm font-semibold">WhatsCoach 🏋️</div>
              <div className="text-xs text-whatsapp">online agora</div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {DEMO_CHAT.map((m, i) => (
              <div key={i} className={m.from === "user" ? "flex justify-end" : "flex justify-start"}>
                <div className={
                  m.from === "user"
                    ? "max-w-[80%] whitespace-pre-line rounded-2xl rounded-br-sm bg-bubble-user px-3 py-2 text-sm text-bubble-user-foreground"
                    : "max-w-[80%] whitespace-pre-line rounded-2xl rounded-bl-sm bg-bubble-coach px-3 py-2 text-sm text-bubble-coach-foreground"
                }>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="depoimentos" className="bg-surface/30 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Star className="h-3.5 w-3.5 text-primary" /> Quem já usa
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">O que dizem nossos alunos</h2>
          <p className="mt-3 text-muted-foreground">Resultados reais de pessoas reais.</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="flex-1 text-sm text-muted-foreground leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3 pt-5 border-t border-border/40">
                <div className={\`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br \${t.color} text-sm font-bold text-white\`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-whatsapp">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Essencial",
      price: "R$47",
      period: "/mês",
      tag: null,
      tagline: "Pra começar hoje",
      features: [
        "Treino personalizado diário",
        "Acompanhamento no WhatsApp",
        "Ajustes inteligentes por IA",
        "Sem academia obrigatória",
        "Cancele quando quiser",
      ],
      cta: "Começar por R$47/mês",
      featured: false,
    },
    {
      name: "Pro",
      price: "R$97",
      period: "/mês",
      tag: "🔥 Mais escolhido",
      tagline: "Máximo resultado",
      features: [
        "Tudo do Essencial",
        "Plano nutricional simplificado",
        "Check-in semanal de progresso",
        "Suporte prioritário",
        "Desafios e metas mensais",
        "Relatório de evolução",
      ],
      cta: "Quero o Pro — R$97/mês",
      featured: true,
    },
  ];

  return (
    <section id="planos" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Zap className="h-3.5 w-3.5 text-primary" /> Planos simples
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">Investimento que cabe no bolso</h2>
          <p className="mt-3 text-muted-foreground">
            Menos que um delivery por semana. Resultado pra vida toda.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {plans.map((p) => (
            <div
              key={p.name}
              className={p.featured
                ? "relative rounded-3xl border-2 border-primary bg-card p-8 shadow-glow"
                : "rounded-3xl border border-border bg-card p-8"
              }
            >
              {p.tag && (
                <span className="absolute -top-3.5 left-8 rounded-full bg-gradient-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                  {p.tag}
                </span>
              )}
              <div className="space-y-1">
                <div className="font-display text-xl font-semibold">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.tagline}</div>
              </div>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-5xl font-extrabold">{p.price}</span>
                <span className="text-muted-foreground">{p.period}</span>
              </div>
              <ul className="mt-7 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-whatsapp" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/auth" className="mt-8 block">
                <Button className={p.featured
                  ? "h-12 w-full bg-gradient-primary text-base font-semibold text-primary-foreground hover:opacity-95"
                  : "h-12 w-full bg-secondary text-base font-semibold text-secondary-foreground hover:bg-secondary/80"
                }>
                  {p.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          * Sem contrato de fidelidade. Cancele a qualquer momento diretamente pelo chat.
        </p>
      </div>
    </section>
  );
}

function Guarantee() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center">
      <div className="rounded-3xl border-2 border-whatsapp/30 bg-whatsapp/5 p-10">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-whatsapp/20">
          <Shield className="h-8 w-8 text-whatsapp" />
        </div>
        <h3 className="font-display text-2xl font-bold">Garantia de 7 dias</h3>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Se em 7 dias você não gostar por qualquer motivo, devolvemos 100% do seu dinheiro.
          Sem perguntas, sem burocracia. Simples assim.
        </p>
        <div className="mt-6 text-xs text-muted-foreground">Reembolso processado em até 5 dias úteis</div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "Preciso de academia ou equipamentos?",
      a: "Não. O WhatsCoach monta treino pra casa, academia, parque ou ar livre. Você escolhe no onboarding e pode mudar a qualquer hora.",
    },
    {
      q: "Funciona pra iniciante total?",
      a: "Sim. A IA ajusta o nível pelo seu feedback. Você pode começar do zero e evoluir de forma segura e gradual.",
    },
    {
      q: "Posso cancelar quando quiser?",
      a: "Pode. Sem fidelidade, sem multa, sem burocracia. Cancele direto pelo chat em qualquer momento.",
    },
    {
      q: "É IA ou humano respondendo?",
      a: "É IA especializada em personal training, treinada com metodologias reais de treinadores profissionais. Age como um coach de verdade.",
    },
    {
      q: "Em quanto tempo vejo resultado?",
      a: "Com consistência, mudanças visíveis em 4-8 semanas. O segredo é treinar todo dia, mesmo que seja curto.",
    },
    {
      q: "Funciona para qualquer objetivo?",
      a: "Sim — emagrecimento, ganho de massa, condicionamento cardio, reabilitação leve. O plano é feito sob medida para o seu objetivo.",
    },
    {
      q: "E se eu não conseguir treinar algum dia?",
      a: "Sem problema. O coach entende, não julga e adapta. O importante é retomar — e ele vai te ajudar a voltar.",
    },
  ];

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20 md:py-28">
      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
          Dúvidas frequentes
        </span>
        <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Perguntas frequentes</h2>
      </div>
      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={\`q\${i}\`}
            className="rounded-xl border border-border bg-card px-4"
          >
            <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-whatsapp/15 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-3xl px-4 text-center space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
          <Flame className="h-3.5 w-3.5" /> Comece hoje. Resultado em semanas.
        </span>
        <h2 className="font-display text-3xl font-extrabold leading-tight md:text-5xl">
          Treino simples, todo dia,{" "}
          <span className="text-gradient-primary">sem desculpa.</span>
        </h2>
        <p className="text-muted-foreground md:text-lg">
          Leva 2 minutos pra montar seu plano. Você ainda pode treinar hoje.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link to="/auth">
            <Button size="lg" className="h-14 bg-gradient-primary px-10 text-base font-bold text-primary-foreground shadow-glow hover:opacity-95">
              Começar agora — R$47/mês <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground pt-2">
          {["7 dias de garantia", "Sem fidelidade", "Cancele quando quiser"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-whatsapp" /> {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/40 bg-surface/40">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary">
              <Dumbbell className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="font-display font-bold">WhatsCoach</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-5 text-sm text-muted-foreground">
            <a href="#como-funciona" className="hover:text-foreground transition-colors">Como funciona</a>
            <a href="#depoimentos" className="hover:text-foreground transition-colors">Depoimentos</a>
            <a href="#planos" className="hover:text-foreground transition-colors">Planos</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
            <Link to="/auth" className="hover:text-foreground transition-colors">Entrar</Link>
          </nav>
          <div className="text-xs text-muted-foreground">
            WhatsCoach © {new Date().getFullYear()} — Todos os direitos reservados
          </div>
        </div>
        <div className="mt-8 border-t border-border/30 pt-6 text-center text-xs text-muted-foreground">
          Treino simples, todo dia, sem desculpa. 💪
        </div>
      </div>
    </footer>
  );
}