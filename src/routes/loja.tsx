import { createFileRoute } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

import { EditavelNota, PageHero } from "@/components/site/Blocks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { produtos, whatsappLink } from "@/lib/site-data";

export const Route = createFileRoute("/loja")({
  head: () => ({
    meta: [
      { title: "Loja da DaleÔ — camisetas, bandeiras e mais" },
      {
        name: "description",
        content:
          "Camisetas, moletons, bonés, bandeiras e adesivos da torcida DaleÔ. Peça pelo WhatsApp.",
      },
      { property: "og:title", content: "Loja da DaleÔ" },
      {
        property: "og:description",
        content: "Vista as cores da torcida: produtos oficiais da DaleÔ.",
      },
      { property: "og:url", content: "/loja" },
    ],
    links: [{ rel: "canonical", href: "/loja" }],
  }),
  component: Loja,
});

const categorias = ["Todos", "Camisetas", "Moletons", "Bonés", "Bandeiras", "Adesivos"];

function Loja() {
  const [cat, setCat] = useState("Todos");
  const lista = cat === "Todos" ? produtos : produtos.filter((p) => p.categoria === cat);

  return (
    <>
      <PageHero
        eyebrow="Vista as cores"
        title="Loja da DaleÔ"
        description="Produtos da torcida para levar o azul e branco para todo lugar."
      />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex flex-wrap gap-2">
          {categorias.map((c) => (
            <Button
              key={c}
              size="sm"
              variant={cat === c ? "default" : "outline"}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
            >
              {c}
            </Button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((p) => (
            <Card key={p.id} className="flex h-full flex-col overflow-hidden">
              <div
                className="grid aspect-square place-items-center border-b border-dashed bg-secondary/60 text-center text-xs uppercase tracking-widest text-muted-foreground"
                role="img"
                aria-label={`Imagem do produto ${p.nome} a ser cadastrada`}
              >
                <span className="px-4">
                  <ShoppingBag className="mx-auto mb-2 size-6" aria-hidden="true" />
                  Foto do produto a cadastrar
                </span>
              </div>
              <CardContent className="flex flex-1 flex-col gap-3 p-5">
                <Badge variant="secondary" className="w-fit">
                  {p.categoria}
                </Badge>
                <h2 className="text-xl leading-tight">{p.nome}</h2>
                <p className="text-sm text-muted-foreground">{p.descricao}</p>
                <p className="text-sm text-muted-foreground">
                  Tamanhos: {p.tamanhos.join(" · ")}
                </p>
                <p className="font-display text-2xl text-primary">{p.preco}</p>
                <Button asChild variant="whats" className="mt-auto">
                  <a
                    href={whatsappLink(`Olá, DaleÔ! Tenho interesse no produto: ${p.nome}.`)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Comprar pelo WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 space-y-3">
          <EditavelNota>
            fotos, descrições, tamanhos, preços e estoque de cada produto.
          </EditavelNota>
          <p className="text-sm text-muted-foreground">
            Estrutura preparada para receber pagamento on-line (Pix e cartão) em uma etapa futura.
          </p>
        </div>
      </section>
    </>
  );
}
