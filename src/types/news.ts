export interface NewsSource {
  id: string | null;
  name: string;
}

export interface NewsArticle {
  source: NewsSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export interface NewsApiError {
  status: string;
  code: string;
  message: string;
}

export interface SearchParams {
  q?: string;
  category?: string;
  country?: string;
  sources?: string;
  page?: number;
  pageSize?: number;
  sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
  language?: string;
  from?: string;
  to?: string;
}

export interface NewsState {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
  totalResults: number;
  currentPage: number;
  hasMore: boolean;
  searchQuery: string;
  isRateLimited: boolean;
}

export interface LoadingState {
  isLoading: boolean;
  isError: boolean;
  error?: string;
}

export type NewsCategory = 
  | 'general'
  | 'business'
  | 'entertainment'
  | 'health'
  | 'science'
  | 'sports'
  | 'technology';

export interface FetchNewsParams extends SearchParams {
  endpoint: 'everything' | 'top-headlines';
}