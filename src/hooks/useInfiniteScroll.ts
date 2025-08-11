import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppDispatch } from './redux';
import { fetchMoreNews } from '../store/newsSlice';
import { SearchParams } from '../types';

interface UseInfiniteScrollProps {
  hasMore: boolean;
  loading: boolean;
  articlesLength: number;
  isRateLimited: boolean;
  searchQuery: string;
}

export const useInfiniteScroll = ({
  hasMore,
  loading,
  articlesLength,
  isRateLimited,
  searchQuery
}: UseInfiniteScrollProps) => {
  const dispatch = useAppDispatch();
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (!inView || !hasMore) return;
    if (loading || articlesLength === 0 || isRateLimited) return;

    const params: SearchParams = searchQuery ? { q: searchQuery } : {};
    dispatch(fetchMoreNews(params));
  }, [
    inView,
    hasMore,
    loading,
    dispatch,
    searchQuery,
    articlesLength,
    isRateLimited,
  ]);

  return { ref };
};