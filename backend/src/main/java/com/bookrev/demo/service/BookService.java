package com.bookrev.demo.service;

import com.bookrev.demo.dto.BookDto;
import com.bookrev.demo.payload.BookResponse;
import com.bookrev.demo.payload.BookReviewResponse;

public interface BookService {
    BookDto addBook(BookDto bookDto);
    BookResponse getAllBooks(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);
    BookDto getBookById(Long bookId);
    BookDto updateBook(Long bookId, BookDto bookDto);
    BookDto deleteBook(Long bookId);
}
