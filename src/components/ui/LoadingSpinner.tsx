import React from 'react';
import { LoadingSpinner as LoadingSpinnerIcon } from '../icons';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`inline-block ${className}`}>
      <LoadingSpinnerIcon className={`${sizeClasses[size]} animate-spin`} />
    </div>
  );
};

export default LoadingSpinner;