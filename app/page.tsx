import { Hero } from "@/components/Hero";
import { MetricsStrip } from "@/components/MetricsStrip";
import { ProductDemo } from "@/components/ProductDemo";
import { ClientLogos } from "@/components/ClientLogos";
import { Services } from "@/components/Services";
import { Founders } from "@/components/Founders";
import { Work } from "@/components/Work";
import { ClientProof } from "@/components/ClientProof";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MetricsStrip />
      <ClientLogos />
      <ProductDemo />
      <Services />
      <Work />
      <ClientProof />
      <Founders />
      <Pricing />
      <Faq />
      <Contact />
    </>
  );
}
