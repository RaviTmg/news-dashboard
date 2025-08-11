import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from '../../components/layout/Header';
import newsSlice from '../../store/newsSlice';

// Mock the SearchBar component since it's complex
jest.mock('../../components/news/SearchBar', () => {
  return function MockSearchBar({ placeholder }: { placeholder: string }) {
    return <input data-testid="mock-search-bar" placeholder={placeholder} />;
  };
});

const createMockStore = () => {
  return configureStore({
    reducer: {
      news: newsSlice,
    },
    preloadedState: {
      news: {
        articles: [],
        loading: false,
        error: null,
        totalResults: 0,
        currentPage: 1,
        hasMore: true,
        searchQuery: '',
        isRateLimited: false,
      },
    },
  });
};

const renderWithStore = (component: React.ReactElement) => {
  const store = createMockStore();
  return render(<Provider store={store}>{component}</Provider>);
};

describe('Header', () => {
  it('renders header element', () => {
    renderWithStore(<Header />);
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders logo and title', () => {
    renderWithStore(<Header />);
    
    expect(screen.getByText('News Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Stay updated with the latest news')).toBeInTheDocument();
  });

  it('renders news icon in logo', () => {
    const { container } = renderWithStore(<Header />);
    
    const logoContainer = container.querySelector('.bg-blue-600');
    expect(logoContainer).toBeInTheDocument();
    expect(logoContainer?.querySelector('svg')).toBeInTheDocument();
  });

  it('renders search bar', () => {
    renderWithStore(<Header />);
    
    expect(screen.getByTestId('mock-search-bar')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search news articles...')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = renderWithStore(<Header className="custom-header" />);
    
    expect(container.firstChild).toHaveClass('custom-header');
  });

  it('has correct header styling', () => {
    const { container } = renderWithStore(<Header />);
    
    expect(container.firstChild).toHaveClass(
      'bg-white',
      'shadow-sm',
      'border-b',
      'border-gray-200'
    );
  });

  it('has responsive layout classes', () => {
    const { container } = renderWithStore(<Header />);
    
    const layoutContainer = container.querySelector('.flex');
    expect(layoutContainer).toHaveClass(
      'flex',
      'flex-col',
      'sm:flex-row',
      'sm:items-center',
      'sm:justify-between'
    );
  });

  it('has proper semantic structure', () => {
    renderWithStore(<Header />);
    
    const header = screen.getByRole('banner');
    const heading = screen.getByRole('heading', { level: 1 });
    
    expect(header).toContainElement(heading);
    expect(heading).toHaveTextContent('News Dashboard');
  });

  it('has correct max-width container', () => {
    const { container } = renderWithStore(<Header />);
    
    const contentContainer = container.querySelector('.max-w-7xl');
    expect(contentContainer).toBeInTheDocument();
    expect(contentContainer).toHaveClass('mx-auto', 'px-4', 'sm:px-6', 'lg:px-8');
  });

  it('positions search bar correctly', () => {
    const { container } = renderWithStore(<Header />);
    
    const searchContainer = container.querySelector('.w-full.sm\\:w-96');
    expect(searchContainer).toBeInTheDocument();
    expect(searchContainer).toHaveClass('sm:max-w-md');
  });
});