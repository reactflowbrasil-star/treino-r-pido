import { createFileRoute, redirect } from "@tanstack/react-router";

// Atalho público /chat -> redireciona pro chat autenticado
export const Route = createFileRoute("/chat")({
  ssr: false,
  beforeLoad: () => {
    throw redirect({ to: "/_authenticated/chat" as never });
  },
  component: () => null,
});
