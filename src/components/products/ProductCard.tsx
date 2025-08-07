'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage =
    product.images.find((img) => img.isPrimary) || product.images[0];
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200/50 hover:border-primary-200/50 backdrop-blur-sm">
      {/* Main Image Section */}
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-8 overflow-hidden">
          <Image
            src={primaryImage?.url || '/api/placeholder/400/400'}
            alt={primaryImage?.alt || product.name}
            fill
            className="object-contain group-hover:scale-110 transition-transform duration-700 p-4"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />

          {/* Wishlist Button */}
          <div className="absolute top-4 right-4">
            <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors group/heart">
              <svg
                className="w-5 h-5 text-gray-400 group-hover/heart:text-red-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          {/* Stock Status Badge */}
          {(isOutOfStock || isLowStock) && (
            <div className="absolute top-4 left-4">
              <span
                className={`text-xs font-medium px-3 py-1.5 rounded-full shadow-sm ${
                  isOutOfStock
                    ? 'bg-red-100 text-red-700'
                    : 'bg-orange-100 text-orange-700'
                }`}
              >
                {isOutOfStock ? 'Out of Stock' : `Only ${product.stock} left`}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Variant Thumbnails - Only show on hover and only if variants exist */}
      {product.variants.length > 0 && (
        <div className="px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100 h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden border-t border-gray-200">
          <div className="flex gap-2 justify-center">
            {product.variants.slice(0, 5).map((variant, index) => (
              <button
                key={variant.id}
                className={`w-12 h-12 rounded-xl border-2 overflow-hidden transition-all shadow-sm hover:shadow-md ${
                  index === 0
                    ? 'border-primary-400 ring-2 ring-primary-400/30 bg-white'
                    : 'border-gray-200 hover:border-primary-300 bg-white hover:bg-gray-50'
                }`}
              >
                <Image
                  src={primaryImage?.url || '/api/placeholder/48/48'}
                  alt={variant.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="px-6 py-6 bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm">
        {/* Category */}
        <div className="mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-600 text-white shadow-sm">
            {product.category.name}
          </span>
        </div>

        {/* Product Name and Price */}
        <div className="flex items-start justify-between mb-6">
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-bold text-xl text-gray-900 hover:text-primary-600 transition-colors line-clamp-2 pr-4 leading-tight">
              {product.name}
            </h3>
          </Link>
          <div className="text-right">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full">
          <Button
            disabled={isOutOfStock}
            className={`w-full h-12 rounded-2xl font-semibold text-base transition-all duration-300 transform hover:scale-[1.02] ${
              isOutOfStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100 hover:scale-100'
                : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl shadow-primary-500/25'
            }`}
          >
            {isOutOfStock ? (
              <div className="flex items-center gap-2">
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                SOLD OUT
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"
                  />
                </svg>
                ADD TO CART
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
