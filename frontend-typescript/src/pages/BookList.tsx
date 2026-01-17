import React, { useEffect, useState } from 'react';
import { getAllBooks } from '../services/bookService';
import { useMemo } from 'react';
import type { Book } from '../types/book.ts';
import type { SortBy, SortDir } from '../types/book.ts';
import BookCard from '../components/BookCard.tsx';
import { Search, ArrowUpDown } from 'lucide-react';


const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<'default' | 'rating_desc' | 'rating_asc'>('default');

  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    lastPage: false,
  });

  const getSortParams = (): { sortBy: SortBy; sortDir: SortDir } => {
    switch (sortOption) {
      case 'rating_desc':
        return { sortBy: 'bookRating', sortDir: 'desc' };
      case 'rating_asc':
        return { sortBy: 'bookRating', sortDir: 'asc' };
      default:
        return { sortBy: 'bookId', sortDir: 'asc' };
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);

      const { sortBy, sortDir } = getSortParams();

      try {
          const data = await getAllBooks(currentPage, pageInfo.pageSize, sortBy, sortDir);

          setBooks(data.content);
          setPageInfo({
              pageNumber: data.pageNumber,
              totalPages: data.totalPages,
              pageSize: data.pageSize,
              totalElements: data.totalElements,
              lastPage: data.lastPage,
          });                
        } catch (error) {
          console.error("Failed to fetch books", error);
        } finally {
          setLoading(false);
      }
    }

    fetchBooks();
  }, [currentPage, sortOption]);

    
  const filteredBooks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return books.filter(book => {
      const title = book.bookTitle?.toLowerCase() ?? '';
      const author = book.bookAuthor?.toLowerCase() ?? '';
      const genre = book.bookGenre?.toLowerCase() ?? '';

      return (
      title.includes(normalizedSearch) ||
      author.includes(normalizedSearch) ||
      genre.includes(normalizedSearch)
      );
    });
  }, [books, searchTerm]);

    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Library</h1>
            <p className="text-slate-500 mt-1">Discover your next favorite read.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
              />
            </div>
  
            <div className="relative w-full sm:w-48">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ArrowUpDown className="h-4 w-4 text-slate-400" />
              </div>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="block w-full pl-10 pr-10 py-2 border border-slate-300 rounded-lg leading-5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm appearance-none cursor-pointer"
              >
                <option value="default">Sort by...</option>
                <option value="rating_desc">Rating: High to Low</option>
                <option value="rating_asc">Rating: Low to High</option>
              </select>
              {/* Custom chevron for the select input */}
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
              </div>
            </div>
          </div>
        </div>
  
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-96 animate-pulse border border-slate-100"></div>
            ))}
          </div>
        ) : (
          <>
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map(book => (
                  <BookCard key={book.bookId} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-500 text-lg">No books found matching your search.</p>
              </div>
            )}
          </>
        )}

        {!loading && pageInfo.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(p => p - 1)}
              className="px-4 py-2 rounded-lg border text-sm disabled:opacity-50"
            >
              Previous
            </button>

            {[...Array(pageInfo.totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`px-4 py-2 rounded-lg border text-sm
                  ${index === currentPage
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-700 hover:bg-slate-100"}
                `}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={pageInfo.lastPage}
              onClick={() => setCurrentPage(p => p + 1)}
              className="px-4 py-2 rounded-lg border text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
};

export default BookList;
