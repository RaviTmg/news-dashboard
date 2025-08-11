import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { clearError } from "../../store/newsSlice";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { ErrorMessage, EmptyState, InfiniteScrollTrigger, EndOfResultsMessage, LoadMoreError } from "../ui";
import NewsArticleGrid from "./NewsArticleGrid";

interface NewsFeedProps {
  className?: string;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const { articles, loading, error, hasMore, searchQuery, isRateLimited } =
    useAppSelector((state) => state.news);

  const { ref } = useInfiniteScroll({
    hasMore,
    loading,
    articlesLength: articles.length,
    isRateLimited,
    searchQuery
  });

  const handleRetry = () => {
    dispatch(clearError());
  };

  // Error state when no articles are loaded
  if (error && articles.length === 0) {
    return (
      <div
        className={`flex justify-center items-center min-h-[400px] ${className}`}
      >
        <ErrorMessage
          message={error}
          onRetry={isRateLimited ? undefined : handleRetry}
        />
      </div>
    );
  }

  // Empty state when no articles and not loading
  if (articles.length === 0 && !loading) {
    return (
      <EmptyState 
        searchQuery={searchQuery} 
        className={className}
      />
    );
  }

  return (
    <div className={className}>
      <NewsArticleGrid articles={articles} loading={loading} />
      
      <InfiniteScrollTrigger
        loading={loading}
        hasMore={hasMore}
        articlesLength={articles.length}
        triggerRef={ref}
      />

      <EndOfResultsMessage
        hasMore={hasMore}
        articlesLength={articles.length}
      />

      <LoadMoreError
        error={error}
        articlesLength={articles.length}
        isRateLimited={isRateLimited}
        onRetry={handleRetry}
      />
    </div>
  );
};

export default NewsFeed;
