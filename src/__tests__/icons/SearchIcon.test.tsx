import React from 'react';
import { render } from '@testing-library/react';
import { SearchIcon } from '../../components/icons';

describe('SearchIcon', () => {
  it('renders with default className', () => {
    const { container } = render(<SearchIcon />);
    const svg = container.querySelector('svg');
    
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('h-5', 'w-5');
  });

  it('renders with custom className', () => {
    const customClass = 'h-8 w-8 text-red-500';
    const { container } = render(<SearchIcon className={customClass} />);
    const svg = container.querySelector('svg');
    
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('h-8', 'w-8', 'text-red-500');
  });

  it('has correct SVG attributes', () => {
    const { container } = render(<SearchIcon />);
    const svg = container.querySelector('svg');
    
    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
  });

  it('contains the correct path element', () => {
    const { container } = render(<SearchIcon />);
    const path = container.querySelector('path');
    
    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute('stroke-linecap', 'round');
    expect(path).toHaveAttribute('stroke-linejoin', 'round');
    expect(path).toHaveAttribute('stroke-width', '2');
  });
});