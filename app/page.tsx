import { Hero } from "@/components/Hero";
import { MetricsStrip } from "@/components/MetricsStrip";
import { ProductDemo } from "@/components/ProductDemo";
import { ClientLogos } from "@/components/ClientLogos";
import { ServicesRail } from "@/components/ServicesRail";
import { Founders } from "@/components/Founders";
import { Manifesto } from "@/components/Manifesto";
import { KineticStatement } from "@/components/KineticStatement";
import { Marquee } from "@/components/Marquee";
import { Work } from "@/components/Work";
import { MigrationProof } from "@/components/MigrationProof";
import { ClientProof } from "@/components/ClientProof";
import { Process } from "@/components/Process";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { SectionTransition } from "@/components/ui/SectionTransition";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MetricsStrip />
      <ClientLogos />
      <SectionTransition />
      <Manifesto />
      <ProductDemo />
      <ServicesRail />
      <Founders />
      <SectionTransition />
      <Marquee />
      <Work />
      <SectionTransition />
      <MigrationProof />
      <ClientProof />
      <Process />
      <KineticStatement />
      <Pricing />
      <Faq />
      <Contact />
    </>
  );
}
