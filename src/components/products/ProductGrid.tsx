'use client';

import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  gridColumns?: number;
}

// Modern skeleton loader component matching the light theme card
function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200/50 overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>

      {/* Content skeleton */}
      <div className="px-6 py-6 bg-gradient-to-br from-white to-gray-50/50 space-y-4">
        {/* Category skeleton */}
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>

        {/* Title and price skeleton */}
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1 pr-4">
            <div className="h-5 bg-gray-200 rounded w-full"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded w-16"></div>
        </div>

        {/* Button skeleton */}
        <div className="w-full h-12 bg-gray-200 rounded-2xl"></div>
      </div>
    </div>
  );
}

export function ProductGrid({
  products,
  loading = false,
  gridColumns = 4,
}: ProductGridProps) {
  // Generate grid classes based on gridColumns
  const getGridClasses = (columns: number) => {
    const baseClasses = 'grid gap-6 xl:gap-8';
    switch (columns) {
      case 2:
        return `${baseClasses} grid-cols-1 sm:grid-cols-2`;
      case 3:
        return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`;
      case 4:
        return `${baseClasses} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`;
      case 5:
        return `${baseClasses} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`;
      case 6:
        return `${baseClasses} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6`;
      default:
        return `${baseClasses} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`;
    }
  };
  if (loading) {
    return (
      <div className={getGridClasses(gridColumns)}>
        {Array.from({ length: gridColumns * 3 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          {/* Empty state illustration */}
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t find any products matching your criteria. Try
            adjusting your search or filters.
          </p>

          {/* Suggestions */}
          <div className="bg-gray-50 rounded-lg p-4 text-left">
            <h4 className="font-medium text-gray-900 mb-2">Try:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Checking your spelling</li>
              <li>• Using more general terms</li>
              <li>• Removing some filters</li>
              <li>• Browsing our categories</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={getGridClasses(gridColumns)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
