import { createFileRoute } from "@tanstack/react-router";
import { HeartHandshake, ShieldCheck, Users } from "lucide-react";

import { EditavelNota, PageHero, SectionTitle } from "@/components/site/Blocks";
import { Card, CardContent } from "@/components/ui/card";
import { TODO, siteConfig } from "@/lib/site-data";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a DaleÔ — Torcida Organizada do São José" },
      {
        name: "description",
        content:
          "Conheça a DaleÔ: história, missão, valores e o compromisso com uma torcida apaixonada, respeitosa e sem violência.",
      },
      { property: "og:title", content: "Sobre a DaleÔ" },
      {
        property: "og:description",
        content: "História, missão e valores da torcida organizada DaleÔ, de Porto Alegre/RS.",
      },
      { property: "og:url", content: "/sobre" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: Sobre,
});

const valores = [
  {
    icon: Users,
    titulo: "União",
    texto: "Uma arquibancada só, do primeiro ao último minuto, dentro e fora de casa.",
  },
  {
    icon: HeartHandshake,
    titulo: "Respeito e inclusão",
    texto:
      "Todo torcedor é bem-vindo. Não toleramos racismo, homofobia, machismo ou qualquer discriminação.",
  },
  {
    icon: ShieldCheck,
    titulo: "Paz na arquibancada",
    texto: "Somos contra qualquer tipo de violência. Nossa força é o canto, não a briga.",
  },
];

function Sobre() {
  return (
    <>
      <PageHero
        eyebrow="Quem somos"
        title="Sobre a DaleÔ"
        description={`Torcida organizada formada por torcedores do ${siteConfig.clube}, em ${siteConfig.cidade}.`}
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6">
          <SectionTitle eyebrow="Nossa trajetória" title="História da torcida" />
          <p className="text-muted-foreground">
            {TODO} — Espaço reservado para a história oficial da DaleÔ, escrita pela própria
            torcida: fundação, primeiros encontros, bandeiras, batucada e os momentos que marcaram
            a arquibancada.
          </p>
          <EditavelNota>
            texto de história, datas, nomes e fatos. Nenhuma informação histórica foi criada
            automaticamente.
          </EditavelNota>

          <SectionTitle eyebrow="Por que existimos" title="Missão" />
          <p className="text-muted-foreground">
            Apoiar o Zeca em todos os jogos, reunir torcedores, cuidar da festa na arquibancada e
            levar a torcida para onde o time jogar. {TODO} — ajustar conforme o texto oficial.
          </p>

          <SectionTitle eyebrow="Transparência" title="Relação com o clube" />
          <p className="text-muted-foreground">
            {siteConfig.aviso} {TODO} — descrever a relação atual entre a DaleÔ e o clube.
          </p>
        </div>

        <aside className="space-y-4">
          {valores.map((v) => (
            <Card key={v.titulo}>
              <CardContent className="flex gap-4 p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-arquibancada text-navy-foreground">
                  <v.icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg">{v.titulo}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{v.texto}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </aside>
      </section>

      <section className="bg-navy py-14 text-navy-foreground">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl sm:text-4xl">Compromisso da DaleÔ</h2>
          <p className="mt-4 text-navy-foreground/85">
            Somos uma torcida apaixonada, respeitosa e inclusiva. Repudiamos qualquer forma de
            violência ou discriminação, dentro e fora dos estádios.
          </p>
        </div>
      </section>
    </>
  );
}
