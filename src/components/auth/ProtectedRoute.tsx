'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth';
import { User } from '@/types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRoles?: Array<User['role']>;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({
  children,
  requireAuth = true,
  requiredRoles = [],
  redirectTo = '/auth/login',
  fallback,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

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
      router.push(redirectTo);
      return;
    }

    // Check role-based access if roles are specified
    if (requiredRoles.length > 0) {
      const hasRequiredRole = requiredRoles.includes(user.role);
      if (!hasRequiredRole) {
        setIsAuthorized(false);
        // Redirect to appropriate page based on user role
        if (user.role === 'customer') {
          router.push('/'); // Redirect customers to home
        } else {
          router.push('/unauthorized'); // Redirect to unauthorized page
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
  ]);

  // Show loading state while determining auth status
  if (isLoading || isAuthorized === null) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      )
    );
  }

  // If not authorized, don't render children (redirect is handled in useEffect)
  if (!isAuthorized) {
    return null;
  }

  // Render protected content
  return <>{children}</>;
}

// Higher-order component version for easier usage
export function withProtectedRoute<P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<ProtectedRouteProps, 'children'> = {}
) {
  const ProtectedComponent = (props: P) => {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };

  ProtectedComponent.displayName = `withProtectedRoute(${Component.displayName || Component.name})`;

  return ProtectedComponent;
}

// Convenience components for common use cases
export function CustomerRoute({
  children,
  ...props
}: Omit<ProtectedRouteProps, 'requiredRoles'>) {
  return (
    <ProtectedRoute requiredRoles={['customer']} {...props}>
      {children}
    </ProtectedRoute>
  );
}

export function AdminRoute({
  children,
  ...props
}: Omit<ProtectedRouteProps, 'requiredRoles'>) {
  return (
    <ProtectedRoute
      requiredRoles={['admin', 'manager']}
      redirectTo="/unauthorized"
      {...props}
    >
      {children}
    </ProtectedRoute>
  );
}

export function ManagerRoute({
  children,
  ...props
}: Omit<ProtectedRouteProps, 'requiredRoles'>) {
  return (
    <ProtectedRoute
      requiredRoles={['manager']}
      redirectTo="/unauthorized"
      {...props}
    >
      {children}
    </ProtectedRoute>
  );
}
