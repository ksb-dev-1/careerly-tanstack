import { AnimatedUnderline } from "@/components/home/animated-underline";
import { StartExploringButton } from "@/components/home/start-exploring-button";

export function HeroSection() {
  return (
    <div className="min-h-screen w-full max-w-4xl mx-auto flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Headline */}
      <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-center leading-snug">
        Your Next <span className="text-brand">Opportunity</span> or Your Next{" "}
        <span className="text-brand">Hire</span> Starts Here
      </h1>

      {/* Description */}
      <p className="mt-6 md:mt-8 text-center text-base md:text-lg text-slate-600 dark:text-slate-300">
        Find the perfect job or the right talent effortlessly, with intelligent
        filtering, instant search results, and a modern, intuitive interface
        designed for your success.
      </p>

      {/* Animated underline */}
      <AnimatedUnderline />

      {/* CTA Section */}
      <div className="mt-8">
        <StartExploringButton />
      </div>
    </div>
  );
}
