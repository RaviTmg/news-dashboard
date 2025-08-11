import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { NewsState, SearchParams } from '../types';
import { newsService } from '../services/newsService';

// Helper function to check if error indicates rate limiting
const isRateLimitError = (errorMessage?: string): boolean => {
  if (!errorMessage) return false;
  const msg = errorMessage.toLowerCase();
  return msg.includes('too many requests') || 
         msg.includes('rate limit') ||
         errorMessage.includes('429') ||
         msg.includes('developer accounts are limited');
};

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
  totalResults: 0,
  currentPage: 1,
  hasMore: true,
  searchQuery: '',
  isRateLimited: false,
};

export const fetchTopHeadlines = createAsyncThunk(
  'news/fetchTopHeadlines',
  async (params: SearchParams = {}, { getState, rejectWithValue }) => {
    const state = getState() as { news: NewsState };
    if (state.news.isRateLimited) {
      return rejectWithValue('Rate limited - cannot make request');
    }
    const response = await newsService.getTopHeadlines(params);
    return response;
  }
);

export const searchNews = createAsyncThunk(
  'news/searchNews',
  async (params: SearchParams, { getState, rejectWithValue }) => {
    const state = getState() as { news: NewsState };
    if (state.news.isRateLimited) {
      return rejectWithValue('Rate limited - cannot make request');
    }
    const response = await newsService.searchEverything(params);
    return response;
  }
);

export const fetchMoreNews = createAsyncThunk(
  'news/fetchMoreNews',
  async (params: SearchParams, { getState, rejectWithValue }) => {
    const state = getState() as { news: NewsState };
    if (state.news.isRateLimited) {
      return rejectWithValue('Rate limited - cannot make request');
    }
    const nextPage = state.news.currentPage + 1;
    const response = await newsService.searchEverything({
      ...params,
      page: nextPage,
    });
    return { ...response, page: nextPage };
  }
);

export const performSearchWithFetch = createAsyncThunk(
  'news/performSearchWithFetch',
  async (searchTerm: string, { getState, rejectWithValue, dispatch }) => {
    const state = getState() as { news: NewsState };
    if (state.news.isRateLimited) {
      return rejectWithValue('Rate limited - cannot make request');
    }
    
    // First set the search query and reset state
    dispatch(performSearch(searchTerm));
    
    // Then fetch results if there's a search term
    if (searchTerm.trim()) {
      return await dispatch(searchNews({ q: searchTerm })).unwrap();
    }
    
    return null;
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearError: (state) => {
      state.error = null;
      state.isRateLimited = false;
    },
    resetNews: (state) => {
      state.articles = [];
      state.currentPage = 1;
      state.hasMore = true;
      state.totalResults = 0;
      state.error = null;
    },
    performSearch: (state, action: PayloadAction<string>) => {
      // Set the search query and reset news in a single action
      state.searchQuery = action.payload;
      state.articles = [];
      state.currentPage = 1;
      state.hasMore = true;
      state.totalResults = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopHeadlines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopHeadlines.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.articles;
        state.totalResults = action.payload.totalResults;
        state.currentPage = 1;
        state.hasMore = action.payload.articles.length > 0 && action.payload.totalResults > action.payload.articles.length;
      })
      .addCase(fetchTopHeadlines.rejected, (state, action) => {
        state.loading = false;
        // Preserve the original error message for rate limiting detection
        const errorMessage = action.error.message || 'Failed to fetch news';
        state.error = errorMessage;
        state.isRateLimited = isRateLimitError(errorMessage);
      })
      .addCase(searchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.articles;
        state.totalResults = action.payload.totalResults;
        state.currentPage = 1;
        state.hasMore = action.payload.articles.length > 0 && action.payload.totalResults > action.payload.articles.length;
      })
      .addCase(searchNews.rejected, (state, action) => {
        state.loading = false;
        // Preserve the original error message for rate limiting detection
        const errorMessage = action.error.message || 'Failed to search news';
        state.error = errorMessage;
        state.isRateLimited = isRateLimitError(errorMessage);
      })
      .addCase(fetchMoreNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMoreNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = [...state.articles, ...action.payload.articles];
        state.currentPage = action.payload.page;
        const totalFetched = state.articles.length;
        state.hasMore = totalFetched < action.payload.totalResults;
      })
      .addCase(fetchMoreNews.rejected, (state, action) => {
        state.loading = false;
        const errorMessage = action.error.message || 'Failed to load more news';
        state.error = errorMessage;
        state.isRateLimited = isRateLimitError(errorMessage);
      });
  },
});

export const { setSearchQuery, clearError, resetNews, performSearch } = newsSlice.actions;
export default newsSlice.reducer;