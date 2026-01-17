package com.bookrev.demo.repository;

import com.bookrev.demo.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findByBookId(Long bookId);
    Optional<Book> findByBookTitle(String bookTitle);

}
