import { useQuery } from '@tanstack/react-query';
import { homepageApi } from '@/lib/api/homepage';

export const useHomepageSections = () => {
  return useQuery({
    queryKey: ['homepage-sections'],
    queryFn: homepageApi.getHomepageSections,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (response) => response.data.sections,
  });
};

export const useFeaturedProducts = (productIds: string[]) => {
  return useQuery({
    queryKey: ['featured-products', productIds],
    queryFn: () => homepageApi.getFeaturedProducts(productIds),
    enabled: productIds.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (response) => response.data,
  });
};
