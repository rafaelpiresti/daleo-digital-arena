/**
 * CONTEÚDO EDITÁVEL DA DALEÔ
 * -------------------------------------------------------------
 * Todos os campos marcados com [PREENCHER] devem ser atualizados
 * pela administração da torcida. Nada aqui é informação oficial:
 * são textos provisórios de exemplo.
 *
 * Futuramente estes dados podem vir de um painel administrativo
 * (banco de dados) sem alterar os componentes: a estrutura dos
 * objetos já está preparada para isso.
 */

export const TODO = "[PREENCHER]";

export const siteConfig = {
  nome: "DaleÔ",
  nomeCompleto: "DaleÔ — Torcida Organizada",
  clube: "Esporte Clube São José",
  cidade: "Porto Alegre/RS",
  slogan: "DaleÔ: nossa voz, nossa paixão, nosso Zeca!",
  aviso:
    "Site independente da torcida organizada DaleÔ. Não é o site oficial do Esporte Clube São José e não possui vínculo institucional com o clube.",
  // Substituir pelo número real (formato internacional, só dígitos)
  whatsapp: "5551999999999",
  whatsappLabel: `${TODO} (número de WhatsApp)`,
  email: `contato@daleo.com.br ${TODO}`,
  pontoEncontro: `${TODO} — ponto de encontro / endereço da torcida`,
  redes: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
  },
};

export function whatsappLink(mensagem: string) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export type Jogo = {
  id: string;
  adversario: string;
  competicao: string;
  data: string; // ISO
  local: string;
  mandante: boolean;
  mapaUrl?: string;
  ingressos?: string;
  concentracao?: string;
  resultado?: string;
};

const emDias = (dias: number, hora = 16) => {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  d.setHours(hora, 0, 0, 0);
  return d.toISOString();
};

export const proximosJogos: Jogo[] = [
  {
    id: "j1",
    adversario: `Adversário ${TODO}`,
    competicao: `Competição ${TODO}`,
    data: emDias(6, 16),
    local: `Estádio ${TODO} — Porto Alegre/RS`,
    mandante: true,
    mapaUrl: "https://www.google.com/maps/search/?api=1&query=Porto+Alegre+RS",
    ingressos: `${TODO} — informações de ingressos (ponto de venda, valores, meia-entrada).`,
    concentracao: `${TODO} — horário e local de concentração da DaleÔ antes do jogo.`,
  },
  {
    id: "j2",
    adversario: `Adversário ${TODO}`,
    competicao: `Competição ${TODO}`,
    data: emDias(14, 19),
    local: `Estádio ${TODO}`,
    mandante: false,
    mapaUrl: "https://www.google.com/maps/search/?api=1&query=Rio+Grande+do+Sul",
    ingressos: `${TODO}`,
    concentracao: `${TODO}`,
  },
];

export const jogosAnteriores: Jogo[] = [
  {
    id: "a1",
    adversario: `Adversário ${TODO}`,
    competicao: `Competição ${TODO}`,
    data: emDias(-7, 16),
    local: `Estádio ${TODO}`,
    mandante: true,
    resultado: `${TODO} — placar`,
  },
  {
    id: "a2",
    adversario: `Adversário ${TODO}`,
    competicao: `Competição ${TODO}`,
    data: emDias(-15, 20),
    local: `Estádio ${TODO}`,
    mandante: false,
    resultado: `${TODO} — placar`,
  },
];

export type Noticia = {
  id: string;
  titulo: string;
  categoria: "Jogos" | "Eventos" | "Caravanas" | "Ações sociais" | "Comunicados";
  data: string;
  resumo: string;
  conteudo: string;
};

export const categoriasNoticias = [
  "Jogos",
  "Eventos",
  "Caravanas",
  "Ações sociais",
  "Comunicados",
] as const;

export const noticias: Noticia[] = [
  {
    id: "n1",
    titulo: `Título da notícia ${TODO}`,
    categoria: "Jogos",
    data: emDias(-2),
    resumo: `Resumo provisório da notícia. ${TODO}`,
    conteudo: `Texto completo da notícia. ${TODO}`,
  },
  {
    id: "n2",
    titulo: `Título do comunicado ${TODO}`,
    categoria: "Comunicados",
    data: emDias(-5),
    resumo: `Resumo provisório do comunicado oficial da torcida. ${TODO}`,
    conteudo: `Texto completo do comunicado. ${TODO}`,
  },
  {
    id: "n3",
    titulo: `Ação social ${TODO}`,
    categoria: "Ações sociais",
    data: emDias(-11),
    resumo: `Resumo provisório da ação social organizada pela DaleÔ. ${TODO}`,
    conteudo: `Texto completo. ${TODO}`,
  },
  {
    id: "n4",
    titulo: `Caravana ${TODO}`,
    categoria: "Caravanas",
    data: emDias(-18),
    resumo: `Resumo provisório sobre a caravana. ${TODO}`,
    conteudo: `Texto completo. ${TODO}`,
  },
];

export type Caravana = {
  id: string;
  cidade: string;
  adversario: string;
  data: string;
  saida: string;
  embarque: string;
  valor: string;
  vagas: number;
  vagasTotais: number;
};

export const caravanas: Caravana[] = [
  {
    id: "c1",
    cidade: `Cidade ${TODO}`,
    adversario: `Adversário ${TODO}`,
    data: emDias(14),
    saida: `${TODO} (horário de saída)`,
    embarque: `${TODO} (local de embarque)`,
    valor: `${TODO} (valor)`,
    vagas: 0,
    vagasTotais: 0,
  },
  {
    id: "c2",
    cidade: `Cidade ${TODO}`,
    adversario: `Adversário ${TODO}`,
    data: emDias(28),
    saida: `${TODO}`,
    embarque: `${TODO}`,
    valor: `${TODO}`,
    vagas: 0,
    vagasTotais: 0,
  },
];

export type Plano = {
  id: string;
  nome: string;
  valor: string;
  beneficios: string[];
};

export const planos: Plano[] = [
  {
    id: "p1",
    nome: `Plano ${TODO}`,
    valor: `${TODO}`,
    beneficios: [
      `Benefício ${TODO}`,
      `Benefício ${TODO}`,
      `Benefício ${TODO}`,
    ],
  },
  {
    id: "p2",
    nome: `Plano ${TODO}`,
    valor: `${TODO}`,
    beneficios: [
      `Benefício ${TODO}`,
      `Benefício ${TODO}`,
      `Benefício ${TODO}`,
      `Benefício ${TODO}`,
    ],
  },
  {
    id: "p3",
    nome: `Plano ${TODO}`,
    valor: `${TODO}`,
    beneficios: [
      `Benefício ${TODO}`,
      `Benefício ${TODO}`,
      `Benefício ${TODO}`,
    ],
  },
];

export type Produto = {
  id: string;
  nome: string;
  categoria: "Camisetas" | "Bonés" | "Bandeiras" | "Adesivos" | "Moletons";
  descricao: string;
  preco: string;
  tamanhos: string[];
};

export const produtos: Produto[] = [
  {
    id: "pr1",
    nome: `Camiseta ${TODO}`,
    categoria: "Camisetas",
    descricao: `Descrição do produto. ${TODO}`,
    preco: `${TODO}`,
    tamanhos: ["P", "M", "G", "GG", "XGG"],
  },
  {
    id: "pr2",
    nome: `Moletom ${TODO}`,
    categoria: "Moletons",
    descricao: `Descrição do produto. ${TODO}`,
    preco: `${TODO}`,
    tamanhos: ["P", "M", "G", "GG"],
  },
  {
    id: "pr3",
    nome: `Boné ${TODO}`,
    categoria: "Bonés",
    descricao: `Descrição do produto. ${TODO}`,
    preco: `${TODO}`,
    tamanhos: ["Único"],
  },
  {
    id: "pr4",
    nome: `Bandeira ${TODO}`,
    categoria: "Bandeiras",
    descricao: `Descrição do produto. ${TODO}`,
    preco: `${TODO}`,
    tamanhos: ["1,5m x 1m", "2m x 1,4m"],
  },
  {
    id: "pr5",
    nome: `Cartela de adesivos ${TODO}`,
    categoria: "Adesivos",
    descricao: `Descrição do produto. ${TODO}`,
    preco: `${TODO}`,
    tamanhos: ["Único"],
  },
  {
    id: "pr6",
    nome: `Camiseta ${TODO}`,
    categoria: "Camisetas",
    descricao: `Descrição do produto. ${TODO}`,
    preco: `${TODO}`,
    tamanhos: ["P", "M", "G", "GG"],
  },
];

export type Canto = {
  id: string;
  nome: string;
  letra: string;
  midiaUrl?: string;
};

export const cantos: Canto[] = [
  {
    id: "ct1",
    nome: `Nome do canto ${TODO}`,
    letra: `Letra do canto cadastrada pela própria torcida.\n${TODO}`,
  },
  {
    id: "ct2",
    nome: `Nome do canto ${TODO}`,
    letra: `Letra do canto cadastrada pela própria torcida.\n${TODO}`,
  },
  {
    id: "ct3",
    nome: `Nome do canto ${TODO}`,
    letra: `Letra do canto cadastrada pela própria torcida.\n${TODO}`,
  },
];

export type Album = {
  id: string;
  titulo: string;
  tipo: "Foto" | "Vídeo";
  itens: number;
};

export const albuns: Album[] = [
  { id: "g1", titulo: `Álbum de jogo ${TODO}`, tipo: "Foto", itens: 6 },
  { id: "g2", titulo: `Álbum de evento ${TODO}`, tipo: "Foto", itens: 6 },
  { id: "g3", titulo: `Caravana ${TODO}`, tipo: "Foto", itens: 6 },
  { id: "g4", titulo: `Vídeos da arquibancada ${TODO}`, tipo: "Vídeo", itens: 4 },
];

export const faq = [
  {
    p: "Como faço para me associar à DaleÔ?",
    r: "Preencha o formulário da página Associação e continue o atendimento pelo WhatsApp. Os planos e valores serão confirmados pela administração da torcida.",
  },
  {
    p: "A DaleÔ é ligada oficialmente ao Esporte Clube São José?",
    r: `Não. A DaleÔ é uma torcida organizada formada por torcedores. Este site é independente e não representa o clube. ${TODO} — descrever a relação atual com o clube.`,
  },
  {
    p: "Como participo das caravanas?",
    r: "Acompanhe a página Caravanas, escolha a viagem e clique em “Quero participar”. As vagas são confirmadas pela administração.",
  },
  {
    p: "Como compro produtos da torcida?",
    r: "Na página Loja, escolha o produto e solicite pelo WhatsApp. O pagamento on-line será disponibilizado em breve.",
  },
  {
    p: "Posso enviar fotos e vídeos para a galeria?",
    r: "Sim! Envie o material pelo WhatsApp ou pelo formulário de contato. Publicamos apenas conteúdos autorizados pela torcida.",
  },
];
