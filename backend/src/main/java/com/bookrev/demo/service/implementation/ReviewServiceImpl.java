package com.bookrev.demo.service.implementation;

import com.bookrev.demo.dto.ReviewDto;
import com.bookrev.demo.model.Book;
import com.bookrev.demo.model.Review;
import com.bookrev.demo.model.User;
import com.bookrev.demo.payload.BookReviewResponse;
import com.bookrev.demo.repository.BookRepository;
import com.bookrev.demo.repository.ReviewRepository;
import com.bookrev.demo.repository.RoleRepository;
import com.bookrev.demo.repository.UserRepository;
import com.bookrev.demo.service.ReviewService;
import com.bookrev.demo.utils.BookUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ReviewDto createReview(ReviewDto reviewDto, UserDetails userDetails) {
        // Find the user
        String userName = userDetails.getUsername();
        User user = userRepository.findByUserName(userName).orElseThrow(() -> new RuntimeException("User not found with username: " + reviewDto.getUserName()));
        Book book = bookRepository.findByBookId(reviewDto.getBookId()).orElseThrow(() -> new RuntimeException("Book not found with title: " + reviewDto.getBookTitle()));
        String bookTitle = book.getBookTitle();

        Review review = new Review();
        review.setReviewContent(reviewDto.getReviewContent());
        review.setReviewRating(reviewDto.getReviewRating());
        review.setUser(user);
        review.setBook(book);
        reviewRepository.save(review);

        double averageRating = BookUtils.calculateAverageRating(book);
        book.setBookRating(averageRating);
        bookRepository.save(book);

        ReviewDto savedReviewDto = new ReviewDto();
        modelMapper.map(review, savedReviewDto);
        savedReviewDto.setBookTitle(book.getBookTitle());
        savedReviewDto.setUserName(userName);


        return savedReviewDto;
    }

    @Override
    public BookReviewResponse getAllReviewsByBookId(Long bookId) {
        Book book = bookRepository.findByBookId(bookId).orElseThrow(() -> new RuntimeException("Book not found with id: " + bookId));

        List<Review> reviews = reviewRepository.findByBook_BookId(bookId);

        List<ReviewDto> reviewDtos = reviews.stream()
                .map(review -> new ReviewDto(
                        review.getReviewId(),
                        review.getUser().getUserName(),
                        review.getBook().getBookTitle(),
                        review.getBook().getBookId(),
                        review.getReviewContent(),
                        review.getReviewRating()
                ))
                .toList();
        BookReviewResponse bookReviewResponse = new BookReviewResponse();
        bookReviewResponse.setContent(reviewDtos);
        return bookReviewResponse;
    }

    @Override
    public void updateReview(ReviewDto reviewDto, UserDetails userDetails) {
        String userName = userDetails.getUsername();
        User user = userRepository.findByUserName(userName).orElseThrow(() -> new RuntimeException("User not found with username: " + userName));
        Review review = reviewRepository.findById(reviewDto.getReviewId()).orElseThrow(() -> new RuntimeException("Review not found with id: " + reviewDto.getReviewId()));
        review.setReviewContent(reviewDto.getReviewContent());
        review.setReviewRating(reviewDto.getReviewRating());
        reviewRepository.save(review);
    }

    @Override
    public void deleteReview(ReviewDto reviewDto, UserDetails userDetails) {
        String userName = userDetails.getUsername();
        User user = userRepository.findByUserName(userName).orElseThrow(() -> new RuntimeException("User not found with username: " + userName));
        Review review = reviewRepository.findById(reviewDto.getReviewId()).orElseThrow(() -> new RuntimeException("Review not found with id: " + reviewDto.getReviewId()));
        reviewRepository.delete(review);
    }



}
