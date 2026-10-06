import React from 'react';

interface VegBadgeProps {
  isVeg: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const VegBadge: React.FC<VegBadgeProps> = ({ isVeg, size = 'md', showLabel = false }) => {
  const sizeClasses = {
    sm: 'w-3.5 h-3.5 p-0.5 border',
    md: 'w-4 h-4 p-0.5 border-[1.5px]',
    lg: 'w-5 h-5 p-1 border-2'
  };

  const dotClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5'
  };

  return (
    <div className="inline-flex items-center gap-1.5 font-medium">
      <div 
        id={isVeg ? 'badge-veg-indicator' : 'badge-nonveg-indicator'}
        className={`rounded-sm flex items-center justify-center ${sizeClasses[size]} ${
          isVeg 
            ? 'border-emerald-600 bg-emerald-50/50' 
            : 'border-red-600 bg-red-50/50'
        }`}
        title={isVeg ? '100% Pure Vegetarian' : 'Non-Vegetarian'}
      >
        <span 
          className={`rounded-full ${dotClasses[size]} ${
            isVeg ? 'bg-emerald-600' : 'bg-red-600'
          }`} 
        />
      </div>
      {showLabel && (
        <span className={`text-xs font-semibold uppercase tracking-wider ${isVeg ? 'text-emerald-700' : 'text-red-700'}`}>
          {isVeg ? 'Veg' : 'Non-Veg'}
        </span>
      )}
    </div>
  );
};
