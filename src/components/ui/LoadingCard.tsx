import React from 'react';

const LoadingCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-300"></div>
      
      {/* Content skeleton */}
      <div className="p-4">
        {/* Source and date */}
        <div className="flex justify-between items-center mb-2">
          <div className="h-3 bg-gray-300 rounded w-20"></div>
          <div className="h-3 bg-gray-300 rounded w-16"></div>
        </div>
        
        {/* Title */}
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
        
        {/* Description */}
        <div className="space-y-2 mb-3">
          <div className="h-3 bg-gray-300 rounded"></div>
          <div className="h-3 bg-gray-300 rounded"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>
        
        {/* Author */}
        <div className="h-3 bg-gray-300 rounded w-24 mb-3"></div>
        
        {/* Read more link */}
        <div className="h-4 bg-gray-300 rounded w-28"></div>
      </div>
    </div>
  );
};

export default LoadingCard;