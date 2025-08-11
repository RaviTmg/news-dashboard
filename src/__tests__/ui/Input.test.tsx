import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../components/ui/Input';

describe('Input', () => {
  it('renders input element', () => {
    render(<Input />);
    
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with label when provided', () => {
    render(<Input label="Email Address" />);
    
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByText('Email Address')).toBeInTheDocument();
  });

  it('renders with error message when provided', () => {
    render(<Input error="This field is required" />);
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('border-red-300');
  });

  it('renders with icon when provided', () => {
    const TestIcon = <span data-testid="test-icon">Icon</span>;
    render(<Input icon={TestIcon} />);
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('pl-10');
  });

  it('applies custom className', () => {
    render(<Input className="custom-input-class" />);
    
    expect(screen.getByRole('textbox')).toHaveClass('custom-input-class');
  });

  it('handles input changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test input' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('generates unique id when not provided', () => {
    const { rerender } = render(<Input label="First Input" />);
    const firstInput = screen.getByRole('textbox');
    const firstId = firstInput.getAttribute('id');
    
    rerender(<Input label="Second Input" />);
    const secondInput = screen.getByRole('textbox');
    const secondId = secondInput.getAttribute('id');
    
    expect(firstId).toBeTruthy();
    expect(secondId).toBeTruthy();
    expect(firstId).not.toBe(secondId);
  });

  it('uses provided id', () => {
    render(<Input id="custom-id" label="Test Input" />);
    const input = screen.getByRole('textbox');
    
    expect(input).toHaveAttribute('id', 'custom-id');
  });

  it('applies default styles correctly', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    
    expect(input).toHaveClass(
      'block',
      'w-full',
      'rounded-lg',
      'border-gray-300',
      'focus:border-blue-500',
      'text-gray-900',
      'py-3',
      'pl-4',
      'pr-4'
    );
  });

  it('passes through other input props', () => {
    render(<Input placeholder="Enter text" type="email" />);
    const input = screen.getByRole('textbox');
    
    expect(input).toHaveAttribute('placeholder', 'Enter text');
    expect(input).toHaveAttribute('type', 'email');
  });
});