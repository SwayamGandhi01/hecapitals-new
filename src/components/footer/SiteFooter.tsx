import Link from "next/link";
import { Mail } from "lucide-react";

import { FooterMap } from "@/components/footer/FooterMap";
import { GlobalReach } from "@/components/footer/GlobalReach";
import { NewsletterForm } from "@/components/footer/NewsletterForm";
import { ScrollToTop } from "@/components/footer/ScrollToTop";
import { Logo } from "@/components/Logo";
import {
  FOOTER_ABOUT,
  FOOTER_INTRO,
  FOOTER_LEGAL,
  FOOTER_SECTORS,
  FOOTER_SERVICES,
  type FooterLink,
} from "@/lib/footer";
import { SOCIAL_LINKS } from "@/lib/contact";

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: readonly FooterLink[];
}) {
  return (
    <div>
      <h3 className="text-[0.8125rem] font-semibold tracking-[0.1em] text-ink">
        {title}
      </h3>
      <span aria-hidden className="mt-3 block h-px w-full bg-ink/12" />
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[0.9375rem] text-ink-muted underline-offset-4 transition-colors hover:text-brand hover:underline focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <GlobalReach />

      {/* ---------- Main footer ---------- */}
      <div className="bg-[#f4f8fd]">
        <div className="mx-auto w-full max-w-[1260px] px-6 py-14 sm:px-8 sm:py-16 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-3">
              {/* The mark is drawn for dark backgrounds, so on this pale panel
                  it sits in a navy plate rather than being recoloured. */}
              <div className="inline-flex rounded-lg bg-navy-950 px-4 py-3">
                <Logo />
              </div>
              <p className="mt-5 max-w-[22rem] text-[0.9375rem] leading-[1.7] text-ink-muted">
                {FOOTER_INTRO}
              </p>

              {/* Rendered only once verified profile URLs exist. */}
              {SOCIAL_LINKS.length > 0 ? (
                <ul className="mt-6 flex items-center gap-3">
                  {SOCIAL_LINKS.map((social) => (
                    <li key={social.href}>
                      <a
                        href={social.href}
                        aria-label={social.label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex size-9 items-center justify-center rounded-full border border-navy-900/25 text-navy-900 transition-colors hover:border-brand hover:text-brand focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                      >
                        {social.label.slice(0, 2)}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <nav
              aria-label="Footer"
              className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5"
            >
              <LinkColumn title="SECTORS" links={FOOTER_SECTORS} />
              <LinkColumn title="SERVICES" links={FOOTER_SERVICES} />
              <LinkColumn title="ABOUT" links={FOOTER_ABOUT} />
            </nav>

            <div className="lg:col-span-4">
              <FooterMap />
            </div>
          </div>

          {/* ---------- Newsletter ---------- */}
          <div className="mt-12 border-t border-ink/10 pt-10">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div className="flex items-center gap-5">
                <span
                  aria-hidden
                  className="hidden size-12 shrink-0 items-center justify-center rounded-full border border-navy-900/20 text-navy-900 sm:flex"
                >
                  <Mail className="size-5" />
                </span>
                <div className="border-l border-ink/12 pl-5">
                  <p className="text-[10px] font-medium tracking-[0.2em] text-ink-muted">
                    STAY INFORMED
                  </p>
                  <p className="mt-1.5 max-w-[22rem] font-serif text-[1.25rem] leading-snug text-ink">
                    Subscribe to receive the latest news and press releases.
                  </p>
                </div>
              </div>

              <NewsletterForm />
            </div>

            <div className="mt-8 flex justify-end">
              <ScrollToTop />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Copyright bar ---------- */}
      <div className="bg-navy-950">
        <div className="mx-auto w-full max-w-[1260px] px-6 py-5 sm:px-8 lg:px-10">
          <ul className="flex flex-col items-center gap-2 text-center text-[0.75rem] text-white/60 lg:flex-row lg:justify-between lg:gap-4 lg:text-left">
            <li>{FOOTER_LEGAL.copyright}</li>
            <li className="lg:border-l lg:border-white/15 lg:pl-4">
              {FOOTER_LEGAL.registration}
            </li>
            <li className="lg:border-l lg:border-white/15 lg:pl-4">
              {FOOTER_LEGAL.address}
            </li>
            <li className="lg:border-l lg:border-white/15 lg:pl-4">
              <a
                href={FOOTER_LEGAL.credit.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
              >
                {FOOTER_LEGAL.credit.label}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
