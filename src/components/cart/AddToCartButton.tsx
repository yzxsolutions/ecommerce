'use client';

import React, { useState } from 'react';
import { ShoppingCart, Check, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useCart } from '../../hooks/cart/useCart';
import { Product, ProductVariant } from '../../types/product';

interface AddToCartButtonProps {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity?: number;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  selectedVariant,
  quantity = 1,
  disabled = false,
  size = 'md',
  variant = 'primary',
  className = '',
  showIcon = true,
  children,
}) => {
  const { addToCart, isLoading } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Check if product is out of stock
  const isOutOfStock = selectedVariant
    ? selectedVariant.stock <= 0
    : product.stock <= 0;

  const handleAddToCart = async () => {
    if (isOutOfStock || disabled) return;

    setIsAdding(true);
    try {
      await addToCart(product, quantity, selectedVariant);

      // Show success feedback
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const buttonText =
    children ||
    (isOutOfStock ? 'Out of Stock' : showSuccess ? 'Added!' : 'Add to Cart');

  const buttonIcon =
    showIcon &&
    (isAdding || isLoading ? (
      <Loader2 className="h-4 w-4 animate-spin" />
    ) : showSuccess ? (
      <Check className="h-4 w-4" />
    ) : (
      <ShoppingCart className="h-4 w-4" />
    ));

  return (
    <Button
      onClick={handleAddToCart}
      disabled={disabled || isOutOfStock || isAdding || isLoading}
      variant={isOutOfStock ? 'outline' : showSuccess ? 'secondary' : variant}
      size={size}
      className={`
        ${className}
        ${showSuccess ? 'bg-green-600 hover:bg-green-700 text-white' : ''}
        ${isOutOfStock ? 'cursor-not-allowed opacity-50' : ''}
      `}
    >
      {buttonIcon && <span className="mr-2">{buttonIcon}</span>}
      {buttonText}
    </Button>
  );
};
