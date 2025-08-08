import { ProductFilters, ProductListResponse, Product } from '@/types/product';
import { ApiResponse } from '@/types/api';

// const API_BASE_URL =
//   process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

// Mock data for development
const mockProducts: Product[] = [
  {
    id: '1',
    slug: 'organic-bananas',
    name: 'Organic Bananas',
    description: 'Fresh organic bananas, perfect for snacking or baking.',
    price: 2.99,
    images: [
      {
        id: '1',
        url: '/api/placeholder/300/300',
        alt: 'Organic Bananas',
        isPrimary: true,
      },
    ],
    variants: [],
    stock: 50,
    category: { id: '1', name: 'Fruits', slug: 'fruits' },
    brand: { id: '1', name: 'Organic Farm', slug: 'organic-farm' },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    slug: 'whole-milk',
    name: 'Whole Milk',
    description:
      'Fresh whole milk from local dairy farms. Rich in calcium and protein, perfect for drinking, cooking, and baking. Our milk comes from grass-fed cows on local farms.',
    price: 3.49,
    images: [
      {
        id: '2',
        url: '/api/placeholder/400/400',
        alt: 'Whole Milk',
        isPrimary: true,
      },
      {
        id: '2b',
        url: '/api/placeholder/400/400',
        alt: 'Whole Milk Nutrition Label',
        isPrimary: false,
      },
      {
        id: '2c',
        url: '/api/placeholder/400/400',
        alt: 'Whole Milk Farm Source',
        isPrimary: false,
      },
    ],
    variants: [
      {
        id: '1',
        name: 'Size',
        options: [{ id: '1', name: 'Size', value: '1L' }],
        price: 3.49,
        stock: 30,
        sku: 'MILK-1L',
      },
      {
        id: '2',
        name: 'Size',
        options: [{ id: '2', name: 'Size', value: '2L' }],
        price: 6.49,
        stock: 20,
        sku: 'MILK-2L',
      },
    ],
    stock: 50,
    category: { id: '2', name: 'Dairy', slug: 'dairy' },
    brand: { id: '2', name: 'Local Dairy', slug: 'local-dairy' },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    slug: 'sourdough-bread',
    name: 'Artisan Sourdough Bread',
    description: 'Handcrafted sourdough bread with a crispy crust.',
    price: 4.99,
    images: [
      {
        id: '3',
        url: '/api/placeholder/300/300',
        alt: 'Sourdough Bread',
        isPrimary: true,
      },
    ],
    variants: [],
    stock: 15,
    category: { id: '3', name: 'Bakery', slug: 'bakery' },
    brand: { id: '3', name: 'Artisan Bakery', slug: 'artisan-bakery' },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    slug: 'free-range-eggs',
    name: 'Free Range Eggs',
    description: 'Farm fresh free-range eggs, dozen pack.',
    price: 5.99,
    images: [
      {
        id: '4',
        url: '/api/placeholder/300/300',
        alt: 'Free Range Eggs',
        isPrimary: true,
      },
    ],
    variants: [],
    stock: 25,
    category: { id: '2', name: 'Dairy', slug: 'dairy' },
    brand: { id: '4', name: 'Happy Hens', slug: 'happy-hens' },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    slug: 'organic-spinach',
    name: 'Organic Baby Spinach',
    description: 'Fresh organic baby spinach leaves, pre-washed.',
    price: 3.99,
    images: [
      {
        id: '5',
        url: '/api/placeholder/300/300',
        alt: 'Organic Spinach',
        isPrimary: true,
      },
    ],
    variants: [],
    stock: 0, // Out of stock for testing
    category: { id: '4', name: 'Vegetables', slug: 'vegetables' },
    brand: { id: '1', name: 'Organic Farm', slug: 'organic-farm' },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '6',
    slug: 'greek-yogurt',
    name: 'Greek Yogurt',
    description:
      'Creamy Greek yogurt with live cultures. High in protein and probiotics, perfect for breakfast, snacks, or cooking. Made with traditional Greek methods for authentic taste and texture.',
    price: 4.49,
    images: [
      {
        id: '6',
        url: '/api/placeholder/400/400',
        alt: 'Greek Yogurt',
        isPrimary: true,
      },
      {
        id: '6b',
        url: '/api/placeholder/400/400',
        alt: 'Greek Yogurt Ingredients',
        isPrimary: false,
      },
    ],
    variants: [
      {
        id: '3',
        name: 'Flavor',
        options: [{ id: '3', name: 'Flavor', value: 'Plain' }],
        price: 4.49,
        stock: 20,
        sku: 'YOGURT-PLAIN',
      },
      {
        id: '4',
        name: 'Flavor',
        options: [{ id: '4', name: 'Flavor', value: 'Vanilla' }],
        price: 4.99,
        stock: 15,
        sku: 'YOGURT-VANILLA',
      },
      {
        id: '5',
        name: 'Flavor',
        options: [{ id: '5', name: 'Flavor', value: 'Strawberry' }],
        price: 5.49,
        stock: 0,
        sku: 'YOGURT-STRAWBERRY',
      },
    ],
    stock: 35,
    category: { id: '2', name: 'Dairy', slug: 'dairy' },
    brand: { id: '5', name: 'Mediterranean', slug: 'mediterranean' },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

const mockCategories = [
  { id: '1', name: 'Fruits', slug: 'fruits' },
  { id: '2', name: 'Dairy', slug: 'dairy' },
  { id: '3', name: 'Bakery', slug: 'bakery' },
  { id: '4', name: 'Vegetables', slug: 'vegetables' },
];

const mockBrands = [
  { id: '1', name: 'Organic Farm', slug: 'organic-farm' },
  { id: '2', name: 'Local Dairy', slug: 'local-dairy' },
  { id: '3', name: 'Artisan Bakery', slug: 'artisan-bakery' },
  { id: '4', name: 'Happy Hens', slug: 'happy-hens' },
  { id: '5', name: 'Mediterranean', slug: 'mediterranean' },
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const productsApi = {
  async getProducts(
    filters: ProductFilters = {}
  ): Promise<ApiResponse<ProductListResponse>> {
    await delay(500); // Simulate network delay

    let filteredProducts = [...mockProducts];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
      );
    }

    // Apply category filter
    if (filters.category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category.slug === filters.category
      );
    }

    // Apply brand filter
    if (filters.brand) {
      filteredProducts = filteredProducts.filter(
        (product) => product.brand.slug === filters.brand
      );
    }

    // Apply price filters
    if (filters.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= filters.minPrice!
      );
    }

    if (filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= filters.maxPrice!
      );
    }

    // Apply stock filter
    if (filters.inStock) {
      filteredProducts = filteredProducts.filter(
        (product) => product.stock > 0
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      filteredProducts.sort((a, b) => {
        let aValue: string | number | Date, bValue: string | number | Date;

        switch (filters.sortBy) {
          case 'name':
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'createdAt':
            aValue = new Date(a.createdAt);
            bValue = new Date(b.createdAt);
            break;
          default:
            return 0;
        }

        if (aValue < bValue) return filters.sortOrder === 'desc' ? 1 : -1;
        if (aValue > bValue) return filters.sortOrder === 'desc' ? -1 : 1;
        return 0;
      });
    }

    // Apply pagination
    const page = filters.page || 1;
    const limit = filters.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // Calculate price range
    const prices = mockProducts.map((p) => p.price);
    const priceRange = {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };

    return {
      data: {
        products: paginatedProducts,
        pagination: {
          page,
          limit,
          total: filteredProducts.length,
          totalPages: Math.ceil(filteredProducts.length / limit),
        },
        filters: {
          categories: mockCategories,
          brands: mockBrands,
          priceRange,
        },
      },
      success: true,
      message: 'Products fetched successfully',
    };
  },

  async getProduct(slug: string): Promise<ApiResponse<Product>> {
    await delay(300);

    const product = mockProducts.find((p) => p.slug === slug);

    if (!product) {
      return {
        data: null as unknown as Product,
        success: false,
        message: 'Product not found',
      };
    }

    return {
      data: product,
      success: true,
      message: 'Product fetched successfully',
    };
  },
};
