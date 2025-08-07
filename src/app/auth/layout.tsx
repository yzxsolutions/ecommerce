import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication - Supermarket Frontend',
  description: 'Sign in or create an account to start shopping',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
