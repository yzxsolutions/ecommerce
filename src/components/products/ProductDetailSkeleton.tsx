export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery Skeleton */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
          <div className="flex space-x-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-16 h-16 bg-gray-200 rounded-md animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-6">
          {/* Breadcrumb */}
          <div className="flex space-x-2">
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
          </div>

          {/* Title */}
          <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />

          {/* Brand */}
          <div className="h-5 bg-gray-200 rounded w-1/4 animate-pulse" />

          {/* Price */}
          <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse" />

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
          </div>

          {/* Variants */}
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-1/4 animate-pulse" />
            <div className="flex space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-gray-200 rounded w-16 animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Stock Status */}
          <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse" />

          {/* Add to Cart Button */}
          <div className="h-12 bg-gray-200 rounded w-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
