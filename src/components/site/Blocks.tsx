import { AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";

/** Bloco que sinaliza conteúdo a ser preenchido pela administração da DaleÔ. */
export function EditavelNota({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-start gap-2 rounded-md border border-dashed border-primary/40 bg-accent/50 p-3 text-sm text-secondary-foreground">
      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
      <span>
        <strong className="font-semibold">A preencher pela administração:</strong> {children}
      </span>
    </p>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p
          className={`text-xs font-bold uppercase tracking-[0.25em] ${light ? "text-sky" : "text-primary"}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-3xl leading-[1.05] sm:text-4xl">{title}</h2>
      {description ? (
        <p className={`mt-3 text-base ${light ? "text-navy-foreground/80" : "text-muted-foreground"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="bg-arquibancada text-navy-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky">{eyebrow}</p>
        <h1 className="mt-3 text-4xl leading-[0.95] sm:text-6xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base text-navy-foreground/85 sm:text-lg">{description}</p>
      </div>
      <div className="listras h-1 w-full" aria-hidden="true" />
    </section>
  );
}
