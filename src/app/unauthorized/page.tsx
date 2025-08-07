'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

export default function UnauthorizedPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleGoHome = () => {
    router.push('/');
  };

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Access Denied
          </h1>
          <p className="mt-2 text-gray-600">
            You don&apos;t have permission to access this page
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Insufficient Permissions</CardTitle>
            <CardDescription>
              {user ? (
                <>
                  You are signed in as{' '}
                  <span className="font-medium">{user.email}</span> with{' '}
                  <span className="font-medium capitalize">{user.role}</span>{' '}
                  permissions, but this page requires additional access rights.
                </>
              ) : (
                'This page requires authentication and specific permissions to access.'
              )}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Need different access?
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        If you believe you should have access to this page,
                        please contact your administrator or try signing in with
                        a different account.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
            <Button
              onClick={handleGoHome}
              variant="primary"
              className="w-full sm:w-auto"
            >
              Go to Home
            </Button>

            {user && (
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Sign out
              </Button>
            )}
          </CardFooter>
        </Card>

        <div className="text-center">
          <button
            onClick={() => router.back()}
            className="text-sm text-primary-600 hover:text-primary-500"
          >
            ← Go back to previous page
          </button>
        </div>
      </div>
    </div>
  );
}
