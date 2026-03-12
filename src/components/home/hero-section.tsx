import { AnimatedUnderline } from "@/components/home/animated-underline";
import { StartExploringButton } from "@/components/home/start-exploring-button";

export function HeroSection() {
  return (
    <div className="absolute inset-0 z-10 min-h-screen w-full max-w-xl mx-auto flex flex-col items-center justify-center px-4">
      {/* Headline */}
      <div className="font-extrabold text-3xl sm:text-4xl tracking-normal text-center leading-snug">
        <p>
          Find your next <span className="text-brand">opportunity</span>
        </p>
        <p>or</p>
        <p>
          <span className="text-brand">Hire</span> top talent
        </p>
      </div>

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
