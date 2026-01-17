package com.bookrev.demo.controller;

import com.bookrev.demo.config.AppConstants;
import com.bookrev.demo.dto.BookDto;
import com.bookrev.demo.payload.BookResponse;
import com.bookrev.demo.payload.BookReviewResponse;
import com.bookrev.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping("/admin/books/create")
    public ResponseEntity<BookDto> addBook(@RequestBody BookDto bookDto) {
        BookDto savedBookDto = bookService.addBook(bookDto);
        return new ResponseEntity<>(savedBookDto, HttpStatus.OK);
    }

    @GetMapping("/public/books/getAll")
    public ResponseEntity<BookResponse> getAllBooks(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_BOOKS_BY, required = false) String sortBy,
            @RequestParam(name = "sortDir", defaultValue = AppConstants.SORT_DIR, required = false) String sortDir){
        BookResponse bookResponse = bookService.getAllBooks(pageNumber, pageSize, sortBy, sortDir);
        return new ResponseEntity<>(bookResponse, HttpStatus.OK);
    }

    @GetMapping("/public/books/getBookById")
    public ResponseEntity<BookDto> getBookById(@RequestParam(name = "bookId") Long bookId) {
        BookDto bookDto = bookService.getBookById(bookId);
        return new ResponseEntity<>(bookDto, HttpStatus.OK);
    }

    @PutMapping("/admin/books/update")
    public ResponseEntity<BookDto> updateBook(@RequestParam(name = "bookId") Long bookId, @RequestBody BookDto bookDto) {
        BookDto updatedBookDto = bookService.updateBook(bookId, bookDto);
        return new ResponseEntity<>(updatedBookDto, HttpStatus.OK);
    }

    @DeleteMapping("/admin/books/delete")
    public ResponseEntity<BookDto> deleteBook(@RequestParam(name = "bookId") Long bookId) {
        BookDto deletedBookDto = bookService.deleteBook(bookId);
        return new ResponseEntity<>(deletedBookDto, HttpStatus.OK);
    }
}
