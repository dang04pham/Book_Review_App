package com.bookrev.demo.payload;

import com.bookrev.demo.dto.ReviewDto;
import com.bookrev.demo.model.Review;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookReviewResponse {
    private List<ReviewDto> content;
}
