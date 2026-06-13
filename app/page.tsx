import { Hero } from "@/components/Hero";
import { ProductDemo } from "@/components/ProductDemo";
import { Services } from "@/components/Services";
import { Founders } from "@/components/Founders";
import { Work } from "@/components/Work";
import { Process } from "@/components/Process";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductDemo />
      <Services />
      <Founders />
      <Work />
      <Process />
      <Pricing />
      <Contact />
    </>
  );
}
