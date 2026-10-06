import React, { useState, useEffect } from 'react';
import { PageSection, CartItem, MenuItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeSection } from './components/HomeSection';
import { AboutSection } from './components/AboutSection';
import { MenuSection } from './components/MenuSection';
import { OrderBookingSection } from './components/OrderBookingSection';
import { ContactSection } from './components/ContactSection';
import { CartDrawer } from './components/CartDrawer';
import { HOTEL_INFO } from './data/menuData';
import { 
  Home, 
  Utensils, 
  CalendarDays, 
  ShoppingBag, 
  Phone 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageSection>('home');
  const [bookingMode, setBookingMode] = useState<'booking' | 'order'>('booking');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart state persisted to localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('chandu_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('chandu_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore storage errors
    }
  }, [cartItems]);

  // Derived quantities map: itemId -> quantity
  const cartItemQuantities = React.useMemo(() => {
    const map: Record<string, number> = {};
    cartItems.forEach((ci) => {
      map[ci.item.id] = ci.quantity;
    });
    return map;
  }, [cartItems]);

  const cartCount = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);
  const cartTotal = cartItems.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);

  // Cart Actions
  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Open booking specifically
  const handleOpenBooking = () => {
    setBookingMode('booking');
    setActiveTab('order-booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open order checkout specifically
  const handleProceedToCheckout = () => {
    setBookingMode('order');
    setActiveTab('order-booking');
    setIsCartOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (tab: PageSection) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2] text-stone-800 font-sans selection:bg-amber-500 selection:text-white pb-16 lg:pb-0">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBooking={handleOpenBooking}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeSection
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {activeTab === 'about' && (
          <AboutSection onOpenBooking={handleOpenBooking} />
        )}

        {activeTab === 'menu' && (
          <MenuSection
            onAddToCart={handleAddToCart}
            onUpdateCartQuantity={handleUpdateQuantity}
            cartItemQuantities={cartItemQuantities}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {activeTab === 'order-booking' && (
          <OrderBookingSection
            initialMode={bookingMode}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onAddItem={handleAddToCart}
          />
        )}

        {activeTab === 'contact' && (
          <ContactSection />
        )}
      </main>

      {/* Site Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* MOBILE BOTTOM NAVIGATION BAR (Thumb-friendly per user request) */}
      <nav 
        id="mobile-bottom-nav"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-md border-t border-amber-950/80 px-2 py-2 flex items-center justify-around text-stone-400"
      >
        <button
          onClick={() => handleNavigate('home')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-semibold transition-colors ${
            activeTab === 'home' ? 'text-amber-400 font-bold' : 'hover:text-stone-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => handleNavigate('menu')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-semibold transition-colors ${
            activeTab === 'menu' ? 'text-amber-400 font-bold' : 'hover:text-stone-200'
          }`}
        >
          <Utensils className="w-5 h-5" />
          <span>Menu</span>
        </button>

        <button
          onClick={handleOpenBooking}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-semibold transition-colors ${
            activeTab === 'order-booking' && bookingMode === 'booking'
              ? 'text-amber-400 font-bold'
              : 'hover:text-stone-200'
          }`}
        >
          <CalendarDays className="w-5 h-5" />
          <span>Book</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-semibold hover:text-stone-200"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>

        <a
          href={`tel:${HOTEL_INFO.phone}`}
          className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-semibold text-emerald-400 hover:text-emerald-300"
        >
          <Phone className="w-5 h-5" />
          <span>Call</span>
        </a>
      </nav>

    </div>
  );
}
