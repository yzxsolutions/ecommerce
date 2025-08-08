'use client';

import { useParams } from 'next/navigation';
import { useProduct } from '@/hooks/api/useProducts';
import { ProductDetailView } from '@/components/products/ProductDetailView';
import { ProductDetailSkeleton } from '@/components/products/ProductDetailSkeleton';
import { ProductErrorState } from '@/components/products/ProductErrorState';
import { ProductErrorWrapper } from '@/components/products/ProductErrorBoundary';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const {
    data: product,
    loading,
    error,
    refetch,
    isRetrying,
    retryAttempt,
  } = useProduct(slug);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
        <ProductErrorState
          error={error || 'Product not found'}
          onRetry={refetch}
          isRetrying={isRetrying}
          retryAttempt={retryAttempt}
          variant="page"
        />
      </div>
    );
  }

  return (
    <ProductErrorWrapper>
      <ProductDetailView product={product} />
    </ProductErrorWrapper>
  );
}
