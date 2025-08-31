import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, onBookClick, onToggleFavorite, isFavorite, darkMode }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onClick={() => onBookClick(book)}
          onToggleFavorite={() => onToggleFavorite(book)}
          isFavorite={isFavorite(book.id)}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
};

export default BookList;