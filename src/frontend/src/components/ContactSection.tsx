import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";

export default function ContactSection() {
  const WHATSAPP_NUMBER = "919876543210";
  const PHONE_NUMBER = "+91 98765 43210";

  return (
    <section id="contact" className="py-20 bg-ivory-dark">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-gold font-semibold">
            Get in Touch
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-2 mb-3">
            Custom Orders & Enquiries
          </h2>
          <div className="w-16 h-0.5 mx-auto gradient-gold rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-3xl overflow-hidden border border-gold/20 shadow-card-hover"
        >
          <div className="grid md:grid-cols-2">
            {/* Left - Image */}
            <div className="relative h-64 md:h-auto overflow-hidden">
              <img
                src="/assets/generated/tailor-at-work.dim_700x500.jpg"
                alt="Master tailor at work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
              <div className="absolute bottom-6 left-6">
                <p className="font-serif text-white text-xl italic">
                  "Every stitch,
                  <br />a labour of love."
                </p>
              </div>
            </div>

            {/* Right - Contact Panel */}
            <div className="bg-card p-8 md:p-12 flex flex-col justify-center">
              <h3 className="font-serif text-2xl text-foreground mb-2">
                WhatsApp & Contact
              </h3>
              <p className="text-taupe font-sans text-sm leading-relaxed mb-8">
                Have a design in mind? Want to customize an outfit for your
                special day? Reach out to us directly — we're here to help craft
                your dream outfit.
              </p>

              <div className="flex flex-col gap-3 mb-8">
                <a
                  data-ocid="contact.whatsapp.button"
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Aalia%20Tailoring%20Studio%2C%20I%20would%20like%20to%20enquire%20about%20a%20custom%20order.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 rounded-full font-sans font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                  style={{ backgroundColor: "var(--whatsapp)" }}
                >
                  <MessageCircle className="w-5 h-5 flex-shrink-0" />
                  Chat on WhatsApp
                </a>
                <a
                  data-ocid="contact.call.button"
                  href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 px-6 py-3 rounded-full font-sans font-semibold text-charcoal border-2 border-gold hover:bg-gold/10 transition-colors"
                >
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  Call Us: {PHONE_NUMBER}
                </a>
                <a
                  data-ocid="contact.email.button"
                  href="mailto:studio@aalia.in"
                  className="flex items-center gap-3 px-6 py-3 rounded-full font-sans font-semibold text-foreground/70 border border-gold/30 hover:border-gold hover:text-foreground transition-colors"
                >
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  studio@aalia.in
                </a>
              </div>

              <div className="border-t border-gold/20 pt-6">
                <p className="text-taupe font-sans text-xs leading-relaxed">
                  <span className="text-gold font-semibold">Studio Hours:</span>{" "}
                  Mon – Sat, 10 AM – 7 PM
                  <br />
                  <span className="text-gold font-semibold">Address:</span> 42,
                  Textile Market, Near Central Mall, Mumbai – 400001
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
