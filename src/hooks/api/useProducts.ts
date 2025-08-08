import { useState, useEffect, useCallback } from 'react';
import { ProductFilters, ProductListResponse, Product } from '@/types/product';
import { productsApi } from '@/lib/api/products';
import { useApiRetry } from '@/hooks/useRetry';

export interface UseProductsResult {
  data: ProductListResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  isRetrying: boolean;
  retryAttempt: number;
}

export function useProducts(filters: ProductFilters = {}): UseProductsResult {
  const [data, setData] = useState<ProductListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Enhanced API call with retry mechanism
  const apiCall = useCallback(async (filters: ProductFilters) => {
    const response = await productsApi.getProducts(filters);
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch products');
    }
    return response.data;
  }, []);

  const {
    execute: executeWithRetry,
    isRetrying,
    attempt,
  } = useApiRetry(apiCall, {
    maxAttempts: 3,
    delay: 1000,
    backoffMultiplier: 1.5,
    toastMessage: 'Retrying to load products...',
  });

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await executeWithRetry(filters);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [filters, executeWithRetry]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    data,
    loading,
    error,
    refetch: fetchProducts,
    isRetrying,
    retryAttempt: attempt,
  };
}

export interface UseProductResult {
  data: Product | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  isRetrying: boolean;
  retryAttempt: number;
}

export function useProduct(slug: string): UseProductResult {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Enhanced API call with retry mechanism
  const apiCall = useCallback(async (slug: string) => {
    const response = await productsApi.getProduct(slug);
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch product');
    }
    return response.data;
  }, []);

  const {
    execute: executeWithRetry,
    isRetrying,
    attempt,
  } = useApiRetry(apiCall, {
    maxAttempts: 3,
    delay: 1000,
    backoffMultiplier: 1.5,
    toastMessage: 'Retrying to load product...',
  });

  const fetchProduct = useCallback(async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);
      const result = await executeWithRetry(slug);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [slug, executeWithRetry]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    data,
    loading,
    error,
    refetch: fetchProduct,
    isRetrying,
    retryAttempt: attempt,
  };
}
