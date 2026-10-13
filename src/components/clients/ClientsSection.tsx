import { LogoMarquee } from "@/components/clients/LogoMarquee";
import { Reveal } from "@/components/Reveal";
import { CLIENT_LOGOS, CLIENTS_COPY } from "@/lib/client-logos";

/** Second strip reads differently while using the same verified set. */
const SECOND_ROW = [...CLIENT_LOGOS].reverse();

export function ClientsSection() {
  return (
    // White throughout. With no coloured band behind it, the card is defined
    // by a hairline border rather than by contrast against the page.
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className="scroll-mt-28 bg-white px-4 py-14 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1200px] overflow-hidden rounded-2xl border border-ink/10 bg-white">
        <LogoMarquee
          logos={CLIENT_LOGOS}
          direction="ltr"
          durationSeconds={58}
          label="Clients we have worked with"
        />

        {/* ---------- Central panel: stationary ---------- */}
        <div className="relative border-y border-ink/10 bg-white">
          {/* Existing coastline asset, faint and faded at the edges so it
              reads as atmosphere rather than illustration. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[url('/images/world-map.svg')] bg-[length:118%_auto] bg-center bg-no-repeat opacity-[0.05]"
            style={{
              maskImage:
                "radial-gradient(ellipse 60% 70% at 50% 50%, #000 0%, rgba(0,0,0,0.45) 58%, transparent 86%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 60% 70% at 50% 50%, #000 0%, rgba(0,0,0,0.45) 58%, transparent 86%)",
            }}
          />

          <div className="relative px-6 py-16 text-center sm:px-10 sm:py-20 lg:py-24">
            <Reveal>
              <div className="flex items-center justify-center gap-3 sm:gap-5">
                <span aria-hidden className="h-px w-5 bg-brand/45 sm:w-12" />
                <p className="text-[10px] font-medium tracking-[0.14em] text-brand sm:text-[11px] sm:tracking-[0.22em]">
                  {CLIENTS_COPY.eyebrow}
                </p>
                <span aria-hidden className="h-px w-5 bg-brand/45 sm:w-12" />
              </div>

              <h2
                id="clients-heading"
                className="mx-auto mt-6 max-w-[56rem] font-serif text-[clamp(1.5rem,3.6vw,2.75rem)] leading-[1.14] tracking-[-0.015em] text-ink"
              >
                {CLIENTS_COPY.heading}
              </h2>

              <p className="mx-auto mt-5 max-w-[44rem] text-[0.9375rem] leading-[1.7] text-ink-muted">
                {CLIENTS_COPY.body}
              </p>
            </Reveal>
          </div>
        </div>

        <LogoMarquee
          logos={SECOND_ROW}
          direction="rtl"
          durationSeconds={70}
          label="More clients we have worked with"
        />
      </div>
    </section>
  );
}
