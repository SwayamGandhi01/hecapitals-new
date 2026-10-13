import type { ReactNode } from "react";

/** Minimal interior page frame so hero links resolve to real destinations. */
export function PageShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-navy-950 px-6 pb-24 pt-40 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1600px]">
        <p className="font-mono text-[11px] tracking-[0.22em] text-white/55">
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.08] text-white">
          {title}
        </h1>
        {children}
      </div>
    </main>
  );
}
