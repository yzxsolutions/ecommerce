import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes and their required roles
const protectedRoutes = {
  '/account': { requireAuth: true },
  '/orders': { requireAuth: true },
  '/admin': { requireAuth: true, roles: ['admin', 'manager'] },
  '/admin/*': { requireAuth: true, roles: ['admin', 'manager'] },
};

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/products',
  '/categories',
  '/about',
  '/contact',
  '/terms',
  '/privacy',
  '/unauthorized',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }

  // Check if route is public
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check if route is protected
  const protectedRoute = Object.entries(protectedRoutes).find(([route]) => {
    if (route.endsWith('/*')) {
      return pathname.startsWith(route.slice(0, -2));
    }
    return pathname === route || pathname.startsWith(route + '/');
  });

  if (protectedRoute) {
    // For now, we'll let the client-side components handle the protection
    // In a real application, you might want to check for authentication tokens here
    // and redirect server-side if needed
    // Example of server-side token checking (commented out):
    /*
    const token = request.cookies.get('access_token')?.value;
    if (!token) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    */
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
