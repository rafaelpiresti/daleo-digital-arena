import { MessageCircle } from "lucide-react";

import { whatsappLink } from "@/lib/site-data";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("Olá, DaleÔ! Vim pelo site e quero falar com vocês.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-whats text-navy-foreground shadow-arena transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <MessageCircle className="size-7" aria-hidden="true" />
    </a>
  );
}
