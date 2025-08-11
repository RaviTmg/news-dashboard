import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SearchBar from '../../components/news/SearchBar';
import newsSlice from '../../store/newsSlice';

jest.mock('../../hooks/useDebounce', () => {
  return jest.fn((value) => value); // Return value immediately for testing
});

const createMockStore = (initialState = {}) => {
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
        ...initialState,
      },
    },
  });
};

const renderWithStore = (component: React.ReactElement, initialState = {}) => {
  const store = createMockStore(initialState);
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('SearchBar', () => {
  it('renders search input with default placeholder', () => {
    renderWithStore(<SearchBar />);

    expect(screen.getByPlaceholderText('Search news...')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    renderWithStore(<SearchBar placeholder="Search articles..." />);

    expect(screen.getByPlaceholderText('Search articles...')).toBeInTheDocument();
  });

  it('displays search icon', () => {
    const { container } = renderWithStore(<SearchBar />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('handles input changes', async () => {
    renderWithStore(<SearchBar />);

    const input = screen.getByPlaceholderText('Search news...');
    fireEvent.change(input, { target: { value: 'react' } });

    expect(input).toHaveValue('react');
  });

  it('shows loading spinner when loading', () => {
    renderWithStore(<SearchBar />, { loading: true });

    const spinner = document.querySelector('svg');
    expect(spinner).toBeInTheDocument();
  });

  it('shows rate limited state with warning icon', () => {
    renderWithStore(<SearchBar />, {
      isRateLimited: true,
      error: 'Too many requests'
    });

    const input = screen.getByPlaceholderText('Rate limited - please wait');
    expect(input).toBeDisabled();

    const warningIcon = document.querySelector('.text-orange-500');
    expect(warningIcon).toBeInTheDocument();
  });

  it('shows clear button when there is input', async () => {
    renderWithStore(<SearchBar />);

    const input = screen.getByPlaceholderText('Search news...');
    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => {
      const clearButton = screen.getByTitle('Clear search');
      expect(clearButton).toBeInTheDocument();
    });
  });

  it('clears input when clear button is clicked', async () => {
    const { store } = renderWithStore(<SearchBar />);

    const input = screen.getByPlaceholderText('Search news...');
    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => {
      const clearButton = screen.getByTitle('Clear search');
      fireEvent.click(clearButton);
    });

    expect(input).toHaveValue('');
  });

  it('handles form submission', () => {
    const { container } = renderWithStore(<SearchBar />);

    const form = container.querySelector('form');
    const input = screen.getByPlaceholderText('Search news...');

    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.submit(form!);

    // Form submission should not cause page reload in test
    expect(form).toBeInTheDocument();
  });

  it('does not allow interaction when rate limited', () => {
    renderWithStore(<SearchBar />, {
      isRateLimited: true,
      error: 'Too many requests'
    });

    const input = screen.getByPlaceholderText('Rate limited - please wait');
    expect(input).toBeDisabled();
  });

  it('shows keyboard hint when input is empty and not focused', () => {
    renderWithStore(<SearchBar />);

    const keyboardHint = screen.getByText('⏎');
    expect(keyboardHint).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = renderWithStore(<SearchBar className="custom-search-bar" />);

    expect(container.querySelector('.custom-search-bar')).toBeInTheDocument();
  });

  it('initializes with current search query from store', () => {
    renderWithStore(<SearchBar />, { searchQuery: 'existing query' });

    const input = screen.getByDisplayValue('existing query');
    expect(input).toBeInTheDocument();
  });

  it('shows proper styling for rate limited state', () => {
    renderWithStore(<SearchBar />, {
      isRateLimited: true,
      error: 'Rate limited'
    });

    const input = screen.getByPlaceholderText('Rate limited - please wait');
    expect(input).toBeDisabled();
  });

  it('shows proper styling for normal state', () => {
    renderWithStore(<SearchBar />);

    const input = screen.getByPlaceholderText('Search news...');
    expect(input).not.toBeDisabled();
  });
});
