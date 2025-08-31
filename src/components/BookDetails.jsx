import React, { useEffect } from 'react';
import { X, Heart, User, Calendar, Building, BookOpen, Star } from 'lucide-react';

const BookDetails = ({ book, onClose, onToggleFavorite, isFavorite, darkMode }) => {
  const { volumeInfo } = book;
  const thumbnail = volumeInfo?.imageLinks?.large || volumeInfo?.imageLinks?.medium || volumeInfo?.imageLinks?.thumbnail;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        
        <div className={`relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 rounded-full z-10 transition-colors ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Book Cover */}
              <div className="md:col-span-1">
                <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  {thumbnail ? (
                    <img
                      src={thumbnail.replace('http:', 'https:')}
                      alt={volumeInfo?.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
                
                <button
                  onClick={onToggleFavorite}
                  className={`w-full mt-4 px-4 py-2 rounded-lg font-medium transition-colors ${
                    isFavorite
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : darkMode 
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 inline mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              </div>
              
              {/* Book Details */}
              <div className="md:col-span-2">
                <h1 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {volumeInfo?.title}
                </h1>
                
                {volumeInfo?.authors && (
                  <div className="flex items-center space-x-2 mb-3">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      by {volumeInfo.authors.join(', ')}
                    </span>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {volumeInfo?.publishedDate && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {new Date(volumeInfo.publishedDate).getFullYear()}
                      </span>
                    </div>
                  )}
                  
                  {volumeInfo?.publisher && (
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {volumeInfo.publisher}
                      </span>
                    </div>
                  )}
                  
                  {volumeInfo?.pageCount && (
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {volumeInfo.pageCount} pages
                      </span>
                    </div>
                  )}
                  
                  {volumeInfo?.averageRating && (
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {volumeInfo.averageRating} / 5
                      </span>
                    </div>
                  )}
                </div>
                
                {volumeInfo?.categories && (
                  <div className="mb-4">
                    <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {volumeInfo.categories.map((category, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded text-xs ${
                            darkMode 
                              ? 'bg-gray-700 text-gray-300' 
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {volumeInfo?.description && (
                  <div>
                    <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Description
                    </h3>
                    <div 
                      className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}
                      dangerouslySetInnerHTML={{ __html: volumeInfo.description }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;