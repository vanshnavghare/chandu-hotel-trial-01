import React, { useState } from 'react';
import { PageSection } from '../types';
import { HOTEL_INFO } from '../data/menuData';
import { 
  UtensilsCrossed, 
  ShoppingBag, 
  Phone, 
  CalendarDays, 
  Menu as MenuIcon, 
  X, 
  Flame,
  Clock
} from 'lucide-react';

interface NavbarProps {
  activeTab: PageSection;
  onNavigate: (tab: PageSection) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenBooking
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageSection; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'menu', label: 'Menu' },
    { id: 'order-booking', label: 'Booking' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tab: PageSection) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#1f1914]/95 backdrop-blur-md border-b border-amber-900/30 text-stone-100 shadow-lg">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 text-amber-50 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-between sm:justify-center gap-4">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-amber-200" />
          Dine-In: 11:00 AM – 1:00 AM
        </span>
        <a 
          href="tel:+918830772983" 
          className="hover:text-white transition-colors underline font-semibold hidden md:inline-flex items-center gap-1"
        >
          <Phone className="w-3 h-3" /> Call: +91 88307 72983
        </a>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <button 
            id="nav-logo-button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-md shadow-amber-900/40 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-[#1c140e] rounded-[10px] flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  CHANDU HOTEL
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                    isActive 
                      ? 'text-amber-400 bg-amber-950/40 shadow-inner' 
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-amber-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: Book Table & Cart */}
          <div className="flex items-center gap-3">
            {/* Table Booking CTA */}
            <button
              id="nav-book-table-btn"
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-amber-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-950/30 transition-all active:scale-95"
            >
              <CalendarDays className="w-4 h-4" />
              <span>Book a Table</span>
            </button>

            {/* Cart Button */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 px-3 sm:px-4 py-2.5 rounded-xl bg-stone-800/90 hover:bg-stone-700/90 border border-stone-700 text-stone-200 transition-all active:scale-95"
              aria-label="View food cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-stone-900 animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left text-xs leading-tight">
                <div className="text-[10px] text-stone-400 font-medium uppercase tracking-wider">Cart</div>
                <div className="font-bold text-amber-300">
                  ₹{cartTotal > 0 ? cartTotal : 0}
                </div>
              </div>
            </button>

            {/* Mobile menu toggle */}
            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-stone-800 text-stone-300 hover:text-white border border-stone-700 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden bg-[#18130f] border-b border-amber-900/40 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                    isActive 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold' 
                      : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-stone-800 flex flex-col gap-2.5">
            <button
              id="mobile-book-table-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-amber-950 bg-gradient-to-r from-amber-400 to-amber-500 shadow-md text-sm"
            >
              <CalendarDays className="w-4 h-4" />
              Book a Dine-in Table
            </button>

            <a
              href={`tel:${HOTEL_INFO.phone}`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-stone-200 bg-stone-800 border border-stone-700 text-sm"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              Direct Call: {HOTEL_INFO.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
