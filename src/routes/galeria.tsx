import { createFileRoute } from "@tanstack/react-router";
import { Camera, Play } from "lucide-react";
import { useState } from "react";

import { EditavelNota, PageHero } from "@/components/site/Blocks";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { albuns } from "@/lib/site-data";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galeria de fotos e vídeos — DaleÔ" },
      {
        name: "description",
        content:
          "Álbuns de fotos e vídeos da torcida DaleÔ nos jogos, eventos e caravanas do São José.",
      },
      { property: "og:title", content: "Galeria da DaleÔ" },
      {
        property: "og:description",
        content: "Fotos e vídeos da arquibancada azul e branca da torcida DaleÔ.",
      },
      { property: "og:url", content: "/galeria" },
    ],
    links: [{ rel: "canonical", href: "/galeria" }],
  }),
  component: Galeria,
});

function Galeria() {
  const [aberto, setAberto] = useState<string | null>(null);

  return (
    <>
      <PageHero
        eyebrow="Memória"
        title="Galeria da torcida"
        description="Álbuns separados por jogo e evento. Espaços prontos para receber as fotos e vídeos enviados pela DaleÔ."
      />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="space-y-12">
          {albuns.map((a) => (
            <div key={a.id}>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl">{a.titulo}</h2>
                <Badge variant="secondary">{a.tipo}</Badge>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {Array.from({ length: a.itens }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setAberto(`${a.titulo} — item ${i + 1}`)}
                    className="grid aspect-square place-items-center rounded-lg border border-dashed bg-secondary/60 text-center text-[11px] uppercase tracking-widest text-muted-foreground transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    aria-label={`Ampliar ${a.tipo === "Vídeo" ? "vídeo" : "foto"} ${i + 1} do álbum ${a.titulo}`}
                  >
                    <span className="px-2">
                      {a.tipo === "Vídeo" ? (
                        <Play className="mx-auto mb-1 size-5" aria-hidden="true" />
                      ) : (
                        <Camera className="mx-auto mb-1 size-5" aria-hidden="true" />
                      )}
                      {a.tipo} {i + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-3">
          <EditavelNota>
            fotos, vídeos e nomes dos álbuns. Cada imagem deve receber um texto alternativo
            descritivo para acessibilidade.
          </EditavelNota>
          <p className="text-sm text-muted-foreground">
            Integração opcional com Instagram e YouTube pode ser ativada depois: basta informar os
            perfis/canais oficiais da torcida.
          </p>
        </div>
      </section>

      <Dialog open={aberto !== null} onOpenChange={(o) => !o && setAberto(null)}>
        <DialogContent className="max-w-3xl">
          <DialogTitle className="font-display text-xl">{aberto}</DialogTitle>
          <div className="grid aspect-video place-items-center rounded-lg border border-dashed bg-secondary/60 text-sm text-muted-foreground">
            Espaço reservado para a mídia enviada pela torcida
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
