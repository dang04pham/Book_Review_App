import api from "./api";
import type { Review, AddReviewRequest, ReviewResponse } from "../types/review";

export const addReview = async (data: AddReviewRequest): Promise<Review> => {
    const response = await api.post<Review>(
        `/review/create`,
        {
            bookId: data.bookId,
            reviewContent: data.reviewContent,
            reviewRating: data.reviewRating
        }
    );
    
    return response.data;
}

export const getReviewsByBookId = async (bookId: number): Promise<ReviewResponse> => {
    const response = await api.get(
        `/public/books/getReviewsByBookId`,
        {
            params: { bookId }
        }
    )
    return response.data;
}