import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchService, deleteService } from '../../redux/services';
import { addFavorite, removeFavorite } from '../../redux/favorites';
import EditServiceModal from './EditServiceModal';
import serviceDetailStyles from './ServiceDetail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const service = useSelector(state => state.services.items.find(s => s.id === parseInt(serviceId)));
  const currentUser = useSelector(state => state.session.user);
  const favorites = useSelector(state => state.favorites.items);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (serviceId) {
      dispatch(fetchService(serviceId));
    }
  }, [dispatch, serviceId]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      dispatch(deleteService(serviceId));
      navigate('/services');
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

  if (!service) return <p>Loading...</p>;

  const isOwner = currentUser && service && currentUser.id === service.ownerId;
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
        {currentUser && (
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
      </div>
      {showEditModal && (
        <EditServiceModal
          serviceId={service.id}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default ServiceDetail;