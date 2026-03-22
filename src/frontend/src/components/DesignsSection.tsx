import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CATEGORIES, MOCK_DESIGNS } from "../data/mockData";
import type { Design } from "../types";

interface DesignsSectionProps {
  selectedCategory: string | null;
  onBookNow: (design: Design) => void;
  onBack: () => void;
  currentUser: { email: string; name: string; isAdmin: boolean } | null;
  onLoginOpen: () => void;
}

export default function DesignsSection({
  selectedCategory,
  onBookNow,
  onBack,
  currentUser,
  onLoginOpen,
}: DesignsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>(
    selectedCategory || "all",
  );

  const displayed =
    activeCategory === "all"
      ? MOCK_DESIGNS
      : MOCK_DESIGNS.filter((d) => d.category === activeCategory);

  const activeCatLabel =
    activeCategory === "all"
      ? "All Designs"
      : CATEGORIES.find((c) => c.id === activeCategory)?.name || activeCategory;

  const handleBook = (design: Design) => {
    if (!currentUser) {
      onLoginOpen();
    } else {
      onBookNow(design);
    }
  };

  return (
    <section id="designs" className="min-h-screen bg-ivory pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center gap-4 mb-8">
          <Button
            data-ocid="designs.back.button"
            variant="ghost"
            onClick={onBack}
            className="text-taupe hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <div>
            <h1 className="font-serif text-3xl text-foreground">
              {activeCatLabel}
            </h1>
            <p className="text-taupe font-sans text-sm">
              {displayed.length} designs available
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-8 flex-wrap">
          <SlidersHorizontal className="w-4 h-4 text-taupe" />
          <button
            type="button"
            data-ocid="designs.all.tab"
            onClick={() => setActiveCategory("all")}
            className={`font-sans text-sm px-4 py-1.5 rounded-full border transition-colors ${
              activeCategory === "all"
                ? "gradient-gold text-charcoal border-transparent font-semibold"
                : "border-gold/30 text-taupe hover:border-gold hover:text-foreground"
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat.id}
              data-ocid="designs.category.tab"
              onClick={() => setActiveCategory(cat.id)}
              className={`font-sans text-sm px-4 py-1.5 rounded-full border transition-colors ${
                activeCategory === cat.id
                  ? "gradient-gold text-charcoal border-transparent font-semibold"
                  : "border-gold/30 text-taupe hover:border-gold hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {displayed.map((design, i) => (
              <motion.div
                key={design.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                data-ocid={`designs.item.${i + 1}`}
                className="group relative bg-card rounded-2xl border border-gold/20 shadow-card card-hover overflow-hidden"
              >
                <div className="relative h-56 overflow-hidden">
                  {design.image ? (
                    <img
                      src={design.image}
                      alt={design.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{ background: design.gradient }}
                    />
                  )}
                  {design.badge && (
                    <Badge className="absolute top-3 left-3 gradient-gold text-charcoal border-none font-sans text-xs font-semibold">
                      {design.badge}
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute bottom-3 right-3 font-sans text-white/70 text-xs uppercase tracking-wider">
                    {design.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-foreground text-base font-semibold mb-1 leading-tight">
                    {design.name}
                  </h3>
                  <p className="text-taupe font-sans text-xs leading-relaxed mb-3 line-clamp-2">
                    {design.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-foreground text-lg font-bold">
                      ₹{design.price.toLocaleString()}
                    </span>
                    <Button
                      data-ocid={`designs.book.button.${i + 1}`}
                      onClick={() => handleBook(design)}
                      size="sm"
                      className="gradient-gold text-charcoal font-sans font-semibold text-xs px-4 rounded-full hover:opacity-90 transition-opacity shadow-gold"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {displayed.length === 0 && (
          <div data-ocid="designs.empty_state" className="text-center py-20">
            <p className="text-taupe font-sans">
              No designs found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
