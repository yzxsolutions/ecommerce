'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Supermarket Frontend
          </h1>
          <p className="text-xl text-gray-600">
            A modern e-commerce platform with authentication and route
            protection
          </p>
        </div>

        {/* Mock Credentials Info */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">
                🧪 Mock Authentication (Testing Mode)
              </CardTitle>
              <CardDescription>
                Use these test credentials to login since backend is not
                connected yet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">
                    👑 Admin User
                  </h3>
                  <p className="text-sm text-red-700">
                    <strong>Email:</strong> admin@test.com
                    <br />
                    <strong>Password:</strong> admin123
                  </p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800 mb-2">
                    👨‍💼 Manager User
                  </h3>
                  <p className="text-sm text-yellow-700">
                    <strong>Email:</strong> manager@test.com
                    <br />
                    <strong>Password:</strong> manager123
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">
                    👤 Customer User
                  </h3>
                  <p className="text-sm text-green-700">
                    <strong>Email:</strong> customer@test.com
                    <br />
                    <strong>Password:</strong> customer123
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> You can also register new users - they
                  will be created as customers by default. For password reset
                  testing, use token:{' '}
                  <code className="bg-blue-100 px-1 rounded">
                    reset-test-token
                  </code>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Authentication Status */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Status</CardTitle>
              <CardDescription>
                Current user authentication and role information
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isAuthenticated && user ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Status:
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Authenticated
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Name:
                    </span>
                    <span className="text-sm text-gray-900">{user.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Email:
                    </span>
                    <span className="text-sm text-gray-900">{user.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Role:
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {user.role}
                    </span>
                  </div>
                  <div className="pt-3 border-t">
                    <Button onClick={handleLogout} variant="outline" size="sm">
                      Sign Out
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Not Authenticated
                  </span>
                  <div className="mt-4 space-x-3">
                    <Link href="/auth/login">
                      <Button size="sm">Sign In</Button>
                    </Link>
                    <Link href="/auth/register">
                      <Button variant="outline" size="sm">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Public Routes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Public Routes</CardTitle>
              <CardDescription>
                These pages are accessible to everyone
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/" className="block">
                  <Button variant="ghost" className="w-full justify-start">
                    🏠 Home
                  </Button>
                </Link>
                <Link href="/products" className="block">
                  <Button variant="ghost" className="w-full justify-start">
                    🛍️ Products
                  </Button>
                </Link>
                <Link href="/auth/login" className="block">
                  <Button variant="ghost" className="w-full justify-start">
                    🔑 Login
                  </Button>
                </Link>
                <Link href="/auth/register" className="block">
                  <Button variant="ghost" className="w-full justify-start">
                    📝 Register
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Protected Routes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Protected Routes</CardTitle>
              <CardDescription>
                These pages require authentication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/account" className="block">
                  <Button variant="ghost" className="w-full justify-start">
                    👤 My Account
                  </Button>
                </Link>
                <Link href="/orders" className="block">
                  <Button variant="ghost" className="w-full justify-start">
                    📦 My Orders
                  </Button>
                </Link>
                {!isAuthenticated && (
                  <p className="text-xs text-gray-500 mt-2">
                    * Requires authentication
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Admin Routes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Admin Routes</CardTitle>
              <CardDescription>
                These pages require admin/manager role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/admin" className="block">
                  <Button variant="ghost" className="w-full justify-start">
                    ⚙️ Admin Dashboard
                  </Button>
                </Link>
                <Link href="/unauthorized" className="block">
                  <Button variant="ghost" className="w-full justify-start">
                    🚫 Unauthorized Page
                  </Button>
                </Link>
                {(!isAuthenticated ||
                  (user && !['admin', 'manager'].includes(user.role))) && (
                  <p className="text-xs text-gray-500 mt-2">
                    * Requires admin/manager role
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Route Protection Demo */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Route Protection Demo</CardTitle>
              <CardDescription>
                Test the authentication and authorization system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">
                    How it works:
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Public routes are accessible to everyone</li>
                    <li>
                      • Protected routes redirect to login if not authenticated
                    </li>
                    <li>• Admin routes check for admin/manager roles</li>
                    <li>• Unauthorized users see an access denied page</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-900 mb-2">
                    Test Scenarios:
                  </h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>1. Try accessing /account without logging in</li>
                    <li>2. Login as a customer and try accessing /admin</li>
                    <li>
                      3. Register with different roles to test permissions
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
