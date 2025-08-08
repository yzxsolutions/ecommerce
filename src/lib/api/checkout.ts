// Checkout API functions
import {
  Address,
  PaymentMethod,
  Coupon,
  ShippingMethod,
  CheckoutFormData,
} from '../../types/checkout';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export const checkoutApi = {
  // Get user addresses
  getAddresses: async (): Promise<Address[]> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/addresses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch addresses');
    }

    return response.json();
  },

  // Create new address
  createAddress: async (address: Omit<Address, 'id'>): Promise<Address> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/addresses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(address),
    });

    if (!response.ok) {
      throw new Error('Failed to create address');
    }

    return response.json();
  },

  // Update address
  updateAddress: async (
    id: string,
    address: Partial<Address>
  ): Promise<Address> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/addresses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(address),
    });

    if (!response.ok) {
      throw new Error('Failed to update address');
    }

    return response.json();
  },

  // Delete address
  deleteAddress: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/addresses/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete address');
    }
  },

  // Get available shipping methods
  getShippingMethods: async (addressId: string): Promise<ShippingMethod[]> => {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/shipping/methods?addressId=${addressId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch shipping methods');
    }

    return response.json();
  },

  // Validate coupon code
  validateCoupon: async (code: string): Promise<Coupon> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/coupons/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Invalid coupon code');
    }

    return response.json();
  },

  // Process payment (tokenize card information)
  tokenizePayment: async (
    paymentMethod: PaymentMethod
  ): Promise<{ token: string }> => {
    // This would typically integrate with a payment processor like Stripe
    // For now, we'll simulate the tokenization process
    const response = await fetch(`${API_BASE_URL}/api/v1/payment/tokenize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        type: paymentMethod.type,
        cardNumber: paymentMethod.cardNumber,
        expiryMonth: paymentMethod.expiryMonth,
        expiryYear: paymentMethod.expiryYear,
        cvv: paymentMethod.cvv,
        cardholderName: paymentMethod.cardholderName,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to process payment information');
    }

    return response.json();
  },

  // Calculate order totals
  calculateTotals: async (data: {
    shippingMethodId: string;
    couponCode?: string;
  }): Promise<{
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    total: number;
  }> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/checkout/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to calculate order totals');
    }

    return response.json();
  },

  // Submit checkout
  submitCheckout: async (
    checkoutData: CheckoutFormData & { paymentToken: string }
  ) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/checkout/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(checkoutData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to process checkout');
    }

    return response.json();
  },
};
