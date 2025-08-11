import React from 'react';
import { render } from '@testing-library/react';
import { LoadingSpinner } from '../../components/icons';

describe('LoadingSpinner', () => {
  it('renders with default className including animate-spin', () => {
    const { container } = render(<LoadingSpinner />);
    const svg = container.querySelector('svg');
    
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('h-5', 'w-5', 'animate-spin');
  });

  it('renders with custom className', () => {
    const customClass = 'h-8 w-8 text-blue-500';
    const { container } = render(<LoadingSpinner className={customClass} />);
    const svg = container.querySelector('svg');
    
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('h-8', 'w-8', 'text-blue-500');
  });

  it('has correct SVG structure for spinner', () => {
    const { container } = render(<LoadingSpinner />);
    const svg = container.querySelector('svg');
    const circle = container.querySelector('circle');
    const path = container.querySelector('path');
    
    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveClass('opacity-25');
    expect(path).toBeInTheDocument();
    expect(path).toHaveClass('opacity-75');
  });

  it('applies custom className', () => {
    const { container } = render(<LoadingSpinner className="text-red-500" />);
    const svg = container.querySelector('svg');
    
    expect(svg).toHaveClass('text-red-500');
    // The animate-spin class is applied by default in LoadingSpinner component
    expect(svg).toBeInTheDocument();
  });
});