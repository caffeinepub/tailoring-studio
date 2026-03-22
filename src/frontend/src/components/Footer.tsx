import { Scissors } from "lucide-react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const host = typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-maroon text-white/80">
      <div className="container mx-auto px-6 max-w-7xl py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full gradient-gold flex items-center justify-center">
                <Scissors className="w-4 h-4 text-charcoal" />
              </div>
              <div>
                <div className="text-gold font-serif text-xl font-bold">
                  Mrs Sharma
                </div>
                <div className="text-gold/50 text-[10px] font-sans uppercase tracking-widest">
                  Tailoring Studio
                </div>
              </div>
            </div>
            <p className="font-sans text-white/60 text-sm leading-relaxed max-w-xs">
              Crafting exquisite Indian ethnic wear with passion and precision
              since 2012. Your dream outfit, our labour of love.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              >
                <SiWhatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-white text-base mb-4">
              Collections
            </h4>
            <ul className="space-y-2">
              {[
                "Blouse",
                "Lehenga",
                "Kurti",
                "Palazzo",
                "Saree",
                "Designer Gown",
              ].map((item) => (
                <li key={item}>
                  <span className="font-sans text-sm text-white/60 hover:text-gold cursor-pointer transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-serif text-white text-base mb-4">
              Studio Info
            </h4>
            <ul className="space-y-2">
              {[
                "Our Story",
                "FAQs",
                "Shipping & Delivery",
                "Privacy Policy",
                "Terms of Service",
              ].map((item) => (
                <li key={item}>
                  <span className="font-sans text-sm text-white/60 hover:text-gold cursor-pointer transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <p className="font-sans text-xs text-white/50 leading-relaxed">
                42, Textile Market,
                <br />
                Near Central Mall,
                <br />
                Mumbai – 400001
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-white/40">
            © {year} Mrs Sharma Tailoring Studio. All rights reserved.
          </p>
          <p className="font-sans text-xs text-white/40">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(host)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/60 hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
