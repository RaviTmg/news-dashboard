import React from 'react';
import { LoadingSpinner } from '../icons';

interface InfiniteScrollTriggerProps {
  loading: boolean;
  hasMore: boolean;
  articlesLength: number;
  triggerRef: (node?: Element | null) => void;
}

const InfiniteScrollTrigger: React.FC<InfiniteScrollTriggerProps> = ({
  loading,
  hasMore,
  articlesLength,
  triggerRef
}) => {
  if (!hasMore || articlesLength === 0) {
    return null;
  }

  return (
    <div ref={triggerRef} className="flex justify-center py-8">
      {loading && (
        <div className="flex items-center space-x-2 text-gray-500">
          <LoadingSpinner className="h-5 w-5 text-gray-500" />
          <span>Loading more articles...</span>
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollTrigger;