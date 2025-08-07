'use client';

import React, { useState } from 'react';
import {
  Category,
  Brand,
  ProductFilters as ProductFiltersType,
} from '@/types/product';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectOption } from '@/components/ui/select';

interface ProductFiltersProps {
  categories: Category[];
  brands: Brand[];
  priceRange: { min: number; max: number };
  filters: ProductFiltersType;
  onFiltersChange: (filters: ProductFiltersType) => void;
}

export function ProductFilters({
  categories,
  brands,
  priceRange,
  filters,
  onFiltersChange,
}: ProductFiltersProps) {
  const [localFilters, setLocalFilters] = useState<ProductFiltersType>(filters);

  const handleFilterChange = (
    key: keyof ProductFiltersType,
    value: string | number | boolean | undefined
  ) => {
    const newFilters = { ...localFilters, [key]: value, page: 1 }; // Reset to page 1 when filters change
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters: ProductFiltersType = {
      page: 1,
      limit: filters.limit,
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Boolean(
    localFilters.category ||
      localFilters.brand ||
      localFilters.minPrice ||
      localFilters.maxPrice ||
      localFilters.inStock
  );

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={handleClearFilters}>
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div>
          <Select
            label="Category"
            value={localFilters.category || ''}
            onChange={(e) =>
              handleFilterChange('category', e.target.value || undefined)
            }
            options={[
              { value: '', label: 'All Categories' },
              ...categories.map(
                (category): SelectOption => ({
                  value: category.slug,
                  label: category.name,
                })
              ),
            ]}
          />
        </div>

        {/* Brand Filter */}
        <div>
          <Select
            label="Brand"
            value={localFilters.brand || ''}
            onChange={(e) =>
              handleFilterChange('brand', e.target.value || undefined)
            }
            options={[
              { value: '', label: 'All Brands' },
              ...brands.map(
                (brand): SelectOption => ({
                  value: brand.slug,
                  label: brand.name,
                })
              ),
            ]}
          />
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="space-y-3">
            <div className="flex space-x-2">
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Min"
                  min={priceRange.min}
                  max={priceRange.max}
                  value={localFilters.minPrice || ''}
                  onChange={(e) =>
                    handleFilterChange(
                      'minPrice',
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Max"
                  min={priceRange.min}
                  max={priceRange.max}
                  value={localFilters.maxPrice || ''}
                  onChange={(e) =>
                    handleFilterChange(
                      'maxPrice',
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Range: ${priceRange.min.toFixed(2)} - ${priceRange.max.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Stock Filter */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={localFilters.inStock || false}
              onChange={(e) =>
                handleFilterChange('inStock', e.target.checked || undefined)
              }
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">
              In Stock Only
            </span>
          </label>
        </div>

        {/* Sort Options */}
        <div>
          <Select
            label="Sort By"
            value={`${localFilters.sortBy || 'name'}-${localFilters.sortOrder || 'asc'}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-') as [
                string,
                'asc' | 'desc',
              ];
              handleFilterChange('sortBy', sortBy);
              handleFilterChange('sortOrder', sortOrder);
            }}
            options={[
              { value: 'name-asc', label: 'Name (A-Z)' },
              { value: 'name-desc', label: 'Name (Z-A)' },
              { value: 'price-asc', label: 'Price (Low to High)' },
              { value: 'price-desc', label: 'Price (High to Low)' },
              { value: 'createdAt-desc', label: 'Newest First' },
              { value: 'createdAt-asc', label: 'Oldest First' },
            ]}
          />
        </div>
      </CardContent>
    </Card>
  );
}
