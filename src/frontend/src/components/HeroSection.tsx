import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  onExplore: () => void;
  scrollToSection: (id: string) => void;
}

export default function HeroSection({
  onExplore,
  scrollToSection,
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-start overflow-hidden"
      style={{
        backgroundImage:
          "url('/assets/generated/hero-bridal.dim_1400x800.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      <div
        className="absolute top-0 left-0 w-1 h-full"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--gold), transparent)",
        }}
      />

      <div className="relative container mx-auto px-6 max-w-7xl">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-block text-gold font-sans text-xs uppercase tracking-[0.25em] mb-4 border border-gold/30 px-3 py-1 rounded-full">
              Handcrafted with Love
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-white text-4xl sm:text-5xl md:text-6xl leading-tight mb-5"
          >
            Crafted for You.
            <br />
            <span className="text-gold italic">Worn Forever.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-white/75 font-sans text-base md:text-lg leading-relaxed mb-8 max-w-md"
          >
            Discover exquisite bridal wear, ethnic designs, and bespoke
            tailoring. Each outfit crafted to tell your unique story.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button
              data-ocid="hero.explore.button"
              onClick={onExplore}
              className="gradient-gold text-charcoal font-sans font-semibold px-8 py-3 h-auto rounded-full hover:opacity-90 transition-opacity shadow-gold text-base"
            >
              Explore Designs
            </Button>
            <Button
              data-ocid="hero.contact.button"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="border-white/50 text-white hover:bg-white/10 hover:border-gold hover:text-gold font-sans px-8 py-3 h-auto rounded-full text-base bg-transparent"
            >
              Custom Order
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex gap-8 mt-12"
          >
            {[
              { val: "500+", label: "Happy Customers" },
              { val: "12+", label: "Years Experience" },
              { val: "6", label: "Collections" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-gold font-serif text-2xl font-bold">
                  {stat.val}
                </div>
                <div className="text-white/60 font-sans text-xs uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToSection("categories")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-gold flex flex-col items-center gap-1 transition-colors"
      >
        <span className="font-sans text-xs uppercase tracking-widest">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
}
