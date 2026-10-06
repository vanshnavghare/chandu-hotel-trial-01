import React, { useState, useMemo } from 'react';
import { FoodCategory, SubCategory, MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { VegBadge } from './VegBadge';
import { 
  Search, 
  Flame, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Sparkles, 
  Star, 
  Clock, 
  Filter,
  Check
} from 'lucide-react';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
  onUpdateCartQuantity: (itemId: string, delta: number) => void;
  cartItemQuantities: Record<string, number>;
  onOpenCart: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  onUpdateCartQuantity,
  cartItemQuantities,
  onOpenCart,
}) => {
  // Main Category Tab: 'tandoori' | 'non-veg' | 'veg'
  const [activeCategory, setActiveCategory] = useState<FoodCategory>('tandoori');
  // Sub-category filter: 'all' | 'starters' | 'curries' | 'rice-biryani' | 'breads' | 'desserts' | 'platters'
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory>('all');
  // Search query
  const [searchQuery, setSearchQuery] = useState('');
  // Spice filter
  const [selectedSpice, setSelectedSpice] = useState<number | 'all'>('all');

  // Subcategory options based on active category
  const subCategories: { id: SubCategory; label: string }[] = useMemo(() => {
    if (activeCategory === 'tandoori') {
      return [
        { id: 'all', label: 'All Tandoori' },
        { id: 'platters', label: 'Platters & Kebabs' },
        { id: 'breads', label: 'Tandoori Rotis & Naan' }
      ];
    }
    if (activeCategory === 'non-veg') {
      return [
        { id: 'all', label: 'All Non-Veg' },
        { id: 'starters', label: 'Fish & Starters' },
        { id: 'curries', label: 'Chicken & Mutton Curries' },
        { id: 'rice-biryani', label: 'Dum Biryanis' }
      ];
    }
    // veg
    return [
      { id: 'all', label: 'All Veg' },
      { id: 'starters', label: 'Starters' },
      { id: 'curries', label: 'Shahi Curries' },
      { id: 'rice-biryani', label: 'Rice & Biryani' },
      { id: 'breads', label: 'Tandoori Breads' },
      { id: 'desserts', label: 'Royal Desserts' }
    ];
  }, [activeCategory]);

  // Filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // 1. Category match
      if (item.category !== activeCategory) {
        return false;
      }
      // 2. Subcategory match
      if (activeSubCategory !== 'all' && item.subCategory !== activeSubCategory) {
        return false;
      }
      // 3. Spice filter
      if (selectedSpice !== 'all' && item.spicyLevel !== selectedSpice) {
        return false;
      }
      // 4. Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesRegional = item.regionalName?.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesRegional;
      }
      return true;
    });
  }, [activeCategory, activeSubCategory, selectedSpice, searchQuery]);

  const categoryTitles = {
    tandoori: {
      title: 'Tandoori Platters & Kebabs',
      subtitle: 'Charcoal-roasted clay tandoor delicacies, signature mixed platters & artisanal breads.'
    },
    'non-veg': {
      title: 'Non-Vegetarian Menu',
      subtitle: 'Old Delhi butter chicken, handi dum biryanis, fiery mutton rogan josh & coastal fish fry.'
    },
    veg: {
      title: 'Pure Vegetarian Menu',
      subtitle: 'Shahi paneer butter masala, slow-cooked 16-hr dal makhani, fragrant pulao & desserts.'
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5 text-amber-700" />
          Prepared Fresh to Order
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          Explore Our Royal Menu
        </h1>
        <p className="text-stone-600 text-sm sm:text-base">
          All recipes are cooked in pure spices, authentic clay tandoors, and desi ghee with separate pure vegetarian preparation lines.
        </p>
      </div>

      {/* 3 PRIMARY CATEGORY TABS */}
      <div className="bg-stone-200/70 p-1.5 rounded-2xl max-w-2xl mx-auto flex flex-col sm:flex-row gap-1 shadow-inner">
        
        {/* Tandoori Platters */}
        <button
          id="menu-tab-tandoori"
          onClick={() => {
            setActiveCategory('tandoori');
            setActiveSubCategory('all');
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeCategory === 'tandoori'
              ? 'bg-stone-900 text-amber-300 shadow-md scale-[1.02]'
              : 'text-stone-700 hover:text-stone-950 hover:bg-stone-300/60'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-500" />
          <span>Tandoori Platters</span>
        </button>

        {/* Non-Veg Menu */}
        <button
          id="menu-tab-nonveg"
          onClick={() => {
            setActiveCategory('non-veg');
            setActiveSubCategory('all');
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeCategory === 'non-veg'
              ? 'bg-stone-900 text-red-300 shadow-md scale-[1.02]'
              : 'text-stone-700 hover:text-stone-950 hover:bg-stone-300/60'
          }`}
        >
          <div className="w-3 h-3 border border-red-500 flex items-center justify-center rounded-xs">
            <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
          </div>
          <span>Non-Veg Menu</span>
        </button>

        {/* Veg Menu */}
        <button
          id="menu-tab-veg"
          onClick={() => {
            setActiveCategory('veg');
            setActiveSubCategory('all');
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeCategory === 'veg'
              ? 'bg-stone-900 text-emerald-300 shadow-md scale-[1.02]'
              : 'text-stone-700 hover:text-stone-950 hover:bg-stone-300/60'
          }`}
        >
          <div className="w-3 h-3 border border-emerald-500 flex items-center justify-center rounded-xs">
            <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
          </div>
          <span>Pure Veg Menu</span>
        </button>

      </div>

      {/* Sub-Filters and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm space-y-4">
        
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Sub-category chips */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {subCategories.map((sub) => {
              const isSelected = activeSubCategory === sub.id;
              return (
                <button
                  key={sub.id}
                  id={`subcat-btn-${sub.id}`}
                  onClick={() => setActiveSubCategory(sub.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {sub.label}
                </button>
              );
            })}
          </div>

          {/* Search Input & Spice Level */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Box */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="menu-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dish, biryani, paneer..."
                className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-stone-400 hover:text-stone-700 absolute right-3 top-1/2 -translate-y-1/2"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Spice Filter Dropdown */}
            <select
              id="menu-spice-filter"
              value={selectedSpice}
              onChange={(e) => setSelectedSpice(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              aria-label="Filter by spice level"
              className="py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Spice Levels</option>
              <option value="1">Mild (Rich & Creamy)</option>
              <option value="2">Medium (Traditional)</option>
              <option value="3">Spicy (Fiery Kolhapuri)</option>
            </select>
          </div>

        </div>

        {/* Current Category Banner Info */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <div>
            <strong className="text-stone-800">{categoryTitles[activeCategory].title}</strong>: {categoryTitles[activeCategory].subtitle}
          </div>
          <span className="font-semibold text-amber-800">
            {filteredItems.length} items available
          </span>
        </div>

      </div>

      {/* DISHES LIST / GRID */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
          <Filter className="w-8 h-8 text-stone-300 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-stone-800">No dishes match your filter</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try resetting your search query or selecting "All" to view delicious options.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveSubCategory('all');
              setSelectedSpice('all');
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const quantity = cartItemQuantities[item.id] || 0;

            return (
              <div 
                key={item.id} 
                id={`menu-item-card-${item.id}`}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                {/* Image & Badges */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-stone-100">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm">
                      <VegBadge isVeg={item.isVeg} size="sm" showLabel />
                    </div>
                    {item.isChefSpecial && (
                      <span className="bg-amber-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
                        Chef's Special
                      </span>
                    )}
                  </div>

                  {item.isBestseller && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-lg shadow flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      Popular
                    </div>
                  )}

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-medium text-amber-300">
                      <Star className="w-3 h-3 fill-amber-300" />
                      {item.rating} ({item.reviewCount})
                    </span>
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-medium text-stone-200">
                      <Clock className="w-3 h-3" />
                      {item.prepTime}
                    </span>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                        {item.name}
                      </h3>
                    </div>
                    {item.regionalName && (
                      <div className="text-xs text-amber-700 font-semibold">
                        {item.regionalName}
                      </div>
                    )}
                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Serves info and spice indicator */}
                  <div className="pt-2 flex items-center justify-between text-[11px] text-stone-500 border-t border-stone-100">
                    <span>{item.serves || 'Standard Portion'}</span>
                    <span className="flex items-center gap-1">
                      <span className="font-medium">Spice:</span>
                      <span className="flex text-amber-600">
                        {Array.from({ length: item.spicyLevel }).map((_, i) => (
                          <Flame key={i} className="w-3 h-3 fill-amber-500 text-amber-600" />
                        ))}
                      </span>
                    </span>
                  </div>

                  {/* Price & Cart Actions */}
                  <div className="pt-2 flex items-center justify-between">
                    <div>
                      <span className="font-serif text-xl font-black text-stone-900">
                        ₹{item.price}
                      </span>
                    </div>

                    {quantity > 0 ? (
                      <div className="inline-flex items-center bg-stone-900 text-white rounded-xl p-1 gap-2 shadow-sm">
                        <button
                          id={`decrement-${item.id}`}
                          onClick={() => onUpdateCartQuantity(item.id, -1)}
                          className="w-7 h-7 rounded-lg bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-amber-400 font-bold transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-bold text-xs sm:text-sm px-1 min-w-[18px] text-center text-amber-300">
                          {quantity}
                        </span>
                        <button
                          id={`increment-${item.id}`}
                          onClick={() => onUpdateCartQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-lg bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-amber-400 font-bold transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        id={`add-to-cart-${item.id}`}
                        onClick={() => onAddToCart(item)}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Bottom Cart Bar (if items exist in cart) */}
      {Object.values(cartItemQuantities).some((qty) => qty > 0) && (
        <div className="sticky bottom-4 z-30 max-w-xl mx-auto px-4">
          <div className="bg-stone-900 text-white rounded-2xl p-4 shadow-2xl border border-amber-500/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-stone-400">Items in your meal</div>
                <div className="text-sm font-bold text-amber-300">
                  {Object.values(cartItemQuantities).reduce((a, b) => a + b, 0)} Items Selected
                </div>
              </div>
            </div>

            <button
              id="menu-view-cart-btn"
              onClick={onOpenCart}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>View Order Cart</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
