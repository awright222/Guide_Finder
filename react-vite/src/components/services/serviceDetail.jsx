import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchService, deleteService, updateService } from '../../redux/services';
import { fetchReviews, deleteReview } from '../../redux/reviews';
import { addFavorite, removeFavorite } from '../../redux/favorites';
import EditServiceModal from './EditServiceModal';
import ReviewModal from '../Reviews';
import serviceDetailStyles from './ServiceDetail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const service = useSelector(state => state.services.items.find(s => s.id === parseInt(serviceId)));
  const reviews = useSelector(state => state.reviews.items.filter(r => r.service_id === parseInt(serviceId)));
  const averageRating = useSelector(state => state.reviews.averageRatings[serviceId]);
  const currentUser = useSelector(state => state.session.user);
  const favorites = useSelector(state => state.favorites.items);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [editReview, setEditReview] = useState(null);

  useEffect(() => {
    if (serviceId) {
      dispatch(fetchService(serviceId));
      dispatch(fetchReviews(serviceId));
    }
  }, [dispatch, serviceId]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      await dispatch(deleteService(serviceId));
      navigate('/dashboard');
    }
  };

  const handleFavoriteClick = () => {
    const isFavorite = favorites.some(fav => fav.service_id === service.id);
    if (isFavorite) {
      dispatch(removeFavorite(service.id));
    } else {
      dispatch(addFavorite(service.id));
    }
  };

  const handleEdit = async (formData) => {
    await dispatch(updateService({ serviceId, formData }));
    setShowEditModal(false);
  };

  const handleReviewDelete = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      await dispatch(deleteReview(reviewId));
      await dispatch(fetchReviews(serviceId));
    }
  };

  if (!service) return <p>Loading...</p>;

  const isOwner = currentUser && service && currentUser.id === service.guide_id;
  const isFavorite = favorites.some(fav => fav.service_id === service.id);

  return (
    <div className={serviceDetailStyles.serviceDetailPage}>
      <h1>{service.title}</h1>
      <div className={serviceDetailStyles.optionsButtons}>
        {isOwner && (
          <>
            <button
              className={serviceDetailStyles.updateButton}
              onClick={() => setShowEditModal(true)}
            >
              Edit
            </button>
            <button className={serviceDetailStyles.deleteButton} onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
        {currentUser && !currentUser.is_guide && (
          <button 
            className={isFavorite ? serviceDetailStyles.favorited : ''} 
            onClick={handleFavoriteClick}
          >
            <FontAwesomeIcon icon={isFavorite ? solidHeart : regularHeart} />
          </button>
        )}
      </div>
      <img src={service.images} alt={service.title} className={serviceDetailStyles.serviceImage} />
      <div className={serviceDetailStyles.serviceDetails}>
        <p><strong>Description:</strong> {service.description}</p>
        <p><strong>Cost:</strong> ${service.cost}</p>
        <p><strong>Location:</strong> {service.location}</p>
        <p><strong>Experience Level:</strong> {service.experience_requirement}</p>
        <p><strong>Average Rating:</strong> {averageRating !== undefined ? averageRating.toFixed(1) : 'No ratings yet'} ★</p>
      </div>
      {currentUser && (
        <button onClick={() => setShowReviewModal(true)}>Leave a Review</button>
      )}
      <div className={serviceDetailStyles.reviewsSection}>
        <h2>Reviews</h2>
        {reviews.map(review => (
          <div key={review.id} className={serviceDetailStyles.review}>
            <h3>{review.title}</h3>
            <p>{review.review}</p>
            <div className={serviceDetailStyles.rating}>
              {[...Array(5)].map((star, index) => (
                <span key={index} className={index < review.rating ? serviceDetailStyles.filledStar : serviceDetailStyles.emptyStar}>★</span>
              ))}
            </div>
            {currentUser && currentUser.id === review.user_id && (
              <div className={serviceDetailStyles.reviewActions}>
                <button onClick={() => { setEditReview(review); setShowReviewModal(true); }}>Edit</button>
                <button onClick={() => handleReviewDelete(review.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
      {showEditModal && (
        <EditServiceModal
          service={service} 
          serviceId={service.id}
          onClose={() => setShowEditModal(false)}
          onSave={handleEdit}
        />
      )}
      {showReviewModal && (
        <ReviewModal
          serviceId={service.id}
          review={editReview}
          onClose={() => { setShowReviewModal(false); setEditReview(null); }}
        />
      )}
    </div>
  );
};

export default ServiceDetail;