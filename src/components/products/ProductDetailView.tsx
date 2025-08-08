'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product, ProductVariant } from '@/types/product';
import { Card } from '@/components/ui/card';
import { ProductImageGallery } from './ProductImageGallery';
import { VariantSelector } from './VariantSelector';
import { StockStatus } from './StockStatus';
import { AddToCartButton } from '@/components/cart';
import { formatPrice } from '@/utils/formatting';

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants.length > 0 ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);

  // Calculate current price and stock based on selected variant
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentStock = selectedVariant ? selectedVariant.stock : product.stock;
  const isInStock = currentStock > 0;

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setQuantity(1); // Reset quantity when variant changes
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= currentStock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-primary-600">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary-600">
          Products
        </Link>
        <span>/</span>
        <Link
          href={`/products?category=${product.category.slug}`}
          className="hover:text-primary-600"
        >
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <ProductImageGallery
            images={product.images}
            productName={product.name}
          />
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          {/* Product Title and Brand */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-lg text-gray-600">
              by{' '}
              <Link
                href={`/products?brand=${product.brand.slug}`}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {product.brand.name}
              </Link>
            </p>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-gray-900">
            {formatPrice(currentPrice)}
            {selectedVariant && selectedVariant.price !== product.price && (
              <span className="text-lg text-gray-500 line-through ml-2">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Variants */}
          {product.variants.length > 0 && (
            <VariantSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onVariantChange={handleVariantChange}
            />
          )}

          {/* Stock Status */}
          <StockStatus stock={currentStock} />

          {/* Quantity Selector */}
          {isInStock && (
            <div className="flex items-center space-x-4">
              <label
                htmlFor="quantity"
                className="text-sm font-medium text-gray-700"
              >
                Quantity:
              </label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max={currentStock}
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value) || 1)
                  }
                  className="w-16 px-3 py-2 text-center border-0 focus:ring-0"
                />
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= currentStock}
                  className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-600">
                {currentStock} available
              </span>
            </div>
          )}

          {/* Add to Cart Button */}
          <div className="pt-4">
            <AddToCartButton
              product={product}
              selectedVariant={selectedVariant || undefined}
              quantity={quantity}
              size="lg"
              className="w-full h-12 text-lg font-medium"
            >
              {!isInStock
                ? 'Out of Stock'
                : `Add to Cart - ${formatPrice(currentPrice * quantity)}`}
            </AddToCartButton>
          </div>

          {/* Product Details */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              Product Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="text-gray-900">{product.category.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Brand:</span>
                <span className="text-gray-900">{product.brand.name}</span>
              </div>
              {selectedVariant && (
                <div className="flex justify-between">
                  <span className="text-gray-600">SKU:</span>
                  <span className="text-gray-900">{selectedVariant.sku}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Stock:</span>
                <span className="text-gray-900">{currentStock} units</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
