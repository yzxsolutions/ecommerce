import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  fetchCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  clearError,
  optimisticAddToCart,
} from '../../store/slices/cartSlice';
import {
  AddToCartPayload,
  UpdateCartItemPayload,
  CartItem,
} from '../../types/cart';
import { Product, ProductVariant } from '../../types/product';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cartState = useAppSelector((state) => state.cart);

  // Load cart on hook initialization
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Add item to cart with optimistic update
  const handleAddToCart = useCallback(
    async (
      product: Product,
      quantity: number = 1,
      selectedVariant?: ProductVariant
    ) => {
      const payload: AddToCartPayload = {
        productId: product.id,
        quantity,
        variantId: selectedVariant?.id,
      };

      // Optimistic update for better UX
      const optimisticItem: CartItem = {
        id: `temp-${Date.now()}`, // Temporary ID
        product,
        quantity,
        selectedVariant,
        price: selectedVariant?.price || product.price,
        subtotal: (selectedVariant?.price || product.price) * quantity,
      };

      dispatch(optimisticAddToCart(optimisticItem));

      try {
        await dispatch(addToCart(payload)).unwrap();
      } catch (error) {
        // If the API call fails, fetch the cart to get the correct state
        dispatch(fetchCart());
        throw error;
      }
    },
    [dispatch]
  );

  // Update cart item quantity
  const handleUpdateCartItem = useCallback(
    async (itemId: string, quantity: number) => {
      const payload: UpdateCartItemPayload = { itemId, quantity };
      await dispatch(updateCartItem(payload)).unwrap();
    },
    [dispatch]
  );

  // Remove item from cart
  const handleRemoveFromCart = useCallback(
    async (itemId: string) => {
      await dispatch(removeFromCart(itemId)).unwrap();
    },
    [dispatch]
  );

  // Clear entire cart
  const handleClearCart = useCallback(async () => {
    await dispatch(clearCart()).unwrap();
  }, [dispatch]);

  // Clear error
  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Refresh cart
  const refreshCart = useCallback(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Get cart item by product and variant
  const getCartItem = useCallback(
    (productId: string, variantId?: string) => {
      return cartState.items.find(
        (item) =>
          item.product.id === productId &&
          item.selectedVariant?.id === variantId
      );
    },
    [cartState.items]
  );

  // Check if product is in cart
  const isInCart = useCallback(
    (productId: string, variantId?: string) => {
      return !!getCartItem(productId, variantId);
    },
    [getCartItem]
  );

  // Get quantity of specific product/variant in cart
  const getCartItemQuantity = useCallback(
    (productId: string, variantId?: string) => {
      const item = getCartItem(productId, variantId);
      return item?.quantity || 0;
    },
    [getCartItem]
  );

  return {
    // State
    items: cartState.items,
    totalItems: cartState.totalItems,
    totalPrice: cartState.totalPrice,
    isLoading: cartState.isLoading,
    error: cartState.error,

    // Actions
    addToCart: handleAddToCart,
    updateCartItem: handleUpdateCartItem,
    removeFromCart: handleRemoveFromCart,
    clearCart: handleClearCart,
    clearError: handleClearError,
    refreshCart,

    // Utilities
    getCartItem,
    isInCart,
    getCartItemQuantity,
  };
};
