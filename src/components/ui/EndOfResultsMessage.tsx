import React from 'react';

interface EndOfResultsMessageProps {
  hasMore: boolean;
  articlesLength: number;
}

const EndOfResultsMessage: React.FC<EndOfResultsMessageProps> = ({
  hasMore,
  articlesLength
}) => {
  if (hasMore || articlesLength === 0) {
    return null;
  }

  return (
    <div className="text-center py-8 text-gray-500">
      <p>You&apos;ve reached the end of the articles</p>
    </div>
  );
};

export default EndOfResultsMessage;