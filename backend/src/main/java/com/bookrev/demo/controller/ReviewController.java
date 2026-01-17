package com.bookrev.demo.controller;

import com.bookrev.demo.dto.ReviewDto;
import com.bookrev.demo.model.Review;
import com.bookrev.demo.payload.BookReviewResponse;
import com.bookrev.demo.service.ReviewService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/review/create")
    public ResponseEntity<ReviewDto> addReview(@Valid @RequestBody ReviewDto reviewDto,
                                               @AuthenticationPrincipal UserDetails userDetails) {
        ReviewDto newReviewDto = reviewService.createReview(reviewDto, userDetails);
        return new ResponseEntity<>(newReviewDto, HttpStatus.OK);
    }

    @GetMapping("/public/books/getReviewsByBookId")
    public ResponseEntity<BookReviewResponse> getReviewsByBookId(@RequestParam(name = "bookId") Long bookId){
        BookReviewResponse bookReviewResponse = reviewService.getAllReviewsByBookId(bookId);
        return new ResponseEntity<>(bookReviewResponse, HttpStatus.OK);
    }

}
