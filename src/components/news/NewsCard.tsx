import React, { useState } from "react";
import { NewsArticle } from "../../types";
import { ImageIcon, ExternalLinkIcon } from "../icons";
import clsx from "clsx";

interface NewsCardProps {
  article: NewsArticle;
  className?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, className = "" }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  return (
    <article
      className={clsx(
        "bg-white rounded-lg",
        "shadow-md hover:shadow-lg",
        "transition-shadow duration-300 overflow-hidden",
        "flex flex-col",
        className,
      )}
    >
      {/* Image Section */}
      <div className="relative h-48 bg-gray-200">
        {article.urlToImage && !imageError ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse bg-gray-300 w-full h-full"></div>
              </div>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.urlToImage}
              alt={article.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <ImageIcon className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 grow flex flex-col">
        {/* Source and Date */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span className="font-medium">{article.source.name}</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>

        {/* Title */}
        <h2 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            {article.title}
          </a>
        </h2>

        {/* Description */}
        {article.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-3 grow">
            {truncateText(article.description, 150)}
          </p>
        )}

        {/* Author */}
        {article.author && (
          <p className="text-xs text-gray-500 mb-3">By {article.author}</p>
        )}

        {/* Read More Link */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          Read full article
          <ExternalLinkIcon className="ml-1 h-4 w-4" />
        </a>
      </div>
    </article>
  );
};

export default React.memo(NewsCard);
