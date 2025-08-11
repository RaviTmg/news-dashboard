'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchTopHeadlines } from '../store/newsSlice';
import { Layout } from '../components/layout';
import { NewsFeed } from '../components/news';

export default function Home() {
  const dispatch = useAppDispatch();
  const { articles, searchQuery, isRateLimited } = useAppSelector((state) => state.news);

  useEffect(() => {
    if (!searchQuery && articles.length === 0 && !isRateLimited) {
      dispatch(fetchTopHeadlines({ country: 'us', pageSize: 20 }));
    }
  }, [dispatch, searchQuery, articles.length, isRateLimited]);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="text-center py-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Latest News'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {searchQuery
              ? 'Discover articles related to your search'
              : 'Stay informed with the latest headlines and breaking news from trusted sources'}
          </p>
        </div>

        {/* News Feed */}
        <NewsFeed />
      </div>
    </Layout>
  );
}