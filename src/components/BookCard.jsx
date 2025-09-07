import React from 'react';
import { Heart, BookOpen, Star } from 'lucide-react';

const BookCard = ({ book, onClick, onToggleFavorite, isFavorite, darkMode }) => {
  const { volumeInfo } = book;
  const thumbnail = volumeInfo?.imageLinks?.thumbnail || volumeInfo?.imageLinks?.smallThumbnail;

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(book);
  };

  return (
    <div className={`group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${
      darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
    }`}>
      <div className="relative overflow-hidden" onClick={onClick}>
        <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700">
          {thumbnail ? (
            <img
              src={thumbnail.replace('http:', 'https:')}
              alt={volumeInfo?.title || 'Book cover'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>
        
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
            isFavorite 
              ? 'bg-red-500 text-white opacity-100' 
              : 'bg-white bg-opacity-80 text-gray-700 hover:bg-opacity-100 opacity-0 group-hover:opacity-100'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>
      
      <div className="p-4" onClick={onClick}>
        <h3 className={`font-semibold text-sm line-clamp-2 mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {volumeInfo?.title || 'Untitled'}
        </h3>
        
        {volumeInfo?.authors && (
          <p className={`text-sm mb-2 line-clamp-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            by {volumeInfo.authors.join(', ')}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          {volumeInfo?.averageRating && (
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {volumeInfo.averageRating}
              </span>
            </div>
          )}
          
          {volumeInfo?.publishedDate && (
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {new Date(volumeInfo.publishedDate).getFullYear()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;