'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { FeaturedProductsContent } from '@/types';
import { useFeaturedProducts } from '@/hooks/api/useHomepage';

interface FeaturedProductsCarouselProps {
  title: string;
  subtitle?: string;
  content: FeaturedProductsContent;
}

export function FeaturedProductsCarousel({
  title,
  subtitle,
  content,
}: FeaturedProductsCarouselProps) {
  const {
    data: products,
    isLoading,
    error,
  } = useFeaturedProducts(content.productIds);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(4);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 640) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!content.autoPlay || !products || products.length <= itemsPerView)
      return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(0, products.length - itemsPerView);
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, content.autoPlayInterval || 5000);

    return () => clearInterval(interval);
  }, [content.autoPlay, content.autoPlayInterval, products, itemsPerView]);

  const nextSlide = () => {
    if (!products) return;
    const maxIndex = Math.max(0, products.length - itemsPerView);
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    if (!products) return;
    const maxIndex = Math.max(0, products.length - itemsPerView);
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  };

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
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
      </section>
    );
  }

  if (error || !products || products.length === 0) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600">
            Unable to load featured products at this time.
          </p>
        </div>
      </section>
    );
  }

  const showNavigation = content.showCarousel && products.length > itemsPerView;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
        </div>

        <div className="relative">
          {showNavigation && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl"
                onClick={prevSlide}
                aria-label="Previous products"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl"
                onClick={nextSlide}
                aria-label="Next products"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                width: `${(products.length / itemsPerView) * 100}%`,
              }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="px-3"
                  style={{ width: `${100 / products.length}%` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
