import React from 'react';
import { render, screen } from '@testing-library/react';
import InfiniteScrollTrigger from '../../components/ui/InfiniteScrollTrigger';

describe('InfiniteScrollTrigger', () => {
  const mockRef = jest.fn();

  it('renders loading spinner when loading', () => {
    render(
      <InfiniteScrollTrigger
        loading={true}
        hasMore={true}
        articlesLength={10}
        triggerRef={mockRef}
      />
    );

    expect(screen.getByText('Loading more articles...')).toBeInTheDocument();
  });

  it('does not render when hasMore is false', () => {
    const { container } = render(
      <InfiniteScrollTrigger
        loading={true}
        hasMore={false}
        articlesLength={10}
        triggerRef={mockRef}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('does not render when articlesLength is 0', () => {
    const { container } = render(
      <InfiniteScrollTrigger
        loading={true}
        hasMore={true}
        articlesLength={0}
        triggerRef={mockRef}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders container but no loading text when not loading', () => {
    render(
      <InfiniteScrollTrigger
        loading={false}
        hasMore={true}
        articlesLength={10}
        triggerRef={mockRef}
      />
    );

    expect(screen.queryByText('Loading more articles...')).not.toBeInTheDocument();
  });

  it('calls triggerRef with container element', () => {
    const { container } = render(
      <InfiniteScrollTrigger
        loading={false}
        hasMore={true}
        articlesLength={10}
        triggerRef={mockRef}
      />
    );

    expect(mockRef).toHaveBeenCalledWith(container.firstChild);
  });

  it('has correct styling classes', () => {
    const { container } = render(
      <InfiniteScrollTrigger
        loading={true}
        hasMore={true}
        articlesLength={10}
        triggerRef={mockRef}
      />
    );

    expect(container.firstChild).toHaveClass('flex', 'justify-center', 'py-8');
  });

  it('renders loading spinner with correct classes when loading', () => {
    const { container } = render(
      <InfiniteScrollTrigger
        loading={true}
        hasMore={true}
        articlesLength={10}
        triggerRef={mockRef}
      />
    );

    const spinnerContainer = container.querySelector('.flex.items-center.space-x-2');
    expect(spinnerContainer).toBeInTheDocument();
    expect(spinnerContainer).toHaveClass('text-gray-500');
  });

  it('renders with proper semantic structure', () => {
    render(
      <InfiniteScrollTrigger
        loading={true}
        hasMore={true}
        articlesLength={10}
        triggerRef={mockRef}
      />
    );

    const loadingText = screen.getByText('Loading more articles...');
    expect(loadingText.tagName).toBe('SPAN');
  });
});