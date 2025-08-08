// Cart type definitions
import { Product, ProductVariant } from '../product';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
  price: number; // Price at time of adding to cart
  subtotal: number; // quantity * price
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  error: string | null;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
  variantId?: string;
}

export interface UpdateCartItemPayload {
  itemId: string;
  quantity: number;
}

export interface CartApiResponse {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}
