import { HomepageSectionsResponse, HomepageSection, Product } from '@/types';
import { ApiResponse } from '@/types/api';

// const API_BASE_URL =
//   process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

// Mock data for development
const mockHomepageSections: HomepageSection[] = [
  {
    id: '1',
    type: 'banner',
    title: 'Hero Banner',
    order: 1,
    isActive: true,
    content: {
      image: '/api/placeholder/1200/400',
      imageAlt: 'Fresh groceries delivered to your door',
      heading: 'Fresh Groceries Delivered',
      subheading:
        'Get the best quality products delivered to your doorstep within hours',
      ctaText: 'Shop Now',
      ctaLink: '/products',
      backgroundColor: '#f8fafc',
      textColor: '#1f2937',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    type: 'featured-products',
    title: 'Featured Products',
    subtitle: 'Handpicked favorites for you',
    order: 2,
    isActive: true,
    content: {
      productIds: ['1', '2', '3', '4', '6'],
      displayCount: 5,
      showCarousel: true,
      autoPlay: true,
      autoPlayInterval: 5000,
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    type: 'category-grid',
    title: 'Shop by Category',
    subtitle: 'Explore our wide range of fresh products',
    order: 3,
    isActive: true,
    content: {
      categories: [
        {
          id: '1',
          name: 'Fresh Fruits',
          slug: 'fruits',
          image: '/api/placeholder/300/200',
          imageAlt: 'Fresh fruits collection',
        },
        {
          id: '2',
          name: 'Dairy Products',
          slug: 'dairy',
          image: '/api/placeholder/300/200',
          imageAlt: 'Dairy products collection',
        },
        {
          id: '3',
          name: 'Fresh Bakery',
          slug: 'bakery',
          image: '/api/placeholder/300/200',
          imageAlt: 'Fresh bakery items',
        },
        {
          id: '4',
          name: 'Vegetables',
          slug: 'vegetables',
          image: '/api/placeholder/300/200',
          imageAlt: 'Fresh vegetables collection',
        },
      ],
      columns: 4,
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    type: 'promotional',
    title: 'Special Offer',
    order: 4,
    isActive: true,
    content: {
      image: '/api/placeholder/600/300',
      imageAlt: 'Special discount on organic products',
      title: '20% Off Organic Products',
      description:
        'Get 20% discount on all organic fruits and vegetables. Limited time offer!',
      discount: '20% OFF',
      ctaText: 'Shop Organic',
      ctaLink: '/products?category=organic',
      validUntil: '2024-12-31T23:59:59Z',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const homepageApi = {
  async getHomepageSections(): Promise<ApiResponse<HomepageSectionsResponse>> {
    await delay(300); // Simulate network delay

    // Filter active sections and sort by order
    const activeSections = mockHomepageSections
      .filter((section) => section.isActive)
      .sort((a, b) => a.order - b.order);

    return {
      data: {
        sections: activeSections,
      },
      success: true,
      message: 'Homepage sections fetched successfully',
    };
  },

  async getFeaturedProducts(
    productIds: string[]
  ): Promise<ApiResponse<Product[]>> {
    await delay(200);

    // Import mock products from products API
    const { productsApi } = await import('./products');
    const productsResponse = await productsApi.getProducts();

    if (!productsResponse.success) {
      return {
        data: [],
        success: false,
        message: 'Failed to fetch featured products',
      };
    }

    // Filter products by IDs
    const featuredProducts = productsResponse.data.products.filter((product) =>
      productIds.includes(product.id)
    );

    // Sort by the order of productIds
    const sortedProducts = productIds
      .map((id) => featuredProducts.find((product) => product.id === id))
      .filter(Boolean) as Product[];

    return {
      data: sortedProducts,
      success: true,
      message: 'Featured products fetched successfully',
    };
  },
};
