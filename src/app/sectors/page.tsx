import { PageShell } from "@/components/PageShell";
import { SECTORS } from "@/lib/sectors";

export const metadata = { title: "Sectors — HE Capital Markets" };

export default function SectorsPage() {
  return (
    <PageShell eyebrow="SECTORS" title="Sectors we work across.">
      <ul className="mt-14 divide-y divide-white/10 border-t border-white/10">
        {SECTORS.map((sector) => (
          <li
            key={sector.id}
            // Anchor targets for the homepage sector cards.
            id={sector.id}
            className="scroll-mt-32 py-8"
          >
            <span className="font-mono text-[11px] tracking-[0.2em] text-white/45">
              {sector.number}
            </span>
            <h2 className="mt-2 font-serif text-2xl text-white sm:text-3xl">
              {sector.title}
            </h2>
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-body">
              {sector.description}
            </p>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
