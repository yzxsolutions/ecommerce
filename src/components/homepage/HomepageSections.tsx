'use client';

import { useHomepageSections } from '@/hooks/api/useHomepage';
import { HeroBanner } from './HeroBanner';
import { FeaturedProductsCarousel } from './FeaturedProductsCarousel';
import { CategoryGrid } from './CategoryGrid';
import { PromotionalSection } from './PromotionalSection';
import {
  HomepageSection,
  BannerContent,
  FeaturedProductsContent,
  CategoryGridContent,
  PromotionalContent,
} from '@/types/homepage';
import { ProductErrorWrapper } from '@/components/products/ProductErrorBoundary';

export function HomepageSections() {
  const { data: sections, isLoading, error } = useHomepageSections();

  if (isLoading) {
    return (
      <div className="space-y-12">
        {/* Hero Banner Skeleton */}
        <div className="relative">
          <div className="h-[400px] md:h-[500px] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded-lg">
            {/* Content overlay skeleton */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="h-12 bg-white/20 rounded w-96 mx-auto animate-pulse"></div>
                <div className="h-6 bg-white/20 rounded w-64 mx-auto animate-pulse"></div>
                <div className="h-12 bg-white/20 rounded w-32 mx-auto animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products Skeleton */}
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-2 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-sm border border-gray-200/50 overflow-hidden"
                >
                  <div className="aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Grid Skeleton */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-2 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg"
                >
                  <div className="aspect-[4/3] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-4 w-full">
                      <div className="h-6 bg-white/20 rounded w-3/4 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !sections) {
    return (
      <div className="py-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Unable to load homepage content
        </h2>
        <p className="text-gray-600 mb-6">
          We&apos;re having trouble loading the homepage. Please try refreshing
          the page or check back later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  const renderSection = (section: HomepageSection) => {
    switch (section.type) {
      case 'banner':
        return (
          <HeroBanner
            key={section.id}
            content={section.content as BannerContent}
          />
        );

      case 'featured-products':
        return (
          <FeaturedProductsCarousel
            key={section.id}
            title={section.title}
            subtitle={section.subtitle}
            content={section.content as FeaturedProductsContent}
          />
        );

      case 'category-grid':
        return (
          <CategoryGrid
            key={section.id}
            title={section.title}
            subtitle={section.subtitle}
            content={section.content as CategoryGridContent}
          />
        );

      case 'promotional':
        return (
          <PromotionalSection
            key={section.id}
            content={section.content as PromotionalContent}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-0">
      {sections.map((section) => (
        <ProductErrorWrapper key={section.id}>
          {renderSection(section)}
        </ProductErrorWrapper>
      ))}
    </div>
  );
}
