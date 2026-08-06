import { createFileRoute } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Youtube } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { EditavelNota, PageHero, SectionTitle } from "@/components/site/Blocks";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { faq, siteConfig, whatsappLink } from "@/lib/site-data";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — DaleÔ Torcida Organizada" },
      {
        name: "description",
        content:
          "Fale com a DaleÔ pelo WhatsApp, e-mail ou redes sociais. Perguntas frequentes da torcida.",
      },
      { property: "og:title", content: "Contato — DaleÔ" },
      {
        property: "og:description",
        content: "Canais oficiais de contato da torcida organizada DaleÔ.",
      },
      { property: "og:url", content: "/contato" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.p,
            acceptedAnswer: { "@type": "Answer", text: f.r },
          })),
        }),
      },
    ],
  }),
  component: Contato,
});

const schema = z.object({
  nome: z.string().trim().min(3, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  mensagem: z.string().trim().min(10, "Escreva sua mensagem").max(1000),
  website: z.string().max(0),
});

function Contato() {
  const [erros, setErros] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const dados = {
      nome: String(fd.get("nome") ?? ""),
      email: String(fd.get("email") ?? ""),
      mensagem: String(fd.get("mensagem") ?? ""),
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
    toast.success("Mensagem enviada! Responderemos em breve.");
    form.reset();
  }

  return (
    <>
      <PageHero
        eyebrow="Fale com a torcida"
        title="Contato"
        description="Dúvidas, sugestões, parcerias ou envio de fotos: estamos por aqui."
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-14 lg:grid-cols-2">
        <div>
          <SectionTitle eyebrow="Mensagem" title="Formulário de contato" />
          <form onSubmit={onSubmit} className="mt-6 space-y-5" noValidate>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" name="nome" maxLength={100} autoComplete="name" />
              {erros["nome"] ? <p className="mt-1 text-sm text-destructive">{erros["nome"]}</p> : null}
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" name="email" type="email" maxLength={255} autoComplete="email" />
              {erros["email"] ? <p className="mt-1 text-sm text-destructive">{erros["email"]}</p> : null}
            </div>
            <div>
              <Label htmlFor="mensagem">Mensagem</Label>
              <Textarea id="mensagem" name="mensagem" rows={5} maxLength={1000} />
              {erros["mensagem"] ? (
                <p className="mt-1 text-sm text-destructive">{erros["mensagem"]}</p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="submit" variant="hero" size="lg">
                Enviar mensagem
              </Button>
              <Button asChild variant="whats" size="lg">
                <a href={whatsappLink("Olá, DaleÔ!")} target="_blank" rel="noreferrer">
                  <MessageCircle aria-hidden="true" /> WhatsApp
                </a>
              </Button>
            </div>
            <EditavelNota>
              destino das mensagens (e-mail da torcida) — hoje o formulário valida os dados e
              confirma o envio na tela.
            </EditavelNota>
          </form>
        </div>

        <div className="space-y-6">
          <SectionTitle eyebrow="Canais" title="Onde nos encontrar" />
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="size-4 text-primary" aria-hidden="true" />
              <a className="hover:underline" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle className="size-4 text-primary" aria-hidden="true" />
              {siteConfig.whatsappLabel}
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              {siteConfig.pontoEncontro}
            </li>
          </ul>
          <div className="flex gap-3">
            <Button asChild variant="outline" size="icon">
              <a href={siteConfig.redes.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram />
              </a>
            </Button>
            <Button asChild variant="outline" size="icon">
              <a href={siteConfig.redes.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                <Facebook />
              </a>
            </Button>
            <Button asChild variant="outline" size="icon">
              <a href={siteConfig.redes.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
                <Youtube />
              </a>
            </Button>
          </div>

          <SectionTitle eyebrow="Dúvidas" title="Perguntas frequentes" />
          <Accordion type="single" collapsible>
            {faq.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-display text-base uppercase">
                  {f.p}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.r}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
