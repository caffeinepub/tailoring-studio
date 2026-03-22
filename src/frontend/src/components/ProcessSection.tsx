import { CheckCircle, Ruler, Scissors, Star } from "lucide-react";
import { motion } from "motion/react";

const STEPS = [
  {
    icon: Star,
    label: "Design",
    desc: "Choose from our curated designs or share your vision",
  },
  {
    icon: Ruler,
    label: "Measuring",
    desc: "Precise measurements for the perfect fit",
  },
  {
    icon: Scissors,
    label: "Tailoring",
    desc: "Handcrafted by our master tailors with care",
  },
  {
    icon: CheckCircle,
    label: "Fitting",
    desc: "Final fitting and adjustments until perfection",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 bg-charcoal">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-gold font-semibold">
            How It Works
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-white mt-2 mb-3">
            Our Bespoke Process
          </h2>
          <div className="w-16 h-0.5 mx-auto gradient-gold rounded-full" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="text-center group"
            >
              {/* Step number */}
              <div className="relative mb-5">
                <div
                  className="w-16 h-16 mx-auto rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold transition-colors duration-300"
                  style={{ background: "rgba(199,162,74,0.08)" }}
                >
                  <step.icon className="w-6 h-6 text-gold" />
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden md:block absolute top-8 left-full w-full h-px"
                    style={{
                      background:
                        "linear-gradient(to right, var(--gold-light), transparent)",
                    }}
                  />
                )}
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full gradient-gold flex items-center justify-center text-charcoal font-sans font-bold text-xs">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-serif text-white text-lg mb-1.5">
                {step.label}
              </h3>
              <p className="font-sans text-white/50 text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
