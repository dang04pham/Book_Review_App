import api from './api';
import type { Book, AddBookRequest, BookResponse } from '../types/book';
import type { SortBy, SortDir } from '../types/book';

export const createBook = async (data: AddBookRequest): Promise<Book> => {
  const response = await api.post<Book>(
    `/admin/books/create`,
    {
      bookIsbn: data.bookIsbn,
      bookTitle: data.bookTitle,
      bookImgUrl: data.bookImgUrl,
      bookAuthor: data.bookAuthor,
      bookGenre: data.bookGenre
    }
  );
  return response.data
}

export const getAllBooks = async (
    pageNumber = 0,
    pageSize = 10,
    sortBy?: SortBy,
    sortDir?: SortDir
  ): Promise<BookResponse> => {
    const response = await api.get<BookResponse>(
      `/public/books/getAll`,
      {
        params: { pageNumber, pageSize, sortBy, sortDir }
      }
    );
    return response.data;
};

export const getBookById = async (bookId: number): Promise<Book | undefined> => {
  const response = await api.get(
    `/public/books/getBookById`,
    {
      params: { bookId }
    }
  )
  return response.data;
}


