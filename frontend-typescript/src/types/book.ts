export interface Book {
    bookId: number;
    bookIsbn: string;
    bookTitle: string;
    bookImgUrl: string;
    bookAuthor: string;
    bookGenre: string;
    bookRating: number;
    bookDescription: string;
    bookPublishYear: number;
}

export interface AddBookRequest {
    bookIsbn: string;
    bookTitle: string;
    bookImgUrl: string;
    bookAuthor: string;
    bookGenre: string;
    bookDescription: string;
    bookPublishYear: number;
}

export interface BookResponse {
    content: Book[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    lastPage: boolean;
}

export type SortDir = 'asc' | 'desc';
export type SortBy = 'bookId' | 'bookRating';