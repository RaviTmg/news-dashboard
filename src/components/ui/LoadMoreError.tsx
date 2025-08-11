import React from 'react';
import { AlertCircleIcon } from '../icons';

interface LoadMoreErrorProps {
  error: string | null;
  articlesLength: number;
  isRateLimited: boolean;
  onRetry: () => void;
}

const LoadMoreError: React.FC<LoadMoreErrorProps> = ({
  error,
  articlesLength,
  isRateLimited,
  onRetry
}) => {
  if (!error || articlesLength === 0 || isRateLimited) {
    return null;
  }

  return (
    <div className="flex justify-center py-4">
      <div className="bg-red-50 border border-red-200 rounded-md p-4 max-w-md">
        <div className="flex">
          <AlertCircleIcon className="h-5 w-5 text-red-400" />
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
            <button
              onClick={onRetry}
              className="mt-2 text-sm font-medium text-red-600 hover:text-red-500"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadMoreError;