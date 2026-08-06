import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Camera, Bus, MessageCircle, Newspaper } from "lucide-react";

import heroImg from "@/assets/hero-torcida.jpg";
import faixaImg from "@/assets/faixa-bandeiras.jpg";
import { EditavelNota, SectionTitle } from "@/components/site/Blocks";
import { Countdown, MatchCard, formatarData } from "@/components/site/Match";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  caravanas,
  noticias,
  proximosJogos,
  siteConfig,
  whatsappLink,
} from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DaleÔ — Torcida Organizada do Esporte Clube São José" },
      {
        name: "description",
        content:
          "DaleÔ: nossa voz, nossa paixão, nosso Zeca. Jogos, caravanas, notícias, cantos e loja da torcida organizada do São José em Porto Alegre/RS.",
      },
      { property: "og:title", content: "DaleÔ — Torcida Organizada do São José" },
      {
        property: "og:description",
        content:
          "Próximos jogos, caravanas, notícias e associação da torcida DaleÔ, de Porto Alegre/RS.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const proximo = proximosJogos[0];

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-navy text-navy-foreground">
        <img
          src={heroImg}
          alt="Torcedores com bandeiras azuis e brancas na arquibancada do estádio"
          width={1920}
          height={1088}
          className="absolute inset-0 -z-10 size-full object-cover opacity-45"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/70 to-navy/40" aria-hidden="true" />

        <div className="mx-auto max-w-7xl px-4 py-24 sm:py-32">
          <Badge variant="secondary" className="uppercase tracking-widest">
            {siteConfig.cidade}
          </Badge>
          <h1 className="fade-up mt-5 max-w-4xl text-5xl leading-[0.92] sm:text-7xl lg:text-8xl">
            DaleÔ: nossa voz, nossa paixão, nosso Zeca!
          </h1>
          <p className="mt-5 max-w-xl text-lg text-navy-foreground/85">
            Torcida organizada dos torcedores do {siteConfig.clube}. Arquibancada cheia, bandeira
            no alto e o coração batendo no ritmo do surdo.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/associacao">Faça parte da DaleÔ</Link>
            </Button>
            <Button asChild variant="arena" size="xl">
              <Link to="/jogos">Próximos jogos</Link>
            </Button>
            <Button asChild variant="whats" size="xl">
              <a href={whatsappLink("Olá, DaleÔ! Quero falar com vocês.")} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" /> Fale pelo WhatsApp
              </a>
            </Button>
          </div>

          <p className="mt-8 max-w-2xl text-xs text-navy-foreground/70">{siteConfig.aviso}</p>
        </div>
        <div className="listras h-1.5 w-full" aria-hidden="true" />
      </section>

      {/* PRÓXIMO JOGO */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionTitle
          eyebrow="Dia de jogo"
          title="Próximo jogo do São José"
          description="Data, horário, adversário e local. Atualizado pela administração da torcida."
        />
        {proximo ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-xl bg-arquibancada p-6 text-navy-foreground shadow-arena sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky">
                {proximo.competicao}
              </p>
              <h3 className="mt-3 text-3xl sm:text-4xl">São José × {proximo.adversario}</h3>
              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-navy-foreground/85">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="size-4" aria-hidden="true" /> {formatarData(proximo.data)}
                </span>
                <span>{proximo.local}</span>
              </p>
              <div className="mt-6">
                <Countdown target={proximo.data} light />
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="arena">
                  <Link to="/jogos">Ver agenda completa</Link>
                </Button>
                {proximo.mapaUrl ? (
                  <Button asChild variant="ghostLight">
                    <a href={proximo.mapaUrl} target="_blank" rel="noreferrer">
                      Estádio no mapa
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
            <MatchCard jogo={proximo} />
          </div>
        ) : null}
        <div className="mt-6">
          <EditavelNota>
            adversário, competição, data, horário, estádio, ingressos e concentração de cada partida.
          </EditavelNota>
        </div>
      </section>

      {/* NOTÍCIAS */}
      <section className="bg-secondary/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle eyebrow="Arquibancada informada" title="Últimas notícias da torcida" />
            <Button asChild variant="outline">
              <Link to="/noticias">
                Todas as notícias <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {noticias.slice(0, 3).map((n) => (
              <Card key={n.id} className="h-full">
                <CardContent className="space-y-3 p-5">
                  <Badge variant="secondary">{n.categoria}</Badge>
                  <h3 className="text-xl leading-tight">{n.titulo}</h3>
                  <p className="text-sm text-muted-foreground">{n.resumo}</p>
                  <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                    <Newspaper className="size-3.5" aria-hidden="true" />
                    {formatarData(n.data)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CARAVANAS */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle
            eyebrow="Estrada azul e branca"
            title="Caravanas e eventos"
            description="A DaleÔ vai junto onde o Zeca jogar."
          />
          <Button asChild variant="outline">
            <Link to="/caravanas">
              Ver caravanas <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {caravanas.map((c) => (
            <Card key={c.id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
                <div className="min-w-0">
                  <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
                    <Bus className="size-4" aria-hidden="true" /> Caravana
                  </p>
                  <h3 className="mt-1 truncate text-xl">
                    {c.cidade} — {c.adversario}
                  </h3>
                  <p className="text-sm text-muted-foreground">{formatarData(c.data)}</p>
                </div>
                <Button asChild size="sm">
                  <Link to="/caravanas">Quero participar</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* GALERIA */}
      <section className="bg-navy py-16 text-navy-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle
              light
              eyebrow="Memória da torcida"
              title="Fotos recentes"
              description="Espaço reservado para as fotos enviadas pela própria torcida."
            />
            <Button asChild variant="arena">
              <Link to="/galeria">Abrir galeria</Link>
            </Button>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="grid aspect-square place-items-center rounded-lg border border-dashed border-sidebar-border bg-sidebar-accent/50 text-center text-[11px] uppercase tracking-widest text-navy-foreground/70"
              >
                <span className="px-2">
                  <Camera className="mx-auto mb-1 size-5" aria-hidden="true" />
                  Foto {i + 1} a enviar
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA ASSOCIAÇÃO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={faixaImg}
          alt="Bandeiras azuis e brancas e um surdo nas cadeiras do estádio"
          width={1600}
          height={900}
          loading="lazy"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-navy/80" aria-hidden="true" />
        <div className="mx-auto max-w-3xl px-4 py-20 text-center text-navy-foreground">
          <h2 className="text-4xl leading-[0.95] sm:text-5xl">Sua voz faz parte do coro</h2>
          <p className="mt-4 text-navy-foreground/85">
            Associe-se à DaleÔ, garanta seu lugar nas caravanas e vista as cores da torcida.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/associacao">Quero me associar</Link>
            </Button>
            <Button asChild variant="arena" size="xl">
              <Link to="/loja">Ver a loja</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
