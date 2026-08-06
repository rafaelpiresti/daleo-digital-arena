import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Youtube } from "lucide-react";

import { navLinks } from "@/components/site/Header";
import { siteConfig, whatsappLink } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="mt-20 bg-navy text-navy-foreground">
      <div className="listras h-1 w-full" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl">DaleÔ</p>
          <p className="mt-2 max-w-sm text-sm text-navy-foreground/80">
            Torcida organizada dos torcedores do {siteConfig.clube}, {siteConfig.cidade}. Nossa voz,
            nossa paixão, nosso Zeca.
          </p>
          <p className="mt-4 flex items-start gap-2 text-sm text-navy-foreground/70">
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {siteConfig.pontoEncontro}
          </p>
        </div>

        <nav aria-label="Rodapé">
          <p className="font-display text-lg">Navegue</p>
          <ul className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-navy-foreground/80 hover:text-navy-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/privacidade" className="text-navy-foreground/80 hover:text-navy-foreground">
                Privacidade
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="font-display text-lg">Fale com a gente</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                className="inline-flex items-center gap-2 text-navy-foreground/85 hover:text-navy-foreground"
                href={whatsappLink("Olá, DaleÔ!")}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
              </a>
            </li>
            <li>
              <a
                className="inline-flex items-center gap-2 text-navy-foreground/85 hover:text-navy-foreground"
                href={`mailto:${siteConfig.email}`}
              >
                <Mail className="size-4" aria-hidden="true" /> {siteConfig.email}
              </a>
            </li>
            <li className="flex gap-3 pt-2">
              <a href={siteConfig.redes.instagram} target="_blank" rel="noreferrer" aria-label="Instagram da DaleÔ">
                <Instagram className="size-5" />
              </a>
              <a href={siteConfig.redes.facebook} target="_blank" rel="noreferrer" aria-label="Facebook da DaleÔ">
                <Facebook className="size-5" />
              </a>
              <a href={siteConfig.redes.youtube} target="_blank" rel="noreferrer" aria-label="YouTube da DaleÔ">
                <Youtube className="size-5" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sidebar-border px-4 py-6">
        <p className="mx-auto max-w-7xl text-xs leading-relaxed text-navy-foreground/70">
          {siteConfig.aviso} Marcas, escudos e imagens oficiais do clube não são utilizados sem
          autorização. © {new Date().getFullYear()} DaleÔ.
        </p>
      </div>
    </footer>
  );
}
