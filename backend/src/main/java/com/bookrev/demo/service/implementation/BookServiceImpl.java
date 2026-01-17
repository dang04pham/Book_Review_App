package com.bookrev.demo.service.implementation;

import com.bookrev.demo.dto.BookDto;
import com.bookrev.demo.exception.ResourceNotFoundException;
import com.bookrev.demo.model.Book;
import com.bookrev.demo.model.Review;
import com.bookrev.demo.payload.BookResponse;
import com.bookrev.demo.repository.BookRepository;
import com.bookrev.demo.service.BookService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository, ModelMapper modelMapper) {
        this.bookRepository = bookRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public BookDto addBook(BookDto bookDto) {
        Book book = new Book();
        book.setBookTitle(bookDto.getBookTitle());
        book.setBookImgUrl(bookDto.getBookImgUrl());
        book.setBookAuthor(bookDto.getBookAuthor());
        book.setBookGenre(bookDto.getBookGenre());
        book.setBookDescription(bookDto.getBookDescription());
        book.setBookPublishYear(bookDto.getBookPublishYear());
        book.setBookRating(0.0);

        Book savedBook = bookRepository.save(book);
        return modelMapper.map(savedBook, BookDto.class);
    }

    @Override
    public BookResponse getAllBooks(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
        // Sort direction: "asc" or "desc"
        Sort sort = sortDir.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending() :
                Sort.by(sortBy).descending();

        // Page Request
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        // Fetch paginated books
        Page<Book> booksPage = bookRepository.findAll(pageable);

        // Map books to DTOs
        List<BookDto> bookDtos = booksPage.getContent()
                .stream()
                .map(book -> modelMapper.map(book, BookDto.class))
                .toList();

        // Build and return the BookResponse
        BookResponse bookResponse = new BookResponse();
        bookResponse.setContent(bookDtos);
        bookResponse.setPageNumber(booksPage.getNumber());
        bookResponse.setPageSize(booksPage.getSize());
        bookResponse.setTotalElements(booksPage.getTotalElements());
        bookResponse.setTotalPages(booksPage.getTotalPages());
        bookResponse.setLastPage(booksPage.isLast());

        return bookResponse;
    }

    @Override
    public BookDto getBookById(Long bookId) {
        Book book = bookRepository.findByBookId(bookId).orElseThrow(() -> new RuntimeException("Book not found with id: " + bookId));

        return modelMapper.map(book, BookDto.class);
    }

    @Override
    public BookDto updateBook(Long bookId, BookDto bookDto) {
        // Fetch the book by ID
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book", "Id", bookId.toString()));

        // Update book fields
        book.setBookTitle(bookDto.getBookTitle());
        book.setBookImgUrl(bookDto.getBookImgUrl());
        book.setBookAuthor(bookDto.getBookAuthor());
        book.setBookGenre(bookDto.getBookGenre());
        book.setBookDescription(bookDto.getBookDescription());

        // Save the updated book back to the repository
        Book updatedBook = bookRepository.save(book);

        // Map updated book to BookDto and return
        return modelMapper.map(updatedBook, BookDto.class);

    }

    @Override
    public BookDto deleteBook(Long bookId) {
        // Fetch the book by ID
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book", "Id", bookId.toString()));
        bookRepository.save(book);
        // Delete the book
        bookRepository.delete(book);
        return modelMapper.map(book, BookDto.class);
    }

}
