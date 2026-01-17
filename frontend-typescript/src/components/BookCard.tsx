import React from 'react';
import type { Book } from '../types/book';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Link 
      to={`/books/${book.bookId}`}
      className="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-slate-100">
        <img 
          src={book.bookImgUrl} 
          alt={book.bookTitle} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm flex items-center text-xs font-bold text-slate-800">
           <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
           {book.bookRating}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-slate-900 leading-tight mb-1 group-hover:text-brand-600 transition-colors">
          {book.bookTitle}
        </h3>
        <p className="text-slate-500 text-sm mb-3">{book.bookAuthor}</p>
        
        <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-grow">
          {book.bookDescription}
        </p>
        
        <div className="flex items-center justify-between mt-auto text-xs text-slate-400 border-t border-slate-100 pt-3">
          <span>{book.bookGenre}</span>
          <span>{book.bookPublishYear}</span>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;