// Cart API functions
import {
  CartApiResponse,
  AddToCartPayload,
  UpdateCartItemPayload,
} from '../../types/cart';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export const cartApi = {
  // Get current cart
  getCart: async (): Promise<CartApiResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization header will be added by middleware
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }

    return response.json();
  },

  // Add item to cart
  addItem: async (payload: AddToCartPayload): Promise<CartApiResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/cart/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to add item to cart');
    }

    return response.json();
  },

  // Update cart item quantity
  updateItem: async (
    payload: UpdateCartItemPayload
  ): Promise<CartApiResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/cart/items/${payload.itemId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ quantity: payload.quantity }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update cart item');
    }

    return response.json();
  },

  // Remove item from cart
  removeItem: async (itemId: string): Promise<CartApiResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/cart/items/${itemId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to remove cart item');
    }

    return response.json();
  },

  // Clear entire cart
  clearCart: async (): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/cart`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to clear cart');
    }
  },
};
