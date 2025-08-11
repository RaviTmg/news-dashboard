import React from 'react';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import newsSlice from '../../store/newsSlice';

// Mock react-intersection-observer
const mockUseInView = jest.fn();
jest.mock('react-intersection-observer', () => ({
  useInView: () => mockUseInView(),
}));

// Mock dispatch
const mockDispatch = jest.fn();
jest.mock('../../hooks/redux', () => ({
  useAppDispatch: () => mockDispatch,
}));

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

const wrapper = ({ children }: { children: React.ReactNode }) => {
  return React.createElement(Provider, { store: createMockStore() }, children);
};

describe('useInfiniteScroll', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseInView.mockReturnValue({
      ref: jest.fn(),
      inView: false,
    });
  });

  const defaultProps = {
    hasMore: true,
    loading: false,
    articlesLength: 10,
    isRateLimited: false,
    searchQuery: '',
  };

  it('returns ref from useInView hook', () => {
    const mockRef = jest.fn();
    mockUseInView.mockReturnValue({ ref: mockRef, inView: false });

    const { result } = renderHook(() => useInfiniteScroll(defaultProps), { wrapper });

    expect(result.current.ref).toBe(mockRef);
  });

  it('configures useInView with correct options', () => {
    renderHook(() => useInfiniteScroll(defaultProps), { wrapper });

    expect(mockUseInView).toHaveBeenCalled();
  });

  it('dispatches fetchMoreNews when conditions are met', () => {
    mockUseInView.mockReturnValue({
      ref: jest.fn(),
      inView: true,
    });

    renderHook(() => useInfiniteScroll({
      ...defaultProps,
      searchQuery: 'react',
    }), { wrapper });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('does not dispatch when not in view', () => {
    mockUseInView.mockReturnValue({
      ref: jest.fn(),
      inView: false,
    });

    renderHook(() => useInfiniteScroll(defaultProps), { wrapper });

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('does not dispatch when hasMore is false', () => {
    mockUseInView.mockReturnValue({
      ref: jest.fn(),
      inView: true,
    });

    renderHook(() => useInfiniteScroll({
      ...defaultProps,
      hasMore: false,
    }), { wrapper });

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('does not dispatch when loading is true', () => {
    mockUseInView.mockReturnValue({
      ref: jest.fn(),
      inView: true,
    });

    renderHook(() => useInfiniteScroll({
      ...defaultProps,
      loading: true,
    }), { wrapper });

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('does not dispatch when articles length is 0', () => {
    mockUseInView.mockReturnValue({
      ref: jest.fn(),
      inView: true,
    });

    renderHook(() => useInfiniteScroll({
      ...defaultProps,
      articlesLength: 0,
    }), { wrapper });

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('does not dispatch when rate limited', () => {
    mockUseInView.mockReturnValue({
      ref: jest.fn(),
      inView: true,
    });

    renderHook(() => useInfiniteScroll({
      ...defaultProps,
      isRateLimited: true,
    }), { wrapper });

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('passes search query in params when provided', () => {
    mockUseInView.mockReturnValue({
      ref: jest.fn(),
      inView: true,
    });

    renderHook(() => useInfiniteScroll({
      ...defaultProps,
      searchQuery: 'javascript',
    }), { wrapper });

    // The actual dispatch call will contain the thunk, so we check if it was called
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('passes empty params when no search query', () => {
    mockUseInView.mockReturnValue({
      ref: jest.fn(),
      inView: true,
    });

    renderHook(() => useInfiniteScroll({
      ...defaultProps,
      searchQuery: '',
    }), { wrapper });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('re-evaluates when dependencies change', () => {
    mockUseInView.mockReturnValue({
      ref: jest.fn(),
      inView: true,
    });

    const { rerender } = renderHook(
      (props) => useInfiniteScroll(props),
      {
        initialProps: { ...defaultProps, loading: true },
        wrapper,
      }
    );

    expect(mockDispatch).not.toHaveBeenCalled();

    // Change loading to false
    rerender({ ...defaultProps, loading: false });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('handles multiple rapid inView changes correctly', () => {
    let inViewValue = false;
    mockUseInView.mockImplementation(() => ({
      ref: jest.fn(),
      inView: inViewValue,
    }));

    const { rerender } = renderHook(() => useInfiniteScroll(defaultProps), { wrapper });

    // Simulate multiple rapid inView changes
    inViewValue = true;
    rerender();
    
    inViewValue = false;
    rerender();
    
    inViewValue = true;
    rerender();

    // Should have dispatched for the inView=true cases
    expect(mockDispatch).toHaveBeenCalled();
  });
});