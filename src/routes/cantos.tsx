import { createFileRoute } from "@tanstack/react-router";
import { Music, Share2, Volume2 } from "lucide-react";
import { toast } from "sonner";

import { EditavelNota, PageHero } from "@/components/site/Blocks";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cantos } from "@/lib/site-data";

export const Route = createFileRoute("/cantos")({
  head: () => ({
    meta: [
      { title: "Cantos da torcida DaleÔ" },
      {
        name: "description",
        content:
          "Letras e áudios dos cantos autorizados da torcida organizada DaleÔ, do Esporte Clube São José.",
      },
      { property: "og:title", content: "Cantos da DaleÔ" },
      {
        property: "og:description",
        content: "Aprenda as letras dos cantos oficiais da arquibancada da DaleÔ.",
      },
      { property: "og:url", content: "/cantos" },
    ],
    links: [{ rel: "canonical", href: "/cantos" }],
  }),
  component: Cantos,
});

function Cantos() {
  async function compartilhar(nome: string, letra: string) {
    const texto = `${nome}\n\n${letra}\n\nDaleÔ — torcida organizada`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: nome, text: texto });
        return;
      } catch {
        /* usuário cancelou */
      }
    }
    await navigator.clipboard?.writeText(texto);
    toast.success("Canto copiado para a área de transferência!");
  }

  return (
    <>
      <PageHero
        eyebrow="Arquibancada"
        title="Cantos da DaleÔ"
        description="Somente cantos cadastrados e autorizados pela própria torcida. Nada é criado automaticamente."
      />

      <section className="mx-auto max-w-3xl px-4 py-14">
        <Accordion type="single" collapsible className="w-full">
          {cantos.map((c) => (
            <AccordionItem key={c.id} value={c.id}>
              <AccordionTrigger className="text-left font-display text-lg uppercase">
                <span className="flex items-center gap-2">
                  <Music className="size-4 text-primary" aria-hidden="true" /> {c.nome}
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p className="whitespace-pre-line text-muted-foreground">{c.letra}</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" disabled>
                    <Volume2 aria-hidden="true" /> Áudio a cadastrar
                  </Button>
                  <Button size="sm" onClick={() => compartilhar(c.nome, c.letra)}>
                    <Share2 aria-hidden="true" /> Compartilhar
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8">
          <EditavelNota>
            nome, letra e arquivo de áudio ou vídeo de cada canto autorizado pela torcida.
          </EditavelNota>
        </div>
      </section>
    </>
  );
}
