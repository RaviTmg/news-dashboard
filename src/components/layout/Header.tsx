import React from 'react';
import { SearchBar } from '../news';
import { NewsIcon } from '../icons';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 gap-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <NewsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                News Dashboard
              </h1>
              <p className="text-sm text-gray-500 hidden sm:block">
                Stay updated with the latest news
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full sm:w-96 sm:max-w-md">
            <SearchBar placeholder="Search news articles..." />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;