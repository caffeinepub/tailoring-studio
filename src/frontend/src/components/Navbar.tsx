import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, Scissors, Search, User, X } from "lucide-react";
import { useState } from "react";
import type { User as UserType, ViewType } from "../types";

interface NavbarProps {
  currentView: ViewType;
  currentUser: UserType | null;
  onNavigate: (view: ViewType) => void;
  onLoginOpen: () => void;
  onLogout: () => void;
  onCategorySelect: (category: string) => void;
  scrollToSection: (id: string) => void;
}

const NAV_CATEGORIES = [
  "blouse",
  "lehenga",
  "kurti",
  "palazzo",
  "saree",
  "gown",
];
const NAV_CATEGORY_LABELS: Record<string, string> = {
  blouse: "Blouse",
  lehenga: "Lehenga",
  kurti: "Kurti",
  palazzo: "Palazzo",
  saree: "Saree",
  gown: "Designer Gown",
};

export default function Navbar({
  currentView,
  currentUser,
  onNavigate,
  onLoginOpen,
  onLogout,
  onCategorySelect,
  scrollToSection,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCatOpen, setIsCatOpen] = useState(false);

  const handleCategoryClick = (cat: string) => {
    onCategorySelect(cat);
    setIsCatOpen(false);
    setIsMenuOpen(false);
  };

  const handleNavClick = (section: string) => {
    if (currentView !== "home") onNavigate("home");
    setTimeout(() => scrollToSection(section), 100);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-charcoal border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            type="button"
            data-ocid="nav.link"
            onClick={() => {
              onNavigate("home");
              setIsMenuOpen(false);
            }}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-full gradient-gold flex items-center justify-center flex-shrink-0">
              <Scissors className="w-4 h-4 text-charcoal" />
            </div>
            <div className="text-left">
              <div className="text-gold font-serif text-xl font-bold leading-tight tracking-wide">
                Mrs Sharma
              </div>
              <div className="text-gold/60 text-[10px] font-sans uppercase tracking-widest">
                Tailoring Studio
              </div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            <button
              type="button"
              data-ocid="nav.home.link"
              onClick={() => handleNavClick("hero")}
              className="text-white/80 hover:text-gold text-sm font-sans px-3 py-2 rounded transition-colors"
            >
              Home
            </button>
            <div
              className="relative"
              onMouseEnter={() => setIsCatOpen(true)}
              onMouseLeave={() => setIsCatOpen(false)}
            >
              <button
                type="button"
                data-ocid="nav.categories.link"
                className="flex items-center gap-1 text-white/80 hover:text-gold text-sm font-sans px-3 py-2 rounded transition-colors"
              >
                Categories <ChevronDown className="w-3 h-3" />
              </button>
              {isCatOpen && (
                <div className="absolute top-full left-0 bg-charcoal border border-gold/20 rounded-lg shadow-xl py-2 min-w-[160px]">
                  {NAV_CATEGORIES.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      data-ocid="nav.category.link"
                      onClick={() => handleCategoryClick(cat)}
                      className="w-full text-left px-4 py-2 text-white/80 hover:text-gold hover:bg-white/5 text-sm transition-colors"
                    >
                      {NAV_CATEGORY_LABELS[cat]}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              data-ocid="nav.gallery.link"
              onClick={() => handleNavClick("categories")}
              className="text-white/80 hover:text-gold text-sm font-sans px-3 py-2 rounded transition-colors"
            >
              Gallery
            </button>
            <button
              type="button"
              data-ocid="nav.contact.link"
              onClick={() => handleNavClick("contact")}
              className="text-white/80 hover:text-gold text-sm font-sans px-3 py-2 rounded transition-colors"
            >
              Contact
            </button>
            {currentUser?.isAdmin && (
              <button
                type="button"
                data-ocid="nav.admin.link"
                onClick={() => onNavigate("admin")}
                className="text-gold hover:text-gold/80 text-sm font-sans px-3 py-2 rounded transition-colors"
              >
                Admin
              </button>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              className="text-white/60 hover:text-gold p-2 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="text-white/70 text-sm font-sans">
                  {currentUser.name}
                </span>
                <Button
                  data-ocid="nav.logout.button"
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="text-white/70 hover:text-white text-sm"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <button
                type="button"
                data-ocid="nav.login.button"
                onClick={onLoginOpen}
                className="flex items-center gap-1 text-white/80 hover:text-gold text-sm font-sans px-3 py-2 transition-colors"
              >
                <User className="w-4 h-4" /> Login
              </button>
            )}
            <Button
              data-ocid="nav.book.button"
              onClick={() => handleNavClick("contact")}
              className="gradient-gold text-charcoal font-sans font-semibold text-sm px-5 py-2 rounded-full hover:opacity-90 transition-opacity shadow-gold"
            >
              Book Now
            </Button>
          </div>

          <button
            type="button"
            data-ocid="nav.menu.toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white/80 p-2"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-4 flex flex-col gap-1">
            <button
              type="button"
              onClick={() => handleNavClick("hero")}
              className="text-left text-white/80 hover:text-gold px-2 py-2 text-sm"
            >
              Home
            </button>
            <div className="px-2 py-1">
              <span className="text-white/50 text-xs uppercase tracking-widest">
                Categories
              </span>
              {NAV_CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  data-ocid="nav.mobile.category.link"
                  onClick={() => handleCategoryClick(cat)}
                  className="block w-full text-left text-white/80 hover:text-gold py-1.5 pl-3 text-sm"
                >
                  {NAV_CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleNavClick("contact")}
              className="text-left text-white/80 hover:text-gold px-2 py-2 text-sm"
            >
              Contact
            </button>
            {currentUser?.isAdmin && (
              <button
                type="button"
                onClick={() => {
                  onNavigate("admin");
                  setIsMenuOpen(false);
                }}
                className="text-left text-gold px-2 py-2 text-sm"
              >
                Admin Panel
              </button>
            )}
            <div className="flex items-center gap-2 pt-2 px-2">
              {currentUser ? (
                <button
                  type="button"
                  onClick={onLogout}
                  className="text-white/70 text-sm"
                >
                  Logout ({currentUser.name})
                </button>
              ) : (
                <button
                  type="button"
                  data-ocid="nav.mobile.login.button"
                  onClick={() => {
                    onLoginOpen();
                    setIsMenuOpen(false);
                  }}
                  className="text-white/80 text-sm"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
