import React from 'react';
import { HOTEL_INFO } from '../data/menuData';
import { 
  Flame, 
  ShieldCheck, 
  Sparkles, 
  HeartHandshake, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Navigation, 
  CheckCircle2, 
  ChefHat, 
  Calendar,
  MessageSquare
} from 'lucide-react';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5 text-amber-700" />
          Our Heritage & Passion
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          The Story of Chandu Hotel
        </h1>
        <p className="text-base sm:text-lg text-stone-600">
          Serving timeless recipes, genuine warmth, and unforgettable charcoal flavors since {HOTEL_INFO.foundedYear}.
        </p>
      </div>

      {/* 1. STORY / HISTORY */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              A Legacy Born on the Grand Trunk Highway
            </h2>

            <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
              In late 1998, <strong>{HOTEL_INFO.founder}</strong> had a modest yet resolute dream: to build an authentic culinary haven where travelers, local families, and truckers alike could savor honest, robust food cooked over real coals with pure spices, uncompromised by shortcuts.
            </p>

            <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
              Starting with just four wooden tables, a clay tandoor pit, and an iron handi, Chandu Hotel quickly became a whispered secret among highway commuters. The aroma of roasted coriander seeds, burning charcoal, and tender chicken cooked in earthen pots became a beacon for food lovers across Maharashtra.
            </p>

            <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
              Over the last 26 years, our seating has expanded to an air-conditioned family hall and a verdant open-air garden, but our founding promise remains untouched: <em>"Never serve a dish to a guest that you wouldn't proudly feed your own children at home."</em>
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-100">
              {HOTEL_INFO.stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="font-serif text-2xl font-bold text-amber-700">{stat.value}</div>
                  <div className="text-xs text-stone-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-stone-200 aspect-[4/3] sm:aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop" 
                alt="Chandu Hotel Dining Room"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-3 text-center text-xs text-stone-500 italic">
              Authentic clay tandoor and warm Indian hospitality since 1998.
            </div>
          </div>

        </div>
      </section>

      {/* 2. OUR FOUR MISSION PILLARS */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-amber-800 text-xs font-bold uppercase tracking-wider">
            What We Stand For
          </div>
          <h2 className="font-serif text-3xl font-bold text-stone-900">
            Our Four Core Pillars
          </h2>
          <p className="text-stone-600 text-sm">
            Every meal prepared at Chandu Hotel is anchored in our unshakeable commitment to quality, authenticity, cleanliness, and guest warmth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOTEL_INFO.missions.map((mission, index) => {
            const icons = {
              Flame: <Flame className="w-6 h-6 text-amber-600" />,
              ShieldCheck: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
              Sparkles: <Sparkles className="w-6 h-6 text-cyan-600" />,
              HeartHandshake: <HeartHandshake className="w-6 h-6 text-rose-600" />
            };

            return (
              <div 
                key={index} 
                id={`mission-card-${index}`}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center">
                  {icons[mission.icon as keyof typeof icons] || <CheckCircle2 className="w-6 h-6 text-amber-600" />}
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  {mission.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {mission.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. OWNER / CHEF MESSAGE */}
      <section className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 border border-amber-900/40 relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-amber-500/50 shadow-2xl mb-4 bg-stone-800">
              <img 
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600&auto=format&fit=crop" 
                alt="Chef Chandu Patil"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-serif text-xl font-bold text-amber-300">
              {HOTEL_INFO.headChef}
            </h3>
            <p className="text-xs text-stone-400 font-medium">
              Owner & Executive Master Chef
            </p>
            <span className="text-[11px] text-amber-500/80 mt-1 font-mono">
              Culinary Experience: 28+ Years
            </span>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-semibold">
              <ChefHat className="w-4 h-4 text-amber-400" />
              Words from the Kitchen
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
              "Cooking is not merely a business for us; it is our ancestral prayer and devotion."
            </h2>

            <div className="space-y-3 text-stone-300 text-sm sm:text-base leading-relaxed">
              <p>
                <em>"Namaskar and a heartfelt welcome. When my father started Chandu Hotel in 1998, he taught me three non-negotiable rules: never compromise on spice quality, never rush a slow braise, and treat every diner like Lord Krishna entering our home."</em>
              </p>
              <p>
                <em>"Even today, our kitchen grinds its own garam masala weekly. We source pure country butter and dairy paneer daily. When you bite into our smoky Tandoori Chicken or tender Mutton Rogan Josh, you are tasting the same authentic recipe we served 25 years ago. It brings me immense joy to welcome your family to our tables."</em>
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="font-serif text-xl italic font-bold text-amber-400">
                  — Chef Rajesh Chandu Patil
                </span>
              </div>
              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Join Us for Dinner
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. LOCATION, TIMINGS, CONTACT INFO & MAP */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-amber-800 text-xs font-bold uppercase tracking-wider">
            Visit & Connect
          </div>
          <h2 className="font-serif text-3xl font-bold text-stone-900">
            Location, Timings & Details
          </h2>
          <p className="text-stone-600 text-sm">
            Conveniently situated with dedicated parking and easy access from all major routes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Info Cards */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Address */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-stone-900 mb-1">
                  Physical Address
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {HOTEL_INFO.address}
                </p>
                <div className="mt-2 text-xs font-medium text-amber-800 bg-amber-50 px-2.5 py-1 rounded inline-block">
                  Landmark: Opposite Central Clock Tower, Free Valet & Bus Parking Available
                </div>
              </div>
            </div>

            {/* Timings */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-emerald-700" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-base font-bold text-stone-900 mb-2">
                  Operating Timings
                </h3>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between border-b border-stone-100 pb-1">
                    <span className="text-stone-600">Lunch Session:</span>
                    <span className="font-semibold text-stone-900">{HOTEL_INFO.timings.lunch}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-100 pb-1">
                    <span className="text-stone-600">Dinner Session:</span>
                    <span className="font-semibold text-stone-900">{HOTEL_INFO.timings.dinner}</span>
                  </div>
                  <div className="flex justify-between text-xs text-amber-800 pt-1">
                    <span>Days:</span>
                    <span className="font-bold">{HOTEL_INFO.timings.days}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contacts */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-stone-500 text-xs mb-1">
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  <span>Call Us (Primary)</span>
                </div>
                <a 
                  href={`tel:${HOTEL_INFO.phone}`} 
                  className="font-bold text-stone-900 hover:text-amber-600 text-sm transition-colors"
                >
                  {HOTEL_INFO.phone}
                </a>
              </div>

              <div>
                <div className="flex items-center gap-2 text-stone-500 text-xs mb-1">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Reservation</span>
                </div>
                <a 
                  href={`https://wa.me/${HOTEL_INFO.whatsappNumber}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-700 hover:underline text-sm"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

          </div>

          {/* Interactive Map Visual Representation */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Interactive Route & Map
                </h3>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-semibold">
                  Live Navigation
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Tap below for direct GPS directions or navigation assistance.
              </p>
            </div>

            {/* Styled Map Graphic Canvas */}
            <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-300">
              {/* Stylized Google Map Layout */}
              <div className="absolute inset-0 bg-[#e5e3df] flex items-center justify-center">
                {/* Street grid patterns */}
                <div className="absolute inset-0 opacity-40">
                  <div className="w-full h-1/2 border-b-8 border-amber-300/80 transform rotate-12" />
                  <div className="w-full h-1/3 border-b-6 border-white transform -rotate-6" />
                  <div className="h-full w-1/4 border-r-8 border-white ml-20" />
                  <div className="h-full w-1/3 border-r-6 border-amber-200 ml-48" />
                </div>

                {/* Marker */}
                <div className="relative z-10 flex flex-col items-center animate-bounce">
                  <div className="bg-stone-900 text-amber-400 px-3 py-1.5 rounded-xl shadow-xl border border-amber-500 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    Chandu Hotel (Main Landmark)
                  </div>
                  <div className="w-4 h-4 bg-amber-500 rotate-45 -mt-2 border-2 border-stone-900" />
                  <div className="w-8 h-2 bg-black/30 rounded-full blur-[2px] mt-1" />
                </div>

                {/* Nearby landmarks badges */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[11px] font-medium text-stone-700 shadow-sm">
                  Grand Trunk Corridor
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[11px] font-medium text-stone-700 shadow-sm">
                  Central Clock Tower (200m)
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 mt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(HOTEL_INFO.name + ' ' + HOTEL_INFO.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps / GPS</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Reserve Dine-In Table</span>
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
