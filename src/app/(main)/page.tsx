import { Faq } from "@/components/home/faq";
import { Features } from "@/components/home/features";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";

export default function HomePage() {
  return (
    <>
      <section className="border-b">
        <HeroSection />
      </section>
      <section className="py-16 border-b">
        <Features />
      </section>
      <section className="py-16 border-b">
        <HowItWorks />
      </section>
      <section className="py-16">
        <Faq />
      </section>
    </>
  );
}
