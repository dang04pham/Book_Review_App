package com.bookrev.demo.service;

import com.bookrev.demo.dto.ReviewDto;
import com.bookrev.demo.model.Review;
import com.bookrev.demo.payload.BookReviewResponse;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface ReviewService {
    ReviewDto createReview(ReviewDto reviewDto, UserDetails userDetails);
    BookReviewResponse getAllReviewsByBookId(Long bookId);
    void updateReview(ReviewDto reviewDto, UserDetails userDetails);
    void deleteReview(ReviewDto reviewDto, UserDetails userDetails);
}
