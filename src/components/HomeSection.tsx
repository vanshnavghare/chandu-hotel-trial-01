import React from 'react';
import { PageSection, MenuItem } from '../types';
import { HOTEL_INFO, MENU_ITEMS, POPULAR_DISHES_IDS } from '../data/menuData';
import { VegBadge } from './VegBadge';
import { 
  CalendarDays, 
  ShoppingBag, 
  Flame, 
  Award, 
  Sparkles, 
  Clock, 
  MapPin, 
  Star, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  ChefHat
} from 'lucide-react';

interface HomeSectionProps {
  onNavigate: (tab: PageSection) => void;
  onAddToCart: (item: MenuItem) => void;
  onOpenBooking: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  onNavigate,
  onAddToCart,
  onOpenBooking,
}) => {
  const popularDishes = MENU_ITEMS.filter((item) => POPULAR_DISHES_IDS.includes(item.id));

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO BANNER */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden bg-stone-950 text-white">
        {/* Background Image with Dark Vignette Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop" 
            alt="Chandu Hotel Dining & Tandoor Ambiance"
            className="w-full h-full object-cover object-center scale-105 filter brightness-45 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/65 to-stone-950/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,10,6,0.7)_100%)]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
          
          {/* Heritage Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-sm shadow-sm">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Serving Pure Veg and Non-Veg Since 2005</span>
          </div>

          {/* Hotel Title & Tagline */}
          <div className="space-y-3">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-md">
              CHANDU HOTEL
            </h1>
            <p className="font-serif text-xl sm:text-2xl lg:text-3xl font-medium text-amber-400 max-w-3xl mx-auto drop-shadow">
              {HOTEL_INFO.tagline}
            </p>
          </div>

          {/* Subtext description */}
          <p className="font-sans text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Welcome to the home of authentic clay-oven tandoor platters, fragrant handi dum biryanis, and slow-simmered regional curries crafted with hand-pounded spices.
          </p>

          {/* Hero CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              id="hero-book-table-btn"
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-950/50 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2.5 text-base cursor-pointer"
            >
              <CalendarDays className="w-5 h-5 text-stone-950" />
              <span>Book a Table</span>
            </button>
          </div>

        </div>
      </section>

      {/* 2. HIGHLIGHT PHOTOS OF POPULAR DISHES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 text-amber-600" />
              Chef's Signatures & Crowd Favorites
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Popular Dishes at Chandu Hotel
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-1 max-w-xl">
              From our legendary mixed grill platters to slow-cooked Awadhi biryani, these are the signature plates our guests order time and again.
            </p>
          </div>

          <button
            id="home-view-full-menu-btn"
            onClick={() => onNavigate('menu')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-sm border border-amber-200 transition-colors self-start md:self-auto cursor-pointer"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 text-amber-700" />
          </button>
        </div>

        {/* Dish Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {popularDishes.map((dish) => (
            <div 
              key={dish.id} 
              id={`popular-dish-card-${dish.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              {/* Photo with Overlay Badges */}
              <div className="relative h-56 overflow-hidden bg-stone-100">
                <img 
                  src={dish.image} 
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                
                {/* Veg Badge & Rating */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg shadow flex items-center gap-2">
                  <VegBadge isVeg={dish.isVeg} size="sm" showLabel />
                </div>

                {dish.isBestseller && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Bestseller
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded font-medium">
                    {dish.serves || 'Generous Portion'}
                  </span>
                  <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded font-semibold text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    {dish.rating} ({dish.reviewCount})
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                      {dish.name}
                    </h3>
                  </div>
                  {dish.regionalName && (
                    <p className="text-xs font-medium text-amber-700 font-sans">
                      {dish.regionalName}
                    </p>
                  )}
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                {/* Price and Add button */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-400 block font-medium">Price</span>
                    <span className="font-serif text-xl font-extrabold text-stone-900">
                      ₹{dish.price}
                    </span>
                  </div>

                  <button
                    id={`add-popular-dish-${dish.id}`}
                    onClick={() => onAddToCart(dish)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Order</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SHORT INTRO ABOUT THE RESTAURANT */}
      <section className="bg-[#f5efe6] border-y border-amber-900/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Collage Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800&auto=format&fit=crop" 
                  alt="Chandu Hotel Kitchen & Dining"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>

              {/* Floating Chef Quote Card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-stone-900 text-white p-5 rounded-2xl shadow-xl max-w-xs border border-amber-500/40 z-20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/40">
                    <ChefHat className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-amber-300">{HOTEL_INFO.headChef}</h4>
                    <p className="text-[11px] text-stone-400">Executive Head Chef</p>
                  </div>
                </div>
                <p className="text-xs text-stone-300 italic">
                  "Real Indian taste cannot be hurried. We still roast whole spices every dawn and seal our dum pots in pure clay."
                </p>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-200/60 text-amber-900 text-xs font-bold uppercase tracking-wider">
                Our Story in a Nutshell
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
                From a Humble Clay Tandoor to the City's Favorite Dining Landmark
              </h2>

              <p className="text-stone-700 text-base leading-relaxed">
                Founded in 1998 by <strong>{HOTEL_INFO.founder}</strong>, Chandu Hotel started as a modest open-air eatery serving weary travelers authentic rustic rotis and smoky tandoori chicken. Word of our secret spice blend and uncompromising hygiene spread like wildfire.
              </p>

              <p className="text-stone-700 text-base leading-relaxed">
                Today, more than two decades later, Chandu Hotel continues to be family-owned and operated. We take pride in preserving ancestral cooking techniques: our black lentils still simmer for 16 hours overnight, and our biryanis are individually sealed in earthen handis.
              </p>

              {/* Highlights 3-column pill */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-white p-4 rounded-xl border border-amber-900/10 shadow-sm">
                  <div className="font-serif text-2xl font-bold text-amber-700">100%</div>
                  <div className="text-xs font-semibold text-stone-800 mt-0.5">Separate Veg Section</div>
                  <p className="text-[11px] text-stone-500 mt-1">Dedicated utensils & pure veg cooktops.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-amber-900/10 shadow-sm">
                  <div className="font-serif text-2xl font-bold text-amber-700">Authentic</div>
                  <div className="text-xs font-semibold text-stone-800 mt-0.5">Charcoal Clay Tandoor</div>
                  <p className="text-[11px] text-stone-500 mt-1">No gas replacements, real charcoal smoky aroma.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-amber-900/10 shadow-sm">
                  <div className="font-serif text-2xl font-bold text-amber-700">Daily Fresh</div>
                  <div className="text-xs font-semibold text-stone-800 mt-0.5">Meats & Farm Paneer</div>
                  <p className="text-[11px] text-stone-500 mt-1">Zero frozen stocks, procured fresh each morning.</p>
                </div>
              </div>

              {/* Learn More Button */}
              <div className="pt-2 flex items-center gap-4">
                <button
                  id="home-read-story-btn"
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm transition-all shadow-md cursor-pointer"
                >
                  <span>Read Our Full Story & Message</span>
                  <ChevronRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. SPECIALS BANNER / QUICK CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-[#22160d] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-amber-900/30">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-700/40 inline-block">
              Host Your Next Celebration
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
              Family Dinners, Birthdays & Group Gatherings
            </h3>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Reserve our Air-Conditioned Family Hall or Open Lawn Garden. Enjoy customized platter menus, prompt personalized service, and sweet memories.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                id="home-cta-reserve-btn"
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Reserve Your Table Now
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
