import { useState, useCallback } from 'react';

interface SimpleRetryOptions {
  maxAttempts?: number;
  delay?: number;
  backoffMultiplier?: number;
}

interface SimpleRetryState {
  isRetrying: boolean;
  attempt: number;
  lastError: Error | null;
}

export function useSimpleRetry(options: SimpleRetryOptions = {}) {
  const { maxAttempts = 3, delay = 1000, backoffMultiplier = 1.5 } = options;

  const [retryState, setRetryState] = useState<SimpleRetryState>({
    isRetrying: false,
    attempt: 0,
    lastError: null,
  });

  const executeWithRetry = useCallback(
    async <T>(asyncFunction: () => Promise<T>): Promise<T> => {
      let currentAttempt = 0;
      let currentDelay = delay;

      while (currentAttempt < maxAttempts) {
        try {
          setRetryState({
            isRetrying: currentAttempt > 0,
            attempt: currentAttempt + 1,
            lastError: null,
          });

          const result = await asyncFunction();

          // Reset state on success
          setRetryState({
            isRetrying: false,
            attempt: 0,
            lastError: null,
          });

          return result;
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
            throw errorObj;
          }

          // Wait before retrying with exponential backoff
          await new Promise((resolve) => setTimeout(resolve, currentDelay));
          currentDelay *= backoffMultiplier;
        }
      }

      throw new Error('Max retry attempts reached');
    },
    [maxAttempts, delay, backoffMultiplier]
  );

  const reset = useCallback(() => {
    setRetryState({
      isRetrying: false,
      attempt: 0,
      lastError: null,
    });
  }, []);

  return {
    executeWithRetry,
    ...retryState,
    reset,
  };
}
