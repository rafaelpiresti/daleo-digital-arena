import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig, whatsappLink } from "@/lib/site-data";

export const navLinks = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/jogos", label: "Jogos" },
  { to: "/associacao", label: "Associação" },
  { to: "/caravanas", label: "Caravanas" },
  { to: "/noticias", label: "Notícias" },
  { to: "/galeria", label: "Galeria" },
  { to: "/cantos", label: "Cantos" },
  { to: "/loja", label: "Loja" },
  { to: "/contato", label: "Contato" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sidebar-border bg-navy/95 text-navy-foreground backdrop-blur">
      <div className="listras h-1 w-full" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 lg:flex lg:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="DaleÔ — página inicial">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-arquibancada font-display text-lg text-navy-foreground ring-2 ring-sky/60">
            DÔ
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-xl leading-none tracking-wide">
              DaleÔ
            </span>
            <span className="block truncate text-[11px] uppercase tracking-widest text-sky">
              Torcida organizada
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "bg-sidebar-accent text-navy-foreground" }}
              className="rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wide text-navy-foreground/85 transition-colors hover:bg-sidebar-accent hover:text-navy-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="whats" size="sm" className="hidden sm:inline-flex">
            <a href={whatsappLink(`Olá, DaleÔ! Vim pelo site.`)} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" /> WhatsApp
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghostLight" size="icon" className="lg:hidden" aria-label="Abrir menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm bg-navy text-navy-foreground">
              <SheetTitle className="font-display text-2xl text-navy-foreground">Menu</SheetTitle>
              <nav className="mt-4 flex flex-col gap-1" aria-label="Navegação móvel">
                {navLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: l.to === "/" }}
                    activeProps={{ className: "bg-sidebar-accent" }}
                    className="rounded-md px-3 py-3 text-base font-semibold uppercase tracking-wide"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <p className="mt-6 text-xs text-navy-foreground/70">{siteConfig.aviso}</p>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
