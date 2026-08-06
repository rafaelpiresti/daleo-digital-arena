import { createFileRoute } from "@tanstack/react-router";
import { Bus, Clock, MapPin, Ticket } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { EditavelNota, PageHero, SectionTitle } from "@/components/site/Blocks";
import { formatarData } from "@/components/site/Match";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { caravanas, whatsappLink, type Caravana } from "@/lib/site-data";

export const Route = createFileRoute("/caravanas")({
  head: () => ({
    meta: [
      { title: "Caravanas e excursões — DaleÔ" },
      {
        name: "description",
        content:
          "Próximas caravanas da DaleÔ: cidade, adversário, saída, local de embarque, valor, vagas e inscrição.",
      },
      { property: "og:title", content: "Caravanas e excursões — DaleÔ" },
      {
        property: "og:description",
        content: "Viaje com a torcida DaleÔ para acompanhar o São José fora de casa.",
      },
      { property: "og:url", content: "/caravanas" },
    ],
    links: [{ rel: "canonical", href: "/caravanas" }],
  }),
  component: Caravanas,
});

const schema = z.object({
  nome: z.string().trim().min(3, "Informe seu nome completo").max(100),
  telefone: z
    .string()
    .trim()
    .regex(/^[0-9()+\-\s]{10,20}$/, "Informe um telefone válido"),
  vagas: z.coerce.number().int().min(1, "Mínimo 1").max(10, "Máximo 10 por inscrição"),
  website: z.string().max(0),
});

function InscricaoDialog({ caravana }: { caravana: Caravana }) {
  const [erros, setErros] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const dados = {
      nome: String(fd.get("nome") ?? ""),
      telefone: String(fd.get("telefone") ?? ""),
      vagas: String(fd.get("vagas") ?? ""),
      website: String(fd.get("website") ?? ""),
    };
    const r = schema.safeParse(dados);
    if (!r.success) {
      const novos: Record<string, string> = {};
      for (const i of r.error.issues) novos[String(i.path[0])] = i.message;
      setErros(novos);
      return;
    }
    setErros({});
    toast.success("Inscrição enviada! Confirme pelo WhatsApp.");
    window.open(
      whatsappLink(
        `Olá, DaleÔ! Quero participar da caravana para ${caravana.cidade} (${caravana.adversario}).\nNome: ${dados.nome}\nVagas: ${dados.vagas}`,
      ),
      "_blank",
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="hero">Quero participar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            Caravana — {caravana.cidade}
          </DialogTitle>
          <DialogDescription>
            Preencha seus dados. A confirmação da vaga é feita pela administração da torcida.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <div>
            <Label htmlFor={`nome-${caravana.id}`}>Nome completo</Label>
            <Input id={`nome-${caravana.id}`} name="nome" maxLength={100} />
            {erros["nome"] ? <p className="mt-1 text-sm text-destructive">{erros["nome"]}</p> : null}
          </div>
          <div>
            <Label htmlFor={`tel-${caravana.id}`}>Telefone / WhatsApp</Label>
            <Input id={`tel-${caravana.id}`} name="telefone" maxLength={20} inputMode="tel" />
            {erros["telefone"] ? (
              <p className="mt-1 text-sm text-destructive">{erros["telefone"]}</p>
            ) : null}
          </div>
          <div>
            <Label htmlFor={`vagas-${caravana.id}`}>Quantidade de vagas</Label>
            <Input id={`vagas-${caravana.id}`} name="vagas" type="number" min={1} max={10} defaultValue={1} />
            {erros["vagas"] ? <p className="mt-1 text-sm text-destructive">{erros["vagas"]}</p> : null}
          </div>
          <Button type="submit" variant="whats" className="w-full">
            Enviar inscrição
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Caravanas() {
  return (
    <>
      <PageHero
        eyebrow="Na estrada"
        title="Caravanas e excursões"
        description="Onde o Zeca jogar, a DaleÔ vai junto. Garanta sua vaga na próxima viagem."
      />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionTitle eyebrow="Próximas viagens" title="Agenda de caravanas" />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {caravanas.map((c) => (
            <Card key={c.id} className="overflow-hidden">
              <div className="listras h-1 w-full" aria-hidden="true" />
              <CardContent className="space-y-4 p-6">
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
                  <Bus className="size-4" aria-hidden="true" /> Caravana
                </p>
                <h3 className="text-2xl leading-tight">
                  {c.cidade} — {c.adversario}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    {formatarData(c.data)} · saída: {c.saida}
                  </li>
                  <li className="flex gap-2">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    Embarque: {c.embarque}
                  </li>
                  <li className="flex gap-2">
                    <Ticket className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    Valor: {c.valor} · Vagas: {c.vagas}/{c.vagasTotais}
                  </li>
                </ul>
                <InscricaoDialog caravana={c} />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6">
          <EditavelNota>
            cidade, adversário, data e horário de saída, local de embarque, valor e número de vagas
            de cada caravana.
          </EditavelNota>
        </div>
      </section>
    </>
  );
}
