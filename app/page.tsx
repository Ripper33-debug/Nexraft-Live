import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { WhyNexraft } from "@/components/WhyNexraft";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <About />
      <Services />
      <Process />
      <WhyNexraft />
      <Pricing />
      <Contact />
    </>
  );
}
