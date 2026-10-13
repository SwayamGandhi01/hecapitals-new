import { AboutSection } from "@/components/about/AboutSection";
import { ClientsSection } from "@/components/clients/ClientsSection";
import { Hero } from "@/components/hero/Hero";
import { PressReleasesSection } from "@/components/press/PressReleasesSection";
import { SectorsSection } from "@/components/sectors/SectorsSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <SectorsSection />
      <ClientsSection />
      <PressReleasesSection />
    </main>
  );
}
