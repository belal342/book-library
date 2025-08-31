import React, { useState, useEffect, useCallback } from "react";
import { BookOpen, Sun, Moon, Heart } from "lucide-react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorDisplay from "./components/ErrorDisplay";
import Pagination from "./components/Pagination";

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchFilter, setSearchFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const itemsPerPage = 12;

  // Default books to show on initial load - with working placeholder images
  const defaultBooks = [
    {
      id: "1",
      volumeInfo: {
        title: "To Kill a Mockingbird",
        authors: ["Harper Lee"],
        imageLinks: {
          thumbnail: "https://covers.openlibrary.org/b/id/8259447-L.jpg",
        },
        averageRating: 4.8,
        publishedDate: "1960-07-11",
        description:
          "A gripping tale of racial injustice and childhood innocence in the American South.",
      },
    },
    {
      id: "2",
      volumeInfo: {
        title: "The Alchemist",
        authors: ["Paulo Coelho"],
        imageLinks: {
          thumbnail: "https://covers.openlibrary.org/b/id/8905826-L.jpg",
        },
        averageRating: 4.7,
        publishedDate: "1988-04-25",
        description:
          "A mystical story of a shepherd boy's journey to find his Personal Legend.",
      },
    },
    {
      id: "3",
      volumeInfo: {
        title: "The Little Prince",
        authors: ["Antoine de Saint-Exupéry"],
        imageLinks: {
          thumbnail: "https://covers.openlibrary.org/b/id/8262993-L.jpg",
        },
        averageRating: 4.9,
        publishedDate: "1943-04-06",
        description:
          "A poetic tale about a young prince who visits various planets in space.",
      },
    },

    {
      id: "4",
      volumeInfo: {
        title: "The Hobbit",
        authors: ["J.R.R. Tolkien"],
        imageLinks: {
          thumbnail: "https://covers.openlibrary.org/b/id/6979865-L.jpg",
        },
        averageRating: 4.8,
        publishedDate: "1937-09-21",
        description:
          "A fantasy novel about Bilbo Baggins and his unexpected journey.",
      },
    },
    {
      id: "5",
      volumeInfo: {
        title: "The Da Vinci Code",
        authors: ["Dan Brown"],
        imageLinks: {
          thumbnail: "https://covers.openlibrary.org/b/id/4431526-L.jpg",
        },
        averageRating: 4.2,
        publishedDate: "2003-03-18",
        description:
          "A mystery thriller that explores secrets hidden in Leonardo da Vinci's works.",
      },
    },
    {
      id: "6",
      volumeInfo: {
        title: "The Hunger Games",
        authors: ["Suzanne Collins"],
        imageLinks: {
          thumbnail: "https://covers.openlibrary.org/b/id/7336975-L.jpg",
        },
        averageRating: 4.5,
        publishedDate: "2008-09-14",
        description:
          "A dystopian novel about a televised battle where only one survivor remains.",
      },
    },
  ];
  // Load favorites, theme, and default books on mount
  useEffect(() => {
    const savedFavorites = JSON.parse(
      sessionStorage.getItem("bookFavorites") || "[]"
    );
    const savedTheme = sessionStorage.getItem("bookLibraryTheme") === "dark";
    setFavorites(savedFavorites);
    setDarkMode(savedTheme);

    // Set default books on initial load
    setBooks(defaultBooks);
    setTotalItems(defaultBooks.length);
  }, []);

  // Save favorites to memory
  useEffect(() => {
    sessionStorage.setItem("bookFavorites", JSON.stringify(favorites));
  }, [favorites]);

  // Save theme to memory
  useEffect(() => {
    sessionStorage.setItem("bookLibraryTheme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Search books using Google Books API
  const searchBooks = useCallback(
    async (query, page = 1, filter = "all") => {
      if (!query.trim()) {
        // If empty search, show default books again
        setBooks(defaultBooks);
        setTotalItems(defaultBooks.length);
        setCurrentPage(1);
        setHasSearched(false);
        return;
      }

      setLoading(true);
      setError(null);
      setHasSearched(true);

      try {
        let searchTerm = query;
        if (filter === "author") {
          searchTerm = `inauthor:${query}`;
        } else if (filter === "title") {
          searchTerm = `intitle:${query}`;
        }

        const startIndex = (page - 1) * itemsPerPage;
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            searchTerm
          )}&startIndex=${startIndex}&maxResults=${itemsPerPage}&orderBy=relevance`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await response.json();
        setBooks(data.items || []);
        setTotalItems(data.totalItems || 0);
        setCurrentPage(page);
      } catch (err) {
        setError(err.message);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    },
    [itemsPerPage]
  );

  // Handle search
  const handleSearch = (query, filter = searchFilter) => {
    setSearchQuery(query);
    setSearchFilter(filter);

    if (!query.trim()) {
      // Show default books for empty search
      setBooks(defaultBooks);
      setTotalItems(defaultBooks.length);
      setCurrentPage(1);
      setHasSearched(false);
    } else {
      // Perform API search for non-empty query
      setCurrentPage(1);
      searchBooks(query, 1, filter);
    }
  };

  // Handle pagination
  const handlePageChange = (page) => {
    if (searchQuery.trim()) {
      searchBooks(searchQuery, page, searchFilter);
    } else {
      // For default books, just update the page state
      setCurrentPage(page);
    }
  };

  // Toggle favorite
  const toggleFavorite = (book) => {
    const bookId = book.id;
    setFavorites((prev) => {
      if (prev.find((fav) => fav.id === bookId)) {
        return prev.filter((fav) => fav.id !== bookId);
      } else {
        return [...prev, book];
      }
    });
  };

  // Check if book is favorite
  const isFavorite = (bookId) => {
    return favorites.some((fav) => fav.id === bookId);
  };

  // Calculate pagination for default books
  const getPaginatedBooks = () => {
    if (!searchQuery.trim()) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      return defaultBooks.slice(startIndex, startIndex + itemsPerPage);
    }
    return books;
  };

  const totalPages = Math.ceil(
    searchQuery.trim()
      ? totalItems / itemsPerPage
      : defaultBooks.length / itemsPerPage
  );

  const displayedBooks = getPaginatedBooks();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-40 shadow-sm border-b transition-colors duration-300 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold">Book Library</h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-sm">{favorites.length}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <SearchBar
          onSearch={handleSearch}
          searchQuery={searchQuery}
          searchFilter={searchFilter}
          darkMode={darkMode}
        />

        {/* Error Display */}
        {error && <ErrorDisplay message={error} darkMode={darkMode} />}

        {/* Loading State */}
        {loading && <LoadingSpinner darkMode={darkMode} />}

        {/* No Results */}
        {!loading && hasSearched && books.length === 0 && !error && (
          <div
            className={`text-center py-12 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">
              No books found. Try a different search term.
            </p>
          </div>
        )}

        {/* Featured Books Section */}
        {!loading && !hasSearched && displayedBooks.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-6">Popular Books</h2>
            <BookList
              books={displayedBooks}
              onBookClick={setSelectedBook}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
              darkMode={darkMode}
            />

            {/* Pagination for default books */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                darkMode={darkMode}
              />
            )}
          </>
        )}

        {/* Search Results */}
        {!loading && hasSearched && books.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-6">Search Results</h2>
            <BookList
              books={books}
              onBookClick={setSelectedBook}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
              darkMode={darkMode}
            />

            {/* Pagination for search results */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                darkMode={darkMode}
              />
            )}
          </>
        )}
      </main>

      {/* Book Details Modal */}
      {selectedBook && (
        <BookDetails
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite(selectedBook.id)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default App;
