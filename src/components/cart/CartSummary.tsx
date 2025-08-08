'use client';

import React from 'react';

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
  showDetails?: boolean;
  subtotal?: number;
  tax?: number;
  shipping?: number;
  discount?: number;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  totalItems,
  totalPrice,
  showDetails = true,
  subtotal,
  tax = 0,
  shipping = 0,
  discount = 0,
}) => {
  const displaySubtotal = subtotal || totalPrice;
  const finalTotal = displaySubtotal + tax + shipping - discount;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Order Summary
      </h3>

      <div className="space-y-2">
        {/* Items count */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Items ({totalItems})</span>
          <span className="text-gray-900">${displaySubtotal.toFixed(2)}</span>
        </div>

        {showDetails && (
          <>
            {/* Tax */}
            {tax > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">${tax.toFixed(2)}</span>
              </div>
            )}

            {/* Shipping */}
            {shipping > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">${shipping.toFixed(2)}</span>
              </div>
            )}

            {/* Discount */}
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Discount</span>
                <span className="text-green-600">-${discount.toFixed(2)}</span>
              </div>
            )}

            {/* Divider */}
            {(tax > 0 || shipping > 0 || discount > 0) && (
              <hr className="border-gray-200 my-2" />
            )}
          </>
        )}

        {/* Total */}
        <div className="flex justify-between text-lg font-semibold">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900">
            ${(showDetails ? finalTotal : totalPrice).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Savings indicator */}
      {discount > 0 && (
        <div className="mt-3 p-2 bg-green-50 rounded-md">
          <p className="text-sm text-green-800">
            You saved ${discount.toFixed(2)} on this order!
          </p>
        </div>
      )}
    </div>
  );
};
