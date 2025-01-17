import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFavoritesThunk, removeFavorite } from '../../redux/favorites';
import { fetchBookings } from '../../redux/bookings';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import UserDashboardStyles from './UserDashboard.module.css';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);
  const favorites = useSelector(state => state.favorites.items);
  const bookings = useSelector(state => state.bookings.items);

  useEffect(() => {
    if (user) {
      dispatch(getFavoritesThunk());
      dispatch(fetchBookings());
    }
  }, [dispatch, user]);

  const handleFavoriteClick = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  const handleRemoveFavorite = (favoriteId) => {
    dispatch(removeFavorite(favoriteId));
  };

  return (
    <div className={UserDashboardStyles.userDashboard}>
      <div className={UserDashboardStyles.content}>
        <div className={UserDashboardStyles.sloganBox}>
          <h2>Guide Finder.</h2>
          <p>From Summit to sea, find your adventure</p>
        </div>

        <div className={UserDashboardStyles.favoritesBox}>
          <h2>Favorites</h2>
          <div className={UserDashboardStyles.favoritesList}>
            {favorites.length > 0 ? (
              favorites.map((favorite, index) => (
                <div key={favorite.id}>
                  <div className={UserDashboardStyles.favoriteItem}>
                    <img src={favorite.service_image} alt={favorite.service_title} onClick={() => handleFavoriteClick(favorite.service_id)} />
                    <p onClick={() => handleFavoriteClick(favorite.service_id)}>{favorite.service_title}</p>
                    <button className={UserDashboardStyles.removeButton} onClick={() => handleRemoveFavorite(favorite.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                  {index < favorites.length - 1 && <div className={UserDashboardStyles.breakLine}></div>}
                </div>
              ))
            ) : (
              <p>No saved favorites yet.</p>
            )}
          </div>
        </div>

        <div className={UserDashboardStyles.tripsBox}>
          <h2>Upcoming Trips</h2>
          {bookings.length > 0 ? (
            bookings.map(booking => (
              <div key={booking.id} className={UserDashboardStyles.tripItem}>
                <p>{booking.title}</p>
              </div>
            ))
          ) : (
            <p>No trips booked at this time.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;