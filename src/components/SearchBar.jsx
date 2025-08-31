import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const SearchBar = ({ onSearch, searchQuery, searchFilter, darkMode }) => {
  const [query, setQuery] = useState(searchQuery);
  const [filter, setFilter] = useState(searchFilter);
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, filter);
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for books by title, author, or keyword..."
              className={`block w-full pl-10 pr-12 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0"
          >
            Search
          </button>
        </div>
        
        {showFilters && (
          <div className={`absolute top-full left-0 right-0 mt-2 p-4 rounded-lg shadow-lg border z-10 ${
            darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
          }`}>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Search in:
            </label>
            <div className="flex space-x-4">
              {[
                { value: 'all', label: 'All Fields' },
                { value: 'title', label: 'Title' },
                { value: 'author', label: 'Author' }
              ].map((option) => (
                <label key={option.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={option.value}
                    checked={filter === option.value}
                    onChange={(e) => setFilter(e.target.value)}
                    className="text-blue-600"
                  />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;