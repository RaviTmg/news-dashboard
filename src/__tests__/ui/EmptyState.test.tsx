import React from 'react';
import { render, screen } from '@testing-library/react';
import EmptyState from '../../components/ui/EmptyState';

describe('EmptyState', () => {
  it('renders default empty state message', () => {
    render(<EmptyState />);
    
    expect(screen.getByText('No articles found')).toBeInTheDocument();
    expect(screen.getByText('No articles available at the moment.')).toBeInTheDocument();
  });

  it('renders search-specific message when searchQuery is provided', () => {
    render(<EmptyState searchQuery="react" />);
    
    expect(screen.getByText('No articles found')).toBeInTheDocument();
    expect(screen.getByText('No articles found for "react". Try a different search term.')).toBeInTheDocument();
  });

  it('renders news icon', () => {
    const { container } = render(<EmptyState />);
    
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<EmptyState className="custom-empty-state" />);
    
    expect(container.firstChild).toHaveClass('custom-empty-state');
  });

  it('has correct styling structure', () => {
    const { container } = render(<EmptyState />);
    
    expect(container.firstChild).toHaveClass(
      'flex',
      'flex-col', 
      'items-center',
      'justify-center',
      'min-h-[400px]',
      'text-center'
    );
  });

  it('renders heading with correct styling', () => {
    render(<EmptyState />);
    
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveClass('text-lg', 'font-medium', 'text-gray-900', 'mb-2');
  });

  it('handles empty search query', () => {
    render(<EmptyState searchQuery="" />);
    
    expect(screen.getByText('No articles available at the moment.')).toBeInTheDocument();
  });

  it('handles search query with special characters', () => {
    render(<EmptyState searchQuery="react & vue" />);
    
    expect(screen.getByText('No articles found for "react & vue". Try a different search term.')).toBeInTheDocument();
  });
});