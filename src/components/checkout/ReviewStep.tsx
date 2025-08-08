'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Edit, CreditCard, MapPin, Truck } from 'lucide-react';
import { CheckoutState, OrderSummary } from '../../types/checkout';
import { checkoutApi } from '../../lib/api/checkout';
import { useCart } from '../../hooks/cart/useCart';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface ReviewStepProps {
  checkoutState: CheckoutState;
  orderTotals: OrderSummary;
  onBack: () => void;
  onEdit: (step: CheckoutState['step']) => void;
  isLoading: boolean;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  checkoutState,
  orderTotals,
  onBack,
  onEdit,
  isLoading,
}) => {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handlePlaceOrder = async () => {
    if (
      !checkoutState.shippingAddress ||
      !checkoutState.paymentMethod ||
      !checkoutState.shippingMethod
    ) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // First, tokenize payment if it's a card
      let paymentToken = '';
      if (checkoutState.paymentMethod.type === 'card') {
        const tokenResponse = await checkoutApi.tokenizePayment(
          checkoutState.paymentMethod
        );
        paymentToken = tokenResponse.token;
      }

      // Submit the checkout
      const checkoutData = {
        shippingAddress: checkoutState.shippingAddress,
        billingAddress:
          checkoutState.billingAddress || checkoutState.shippingAddress,
        paymentMethod: checkoutState.paymentMethod,
        shippingMethod: checkoutState.shippingMethod,
        couponCode: checkoutState.appliedCoupon?.code,
        paymentToken,
      };

      const orderResponse = await checkoutApi.submitCheckout(checkoutData);

      // Clear the cart after successful order
      await clearCart();

      // Redirect to order confirmation
      router.push(`/orders/${orderResponse.orderId}/confirmation`);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to place order'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCardNumber = (cardNumber?: string) => {
    if (!cardNumber) return '';
    return `**** **** **** ${cardNumber.slice(-4)}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold text-gray-900">
          Review Your Order
        </h2>
      </div>

      {submitError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{submitError}</p>
        </div>
      )}

      {/* Shipping Information */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900">
              Shipping Address
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit('shipping')}
            className="text-primary-600 hover:text-primary-700"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>

        {checkoutState.shippingAddress && (
          <div className="text-sm text-gray-600">
            <p className="font-medium text-gray-900">
              {checkoutState.shippingAddress.firstName}{' '}
              {checkoutState.shippingAddress.lastName}
            </p>
            <p>{checkoutState.shippingAddress.addressLine1}</p>
            {checkoutState.shippingAddress.addressLine2 && (
              <p>{checkoutState.shippingAddress.addressLine2}</p>
            )}
            <p>
              {checkoutState.shippingAddress.city},{' '}
              {checkoutState.shippingAddress.state}{' '}
              {checkoutState.shippingAddress.postalCode}
            </p>
            <p>{checkoutState.shippingAddress.country}</p>
            {checkoutState.shippingAddress.phone && (
              <p className="mt-1">
                Phone: {checkoutState.shippingAddress.phone}
              </p>
            )}
          </div>
        )}
      </Card>

      {/* Shipping Method */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900">
              Shipping Method
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit('shipping')}
            className="text-primary-600 hover:text-primary-700"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>

        {checkoutState.shippingMethod && (
          <div className="text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">
                {checkoutState.shippingMethod.name}
              </span>
              <span className="font-medium text-gray-900">
                ${checkoutState.shippingMethod.price.toFixed(2)}
              </span>
            </div>
            <p>{checkoutState.shippingMethod.description}</p>
            <p className="text-gray-500">
              Estimated delivery: {checkoutState.shippingMethod.estimatedDays}
            </p>
          </div>
        )}
      </Card>

      {/* Payment Information */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900">
              Payment Method
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit('payment')}
            className="text-primary-600 hover:text-primary-700"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>

        {checkoutState.paymentMethod && (
          <div className="text-sm text-gray-600">
            {checkoutState.paymentMethod.type === 'card' ? (
              <div>
                <p className="font-medium text-gray-900">
                  {checkoutState.paymentMethod.cardholderName}
                </p>
                <p>
                  {formatCardNumber(checkoutState.paymentMethod.cardNumber)}
                </p>
                <p>
                  Expires {checkoutState.paymentMethod.expiryMonth}/
                  {checkoutState.paymentMethod.expiryYear}
                </p>
              </div>
            ) : (
              <p className="font-medium text-gray-900 capitalize">
                {checkoutState.paymentMethod.type.replace('_', ' ')}
              </p>
            )}
          </div>
        )}
      </Card>

      {/* Order Items */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Order Items ({items.length})
        </h3>
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 py-3 border-b border-gray-200 last:border-b-0"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">
                  {item.product.name}
                </h4>
                {item.selectedVariant && (
                  <p className="text-sm text-gray-600">
                    {item.selectedVariant.name}:{' '}
                    {item.selectedVariant.options
                      .map((opt) => opt.value)
                      .join(', ')}
                  </p>
                )}
                <p className="text-sm text-gray-600">
                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  ${item.subtotal.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Order Summary */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Order Summary
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">
              ${orderTotals.subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="text-gray-900">
              ${orderTotals.shipping.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-900">${orderTotals.tax.toFixed(2)}</span>
          </div>
          {orderTotals.discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Discount{' '}
                {checkoutState.appliedCoupon &&
                  `(${checkoutState.appliedCoupon.code})`}
              </span>
              <span className="text-green-600">
                -${orderTotals.discount.toFixed(2)}
              </span>
            </div>
          )}
          <hr className="border-gray-200 my-2" />
          <div className="flex justify-between text-lg font-semibold">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">
              ${orderTotals.total.toFixed(2)}
            </span>
          </div>
        </div>
      </Card>

      {/* Place Order Button */}
      <div className="flex justify-end pt-6">
        <Button
          onClick={handlePlaceOrder}
          disabled={isSubmitting || isLoading}
          size="lg"
          className="min-w-[200px]"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Placing Order...</span>
            </div>
          ) : (
            `Place Order - $${orderTotals.total.toFixed(2)}`
          )}
        </Button>
      </div>
    </div>
  );
};
