'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../hooks/cart/useCart';
import {
  CheckoutState,
  Address,
  PaymentMethod,
  Coupon,
  ShippingMethod,
} from '../../types/checkout';
import { Container } from '../layout/container';
import { CheckoutSteps } from './CheckoutSteps';
import { ShippingStep } from './ShippingStep';
import { PaymentStep } from './PaymentStep';
import { ReviewStep } from './ReviewStep';
import { CartSummary } from '../cart/CartSummary';

export const CheckoutFlow: React.FC = () => {
  const router = useRouter();
  const { items, totalItems, totalPrice, isLoading: cartLoading } = useCart();

  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    step: 'shipping',
    shippingAddress: null,
    billingAddress: null,
    useSameAddress: true,
    paymentMethod: null,
    appliedCoupon: null,
    shippingMethod: null,
    isLoading: false,
    error: null,
  });

  const [orderTotals, setOrderTotals] = useState({
    subtotal: totalPrice,
    tax: 0,
    shipping: 0,
    discount: 0,
    total: totalPrice,
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (!cartLoading && items.length === 0) {
      router.push('/');
    }
  }, [items.length, cartLoading, router]);

  const updateCheckoutState = (updates: Partial<CheckoutState>) => {
    setCheckoutState((prev) => ({ ...prev, ...updates }));
  };

  const handleStepChange = (step: CheckoutState['step']) => {
    updateCheckoutState({ step });
  };

  const handleShippingComplete = (
    shippingAddress: Address,
    billingAddress: Address | null,
    useSameAddress: boolean,
    shippingMethod: ShippingMethod
  ) => {
    updateCheckoutState({
      shippingAddress,
      billingAddress: useSameAddress ? shippingAddress : billingAddress,
      useSameAddress,
      shippingMethod,
      step: 'payment',
    });

    // Update order totals with shipping cost
    setOrderTotals((prev) => ({
      ...prev,
      shipping: shippingMethod.price,
      total: prev.subtotal + prev.tax + shippingMethod.price - prev.discount,
    }));
  };

  const handlePaymentComplete = (paymentMethod: PaymentMethod) => {
    updateCheckoutState({
      paymentMethod,
      step: 'review',
    });
  };

  const handleCouponApplied = (coupon: Coupon | null) => {
    updateCheckoutState({ appliedCoupon: coupon });

    if (coupon) {
      const discount =
        coupon.type === 'percentage'
          ? (orderTotals.subtotal * coupon.value) / 100
          : coupon.value;

      setOrderTotals((prev) => ({
        ...prev,
        discount,
        total: prev.subtotal + prev.tax + prev.shipping - discount,
      }));
    } else {
      setOrderTotals((prev) => ({
        ...prev,
        discount: 0,
        total: prev.subtotal + prev.tax + prev.shipping,
      }));
    }
  };

  const renderCurrentStep = () => {
    switch (checkoutState.step) {
      case 'shipping':
        return (
          <ShippingStep
            onComplete={handleShippingComplete}
            isLoading={checkoutState.isLoading}
          />
        );
      case 'payment':
        return (
          <PaymentStep
            onComplete={handlePaymentComplete}
            onBack={() => handleStepChange('shipping')}
            onCouponApplied={handleCouponApplied}
            appliedCoupon={checkoutState.appliedCoupon}
            isLoading={checkoutState.isLoading}
          />
        );
      case 'review':
        return (
          <ReviewStep
            checkoutState={checkoutState}
            orderTotals={orderTotals}
            onBack={() => handleStepChange('payment')}
            onEdit={(step) => handleStepChange(step)}
            isLoading={checkoutState.isLoading}
          />
        );
      default:
        return null;
    }
  };

  if (cartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <Container className="py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {/* Progress Steps */}
        <CheckoutSteps currentStep={checkoutState.step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {checkoutState.error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">{checkoutState.error}</p>
              </div>
            )}

            {renderCurrentStep()}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <CartSummary
                totalItems={totalItems}
                totalPrice={orderTotals.total}
                subtotal={orderTotals.subtotal}
                tax={orderTotals.tax}
                shipping={orderTotals.shipping}
                discount={orderTotals.discount}
                showDetails={true}
              />

              {/* Cart Items Preview */}
              <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Items in your cart ({totalItems})
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        ${item.subtotal.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
