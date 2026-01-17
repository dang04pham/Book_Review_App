import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../services/bookService';
import type { Book } from '../types/book';
import { getReviewsByBookId, addReview} from '../services/reviewService';
import type { Review,  } from '../types/review';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { Star, MessageSquare, Send } from 'lucide-react';

const BookDetails: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Review Form State
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
      const loadData = async () => {
        if (!id) return;
        setLoading(true);
        try {
          const bookId = Number(id);

          const [bookData, reviewResponse] = await Promise.all([
            getBookById(bookId),
            getReviewsByBookId(bookId)
          ]);

          if (bookData) setBook(bookData);
          setReviews(reviewResponse.content ?? []);

        } catch (error) {
          console.error("Error loading book details", error);
        } finally {
          setLoading(false);
        }
      };
      loadData();
  }, [id]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !book || !id) return;
    
    setIsSubmitting(true);
    try {
      const newReview = await addReview({
        bookId: Number(id),
        reviewContent: comment,
        reviewRating: rating,
      });
      setReviews([newReview, ...reviews]);
      setComment('');
      setRating(5);
    } catch (error) {
      console.error("Failed to submit review", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar: Cover and AI Chat */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <img src={book?.bookImgUrl} alt={book?.bookTitle} className="w-full rounded-lg shadow-md mb-4" />
              <div className="flex items-center justify-center space-x-1 text-2xl font-bold text-slate-800">
                <span>{book?.bookRating}</span>
                <Star className="text-yellow-400 fill-yellow-400 w-6 h-6" />
              </div>
              <div className="text-center text-sm text-slate-500">{reviews?.length ?? 0} Community Reviews</div>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="lg:col-span-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 mb-8">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">{book?.bookTitle}</h1>
              <h2 className="text-xl text-slate-600 font-medium">by {book?.bookAuthor}</h2>
            </div>
            <div className="flex gap-4 text-sm text-slate-500 mb-6">
              {/* <span className="bg-slate-100 px-3 py-1 rounded-full">{book?.genre}</span> */}
              <span className="bg-slate-100 px-3 py-1 rounded-full">{book?.bookGenre}</span>
            </div>
            <p className="text-slate-700 leading-relaxed text-lg">{book?.bookDescription}</p>
          </div>
  
          {/* Write Review */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Write a Review
            </h3>
            <form onSubmit={handleSubmitReview}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star 
                          className={`w-8 h-8 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-slate-700">Your Review</label>
                  </div>
                  <textarea
                    className="w-full p-3 border border-slate-300 rounded-lg h-32 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    placeholder="What did you think about the plot, characters, and pacing?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" isLoading={isSubmitting} icon={<Send size={16}/>}>
                    Post Review
                  </Button>
                </div>
            </form>
          </div>
  
          {/* Reviews List */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Community Reviews</h3>
            {reviews.map((review) => (
              <div key={review.reviewId} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">
                      {review.userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-slate-900">{review.userName}</span>
                  </div>
                  <span className="text-xs text-slate-400">{review.reviewTimeStamp}</span>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < review.reviewRating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} 
                    />
                  ))}
                </div>
                <p className="text-slate-700">{review.reviewContent}</p>
              </div>
            ))}
            {reviews.length === 0 && (
              <p className="text-slate-500 text-center py-4">No reviews yet. Be the first!</p>
            )}
          </div>
        </div>
      </div>
  );
};
    
export default BookDetails;

