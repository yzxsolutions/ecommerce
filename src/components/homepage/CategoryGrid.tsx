'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CategoryGridContent } from '@/types/homepage';

interface CategoryGridProps {
  title: string;
  subtitle?: string;
  content: CategoryGridContent;
}

export function CategoryGrid({ title, subtitle, content }: CategoryGridProps) {
  const { categories, columns } = content;

  const getGridCols = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 sm:grid-cols-2';
      case 3:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
      case 6:
        return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6';
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
    }
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
        </div>

        <div className={`grid ${getGridCols()} gap-6`}>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={category.image}
                    alt={category.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl font-semibold text-center px-4 drop-shadow-lg">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
