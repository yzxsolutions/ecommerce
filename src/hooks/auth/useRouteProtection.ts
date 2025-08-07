import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './useAuth';
import { User } from '@/types/auth';

interface UseRouteProtectionOptions {
  requireAuth?: boolean;
  requiredRoles?: Array<User['role']>;
  redirectTo?: string;
  onUnauthorized?: () => void;
}

interface UseRouteProtectionReturn {
  isLoading: boolean;
  isAuthorized: boolean;
  user: User | null;
  checkAccess: (roles?: Array<User['role']>) => boolean;
}

export function useRouteProtection({
  requireAuth = true,
  requiredRoles = [],
  redirectTo = '/auth/login',
  onUnauthorized,
}: UseRouteProtectionOptions = {}): UseRouteProtectionReturn {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  // Function to check if user has required roles
  const checkAccess = (roles: Array<User['role']> = requiredRoles): boolean => {
    if (!requireAuth) return true;
    if (!isAuthenticated || !user) return false;
    if (roles.length === 0) return true;
    return roles.includes(user.role);
  };

  useEffect(() => {
    // Wait for auth state to be determined
    if (isLoading) {
      return;
    }

    // If authentication is not required, allow access
    if (!requireAuth) {
      setIsAuthorized(true);
      return;
    }

    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      setIsAuthorized(false);
      if (onUnauthorized) {
        onUnauthorized();
      } else {
        router.push(redirectTo);
      }
      return;
    }

    // Check role-based access if roles are specified
    if (requiredRoles.length > 0) {
      const hasRequiredRole = requiredRoles.includes(user.role);
      if (!hasRequiredRole) {
        setIsAuthorized(false);
        if (onUnauthorized) {
          onUnauthorized();
        } else {
          // Redirect to appropriate page based on user role
          if (user.role === 'customer') {
            router.push('/'); // Redirect customers to home
          } else {
            router.push('/unauthorized'); // Redirect to unauthorized page
          }
        }
        return;
      }
    }

    // User is authenticated and authorized
    setIsAuthorized(true);
  }, [
    isAuthenticated,
    user,
    isLoading,
    requireAuth,
    requiredRoles,
    redirectTo,
    router,
    onUnauthorized,
  ]);

  return {
    isLoading,
    isAuthorized,
    user,
    checkAccess,
  };
}

// Convenience hooks for common use cases
export function useCustomerRoute(redirectTo?: string) {
  return useRouteProtection({
    requireAuth: true,
    requiredRoles: ['customer'],
    redirectTo,
  });
}

export function useAdminRoute(redirectTo?: string) {
  return useRouteProtection({
    requireAuth: true,
    requiredRoles: ['admin', 'manager'],
    redirectTo: redirectTo || '/unauthorized',
  });
}

export function useManagerRoute(redirectTo?: string) {
  return useRouteProtection({
    requireAuth: true,
    requiredRoles: ['manager'],
    redirectTo: redirectTo || '/unauthorized',
  });
}

export function useAuthRequired(redirectTo?: string) {
  return useRouteProtection({
    requireAuth: true,
    redirectTo,
  });
}
