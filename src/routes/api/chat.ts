import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createClient } from "@supabase/supabase-js";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { WHATSCOACH_SYSTEM_PROMPT } from "@/lib/coach-prompt";
import type { Database } from "@/integrations/supabase/types";

type ChatBody = { messages?: UIMessage[] };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const authHeader = request.headers.get("authorization") ?? "";
          if (!authHeader.startsWith("Bearer ")) {
            return new Response("Unauthorized", { status: 401 });
          }
          const token = authHeader.slice(7);

          const SUPABASE_URL = process.env.SUPABASE_URL!;
          const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY!;
          const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
          if (!LOVABLE_API_KEY) {
            return new Response("Missing LOVABLE_API_KEY", { status: 500 });
          }

          const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
            global: { headers: { Authorization: `Bearer ${token}`, apikey: SUPABASE_PUBLISHABLE_KEY } },
            auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
          });

          const { data: claims, error: claimsErr } = await supabase.auth.getClaims(token);
          if (claimsErr || !claims?.claims?.sub) {
            return new Response("Unauthorized", { status: 401 });
          }
          const userId = claims.claims.sub;

          const body = (await request.json()) as ChatBody;
          const messages = Array.isArray(body.messages) ? body.messages : [];
          if (messages.length === 0) {
            return new Response("Messages required", { status: 400 });
          }

          // Persist the latest user message
          const lastMsg = messages[messages.length - 1];
          if (lastMsg.role === "user") {
            const text = lastMsg.parts
              .map((p) => (p.type === "text" ? p.text : ""))
              .join("")
              .trim();
            if (text) {
              await supabase.from("coach_messages").insert({
                user_id: userId,
                role: "user",
                content: text,
              });
            }
          }

          const gateway = createLovableAiGatewayProvider(LOVABLE_API_KEY);
          const model = gateway("google/gemini-3-flash-preview");

          const modelMessages = await convertToModelMessages(messages);
          const result = streamText({
            model,
            system: WHATSCOACH_SYSTEM_PROMPT,
            messages: modelMessages,
            onError: ({ error }) => {
              console.error("[chat] streamText error", error);
            },
          });

          return result.toUIMessageStreamResponse({
            originalMessages: messages,
            onFinish: async ({ responseMessage }) => {
              const text = responseMessage.parts
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("")
                .trim();
              if (text) {
                const { error } = await supabase.from("coach_messages").insert({
                  user_id: userId,
                  role: "assistant",
                  content: text,
                });
                if (error) console.error("[chat] persist assistant failed", error);
              }
            },
          });
        } catch (err) {
          console.error("[chat] handler error", err);
          return new Response("Internal error", { status: 500 });
        }
      },
    },
  },
});
