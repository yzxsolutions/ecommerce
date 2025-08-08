'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types/cart';
import { Button } from '../ui/button';
import { useCart } from '../../hooks/cart/useCart';

interface CartItemProps {
  item: CartItemType;
  showRemoveConfirmation?: boolean;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  showRemoveConfirmation = true,
}) => {
  const { updateCartItem, removeFromCart, isLoading } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;

    setIsUpdating(true);
    try {
      await updateCartItem(item.id, newQuantity);
    } catch (error) {
      console.error('Failed to update cart item:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    if (showRemoveConfirmation && !showConfirmation) {
      setShowConfirmation(true);
      return;
    }

    try {
      await removeFromCart(item.id);
    } catch (error) {
      console.error('Failed to remove cart item:', error);
    }
  };

  const primaryImage =
    item.product.images.find((img) => img.isPrimary) || item.product.images[0];

  return (
    <div className="flex items-start gap-4 py-4 border-b border-gray-200 last:border-b-0">
      {/* Product Image */}
      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt || item.product.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-xs">No image</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">
          {item.product.name}
        </h3>

        {/* Variant Information */}
        {item.selectedVariant && (
          <div className="mt-1">
            <p className="text-sm text-gray-600">
              {item.selectedVariant.name}:{' '}
              {item.selectedVariant.options.map((opt) => opt.value).join(', ')}
            </p>
            <p className="text-xs text-gray-500">
              SKU: {item.selectedVariant.sku}
            </p>
          </div>
        )}

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="font-semibold text-gray-900">
            ${item.price.toFixed(2)}
          </span>
          {item.selectedVariant &&
            item.selectedVariant.price !== item.product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${item.product.price.toFixed(2)}
              </span>
            )}
        </div>

        {/* Quantity Controls */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1 || isUpdating || isLoading}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <Minus className="h-4 w-4" />
            </Button>

            <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
              {item.quantity}
            </span>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isUpdating || isLoading}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Subtotal */}
          <span className="ml-auto font-semibold text-gray-900">
            ${item.subtotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Remove Button */}
      <div className="flex-shrink-0">
        {showConfirmation ? (
          <div className="flex flex-col gap-1">
            <Button
              variant="primary"
              size="sm"
              onClick={handleRemove}
              disabled={isLoading}
              className="text-xs px-2 py-1 bg-red-600 hover:bg-red-700 text-white"
            >
              Confirm
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowConfirmation(false)}
              className="text-xs px-2 py-1"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            disabled={isLoading}
            className="h-8 w-8 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
