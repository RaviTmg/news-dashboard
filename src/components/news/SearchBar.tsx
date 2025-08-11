import React, { useState, useEffect, useRef } from 'react';
import { Input } from '../ui';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { performSearchWithFetch, setSearchQuery, resetNews } from '../../store/newsSlice';
import useDebounce from '../../hooks/useDebounce';
import { SearchIcon, WarningIcon, LoadingSpinner, XIcon } from '../icons';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  className = '',
  placeholder = 'Search news...',
}) => {
  const dispatch = useAppDispatch();
  const { searchQuery, loading, isRateLimited } = useAppSelector((state) => state.news);
  const [localValue, setLocalValue] = useState(searchQuery);
  const lastSearchRef = useRef<string>('');

  const debouncedSearchTerm = useDebounce(localValue, 500);

  useEffect(() => {
    // Don't do anything if we're rate limited
    if (isRateLimited) {
      return;
    }

    if (debouncedSearchTerm !== searchQuery && lastSearchRef.current !== debouncedSearchTerm) {
      // Single dispatch that handles everything: set query, reset state, and fetch
      dispatch(performSearchWithFetch(debouncedSearchTerm));
      lastSearchRef.current = debouncedSearchTerm;
    }
  }, [debouncedSearchTerm, dispatch, searchQuery, isRateLimited]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRateLimited) {
      return;
    }
    if (localValue.trim() && localValue.trim() !== searchQuery) {
      dispatch(performSearchWithFetch(localValue.trim()));
      lastSearchRef.current = localValue.trim();
    }
  };

  const handleClear = () => {
    setLocalValue('');
    dispatch(setSearchQuery(''));
    dispatch(resetNews());
  };

  const searchIcon = <SearchIcon className="h-5 w-5 text-gray-500" />;

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative group">
        <Input
          type="text"
          value={localValue}
          onChange={handleInputChange}
          placeholder={isRateLimited ? "Rate limited - please wait" : placeholder}
          icon={searchIcon}
          className={`pr-12 bg-white transition-colors duration-200 ${
            isRateLimited
              ? 'border border-orange-300 focus:border-orange-500'
              : 'border border-gray-200 focus:border-blue-500 hover:border-gray-300'
          }`}
          disabled={isRateLimited}
        />

        {/* Loading indicator, Rate limit indicator, or Clear button */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {isRateLimited ? (
            <div className="flex items-center">
              <WarningIcon className="h-5 w-5 text-orange-500" />
            </div>
          ) : loading ? (
            <div className="flex items-center">
              <LoadingSpinner className="h-5 w-5 text-blue-500" />
            </div>
          ) : localValue ? (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
              title="Clear search"
            >
              <XIcon className="h-4 w-4" />
            </button>
          ) : (
            <div className="opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">
              <kbd className="px-2 py-0.5 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">
                ⏎
              </kbd>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
