import { PageShell } from "@/components/PageShell";
import { SERVICES } from "@/lib/services";

export const metadata = { title: "Services — HE Capital Markets" };

export default function ServicesPage() {
  return (
    <PageShell eyebrow="SERVICES" title="What we do.">
      <ul className="mt-14 divide-y divide-white/10 border-t border-white/10">
        {SERVICES.map((service, i) => (
          <li
            key={service.href}
            // Anchor ids are the destinations the hero's service rail links to.
            id={service.href.split("#")[1]}
            className="scroll-mt-32 py-8"
          >
            <span className="font-mono text-[11px] tracking-[0.2em] text-white/45">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="mt-2 font-serif text-2xl text-white sm:text-3xl">
              {service.label}
            </h2>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
