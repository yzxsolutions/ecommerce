'use client';

import { Button } from '@/components/ui/button';

interface ProductErrorStateProps {
  error: string;
  onRetry?: () => void;
  isRetrying?: boolean;
  retryAttempt?: number;
  maxAttempts?: number;
  variant?: 'card' | 'page' | 'inline';
}

export function ProductErrorState({
  error,
  onRetry,
  isRetrying = false,
  retryAttempt = 0,
  maxAttempts = 3,
  variant = 'card',
}: ProductErrorStateProps) {
  const getErrorIcon = () => {
    if (
      error.toLowerCase().includes('network') ||
      error.toLowerCase().includes('fetch')
    ) {
      return (
        <svg
          className="w-8 h-8 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
          />
        </svg>
      );
    }

    if (
      error.toLowerCase().includes('not found') ||
      error.toLowerCase().includes('404')
    ) {
      return (
        <svg
          className="w-8 h-8 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      );
    }

    return (
      <svg
        className="w-8 h-8 text-red-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
    );
  };

  const getErrorTitle = () => {
    if (
      error.toLowerCase().includes('network') ||
      error.toLowerCase().includes('fetch')
    ) {
      return 'Connection Problem';
    }

    if (
      error.toLowerCase().includes('not found') ||
      error.toLowerCase().includes('404')
    ) {
      return 'Product Not Found';
    }

    return 'Something Went Wrong';
  };

  const getErrorMessage = () => {
    if (
      error.toLowerCase().includes('network') ||
      error.toLowerCase().includes('fetch')
    ) {
      return 'Unable to connect to our servers. Please check your internet connection and try again.';
    }

    if (
      error.toLowerCase().includes('not found') ||
      error.toLowerCase().includes('404')
    ) {
      return "The product you're looking for doesn't exist or has been removed.";
    }

    return 'We encountered an unexpected error. This might be a temporary issue.';
  };

  const baseClasses =
    variant === 'page'
      ? 'min-h-[400px] flex items-center justify-center'
      : variant === 'inline'
        ? 'py-8'
        : 'bg-white rounded-3xl shadow-sm border border-red-200 p-8';

  return (
    <div className={`text-center ${baseClasses}`}>
      <div className="max-w-md mx-auto">
        {/* Error Icon */}
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          {getErrorIcon()}
        </div>

        {/* Error Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {getErrorTitle()}
        </h3>

        {/* Error Message */}
        <p className="text-gray-600 mb-6">{getErrorMessage()}</p>

        {/* Retry Information */}
        {retryAttempt > 0 && (
          <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800">
              {isRetrying ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
                  Retrying... (Attempt {retryAttempt} of {maxAttempts})
                </span>
              ) : (
                `Failed after ${retryAttempt} attempt${retryAttempt > 1 ? 's' : ''}`
              )}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {onRetry && (
            <Button
              onClick={onRetry}
              disabled={isRetrying}
              className="bg-primary-600 hover:bg-primary-700 text-white"
            >
              {isRetrying ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Retrying...
                </span>
              ) : (
                'Try Again'
              )}
            </Button>
          )}

          {variant === 'page' && (
            <div className="flex gap-2 justify-center">
              <Button
                onClick={() => window.history.back()}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Go Back
              </Button>
              <Button
                onClick={() => (window.location.href = '/products')}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Browse Products
              </Button>
            </div>
          )}
        </div>

        {/* Technical Details */}
        <div className="mt-6 text-sm text-gray-500">
          <details className="cursor-pointer">
            <summary className="hover:text-gray-700">
              Show technical details
            </summary>
            <div className="mt-2 p-3 bg-gray-50 rounded-lg text-left text-xs font-mono">
              <div className="mb-2">
                <strong>Error:</strong> {error}
              </div>
              <div>
                <strong>Timestamp:</strong> {new Date().toISOString()}
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
