import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, updateReview, fetchReviews } from '../../redux/reviews';
import reviewModalStyles from './ReviewModal.module.css';

const ReviewModal = ({ serviceId, review, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(review ? review.title : '');
  const [reviewText, setReviewText] = useState(review ? review.review : '');
  const [rating, setRating] = useState(review ? review.rating : 0);
  const currentUser = useSelector(state => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      service_id: serviceId,
      user_id: currentUser.id,
      title,
      review: reviewText,
      rating,
    };

    if (review) {
      await dispatch(updateReview({ reviewId: review.id, reviewData }));
    } else {
      await dispatch(createReview(reviewData));
    }

    // Refetch reviews after creating or updating a review
    await dispatch(fetchReviews(serviceId));

    onClose();
  };

  return (
    <div className={reviewModalStyles.modal}>
      <div className={reviewModalStyles.modalContent}>
        <span className={reviewModalStyles.close} onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <h2>{review ? 'Edit Review' : 'Leave a Review'}</h2>
          <div className={reviewModalStyles.rating}>
            {[...Array(5)].map((star, index) => (
              <span
                key={index}
                className={index < rating ? reviewModalStyles.filledStar : reviewModalStyles.emptyStar}
                onClick={() => setRating(index + 1)}
              >
                ★
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />
          <button type="submit">{review ? 'Update Review' : 'Submit Review'}</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;