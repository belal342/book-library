import React from 'react';
import { BookOpen } from 'lucide-react';

const LoadingSpinner = ({ darkMode }) => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`rounded-lg overflow-hidden shadow-md animate-pulse ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className={`aspect-[3/4] ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
            <div className="p-4">
              <div className={`h-4 rounded mb-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
              <div className={`h-3 rounded w-3/4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;