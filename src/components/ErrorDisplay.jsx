import React from 'react';
import { X } from 'lucide-react';

const ErrorDisplay = ({ message, darkMode }) => {
  return (
    <div className={`text-center py-8 px-4 rounded-lg mb-6 ${
      darkMode ? 'bg-red-900 bg-opacity-20 border border-red-800' : 'bg-red-50 border border-red-200'
    }`}>
      <div className="text-red-500 mb-2">
        <X className="w-8 h-8 mx-auto" />
      </div>
      <p className={`text-lg font-medium ${darkMode ? 'text-red-400' : 'text-red-800'}`}>
        Something went wrong
      </p>
      <p className={`text-sm mt-1 ${darkMode ? 'text-red-300' : 'text-red-600'}`}>
        {message}
      </p>
    </div>
  );
};

export default ErrorDisplay;