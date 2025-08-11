import React from 'react';
import { NewsArticle } from '../../types';
import NewsCard from './NewsCard';
import { LoadingCard } from '../ui';

interface NewsArticleGridProps {
  articles: NewsArticle[];
  loading: boolean;
}

const NewsArticleGrid: React.FC<NewsArticleGridProps> = ({ articles, loading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {articles.map((article, index) => (
        <NewsCard key={`${article.url}-${index}`} article={article} />
      ))}
      
      {/* Loading cards */}
      {loading &&
        Array.from({ length: 8 }).map((_, index) => (
          <LoadingCard key={`loading-${index}`} />
        ))}
    </div>
  );
};

export default NewsArticleGrid;