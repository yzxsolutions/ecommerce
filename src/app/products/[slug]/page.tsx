'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { productsApi } from '@/lib/api/products';
import { ProductDetailView } from '@/components/products/ProductDetailView';
import { ProductDetailSkeleton } from '@/components/products/ProductDetailSkeleton';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => productsApi.getProduct(slug),
    enabled: !!slug,
  });

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !response?.success || !response?.data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The product you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  return <ProductDetailView product={response.data} />;
}
