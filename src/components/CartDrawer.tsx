import React from 'react';
import { CartItem } from '../types';
import { VegBadge } from './VegBadge';
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-900 text-white">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <div>
                <h2 className="font-serif text-lg font-bold text-white">Your Food Basket</h2>
                <p className="text-[11px] text-stone-400">
                  {items.length} {items.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-stone-400">
                <ShoppingBag className="w-16 h-16 text-stone-300" />
                <h3 className="font-serif text-lg font-bold text-stone-700">Your basket is empty</h3>
                <p className="text-xs text-stone-500 max-w-xs">
                  Browse our Tandoori Platters, Handi Dum Biryanis, and curries to add dishes!
                </p>
              </div>
            ) : (
              items.map((ci) => (
                <div 
                  key={ci.item.id}
                  className="flex items-center gap-3 p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 shadow-xs"
                >
                  <img
                    src={ci.item.image}
                    alt={ci.item.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <VegBadge isVeg={ci.item.isVeg} size="sm" />
                      <h4 className="text-xs font-bold text-stone-900 truncate">
                        {ci.item.name}
                      </h4>
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5">
                      ₹{ci.item.price} each
                    </div>
                  </div>

                  {/* Quantity Actions */}
                  <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-stone-200">
                    <button
                      onClick={() => onUpdateQuantity(ci.item.id, -1)}
                      className="w-6 h-6 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-stone-900 min-w-[18px] text-center">
                      {ci.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(ci.item.id, 1)}
                      className="w-6 h-6 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="text-right shrink-0 w-14">
                    <span className="font-bold text-xs text-stone-900">
                      ₹{ci.item.price * ci.quantity}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Bar */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-600 font-medium">Subtotal</span>
                <span className="font-serif text-lg font-bold text-stone-900">₹{subtotal}</span>
              </div>
              <p className="text-[11px] text-stone-500">
                Taxes and delivery fee will be computed at checkout.
              </p>

              <button
                id="cart-drawer-checkout-btn"
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Proceed to Order & Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
