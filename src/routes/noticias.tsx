import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { EditavelNota, PageHero } from "@/components/site/Blocks";
import { formatarData } from "@/components/site/Match";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { categoriasNoticias, noticias } from "@/lib/site-data";

export const Route = createFileRoute("/noticias")({
  head: () => ({
    meta: [
      { title: "Notícias e comunicados — DaleÔ" },
      {
        name: "description",
        content:
          "Notícias da torcida DaleÔ sobre jogos, eventos, caravanas, ações sociais e comunicados oficiais.",
      },
      { property: "og:title", content: "Notícias da DaleÔ" },
      {
        property: "og:description",
        content: "Comunicados e notícias da torcida organizada DaleÔ, de Porto Alegre/RS.",
      },
      { property: "og:url", content: "/noticias" },
    ],
    links: [{ rel: "canonical", href: "/noticias" }],
  }),
  component: Noticias,
});

function Noticias() {
  const [filtro, setFiltro] = useState<string>("Todas");
  const lista = filtro === "Todas" ? noticias : noticias.filter((n) => n.categoria === filtro);

  return (
    <>
      <PageHero
        eyebrow="Comunicação"
        title="Notícias da torcida"
        description="Tudo o que rola na DaleÔ: jogos, eventos, caravanas, ações sociais e comunicados oficiais."
      />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex flex-wrap gap-2">
          {["Todas", ...categoriasNoticias].map((c) => (
            <Button
              key={c}
              size="sm"
              variant={filtro === c ? "default" : "outline"}
              onClick={() => setFiltro(c)}
              aria-pressed={filtro === c}
            >
              {c}
            </Button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((n) => (
            <Card key={n.id} className="h-full">
              <CardContent className="space-y-3 p-5">
                <Badge variant="secondary">{n.categoria}</Badge>
                <h2 className="text-xl leading-tight">{n.titulo}</h2>
                <p className="text-sm text-muted-foreground">{n.resumo}</p>
                <p className="text-xs text-muted-foreground">{formatarData(n.data)}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <EditavelNota>títulos, textos, imagens e datas das notícias e comunicados.</EditavelNota>
        </div>
      </section>
    </>
  );
}
