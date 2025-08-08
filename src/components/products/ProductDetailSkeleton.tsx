export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      {/* Breadcrumb Skeleton */}
      <nav className="flex items-center space-x-2 text-sm mb-6">
        <div className="h-4 bg-gray-200 rounded w-12 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery Skeleton */}
        <div className="space-y-4">
          {/* Main image with shimmer effect */}
          <div className="aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded-lg relative overflow-hidden">
            {/* Zoom indicator skeleton */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-gray-300 rounded-full animate-pulse" />
          </div>

          {/* Thumbnail gallery */}
          <div className="flex space-x-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-16 h-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded-md border-2 border-gray-200"
              />
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-6">
          {/* Product Title and Brand */}
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <div className="h-10 bg-gray-200 rounded w-24 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
          </div>

          {/* Variants */}
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-1/4 animate-pulse" />
            <div className="flex space-x-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-gray-200 rounded w-16 animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Stock Status */}
          <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse" />

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <div className="h-5 bg-gray-200 rounded w-16 animate-pulse" />
            <div className="flex items-center border border-gray-200 rounded-md">
              <div className="w-10 h-10 bg-gray-200 animate-pulse" />
              <div className="w-16 h-10 bg-gray-100 animate-pulse" />
              <div className="w-10 h-10 bg-gray-200 animate-pulse" />
            </div>
            <div className="h-5 bg-gray-200 rounded w-20 animate-pulse" />
          </div>

          {/* Add to Cart Button */}
          <div className="pt-4">
            <div className="w-full h-12 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Product Details Card */}
          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
