import { Hero } from "@/components/Hero";
import { ProductDemo } from "@/components/ProductDemo";
import { ClientLogos } from "@/components/ClientLogos";
import { Services } from "@/components/Services";
import { Founders } from "@/components/Founders";
import { Work } from "@/components/Work";
import { Testimonials } from "@/components/Testimonials";
import { Process } from "@/components/Process";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <ProductDemo />
      <Services />
      <Founders />
      <Work />
      <Testimonials />
      <Process />
      <Pricing />
      <Faq />
      <Contact />
    </>
  );
}
