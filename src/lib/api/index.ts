// API configuration and client setup
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export const apiClient = {
  baseURL: API_BASE_URL,
  // API client configuration will be implemented here
};

export * from './products';
