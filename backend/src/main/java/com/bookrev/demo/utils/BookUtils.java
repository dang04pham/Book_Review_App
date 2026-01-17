package com.bookrev.demo.utils;

import com.bookrev.demo.model.Book;
import com.bookrev.demo.model.Review;

public class BookUtils {
    public static double calculateAverageRating(Book book) {
        return book.getReviews()
                .stream()
                .mapToDouble(Review::getReviewRating)
                .average()
                .orElse(0.0);
    }
}
