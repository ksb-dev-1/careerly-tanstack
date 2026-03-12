import { Metadata } from "next";

import { Faq } from "@/components/home/faq";
import { Features } from "@/components/home/features";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";

export const metadata: Metadata = {
  title: "Home - Careerly",
  description: "A go to platform for job seekers and employers",
};

export default function HomePage() {
  return (
    <>
      <section className="border-b px-4">
        <HeroSection />
      </section>
      <section className="py-16 border-b px-4">
        <Features />
      </section>
      <section className="py-16 border-b px-4">
        <HowItWorks />
      </section>
      <section className="py-16 px-4">
        <Faq />
      </section>
    </>
  );
}
