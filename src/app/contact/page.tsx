import { PageShell } from "@/components/PageShell";

export const metadata = { title: "Contact — HE Capital Markets" };

export default function ContactPage() {
  return (
    <PageShell eyebrow="CONTACT" title="Discuss your goals.">
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70">
        Tell us about your objectives and we will come back to you.
      </p>
    </PageShell>
  );
}
