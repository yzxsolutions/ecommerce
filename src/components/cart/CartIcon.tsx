'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/cart/useCart';

interface CartIconProps {
  onClick?: () => void;
  className?: string;
  showCount?: boolean;
}

export const CartIcon: React.FC<CartIconProps> = ({
  onClick,
  className = '',
  showCount = true,
}) => {
  const { totalItems } = useCart();

  return (
    <button
      onClick={onClick}
      className={`relative p-2 text-gray-600 hover:text-gray-900 transition-colors ${className}`}
      aria-label={`Shopping cart with ${totalItems} items`}
    >
      <ShoppingCart className="h-6 w-6" />

      {showCount && totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[1.25rem]">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  );
};
