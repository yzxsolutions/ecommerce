import { useState, useCallback } from 'react';

interface RetryOptions {
  maxAttempts?: number;
  delay?: number;
  backoffMultiplier?: number;
  onRetry?: (attempt: number, error: Error) => void;
  onMaxAttemptsReached?: (error: Error) => void;
}

interface RetryState {
  isRetrying: boolean;
  attempt: number;
  lastError: Error | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useRetry<T extends (...args: any[]) => Promise<any>>(
  asyncFunction: T,
  options: RetryOptions = {}
) {
  const {
    maxAttempts = 3,
    delay = 1000,
    backoffMultiplier = 2,
    onRetry,
    onMaxAttemptsReached,
  } = options;

  const [retryState, setRetryState] = useState<RetryState>({
    isRetrying: false,
    attempt: 0,
    lastError: null,
  });

  const executeWithRetry = useCallback(
    async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
      let currentAttempt = 0;
      let currentDelay = delay;

      while (currentAttempt < maxAttempts) {
        try {
          setRetryState({
            isRetrying: currentAttempt > 0,
            attempt: currentAttempt + 1,
            lastError: null,
          });

          const result = await asyncFunction(...args);

          // Reset state on success
          setRetryState({
            isRetrying: false,
            attempt: 0,
            lastError: null,
          });

          return result as Awaited<ReturnType<T>>;
        } catch (error) {
          currentAttempt++;
          const errorObj =
            error instanceof Error ? error : new Error(String(error));

          setRetryState({
            isRetrying: true,
            attempt: currentAttempt,
            lastError: errorObj,
          });

          if (currentAttempt >= maxAttempts) {
            setRetryState((prev) => ({ ...prev, isRetrying: false }));
            onMaxAttemptsReached?.(errorObj);
            throw errorObj;
          }

          // Call retry callback
          onRetry?.(currentAttempt, errorObj);

          // Wait before retrying with exponential backoff
          await new Promise((resolve) => setTimeout(resolve, currentDelay));
          currentDelay *= backoffMultiplier;
        }
      }

      throw new Error('Max retry attempts reached');
    },
    [
      asyncFunction,
      maxAttempts,
      delay,
      backoffMultiplier,
      onRetry,
      onMaxAttemptsReached,
    ]
  );

  const reset = useCallback(() => {
    setRetryState({
      isRetrying: false,
      attempt: 0,
      lastError: null,
    });
  }, []);

  return {
    execute: executeWithRetry,
    ...retryState,
    reset,
  };
}

// Specialized hook for API calls with common retry patterns
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useApiRetry<T extends (...args: any[]) => Promise<any>>(
  apiFunction: T,
  options: RetryOptions & {
    showToast?: boolean;
    toastMessage?: string;
  } = {}
) {
  const {
    showToast = true,
    toastMessage = 'Retrying request...',
    ...retryOptions
  } = options;

  return useRetry(apiFunction, {
    maxAttempts: 3,
    delay: 1000,
    backoffMultiplier: 1.5,
    onRetry: (attempt, error) => {
      console.log(`API retry attempt ${attempt}:`, error.message);

      // You can integrate with a toast library here
      if (showToast && attempt > 1) {
        console.log(toastMessage);
      }
    },
    onMaxAttemptsReached: (error) => {
      console.error('API call failed after all retry attempts:', error);

      // You can integrate with error reporting here
      if (showToast) {
        console.error('Request failed. Please try again later.');
      }
    },
    ...retryOptions,
  });
}
