import { createFileRoute } from "@tanstack/react-router";

import { EditavelNota, PageHero } from "@/components/site/Blocks";
import { siteConfig } from "@/lib/site-data";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de privacidade — DaleÔ" },
      {
        name: "description",
        content:
          "Como a torcida DaleÔ coleta, usa e protege os dados pessoais dos torcedores, conforme a LGPD.",
      },
      { property: "og:title", content: "Política de privacidade — DaleÔ" },
      {
        property: "og:description",
        content: "Tratamento de dados pessoais da torcida DaleÔ conforme a LGPD.",
      },
      { property: "og:url", content: "/privacidade" },
    ],
    links: [{ rel: "canonical", href: "/privacidade" }],
  }),
  component: Privacidade,
});

function Privacidade() {
  return (
    <>
      <PageHero
        eyebrow="LGPD"
        title="Política de privacidade"
        description="Transparência no uso dos dados enviados pelos torcedores."
      />

      <section className="mx-auto max-w-3xl space-y-6 px-4 py-14 text-muted-foreground">
        <h2 className="text-2xl text-foreground">Quais dados coletamos</h2>
        <p>
          Coletamos apenas os dados informados voluntariamente nos formulários do site: nome,
          telefone, e-mail, cidade, data de nascimento, tamanho de camiseta e mensagens enviadas.
        </p>

        <h2 className="text-2xl text-foreground">Para que usamos</h2>
        <p>
          Os dados são usados para responder contatos, processar pedidos de associação, organizar
          caravanas, atender solicitações da loja e enviar comunicados da torcida.
        </p>

        <h2 className="text-2xl text-foreground">Compartilhamento</h2>
        <p>
          Não vendemos nem compartilhamos dados com terceiros para fins publicitários. O contato
          pode ser continuado pelo WhatsApp, a pedido do próprio torcedor.
        </p>

        <h2 className="text-2xl text-foreground">Seus direitos</h2>
        <p>
          Conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018), você pode solicitar acesso,
          correção ou exclusão dos seus dados a qualquer momento pelo e-mail {siteConfig.email}.
        </p>

        <h2 className="text-2xl text-foreground">Cookies e análise</h2>
        <p>
          O site está preparado para receber ferramentas de análise (como o Google Analytics). Nenhum
          código de rastreamento está ativo até que a administração da torcida o configure.
        </p>

        <EditavelNota>
          responsável pelo tratamento dos dados, e-mail oficial de contato, prazo de guarda das
          informações e eventual uso de ferramentas de análise.
        </EditavelNota>

        <p className="text-sm">{siteConfig.aviso}</p>
      </section>
    </>
  );
}
