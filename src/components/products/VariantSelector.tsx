'use client';

import { ProductVariant } from '@/types/product';
import { formatPrice } from '@/utils/formatting';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onVariantChange: (variant: ProductVariant) => void;
}

export function VariantSelector({
  variants,
  selectedVariant,
  onVariantChange,
}: VariantSelectorProps) {
  if (!variants || variants.length === 0) {
    return null;
  }

  // Group variants by option name (e.g., "Size", "Color", "Flavor")
  const variantGroups = variants.reduce(
    (groups, variant) => {
      variant.options.forEach((option) => {
        if (!groups[option.name]) {
          groups[option.name] = [];
        }
        groups[option.name].push({
          variant,
          option,
        });
      });
      return groups;
    },
    {} as Record<
      string,
      Array<{
        variant: ProductVariant;
        option: { id: string; name: string; value: string };
      }>
    >
  );

  return (
    <div className="space-y-4">
      {Object.entries(variantGroups).map(([optionName, variantOptions]) => (
        <div key={optionName}>
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            {optionName}:
            {selectedVariant && (
              <span className="ml-2 font-normal text-gray-600">
                {
                  selectedVariant.options.find((opt) => opt.name === optionName)
                    ?.value
                }
              </span>
            )}
          </h3>

          <div className="flex flex-wrap gap-2">
            {variantOptions.map(({ variant, option }) => {
              const isSelected = selectedVariant?.id === variant.id;
              const isOutOfStock = variant.stock === 0;

              return (
                <button
                  key={variant.id}
                  onClick={() => !isOutOfStock && onVariantChange(variant)}
                  disabled={isOutOfStock}
                  className={`
                    relative px-4 py-2 border rounded-md text-sm font-medium transition-colors
                    ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : isOutOfStock
                          ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="flex items-center space-x-2">
                    <span>{option.value}</span>
                    {variant.price !== variants[0].price && (
                      <span className="text-xs">
                        ({formatPrice(variant.price)})
                      </span>
                    )}
                  </div>

                  {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-px bg-gray-400 transform rotate-12" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Show stock info for selected variant */}
          {selectedVariant && (
            <p className="text-xs text-gray-500 mt-1">
              {selectedVariant.stock > 0 ? (
                <>
                  {selectedVariant.stock} in stock
                  {selectedVariant.sku && (
                    <span className="ml-2">• SKU: {selectedVariant.sku}</span>
                  )}
                </>
              ) : (
                'Out of stock'
              )}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
