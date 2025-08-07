// Auth configuration and utilities
export const AUTH_CONFIG = {
  tokenKey: 'access_token',
  refreshTokenKey: 'refresh_token',
  tokenRefreshThreshold: 5 * 60 * 1000, // 5 minutes before expiry
};

// In-memory token storage (secure pattern)
let accessToken: string | null = null;

// Validate token format
const isValidTokenFormat = (token: string): boolean => {
  try {
    const parts = token.split('.');
    return parts.length === 3 && parts.every(part => part.length > 0);
  } catch {
    return false;
  }
};

export const tokenStorage = {
  // Get access token from memory
  getAccessToken: (): string | null => {
    return accessToken;
  },

  // Set access token in memory (with validation)
  setAccessToken: (token: string | null): void => {
    if (token && !isValidTokenFormat(token)) {
      console.warn('Invalid token format provided');
      accessToken = null;
      return;
    }
    accessToken = token;
  },

  // Clear access token from memory
  clearAccessToken: (): void => {
    accessToken = null;
  },

  // Check if token exists
  hasAccessToken: (): boolean => {
    return accessToken !== null;
  },
};

// JWT token utilities
export const tokenUtils = {
  // Decode JWT payload (client-side only for expiry check)
  decodeToken: (token: string): any => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  },

  // Check if token is expired or will expire soon
  isTokenExpired: (token: string, threshold: number = AUTH_CONFIG.tokenRefreshThreshold): boolean => {
    const decoded = tokenUtils.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }

    const expiryTime = decoded.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    
    return (expiryTime - currentTime) <= threshold;
  },

  // Get token expiry time
  getTokenExpiry: (token: string): number | null => {
    const decoded = tokenUtils.decodeToken(token);
    return decoded?.exp ? decoded.exp * 1000 : null;
  },
};

// Auth API utilities
export const authAPI = {
  // Add authorization header to requests
  getAuthHeaders: (): HeadersInit => {
    const token = tokenStorage.getAccessToken();
    return token
      ? {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      : {
          'Content-Type': 'application/json',
        };
  },

  // Make authenticated API request with automatic token refresh
  authenticatedFetch: async (url: string, options: RequestInit = {}): Promise<Response> => {
    const token = tokenStorage.getAccessToken();
    
    // Check if token is expired before making request
    if (token && tokenUtils.isTokenExpired(token, 0)) {
      throw new Error('Token expired, please login again');
    }

    const headers = {
      ...authAPI.getAuthHeaders(),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Include cookies for refresh token
    });

    // Handle 401 responses (unauthorized)
    if (response.status === 401) {
      // Clear token and throw error
      tokenStorage.clearAccessToken();
      throw new Error('Authentication failed, please login again');
    }

    return response;
  },

  // Validate token format
  isValidTokenFormat,
};
