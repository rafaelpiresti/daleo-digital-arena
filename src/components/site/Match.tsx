import { CalendarDays, MapPin, Ticket, Users } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Jogo } from "@/lib/site-data";

const fmt = new Intl.DateTimeFormat("pt-BR", {
  weekday: "short",
  day: "2-digit",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatarData(iso: string) {
  return fmt.format(new Date(iso));
}

export function Countdown({ target, light = false }: { target: string; light?: boolean }) {
  const [restante, setRestante] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRestante(new Date(target).getTime() - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const ms = Math.max(restante ?? 0, 0);
  const partes = [
    { label: "dias", v: Math.floor(ms / 86400000) },
    { label: "horas", v: Math.floor(ms / 3600000) % 24 },
    { label: "min", v: Math.floor(ms / 60000) % 60 },
    { label: "seg", v: Math.floor(ms / 1000) % 60 },
  ];

  return (
    <div className="flex gap-2" role="timer" aria-label="Contagem regressiva para a próxima partida">
      {partes.map((p) => (
        <div
          key={p.label}
          className={`min-w-16 rounded-md px-3 py-2 text-center ${
            light ? "bg-navy-foreground/10 text-navy-foreground" : "bg-secondary text-secondary-foreground"
          }`}
        >
          <span className="block font-display text-2xl leading-none tabular-nums">
            {restante === null ? "--" : String(p.v).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-widest opacity-75">{p.label}</span>
        </div>
      ))}
    </div>
  );
}

export function MatchCard({ jogo, passado = false }: { jogo: Jogo; passado?: boolean }) {
  return (
    <Card className="overflow-hidden border-border shadow-arena/20">
      <div className="listras h-1 w-full" aria-hidden="true" />
      <CardContent className="space-y-4 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{jogo.competicao}</Badge>
          <Badge variant={jogo.mandante ? "default" : "outline"}>
            {jogo.mandante ? "Casa" : "Fora"}
          </Badge>
        </div>

        <h3 className="text-2xl leading-tight">São José × {jogo.adversario}</h3>

        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CalendarDays className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            {formatarData(jogo.data)}
          </li>
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            {jogo.local}
          </li>
          {jogo.ingressos ? (
            <li className="flex items-start gap-2">
              <Ticket className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              {jogo.ingressos}
            </li>
          ) : null}
          {jogo.concentracao ? (
            <li className="flex items-start gap-2">
              <Users className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              {jogo.concentracao}
            </li>
          ) : null}
          {passado && jogo.resultado ? (
            <li className="font-semibold text-foreground">Resultado: {jogo.resultado}</li>
          ) : null}
        </ul>

        {jogo.mapaUrl ? (
          <Button asChild variant="outline" size="sm">
            <a href={jogo.mapaUrl} target="_blank" rel="noreferrer">
              Abrir estádio no mapa
            </a>
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}
