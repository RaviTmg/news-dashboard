import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorMessage from '../../components/ui/ErrorMessage';

describe('ErrorMessage', () => {
  it('renders error message', () => {
    render(<ErrorMessage message="Test error message" />);
    
    expect(screen.getByText('Test error message')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders default heading', () => {
    render(<ErrorMessage message="Error occurred" />);
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders retry button when onRetry is provided', () => {
    const handleRetry = jest.fn();
    render(<ErrorMessage message="Error message" onRetry={handleRetry} />);
    
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('does not render retry button when onRetry is not provided', () => {
    render(<ErrorMessage message="Error message" />);
    
    expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', () => {
    const handleRetry = jest.fn();
    render(<ErrorMessage message="Error message" onRetry={handleRetry} />);
    
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it('renders alert triangle icon', () => {
    const { container } = render(<ErrorMessage message="Error message" />);
    
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ErrorMessage message="Error message" className="custom-error-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-error-class');
  });

  it('has correct styling for error state', () => {
    const { container } = render(<ErrorMessage message="Error message" />);
    const iconContainer = container.querySelector('.bg-red-100');
    const heading = screen.getByText('Something went wrong');
    const message = screen.getByText('Error message');
    
    expect(iconContainer).toBeInTheDocument();
    expect(heading).toHaveClass('text-lg', 'font-medium', 'text-gray-900');
    expect(message).toHaveClass('text-gray-600');
  });
});