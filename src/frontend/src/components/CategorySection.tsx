import { motion } from "motion/react";
import { CATEGORIES } from "../data/mockData";

interface CategorySectionProps {
  onCategorySelect: (category: string) => void;
}

export default function CategorySection({
  onCategorySelect,
}: CategorySectionProps) {
  return (
    <section id="categories" className="py-20 bg-ivory">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-gold font-semibold">
            Our Collections
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-2 mb-3">
            Shop by Category
          </h2>
          <div className="w-16 h-0.5 mx-auto gradient-gold rounded-full" />
          <p className="text-taupe font-sans mt-4 max-w-md mx-auto text-sm leading-relaxed">
            Browse our curated collections — from bridal masterpieces to
            everyday elegance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <button
                type="button"
                data-ocid={`category.item.${i + 1}`}
                onClick={() => onCategorySelect(cat.id)}
                className="w-full group relative overflow-hidden rounded-2xl border border-gold/30 shadow-card card-hover cursor-pointer"
                style={{ height: "340px" }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-tr from-gold/0 via-gold/10 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 rounded-2xl border-2 border-gold/0 group-hover:border-gold/50 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                  <h3 className="font-serif text-white text-xl font-semibold mb-0.5">
                    {cat.name}
                  </h3>
                  <p className="text-white/70 font-sans text-xs uppercase tracking-wider">
                    {cat.subtitle}
                  </p>
                  <span className="inline-block mt-3 text-gold font-sans text-xs uppercase tracking-wider border border-gold/50 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    Browse Designs →
                  </span>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
