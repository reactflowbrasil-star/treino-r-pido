import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Dumbbell,
  MessageCircle,
  Sparkles,
  Timer,
  Trophy,
  Zap,
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
      { title: "WhatsCoach — Personal trainer no WhatsApp por R$47/mês" },
      {
        name: "description",
        content:
          "Treino personalizado com IA, acompanhamento diário no WhatsApp e resultado visível. Comece agora por R$47/mês.",
      },
      { property: "og:title", content: "WhatsCoach — Personal trainer no WhatsApp" },
      {
        property: "og:description",
        content: "Treino simples, todo dia, sem desculpa. R$47/mês.",
      },
    ],
  }),
  component: LandingPage,
});

const DEMO_CHAT = [
  { from: "coach", text: "Bora começar? 💪 Qual seu objetivo: emagrecer, ganhar massa ou condicionamento?" },
  { from: "user", text: "Emagrecer" },
  { from: "coach", text: "Fechou. Quantos dias por semana você consegue treinar?" },
  { from: "user", text: "4 dias, em casa" },
  { from: "coach", text: "Perfeito. Montei seu plano: Dia 1 — Pernas\n• Agachamento 4x12\n• Afundo 3x10\nBora hoje? 🔥" },
];

function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <Benefits />
      <ChatDemo />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary">
            <Dumbbell className="h-4 w-4 text-primary-foreground" />
          </span>
          WhatsCoach
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#como-funciona" className="hover:text-foreground">Como funciona</a>
          <a href="#planos" className="hover:text-foreground">Planos</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </nav>
        <Link to="/chat">
          <Button size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90">
            Começar
          </Button>
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 -z-0 opacity-40">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-20 pt-12 md:grid-cols-2 md:items-center md:gap-12 md:pb-32 md:pt-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3 w-3" /> Novo — Personal com IA no WhatsApp
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            Seu personal trainer{" "}
            <span className="text-gradient-primary">no WhatsApp</span>, todo dia.
          </h1>
          <p className="mt-5 max-w-lg text-base text-muted-foreground md:text-lg">
            Treino personalizado, acompanhamento diário e ajustes inteligentes.
            Simples, direto, sem academia obrigatória. Comece em 2 minutos.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link to="/chat" className="contents">
              <Button size="lg" className="h-14 bg-gradient-primary text-base font-semibold text-primary-foreground shadow-glow hover:opacity-95">
                Começar agora <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
            </Link>
            <a href="#planos" className="contents">
              <Button size="lg" variant="outline" className="h-14 border-border bg-surface/60 text-base">
                Ver planos
              </Button>
            </a>
          </div>
          <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-whatsapp" /> Sem fidelidade</span>
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-whatsapp" /> Cancele quando quiser</span>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-primary opacity-30 blur-2xl" />
          <img
            src={heroImg}
            alt="Atleta treinando em casa"
            width={1024}
            height={1280}
            className="relative rounded-3xl shadow-card"
          />
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const stats = [
    { v: "+2.300", l: "treinos enviados" },
    { v: "94%", l: "retenção mensal" },
    { v: "4.9★", l: "avaliação média" },
  ];
  return (
    <section className="border-y border-border/40 bg-surface/40">
      <div className="mx-auto grid max-w-4xl grid-cols-3 gap-4 px-4 py-8 text-center">
        {stats.map((s) => (
          <div key={s.l}>
            <div className="font-display text-2xl font-bold text-primary md:text-3xl">{s.v}</div>
            <div className="mt-1 text-xs text-muted-foreground md:text-sm">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: MessageCircle, title: "Conta seu objetivo", desc: "Onboarding rápido — emagrecer, ganhar massa ou condicionamento." },
    { icon: Dumbbell, title: "Receba seu plano", desc: "Treino personalizado pra seus dias, tempo e nível." },
    { icon: Zap, title: "Treine + check-in", desc: "Acompanhamento diário, ajustes e motivação constante." },
  ];
  return (
    <section id="como-funciona" className="mx-auto max-w-6xl px-4 py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold md:text-5xl">
          Como funciona
        </h2>
        <p className="mt-3 text-muted-foreground">3 passos. Sem complicação.</p>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.title} className="relative rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="absolute -top-3 left-6 grid h-7 w-7 place-items-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground">
              {i + 1}
            </div>
            <s.icon className="h-7 w-7 text-primary" />
            <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    { icon: Timer, title: "Treino de 20-40min", desc: "Cabe na sua rotina, mesmo nos dias corridos." },
    { icon: Dumbbell, title: "Em casa ou academia", desc: "Adaptado ao que você tem disponível." },
    { icon: Sparkles, title: "IA que aprende com você", desc: "Ajusta carga, exercícios e ritmo conforme seu feedback." },
    { icon: Trophy, title: "Resultado em semanas", desc: "Consistência diária bate perfeição esporádica." },
  ];
  return (
    <section className="bg-surface/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Feito pra <span className="text-gradient-primary">não desistir</span>
          </h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => (
            <div key={i.title} className="rounded-2xl border border-border bg-card p-6">
              <i.icon className="h-7 w-7 text-primary" />
              <h3 className="mt-4 font-display text-base font-semibold">{i.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{i.desc}</p>
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
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Conversa real. <br />
            Resultado real.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Sem app pesado, sem planilha. Você só responde uma mensagem por dia
            e o WhatsCoach cuida do resto.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {["Onboarding em 2 minutos", "Treino enviado todo dia", "Ajusta quando você reclama", "Comemora quando você evolui"].map(
              (t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-whatsapp" /> {t}
                </li>
              ),
            )}
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-chat-bg p-4 shadow-card">
          <div className="flex items-center gap-3 border-b border-border/60 pb-3">
            <img src={coachAvatar} alt="" width={36} height={36} className="h-9 w-9 rounded-full" loading="lazy" />
            <div>
              <div className="text-sm font-semibold">WhatsCoach</div>
              <div className="text-xs text-whatsapp">online</div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {DEMO_CHAT.map((m, i) => (
              <div key={i} className={m.from === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    m.from === "user"
                      ? "max-w-[80%] whitespace-pre-line rounded-2xl rounded-br-sm bg-bubble-user px-3 py-2 text-sm text-bubble-user-foreground"
                      : "max-w-[80%] whitespace-pre-line rounded-2xl rounded-bl-sm bg-bubble-coach px-3 py-2 text-sm text-bubble-coach-foreground"
                  }
                >
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

function Pricing() {
  const plans = [
    {
      name: "Essencial",
      price: "R$47",
      tag: "Pra começar",
      features: ["Treino personalizado", "Acompanhamento diário", "Ajustes inteligentes", "Cancele quando quiser"],
      cta: "Começar por R$47",
      featured: false,
    },
    {
      name: "Pro",
      price: "R$97",
      tag: "Mais escolhido",
      features: [
        "Tudo do Essencial",
        "Plano nutricional simples",
        "Suporte prioritário 24/7",
        "Revisão semanal de progresso",
        "Desafios mensais",
      ],
      cta: "Quero o Pro",
      featured: true,
    },
  ];
  return (
    <section id="planos" className="bg-surface/40 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-5xl">Planos</h2>
          <p className="mt-3 text-muted-foreground">
            Menos que um delivery por mês. Resultado pra vida.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {plans.map((p) => (
            <div
              key={p.name}
              className={
                p.featured
                  ? "relative rounded-3xl border-2 border-primary bg-card p-8 shadow-glow"
                  : "rounded-3xl border border-border bg-card p-8"
              }
            >
              {p.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {p.tag}
                </span>
              )}
              <div className="font-display text-xl font-semibold">{p.name}</div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl font-extrabold">{p.price}</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="mt-6 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-whatsapp" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/chat" className="mt-7 block">
                <Button
                  className={
                    p.featured
                      ? "h-12 w-full bg-gradient-primary text-base font-semibold text-primary-foreground hover:opacity-95"
                      : "h-12 w-full bg-secondary text-base font-semibold text-secondary-foreground hover:bg-secondary/80"
                  }
                >
                  {p.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "Preciso de academia?",
      a: "Não. O WhatsCoach monta treino pra casa, academia ou ar livre — você escolhe no onboarding.",
    },
    {
      q: "Funciona pra iniciante?",
      a: "Sim. A IA ajusta o nível pelo seu feedback. Você pode começar do zero e evoluir gradualmente.",
    },
    {
      q: "Posso cancelar quando quiser?",
      a: "Pode. Sem fidelidade, sem multa. Cancele direto pelo chat.",
    },
    {
      q: "É IA mesmo ou é humano respondendo?",
      a: "É IA treinada pra agir como personal trainer real, com base nas melhores práticas de treino e adesão.",
    },
    {
      q: "Em quanto tempo vejo resultado?",
      a: "Com consistência, mudanças visíveis em 4-8 semanas. O segredo é treinar todo dia, mesmo curto.",
    },
  ];
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20 md:py-28">
      <h2 className="font-display text-3xl font-bold md:text-5xl">Perguntas frequentes</h2>
      <Accordion type="single" collapsible className="mt-8">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`q${i}`} className="border-border">
            <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-28">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/40 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-3xl px-4 text-center">
        <h2 className="font-display text-3xl font-extrabold leading-tight md:text-5xl">
          Treino simples, todo dia, <span className="text-gradient-primary">sem desculpa.</span>
        </h2>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Comece agora — leva 2 minutos pra montar seu plano.
        </p>
        <Link to="/chat" className="mt-8 inline-block">
          <Button size="lg" className="h-14 bg-gradient-primary px-8 text-base font-semibold text-primary-foreground shadow-glow hover:opacity-95">
            Começar grátis <ArrowRight className="ml-1 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/40 bg-surface/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 md:flex-row">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Dumbbell className="h-4 w-4 text-primary" />
          <span>WhatsCoach © {new Date().getFullYear()}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          Treino simples, todo dia, sem desculpa.
        </div>
      </div>
    </footer>
  );
}
