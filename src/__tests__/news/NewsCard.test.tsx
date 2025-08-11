import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewsCard from '../../components/news/NewsCard';
import { NewsArticle } from '../../types';

const mockArticle: NewsArticle = {
  source: { id: 'test-source', name: 'Test Source' },
  author: 'John Doe',
  title: 'Test Article Title',
  description: 'This is a test article description that should be displayed in the card.',
  url: 'https://example.com/article',
  urlToImage: 'https://example.com/image.jpg',
  publishedAt: '2023-12-01T10:30:00Z',
  content: 'This is the full content of the test article.'
};

const mockArticleNoImage: NewsArticle = {
  ...mockArticle,
  urlToImage: null,
};

const mockArticleNoDescription: NewsArticle = {
  ...mockArticle,
  description: null,
};

const mockArticleNoAuthor: NewsArticle = {
  ...mockArticle,
  author: null,
};

describe('NewsCard', () => {
  it('renders article information correctly', () => {
    render(<NewsCard article={mockArticle} />);

    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
    expect(screen.getByText('Test Source')).toBeInTheDocument();
    expect(screen.getByText('By John Doe')).toBeInTheDocument();
    expect(screen.getByText(/This is a test article description/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /read full article/i })).toHaveAttribute('href', 'https://example.com/article');
  });

  it('renders image when urlToImage is provided', async () => {
    render(<NewsCard article={mockArticle} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Article Title');
  });

  it('renders placeholder when no image is provided', () => {
    render(<NewsCard article={mockArticleNoImage} />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    const placeholder = document.querySelector('.bg-gray-100');
    expect(placeholder).toBeInTheDocument();
  });

  it('handles image loading states', async () => {
    render(<NewsCard article={mockArticle} />);

    const image = screen.getByRole('img');

    expect(image).toHaveClass('opacity-0');

    fireEvent.load(image);

    await waitFor(() => {
      expect(image).toHaveClass('opacity-100');
    });
  });

  it('handles image error states', async () => {
    render(<NewsCard article={mockArticle} />);

    const image = screen.getByRole('img');

    fireEvent.error(image);

    await waitFor(() => {
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
  });

  it('does not render description when not provided', () => {
    render(<NewsCard article={mockArticleNoDescription} />);

    expect(screen.queryByText(/This is a test article description/)).not.toBeInTheDocument();
  });

  it('does not render author when not provided', () => {
    render(<NewsCard article={mockArticleNoAuthor} />);

    expect(screen.queryByText(/By /)).not.toBeInTheDocument();
  });

  it('formats date correctly', () => {
    render(<NewsCard article={mockArticle} />);

    expect(screen.getByText(/Dec 1, 2023/)).toBeInTheDocument();
  });

  it('truncates long descriptions', () => {
    const longDescription = 'This is a very long description that should be truncated to fit within the card layout and prevent overflow issues with the design system implementation.';
    const articleWithLongDescription = {
      ...mockArticle,
      description: longDescription
    };

    render(<NewsCard article={articleWithLongDescription} />);

    const description = screen.getByText(/This is a very long description/);
    expect(description.textContent).toContain('...');
  });

  it('applies custom className', () => {
    const { container } = render(<NewsCard article={mockArticle} className="custom-news-card" />);

    expect(container.firstChild).toHaveClass('custom-news-card');
  });

  it('has correct link attributes for external link', () => {
    render(<NewsCard article={mockArticle} />);

    const link = screen.getByRole('link', { name: /read full article/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders with proper semantic HTML structure', () => {
    render(<NewsCard article={mockArticle} />);

    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Test Article Title');
  });
});
