import { NewsApiResponse, NewsApiError, SearchParams } from '../types';

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_NEWS_API_BASE_URL || 'https://newsapi.org/v2';

class NewsService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = API_KEY || '';
    this.baseUrl = BASE_URL;

    if (!this.apiKey) {
      console.warn('News API key is not configured. Please set NEXT_PUBLIC_NEWS_API_KEY in your environment variables.');
    }
  }

  private buildUrl(endpoint: string, params: SearchParams = {}): string {
    const url = new URL(`${this.baseUrl}/${endpoint}`);
    
    url.searchParams.append('apiKey', this.apiKey);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, String(value));
      }
    });

    return url.toString();
  }

  private async fetchWithErrorHandling(url: string): Promise<NewsApiResponse> {
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        const error = data as NewsApiError;
        // Include status code for 429 errors
        const errorMessage = response.status === 429 
          ? `429 - ${error.message || 'Too Many Requests'}`
          : error.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      if (data.status === 'error') {
        const error = data as NewsApiError;
        throw new Error(error.message);
      }

      return data as NewsApiResponse;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch news data');
    }
  }

  async getTopHeadlines(params: SearchParams = {}): Promise<NewsApiResponse> {
    const defaultParams = {
      country: 'us',
      pageSize: 20,
      page: 1,
      ...params,
    };

    const url = this.buildUrl('top-headlines', defaultParams);
    return this.fetchWithErrorHandling(url);
  }

  async searchEverything(params: SearchParams): Promise<NewsApiResponse> {
    const defaultParams = {
      sortBy: 'publishedAt' as const,
      pageSize: 20,
      page: 1,
      language: 'en',
      ...params,
    };

    if (!defaultParams.q && !defaultParams.sources) {
      defaultParams.q = 'news';
    }

    const url = this.buildUrl('everything', defaultParams);
    return this.fetchWithErrorHandling(url);
  }

  async getNewsByCategory(category: string, params: SearchParams = {}): Promise<NewsApiResponse> {
    return this.getTopHeadlines({
      ...params,
      category,
    });
  }

  async getNewsBySources(sources: string, params: SearchParams = {}): Promise<NewsApiResponse> {
    return this.getTopHeadlines({
      ...params,
      sources,
      country: undefined,
    });
  }
}

export const newsService = new NewsService();