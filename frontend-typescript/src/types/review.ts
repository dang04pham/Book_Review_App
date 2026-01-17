export interface AddReviewRequest { 
    bookId: number;
    reviewContent: string;
    reviewRating: number;
}

export interface Review {
    reviewId: number;
    userName: string;
    bookTitle: string;
    reviewContent: string;
    reviewRating: number;
    reviewTimeStamp: string;
}

export interface ReviewResponse {
    content: Review[];
}