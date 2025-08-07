import { useState, useEffect, useCallback } from 'react';
import { ProductFilters, ProductListResponse, Product } from '@/types/product';
import { productsApi } from '@/lib/api/products';

export interface UseProductsResult {
  data: ProductListResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProducts(filters: ProductFilters = {}): UseProductsResult {
  const [data, setData] = useState<ProductListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productsApi.getProducts(filters);

      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'Failed to fetch products');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    data,
    loading,
    error,
    refetch: fetchProducts,
  };
}

export interface UseProductResult {
  data: Product | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProduct(slug: string): UseProductResult {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);
      const response = await productsApi.getProduct(slug);

      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'Failed to fetch product');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    data,
    loading,
    error,
    refetch: fetchProduct,
  };
}
