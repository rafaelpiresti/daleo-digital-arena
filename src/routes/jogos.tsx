import { createFileRoute } from "@tanstack/react-router";

import { EditavelNota, PageHero, SectionTitle } from "@/components/site/Blocks";
import { MatchCard } from "@/components/site/Match";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { jogosAnteriores, proximosJogos } from "@/lib/site-data";

export const Route = createFileRoute("/jogos")({
  head: () => ({
    meta: [
      { title: "Jogos e agenda do São José — DaleÔ" },
      {
        name: "description",
        content:
          "Próximos jogos, resultados anteriores, local das partidas, ingressos e concentração da torcida DaleÔ.",
      },
      { property: "og:title", content: "Jogos e agenda — DaleÔ" },
      {
        property: "og:description",
        content: "Agenda de jogos, ingressos e ponto de concentração da torcida DaleÔ.",
      },
      { property: "og:url", content: "/jogos" },
    ],
    links: [{ rel: "canonical", href: "/jogos" }],
  }),
  component: Jogos,
});

function Jogos() {
  return (
    <>
      <PageHero
        eyebrow="Agenda"
        title="Jogos do Zeca"
        description="Próximas partidas, resultados, ingressos e onde a DaleÔ se concentra antes do jogo."
      />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <Tabs defaultValue="proximos">
          <TabsList>
            <TabsTrigger value="proximos">Próximos jogos</TabsTrigger>
            <TabsTrigger value="anteriores">Resultados</TabsTrigger>
          </TabsList>

          <TabsContent value="proximos" className="mt-8">
            <div className="grid gap-5 md:grid-cols-2">
              {proximosJogos.map((j) => (
                <MatchCard key={j.id} jogo={j} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="anteriores" className="mt-8">
            <div className="grid gap-5 md:grid-cols-2">
              {jogosAnteriores.map((j) => (
                <MatchCard key={j.id} jogo={j} passado />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-10 space-y-4">
          <SectionTitle
            eyebrow="Dia de jogo"
            title="Concentração da torcida"
            description="Chegue cedo, respeite o combinado e mantenha a festa em paz."
          />
          <EditavelNota>
            horário e ponto de concentração, orientação sobre instrumentos, bandeiras, faixas e
            regras de entrada no estádio.
          </EditavelNota>
          <EditavelNota>
            informações de ingressos: pontos de venda, valores, meia-entrada e link oficial.
          </EditavelNota>
          <p className="text-sm text-muted-foreground">
            Estes conteúdos foram estruturados para serem atualizados por um painel administrativo
            simples (jogos, resultados, ingressos e concentração).
          </p>
        </div>
      </section>
    </>
  );
}
