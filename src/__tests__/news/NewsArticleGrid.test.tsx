import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsArticleGrid from '../../components/news/NewsArticleGrid';
import { NewsArticle } from '../../types';

const mockArticles: NewsArticle[] = [
  {
    source: { id: '1', name: 'Test Source 1' },
    author: 'Author 1',
    title: 'Test Article 1',
    description: 'Description 1',
    url: 'https://example.com/1',
    urlToImage: 'https://example.com/image1.jpg',
    publishedAt: '2023-12-01T10:30:00Z',
    content: 'Content 1'
  },
  {
    source: { id: '2', name: 'Test Source 2' },
    author: 'Author 2',
    title: 'Test Article 2',
    description: 'Description 2',
    url: 'https://example.com/2',
    urlToImage: 'https://example.com/image2.jpg',
    publishedAt: '2023-12-02T10:30:00Z',
    content: 'Content 2'
  }
];

jest.mock('../../components/news/NewsCard', () => {
  return function MockNewsCard({ article }: { article: NewsArticle }) {
    return <div data-testid="news-card">{article.title}</div>;
  };
});

jest.mock('../../components/ui/LoadingCard', () => {
  return function MockLoadingCard() {
    return <div data-testid="loading-card">Loading...</div>;
  };
});

describe('NewsArticleGrid', () => {
  it('renders articles in a grid', () => {
    render(<NewsArticleGrid articles={mockArticles} loading={false} />);

    expect(screen.getAllByTestId('news-card')).toHaveLength(2);
    expect(screen.getByText('Test Article 1')).toBeInTheDocument();
    expect(screen.getByText('Test Article 2')).toBeInTheDocument();
  });

  it('renders loading cards when loading', () => {
    render(<NewsArticleGrid articles={mockArticles} loading={true} />);

    expect(screen.getAllByTestId('loading-card')).toHaveLength(8);
    expect(screen.getAllByText('Loading...')).toHaveLength(8);
  });

  it('renders both articles and loading cards when loading with existing articles', () => {
    render(<NewsArticleGrid articles={mockArticles} loading={true} />);

    expect(screen.getAllByTestId('news-card')).toHaveLength(2);
    expect(screen.getAllByTestId('loading-card')).toHaveLength(8);
  });

  it('does not render loading cards when not loading', () => {
    render(<NewsArticleGrid articles={mockArticles} loading={false} />);

    expect(screen.queryAllByTestId('loading-card')).toHaveLength(0);
  });

  it('renders empty grid when no articles', () => {
    render(<NewsArticleGrid articles={[]} loading={false} />);

    expect(screen.queryAllByTestId('news-card')).toHaveLength(0);
    expect(screen.queryAllByTestId('loading-card')).toHaveLength(0);
  });

  it('renders only loading cards when no articles but loading', () => {
    render(<NewsArticleGrid articles={[]} loading={true} />);

    expect(screen.queryAllByTestId('news-card')).toHaveLength(0);
    expect(screen.getAllByTestId('loading-card')).toHaveLength(8);
  });

  it('has correct grid CSS classes', () => {
    const { container } = render(<NewsArticleGrid articles={mockArticles} loading={false} />);

    const gridContainer = container.firstChild;
    expect(gridContainer).toHaveClass(
      'grid',
      'grid-cols-1',
      'md:grid-cols-2',
      'lg:grid-cols-3',
      'xl:grid-cols-4',
      'gap-6'
    );
  });

  it('generates unique keys for articles', () => {
    const { container } = render(<NewsArticleGrid articles={mockArticles} loading={false} />);

    const newsCards = container.querySelectorAll('[data-testid="news-card"]');
    expect(newsCards).toHaveLength(2);
  });

  it('generates unique keys for loading cards', () => {
    const { container } = render(<NewsArticleGrid articles={[]} loading={true} />);

    const loadingCards = container.querySelectorAll('[data-testid="loading-card"]');
    expect(loadingCards).toHaveLength(8);
  });
});
