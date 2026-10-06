import React from 'react';
import { PageSection } from '../types';
import { HOTEL_INFO } from '../data/menuData';
import { 
  UtensilsCrossed, 
  MapPin, 
  Phone, 
  Clock, 
  MessageSquare, 
  Instagram, 
  Facebook, 
  Youtube, 
  ArrowUpRight,
  Flame
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: PageSection) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer className="bg-[#15100c] text-stone-300 border-t border-amber-950/60 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Col 1: Brand & Tagline (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-[#1c140e] rounded-[10px] flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white tracking-wider">
                  CHANDU HOTEL
                </h3>
                <p className="text-[11px] text-amber-400 tracking-widest font-mono">
                 
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Home of authentic charcoal clay tandoori platters, 16-hour slow-simmered Dal Makhani, and fragrant earthen handi biryanis. Pure spices, zero compromise.
            </p>

            {/* Social Media Links */}
            <div className="pt-2 flex items-center gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-stone-300 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-stone-300 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-stone-300 flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href={`https://wa.me/${HOTEL_INFO.whatsappNumber}`} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-emerald-900/60 hover:bg-emerald-600 hover:text-white text-emerald-300 flex items-center justify-center transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-amber-300 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  Our Heritage & Story
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('menu')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  Veg & Non-Veg Menu
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('order-booking')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  Online Order & Delivery
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenBooking} 
                  className="text-amber-400 font-semibold hover:underline"
                >
                  Book a Dine-In Table
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Timings & Service (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-amber-300 uppercase tracking-wider">
              Operating Hours
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-stone-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold">11:00 AM – 1:00 AM</div>
                  <div className="text-[11px] text-amber-300/90 font-medium pt-0.5">{HOTEL_INFO.timings.days}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Location & Direct Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-amber-300 uppercase tracking-wider">
              Visit Us
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {HOTEL_INFO.address}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${HOTEL_INFO.phone}`} className="hover:text-white font-medium">
                  {HOTEL_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href={`https://wa.me/${HOTEL_INFO.whatsappNumber}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 text-emerald-400 font-semibold"
                >
                  WhatsApp: +{HOTEL_INFO.whatsappNumber}
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Reserve a Table</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
