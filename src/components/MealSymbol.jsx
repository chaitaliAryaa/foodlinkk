import React from 'react';
import { Soup, Sandwich, Salad, Croissant, UtensilsCrossed, Drumstick } from 'lucide-react';

// Picks a representative icon + color for a meal based on its name/food type.
// Used everywhere in place of photo thumbnails, per the "symbols not images" design rule.
function pickMeal(name = '', foodType = '') {
  const n = name.toLowerCase();
  if (n.includes('bread') || n.includes('bagel') || n.includes('bakery')) {
    return { Icon: Croissant, tint: 'bg-amber-50 text-amber-600 border-amber-100' };
  }
  if (n.includes('sandwich') || n.includes('wrap')) {
    return { Icon: Sandwich, tint: 'bg-orange-50 text-orange-600 border-orange-100' };
  }
  if (n.includes('salad')) {
    return { Icon: Salad, tint: 'bg-emerald-50 text-emerald-600 border-emerald-100' };
  }
  if (n.includes('rice') || n.includes('lentil') || n.includes('curry') || n.includes('biryani')) {
    return { Icon: Soup, tint: 'bg-blue-50 text-blue-600 border-blue-100' };
  }
  if (foodType && foodType.toLowerCase().includes('non')) {
    return { Icon: Drumstick, tint: 'bg-rose-50 text-rose-600 border-rose-100' };
  }
  return { Icon: UtensilsCrossed, tint: 'bg-indigo-50 text-indigo-600 border-indigo-100' };
}

export default function MealSymbol({ name, foodType, size = 'md', className = '' }) {
  const { Icon, tint } = pickMeal(name, foodType);
  const sizes = {
    sm: 'w-10 h-10 rounded-xl',
    md: 'w-12 h-12 rounded-xl',
    lg: 'w-14 h-14 rounded-2xl',
  };
  const iconSizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' };

  return (
    <div className={`flex items-center justify-center border shrink-0 ${sizes[size]} ${tint} ${className}`}>
      <Icon className={iconSizes[size]} />
    </div>
  );
}
