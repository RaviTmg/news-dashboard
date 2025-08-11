import React from 'react';
import { NewsIcon } from '../icons';

interface EmptyStateProps {
  searchQuery?: string;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  searchQuery, 
  className = '' 
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[400px] text-center ${className}`}
    >
      <NewsIcon className="h-16 w-16 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No articles found
      </h3>
      <p className="text-gray-500 max-w-md">
        {searchQuery
          ? `No articles found for "${searchQuery}". Try a different search term.`
          : "No articles available at the moment."}
      </p>
    </div>
  );
};

export default EmptyState;