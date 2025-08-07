'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/hooks/auth';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function OrdersPageContent() {
  const { user } = useAuth();

  // Mock order data
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 89.99,
      items: 5,
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 156.50,
      items: 8,
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'processing',
      total: 45.25,
      items: 3,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-2 text-gray-600">
            Track your orders and view your purchase history
          </p>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
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
              <h3 className="mt-4 text-lg font-medium text-gray-900">No orders yet</h3>
              <p className="mt-2 text-gray-500">
                When you place your first order, it will appear here.
              </p>
              <div className="mt-6">
                <Button>
                  Start Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Order {order.id}</CardTitle>
                      <CardDescription>
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Total Amount</p>
                      <p className="text-lg font-semibold text-gray-900">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Items</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {order.items} items
                      </p>
                    </div>
                    <div className="flex items-end">
                      <Button variant="outline" className="w-full md:w-auto">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Order Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>
                Get assistance with your orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline">
                  Track an Order
                </Button>
                <Button variant="outline">
                  Return an Item
                </Button>
                <Button variant="outline">
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <ProtectedRoute requireAuth={true}>
      <OrdersPageContent />
    </ProtectedRoute>
  );
}