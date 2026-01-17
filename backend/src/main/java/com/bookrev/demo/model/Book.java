package com.bookrev.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "books")
public class Book {

    @Id
    @Column(name = "book_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookId;

    @Column(name = "book_ISBN")
    private String bookIsbn;

    @Column(name = "book_title")
    private String bookTitle;

    @Column(name = "book_img")
    private String bookImgUrl;

    @Column(name = "book_author")
    private String bookAuthor;

    @Column(name = "book_genre")
    private String bookGenre;

    @Column(name = "book_description")
    private String bookDescription;

    @Column(name = "book_publish_year")
    private Integer bookPublishYear;

    @Column(name = "book_rating")
    private Double bookRating;

    @OneToMany(mappedBy = "book")
    private List<Review> reviews = new ArrayList<>();

}
