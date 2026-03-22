import { Toaster } from "@/components/ui/sonner";
import { useCallback, useState } from "react";
import AdminPanel from "./components/AdminPanel";
import BookingModal from "./components/BookingModal";
import CategorySection from "./components/CategorySection";
import ContactSection from "./components/ContactSection";
import DesignsSection from "./components/DesignsSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import LoginModal from "./components/LoginModal";
import Navbar from "./components/Navbar";
import ProcessSection from "./components/ProcessSection";
import { MOCK_DESIGNS, MOCK_ORDERS } from "./data/mockData";
import type { Design, Order, User, ViewType } from "./types";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [designs, setDesigns] = useState<Design[]>(MOCK_DESIGNS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentView("designs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExploreAll = () => {
    setSelectedCategory(null);
    setCurrentView("designs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookNow = (design: Design) => {
    setSelectedDesign(design);
    setIsBookingOpen(true);
  };

  const handleOrderSubmit = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    if (currentView === "admin") setCurrentView("home");
  };

  const handleAddDesign = (d: Design) => {
    setDesigns((prev) => [d, ...prev]);
  };

  const handleDeleteDesign = (id: string) => {
    setDesigns((prev) => prev.filter((d) => d.id !== id));
  };

  const handleUpdateOrderStatus = (id: string, status: Order["status"]) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar
        currentView={currentView}
        currentUser={currentUser}
        onNavigate={setCurrentView}
        onLoginOpen={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
        onCategorySelect={handleCategorySelect}
        scrollToSection={scrollToSection}
      />

      {currentView === "home" && (
        <main>
          <HeroSection
            onExplore={handleExploreAll}
            scrollToSection={scrollToSection}
          />
          <CategorySection onCategorySelect={handleCategorySelect} />
          <ProcessSection />
          <ContactSection />
          <Footer />
        </main>
      )}

      {currentView === "designs" && (
        <main>
          <DesignsSection
            selectedCategory={selectedCategory}
            onBookNow={handleBookNow}
            onBack={() => setCurrentView("home")}
            currentUser={currentUser}
            onLoginOpen={() => setIsLoginOpen(true)}
          />
          <Footer />
        </main>
      )}

      {currentView === "admin" && currentUser?.isAdmin && (
        <main>
          <AdminPanel
            designs={designs}
            orders={orders}
            onAddDesign={handleAddDesign}
            onDeleteDesign={handleDeleteDesign}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onBack={() => setCurrentView("home")}
          />
          <Footer />
        </main>
      )}

      <BookingModal
        design={selectedDesign}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSubmit={handleOrderSubmit}
        currentUserName={currentUser?.name || ""}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />

      <Toaster richColors position="top-right" />
    </div>
  );
}
