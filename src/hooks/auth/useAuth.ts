import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  refreshToken, 
  clearError, 
  setAccessToken,
  clearAuth,
  setAuthState,
  setLoading
} from '@/store/slices/authSlice';
import { tokenStorage, tokenUtils } from '@/lib/auth';
import { LoginCredentials, RegisterData } from '@/types/auth';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error, accessToken } = useAppSelector(
    (state) => state.auth
  );

  // Login function
  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const result = await dispatch(loginUser(credentials));
      if (loginUser.fulfilled.match(result)) {
        // Store token in memory
        tokenStorage.setAccessToken(result.payload.accessToken);
        return result.payload;
      }
      throw new Error(result.payload as string);
    },
    [dispatch]
  );

  // Register function
  const register = useCallback(
    async (userData: RegisterData) => {
      const result = await dispatch(registerUser(userData));
      if (registerUser.fulfilled.match(result)) {
        // Store token in memory
        tokenStorage.setAccessToken(result.payload.accessToken);
        return result.payload;
      }
      throw new Error(result.payload as string);
    },
    [dispatch]
  );

  // Logout function
  const logout = useCallback(async () => {
    // Clear token from memory first
    tokenStorage.clearAccessToken();
    // Then dispatch logout action
    await dispatch(logoutUser());
  }, [dispatch]);

  // Refresh token function
  const refresh = useCallback(async () => {
    const result = await dispatch(refreshToken());
    if (refreshToken.fulfilled.match(result)) {
      tokenStorage.setAccessToken(result.payload.accessToken);
      return result.payload;
    }
    // If refresh fails, clear everything
    tokenStorage.clearAccessToken();
    dispatch(clearAuth());
    throw new Error('Token refresh failed');
  }, [dispatch]);

  // Clear error function
  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Check if token needs refresh
  const checkTokenExpiry = useCallback(async () => {
    const token = tokenStorage.getAccessToken();
    if (token && tokenUtils.isTokenExpired(token)) {
      try {
        await refresh();
      } catch (error) {
        // Token refresh failed, automatically logout user
        console.warn('Token refresh failed, logging out user:', error);
        await logout();
      }
    }
  }, [refresh, logout]);

  // Force logout when token is completely expired
  const handleTokenExpiry = useCallback(async () => {
    const token = tokenStorage.getAccessToken();
    if (token && tokenUtils.isTokenExpired(token, 0)) {
      console.warn('Token has expired, forcing logout');
      await logout();
    }
  }, [logout]);

  // Initialize auth state from memory on mount
  useEffect(() => {
    const initializeAuth = async () => {
      dispatch(setLoading(true));
      
      const token = tokenStorage.getAccessToken();
      if (token && !tokenUtils.isTokenExpired(token, 0)) {
        // Token exists and is not expired, update Redux state
        dispatch(setAccessToken(token));
      } else if (token) {
        // Token exists but is expired, try to refresh
        try {
          await refresh();
        } catch (error) {
          // Refresh failed, clear everything
          tokenStorage.clearAccessToken();
          dispatch(clearAuth());
        }
      }
      
      dispatch(setLoading(false));
    };

    initializeAuth();
  }, [dispatch, refresh]);

  // Set up automatic token refresh and expiry check
  useEffect(() => {
    if (!isAuthenticated || !accessToken) return;

    const checkInterval = setInterval(() => {
      checkTokenExpiry();
    }, 60000); // Check every minute

    const expiryInterval = setInterval(() => {
      handleTokenExpiry();
    }, 30000); // Check for complete expiry every 30 seconds

    return () => {
      clearInterval(checkInterval);
      clearInterval(expiryInterval);
    };
  }, [isAuthenticated, accessToken, checkTokenExpiry, handleTokenExpiry]);

  // Sync memory storage with Redux state
  useEffect(() => {
    if (accessToken) {
      tokenStorage.setAccessToken(accessToken);
    } else {
      tokenStorage.clearAccessToken();
    }
  }, [accessToken]);

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    
    // Actions
    login,
    register,
    logout,
    refresh,
    clearError: clearAuthError,
    checkTokenExpiry,
    handleTokenExpiry,
    
    // Utilities
    hasValidToken: () => {
      const token = tokenStorage.getAccessToken();
      return token && !tokenUtils.isTokenExpired(token, 0);
    },
    getTokenExpiry: () => {
      const token = tokenStorage.getAccessToken();
      return token ? tokenUtils.getTokenExpiry(token) : null;
    },
  };
};