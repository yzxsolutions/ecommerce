'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/hooks/auth';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

function AccountPageContent() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="mt-2 text-gray-600">
            Manage your profile, orders, and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <p className="text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Role</label>
                  <p className="text-gray-900 capitalize">{user?.role}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </CardFooter>
          </Card>

          {/* Order History */}
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                View your past orders and track current ones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-500">No orders yet</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Orders
              </Button>
            </CardFooter>
          </Card>

          {/* Address Book */}
          <Card>
            <CardHeader>
              <CardTitle>Address Book</CardTitle>
              <CardDescription>
                Manage your shipping and billing addresses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-500">No addresses saved</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Add Address
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Account Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
              <CardDescription>
                Manage your account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline">
                  Change Password
                </Button>
                <Button variant="outline">
                  Privacy Settings
                </Button>
                <Button variant="outline">
                  Notification Preferences
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <ProtectedRoute requireAuth={true}>
      <AccountPageContent />
    </ProtectedRoute>
  );
}