package com.bookrev.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookDto {
    private Long bookId;
    private String bookISBN;
    private String bookTitle;
    private String bookImgUrl;
    private String bookAuthor;
    private String bookGenre;
    private String bookDescription;
    private Double bookRating;
    private Integer bookPublishYear;
}
