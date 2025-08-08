'use client';

import { useHomepageSections } from '@/hooks/api/useHomepage';
import { HeroBanner } from './HeroBanner';
import { FeaturedProductsCarousel } from './FeaturedProductsCarousel';
import { CategoryGrid } from './CategoryGrid';
import { PromotionalSection } from './PromotionalSection';
import { HomepageSection } from '@/types/homepage';

export function HomepageSections() {
  const { data: sections, isLoading, error } = useHomepageSections();

  if (isLoading) {
    return (
      <div className="space-y-12">
        {/* Hero Banner Skeleton */}
        <div className="animate-pulse">
          <div className="h-[400px] md:h-[500px] bg-gray-200 rounded-lg"></div>
        </div>

        {/* Featured Products Skeleton */}
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Grid Skeleton */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 aspect-[4/3] rounded-lg"></div>
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Unable to load homepage content
        </h2>
        <p className="text-gray-600">
          Please try refreshing the page or check back later.
        </p>
      </div>
    );
  }

  const renderSection = (section: HomepageSection) => {
    switch (section.type) {
      case 'banner':
        return <HeroBanner key={section.id} content={section.content as any} />;

      case 'featured-products':
        return (
          <FeaturedProductsCarousel
            key={section.id}
            title={section.title}
            subtitle={section.subtitle}
            content={section.content as any}
          />
        );

      case 'category-grid':
        return (
          <CategoryGrid
            key={section.id}
            title={section.title}
            subtitle={section.subtitle}
            content={section.content as any}
          />
        );

      case 'promotional':
        return (
          <PromotionalSection
            key={section.id}
            content={section.content as any}
          />
        );

      default:
        return null;
    }
  };

  return <div className="space-y-0">{sections.map(renderSection)}</div>;
}
