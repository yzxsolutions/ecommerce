'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreditCard, Tag, ArrowLeft } from 'lucide-react';
import { PaymentMethod, Coupon } from '../../types/checkout';
import { checkoutApi } from '../../lib/api/checkout';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Select } from '../ui/select';

interface PaymentStepProps {
  onComplete: (paymentMethod: PaymentMethod) => void;
  onBack: () => void;
  onCouponApplied: (coupon: Coupon | null) => void;
  appliedCoupon: Coupon | null;
  isLoading: boolean;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({
  onComplete,
  onBack,
  onCouponApplied,
  appliedCoupon,
  isLoading,
}) => {
  const [selectedPaymentType, setSelectedPaymentType] =
    useState<PaymentMethod['type']>('card');
  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentMethod>();

  const handlePaymentSubmit = (data: PaymentMethod) => {
    const paymentMethod: PaymentMethod = {
      ...data,
      type: selectedPaymentType,
    };
    onComplete(paymentMethod);
  };

  const handleCouponSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setCouponLoading(true);
    setCouponError('');

    try {
      const coupon = await checkoutApi.validateCoupon(couponCode.trim());
      onCouponApplied(coupon);
      setCouponCode('');
    } catch (error) {
      setCouponError(
        error instanceof Error ? error.message : 'Invalid coupon code'
      );
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    onCouponApplied(null);
  };

  const paymentTypes = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'paypal', name: 'PayPal', icon: CreditCard },
    { id: 'apple_pay', name: 'Apple Pay', icon: CreditCard },
    { id: 'google_pay', name: 'Google Pay', icon: CreditCard },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold text-gray-900">
          Payment Information
        </h2>
      </div>

      {/* Payment Method Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Payment Method
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {paymentTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card
                key={type.id}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedPaymentType === type.id
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() =>
                  setSelectedPaymentType(type.id as PaymentMethod['type'])
                }
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentType"
                    value={type.id}
                    checked={selectedPaymentType === type.id}
                    onChange={() =>
                      setSelectedPaymentType(type.id as PaymentMethod['type'])
                    }
                  />
                  <Icon className="h-5 w-5 text-gray-400" />
                  <span className="font-medium text-gray-900">{type.name}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Card Payment Form */}
      {selectedPaymentType === 'card' && (
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Card Information
          </h3>
          <form
            onSubmit={handleSubmit(handlePaymentSubmit)}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name *
              </label>
              <Input
                {...register('cardholderName', {
                  required: 'Cardholder name is required',
                })}
                error={errors.cardholderName?.message}
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number *
              </label>
              <Input
                {...register('cardNumber', {
                  required: 'Card number is required',
                  pattern: {
                    value: /^[0-9\s]{13,19}$/,
                    message: 'Please enter a valid card number',
                  },
                })}
                error={errors.cardNumber?.message}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Month *
                </label>
                <Select
                  {...register('expiryMonth', {
                    required: 'Month is required',
                  })}
                  error={errors.expiryMonth?.message}
                  placeholder="MM"
                  options={Array.from({ length: 12 }, (_, i) => ({
                    value: String(i + 1).padStart(2, '0'),
                    label: String(i + 1).padStart(2, '0'),
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year *
                </label>
                <Select
                  {...register('expiryYear', { required: 'Year is required' })}
                  error={errors.expiryYear?.message}
                  placeholder="YYYY"
                  options={Array.from({ length: 10 }, (_, i) => {
                    const year = new Date().getFullYear() + i;
                    return {
                      value: String(year),
                      label: String(year),
                    };
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV *
                </label>
                <Input
                  {...register('cvv', {
                    required: 'CVV is required',
                    pattern: {
                      value: /^[0-9]{3,4}$/,
                      message: 'Please enter a valid CVV',
                    },
                  })}
                  error={errors.cvv?.message}
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" size="lg" className="w-full">
                Continue to Review
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Other Payment Methods */}
      {selectedPaymentType !== 'card' && (
        <Card className="p-6">
          <div className="text-center py-8">
            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {
                paymentTypes.find((type) => type.id === selectedPaymentType)
                  ?.name
              }
            </h3>
            <p className="text-gray-600 mb-6">
              You will be redirected to complete your payment securely.
            </p>
            <Button
              onClick={() => onComplete({ type: selectedPaymentType })}
              size="lg"
              className="w-full"
            >
              Continue to Review
            </Button>
          </div>
        </Card>
      )}

      {/* Coupon Code Section */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Promo Code</h3>

        {appliedCoupon ? (
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-green-600" />
              <span className="font-medium text-green-800">
                {appliedCoupon.code}
              </span>
              <span className="text-sm text-green-600">
                - {appliedCoupon.description}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveCoupon}
              className="text-green-600 hover:text-green-700"
            >
              Remove
            </Button>
          </div>
        ) : (
          <form onSubmit={handleCouponSubmit} className="flex gap-3">
            <div className="flex-1">
              <Input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter promo code"
                error={couponError}
              />
            </div>
            <Button
              type="submit"
              variant="outline"
              disabled={!couponCode.trim() || couponLoading}
            >
              {couponLoading ? 'Applying...' : 'Apply'}
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
};
