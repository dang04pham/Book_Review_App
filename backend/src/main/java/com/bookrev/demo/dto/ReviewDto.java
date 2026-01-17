package com.bookrev.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {
    private Long reviewId;
    private String userName;
    private String bookTitle;
    private Long bookId;
    private String reviewContent;
    private Integer reviewRating;

}
