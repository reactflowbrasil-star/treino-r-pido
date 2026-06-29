import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { ArrowLeft, LogOut, RotateCcw, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { clearCoachMessages, loadCoachMessages } from "@/lib/coach.functions";
import { toast } from "sonner";
import coachAvatar from "@/assets/coach-avatar.jpg";

export const Route = createFileRoute("/_authenticated/chat")({
  head: () => ({
    meta: [{ title: "Coach — WhatsCoach" }],
  }),
  component: ChatPage,
});

type Loaded = { id: string; role: string; content: string };

function ChatPage() {
  const navigate = useNavigate();
  const loadFn = useServerFn(loadCoachMessages);
  const clearFn = useServerFn(clearCoachMessages);
  const [initial, setInitial] = useState<UIMessage[] | null>(null);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load history once
  useEffect(() => {
    loadFn()
      .then((rows: Loaded[]) => {
        const msgs: UIMessage[] = rows.map((r) => ({
          id: r.id,
          role: r.role === "assistant" ? "assistant" : "user",
          parts: [{ type: "text", text: r.content }],
        })) as UIMessage[];
        setInitial(msgs);
      })
      .catch((err) => {
        console.error(err);
        setInitial([]);
      });
  }, [loadFn]);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        headers: async () => {
          const { data } = await supabase.auth.getSession();
          const token = data.session?.access_token;
          return token ? { Authorization: `Bearer ${token}` } : {};
        },
      }),
    [],
  );

  if (initial === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-chat-bg text-muted-foreground">
        Carregando seu coach...
      </div>
    );
  }

  return (
    <ChatWindow
      transport={transport}
      initial={initial}
      input={input}
      setInput={setInput}
      scrollRef={scrollRef}
      onClear={async () => {
        try {
          await clearFn();
          navigate({ to: "/chat", replace: true });
          window.location.reload();
        } catch {
          toast.error("Não consegui limpar agora");
        }
      }}
    />
  );
}

function ChatWindow({
  transport,
  initial,
  input,
  setInput,
  scrollRef,
  onClear,
}: {
  transport: DefaultChatTransport<UIMessage>;
  initial: UIMessage[];
  input: string;
  setInput: (v: string) => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onClear: () => void;
}) {
  const navigate = useNavigate();
  const { messages, sendMessage, status, error } = useChat({
    transport,
    messages: initial,
    onError: (err) => {
      console.error(err);
      toast.error("Coach offline. Tenta de novo em alguns segundos.");
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status, scrollRef]);

  // Seed first message from coach if conversation is empty
  useEffect(() => {
    if (messages.length === 0 && !isLoading) {
      sendMessage({ text: "Oi! Acabei de chegar. Bora começar?" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    await sendMessage({ text });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <div className="flex h-[100dvh] flex-col bg-chat-bg">
      <header className="flex items-center gap-3 border-b border-border/60 bg-surface/80 px-3 py-3 backdrop-blur">
        <Link to="/" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <img src={coachAvatar} alt="" width={40} height={40} className="h-10 w-10 rounded-full" />
        <div className="flex-1 min-w-0">
          <div className="truncate text-sm font-semibold">WhatsCoach</div>
          <div className="flex items-center gap-1.5 text-xs text-whatsapp">
            <span className="h-1.5 w-1.5 rounded-full bg-whatsapp" /> online
          </div>
        </div>
        <button
          onClick={onClear}
          title="Recomeçar"
          className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        <button
          onClick={handleSignOut}
          title="Sair"
          className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-4">
        <div className="mx-auto max-w-2xl space-y-2">
          {messages.map((m) => {
            const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
            return (
              <MessageBubble key={m.id} role={m.role} text={text} />
            );
          })}
          {status === "submitted" && <TypingIndicator />}
          {error && (
            <div className="text-center text-xs text-destructive">
              {error.message || "Erro de conexão"}
            </div>
          )}
        </div>
      </div>

      <Composer input={input} setInput={setInput} onSubmit={handleSubmit} disabled={isLoading} />
    </div>
  );
}

function MessageBubble({ role, text }: { role: string; text: string }) {
  const isUser = role === "user";
  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <div
        className={
          isUser
            ? "max-w-[85%] rounded-2xl rounded-br-sm bg-bubble-user px-3.5 py-2 text-[15px] leading-relaxed text-bubble-user-foreground shadow-sm"
            : "max-w-[85%] rounded-2xl rounded-bl-sm bg-bubble-coach px-3.5 py-2 text-[15px] leading-relaxed text-bubble-coach-foreground shadow-sm"
        }
      >
        <div className="prose prose-sm prose-invert max-w-none whitespace-pre-wrap break-words [&_p]:m-0 [&_ul]:my-1 [&_ol]:my-1">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl rounded-bl-sm bg-bubble-coach px-4 py-3">
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

function Composer({
  input,
  setInput,
  onSubmit,
  disabled,
}: {
  input: string;
  setInput: (v: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className="border-t border-border/60 bg-surface/80 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-end gap-2">
        <Textarea
          ref={ref}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSubmit();
            }
          }}
          placeholder="Manda pro coach..."
          rows={1}
          className="min-h-11 max-h-32 flex-1 resize-none rounded-2xl border-border bg-card px-4 py-2.5 text-[15px]"
        />
        <Button
          onClick={onSubmit}
          disabled={disabled || !input.trim()}
          size="icon"
          className="h-11 w-11 shrink-0 rounded-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
