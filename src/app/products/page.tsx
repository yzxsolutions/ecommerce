'use client';

import React, { useState, useCallback } from 'react';
import { useProducts } from '@/hooks/api/useProducts';
import { ProductFilters as ProductFiltersType } from '@/types/product';
import {
  ProductGrid,
  SearchBar,
  ProductFilters,
  Pagination,
  GridViewSelector,
} from '@/components/products';
import { ProductErrorState } from '@/components/products/ProductErrorState';
import { ProductErrorWrapper } from '@/components/products/ProductErrorBoundary';

export default function ProductsPage() {
  const [gridColumns, setGridColumns] = useState(4); // Default to 4 columns
  const [filters, setFilters] = useState<ProductFiltersType>({
    page: 1,
    limit: gridColumns * 3, // Show 3 rows worth of products
    sortBy: 'name',
    sortOrder: 'asc',
  });

  const { data, loading, error, refetch, isRetrying, retryAttempt } =
    useProducts(filters);

  const handleSearch = useCallback((search: string) => {
    setFilters((prev) => ({
      ...prev,
      search: search || undefined,
      page: 1, // Reset to first page when searching
    }));
  }, []);

  const handleFiltersChange = useCallback((newFilters: ProductFiltersType) => {
    setFilters(newFilters);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const handleGridViewChange = useCallback((columns: number) => {
    setGridColumns(columns);
    setFilters((prev) => ({
      ...prev,
      limit: columns * 3, // Update limit based on new grid
      page: 1, // Reset to first page
    }));
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductErrorState
            error={error}
            onRetry={refetch}
            isRetrying={isRetrying}
            retryAttempt={retryAttempt}
            variant="page"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="w-full px-6 lg:px-12 xl:px-16 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Our Products
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                {data
                  ? `${data.pagination.total} products available`
                  : 'Loading products...'}
              </p>
            </div>
            <div className="w-full sm:w-96">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search for products..."
                initialValue={filters.search || ''}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-6 lg:px-12 xl:px-16 py-8">
        <div className="flex flex-col xl:flex-row gap-10">
          {/* Filters Sidebar */}
          <div className="xl:w-80 flex-shrink-0">
            <div className="sticky top-32">
              {data && (
                <ProductFilters
                  categories={data.filters.categories}
                  brands={data.filters.brands}
                  priceRange={data.filters.priceRange}
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                />
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            <div className="space-y-8">
              {/* Results Summary */}
              {data && !loading && (
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                    <p className="text-sm font-medium text-gray-700">
                      Showing{' '}
                      <span className="text-primary-600 font-semibold">
                        {data.products.length}
                      </span>{' '}
                      of{' '}
                      <span className="text-primary-600 font-semibold">
                        {data.pagination.total}
                      </span>{' '}
                      products
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <GridViewSelector
                      currentView={gridColumns}
                      onViewChange={handleGridViewChange}
                    />
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z"
                        />
                      </svg>
                      Page {data.pagination.page} of{' '}
                      {data.pagination.totalPages}
                    </div>
                  </div>
                </div>
              )}

              {/* Product Grid */}
              <ProductErrorWrapper>
                <ProductGrid
                  products={data?.products || []}
                  loading={loading}
                  gridColumns={gridColumns}
                />
              </ProductErrorWrapper>

              {/* Pagination */}
              {data && data.pagination.totalPages > 1 && (
                <div className="flex justify-center pt-8">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6">
                    <Pagination
                      currentPage={data.pagination.page}
                      totalPages={data.pagination.totalPages}
                      totalItems={data.pagination.total}
                      itemsPerPage={data.pagination.limit}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
