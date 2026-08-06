import { createFileRoute } from "@tanstack/react-router";
import { Check, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { EditavelNota, PageHero, SectionTitle } from "@/components/site/Blocks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TODO, planos, whatsappLink } from "@/lib/site-data";

export const Route = createFileRoute("/associacao")({
  head: () => ({
    meta: [
      { title: "Associe-se à DaleÔ — Torcida do São José" },
      {
        name: "description",
        content:
          "Benefícios, planos e formulário de associação da torcida organizada DaleÔ, de Porto Alegre/RS.",
      },
      { property: "og:title", content: "Associe-se à DaleÔ" },
      {
        property: "og:description",
        content: "Faça parte da torcida DaleÔ: benefícios, planos e cadastro de associado.",
      },
      { property: "og:url", content: "/associacao" },
    ],
    links: [{ rel: "canonical", href: "/associacao" }],
  }),
  component: Associacao;
});

const schema = z.object({
  nome: z.string().trim().min(3, "Informe seu nome completo").max(100),
  telefone: z
    .string()
    .trim()
    .regex(/^[0-9()+\-\s]{10,20}$/, "Informe um telefone válido com DDD"),
  email: z.string().trim().email("E-mail inválido").max(255),
  cidade: z.string().trim().min(2, "Informe sua cidade").max(80),
  nascimento: z.string().min(1, "Informe sua data de nascimento"),
  camiseta: z.string().min(1, "Escolha o tamanho da camiseta"),
  aceite: z.literal(true, { errorMap: () => ({ message: "É necessário aceitar a política de privacidade" }) }),
  website: z.string().max(0),
});

const beneficios = [
  "Prioridade nas caravanas e excursões",
  "Descontos nos produtos da loja da torcida",
  "Grupo exclusivo de avisos no WhatsApp",
  "Participação nas ações sociais da DaleÔ",
  `Benefício adicional ${TODO}`,
];

function Associacao() {
  const [erros, setErros] = useState<Record<string, string>>({});
  const [camiseta, setCamiseta] = useState("");
  const [aceite, setAceite] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const dados = {
      nome: String(fd.get("nome") ?? ""),
      telefone: String(fd.get("telefone") ?? ""),
      email: String(fd.get("email") ?? ""),
      cidade: String(fd.get("cidade") ?? ""),
      nascimento: String(fd.get("nascimento") ?? ""),
      camiseta,
      aceite,
      website: String(fd.get("website") ?? ""),
    };
    const r = schema.safeParse(dados);
    if (!r.success) {
      const novos: Record<string, string> = {};
      for (const i of r.error.issues) novos[String(i.path[0])] = i.message;
      setErros(novos);
      toast.error("Confira os campos destacados.");
      return;
    }
    setErros({});
    toast.success("Cadastro enviado! Continue o atendimento pelo WhatsApp.");
    window.open(
      whatsappLink(
        `Olá, DaleÔ! Quero me associar.\nNome: ${dados.nome}\nCidade: ${dados.cidade}\nCamiseta: ${dados.camiseta}`,
      ),
      "_blank",
    );
  }

  const erro = (k: string) =>
    erros[k] ? (
      <p className="mt-1 text-sm text-destructive" role="alert">
        {erros[k]}
      </p>
    ) : null;

  return (
    <>
      <PageHero
        eyebrow="Faça parte"
        title="Associe-se à DaleÔ"
        description="Vista as cores, ocupe a arquibancada e fortaleça a torcida do Zeca."
      />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <SectionTitle eyebrow="Vantagens" title="Benefícios do associado" />
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {beneficios.map((b) => (
            <li key={b} className="flex items-start gap-3 rounded-lg border bg-card p-4 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <EditavelNota>lista final de benefícios oferecidos pela torcida.</EditavelNota>
        </div>
      </section>

      <section className="bg-secondary/60 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle eyebrow="Planos" title="Planos de associação" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {planos.map((p) => (
              <Card key={p.id} className="h-full">
                <CardContent className="space-y-4 p-6">
                  <h3 className="text-2xl">{p.nome}</h3>
                  <p className="font-display text-3xl text-primary">{p.valor}</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {p.beneficios.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-4">
            <EditavelNota>nomes, valores e regras dos planos de associação.</EditavelNota>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14">
        <SectionTitle
          eyebrow="Cadastro"
          title="Formulário de associação"
          description="Preencha seus dados e conclua o atendimento pelo WhatsApp."
        />

        <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
          {/* Honeypot anti-spam */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="nome">Nome completo</Label>
              <Input id="nome" name="nome" maxLength={100} autoComplete="name" />
              {erro("nome")}
            </div>
            <div>
              <Label htmlFor="telefone">Telefone / WhatsApp</Label>
              <Input id="telefone" name="telefone" maxLength={20} inputMode="tel" autoComplete="tel" />
              {erro("telefone")}
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" name="email" type="email" maxLength={255} autoComplete="email" />
              {erro("email")}
            </div>
            <div>
              <Label htmlFor="cidade">Cidade</Label>
              <Input id="cidade" name="cidade" maxLength={80} autoComplete="address-level2" />
              {erro("cidade")}
            </div>
            <div>
              <Label htmlFor="nascimento">Data de nascimento</Label>
              <Input id="nascimento" name="nascimento" type="date" />
              {erro("nascimento")}
            </div>
            <div>
              <Label htmlFor="camiseta">Tamanho de camiseta</Label>
              <Select value={camiseta} onValueChange={setCamiseta}>
                <SelectTrigger id="camiseta">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {["PP", "P", "M", "G", "GG", "XGG"].map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {erro("camiseta")}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="aceite"
              checked={aceite}
              onCheckedChange={(v) => setAceite(v === true)}
              aria-describedby="aceite-desc"
            />
            <Label htmlFor="aceite" id="aceite-desc" className="text-sm font-normal leading-relaxed">
              Li e aceito a política de privacidade e autorizo o contato da DaleÔ, conforme a LGPD.
            </Label>
          </div>
          {erro("aceite")}

          <div className="flex flex-wrap gap-3">
            <Button type="submit" variant="hero" size="lg">
              Enviar cadastro
            </Button>
            <Button asChild variant="whats" size="lg">
              <a href={whatsappLink("Olá, DaleÔ! Quero me associar.")} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" /> Falar no WhatsApp
              </a>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Pagamento por Pix ou cartão: integração preparada para ser ativada futuramente. Por
            enquanto, a confirmação é feita pelo WhatsApp.
          </p>
        </form>
      </section>
    </>
  );
}
