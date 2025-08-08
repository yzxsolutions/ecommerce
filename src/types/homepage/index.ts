// Homepage section type definitions
export interface HomepageSection {
  id: string;
  type: 'banner' | 'featured-products' | 'category-grid' | 'promotional';
  title: string;
  subtitle?: string;
  order: number;
  isActive: boolean;
  content:
    | BannerContent
    | FeaturedProductsContent
    | CategoryGridContent
    | PromotionalContent;
  createdAt: string;
  updatedAt: string;
}

export interface BannerContent {
  image: string;
  imageAlt: string;
  heading: string;
  subheading?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface FeaturedProductsContent {
  productIds: string[];
  displayCount: number;
  showCarousel: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export interface CategoryGridContent {
  categories: {
    id: string;
    name: string;
    slug: string;
    image: string;
    imageAlt: string;
  }[];
  columns: number;
}

export interface PromotionalContent {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  discount?: string;
  ctaText: string;
  ctaLink: string;
  validUntil?: string;
}

export interface HomepageSectionsResponse {
  sections: HomepageSection[];
}
