// Checkout type definitions

export interface Address {
  id?: string;
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}

export interface PaymentMethod {
  id?: string;
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
  cardNumber?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvv?: string;
  cardholderName?: string;
  isDefault?: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed_amount' | 'free_shipping';
  value: number;
  description: string;
  minimumAmount?: number;
  expiresAt?: string;
}

export interface CheckoutState {
  step: 'shipping' | 'payment' | 'review';
  shippingAddress: Address | null;
  billingAddress: Address | null;
  useSameAddress: boolean;
  paymentMethod: PaymentMethod | null;
  appliedCoupon: Coupon | null;
  shippingMethod: ShippingMethod | null;
  isLoading: boolean;
  error: string | null;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

export interface OrderSummary {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
}

export interface CheckoutFormData {
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: PaymentMethod;
  shippingMethod: ShippingMethod;
  couponCode?: string;
}
