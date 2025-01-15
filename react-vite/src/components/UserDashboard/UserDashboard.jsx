import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/session';
import { getFavoritesThunk } from '../../redux/favorites';
import { fetchBookings } from '../../redux/bookings';
import { useNavigate } from 'react-router-dom';
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

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Logout failed!!!!!:', error);
    }
  };

  const handleFavoriteClick = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  const handleSearchClick = () => {
    navigate('/search-services');
  };

  return (
    <div className={UserDashboardStyles.userDashboard}>
      <nav className={UserDashboardStyles.navbar}>
        <div className={UserDashboardStyles.navbarLeft}>
          <a href="/user-dashboard">GF</a>
        </div>
        <div className={UserDashboardStyles.navbarCenter}>
          <button onClick={handleSearchClick}>Search</button>
          <button>Gallery</button>
          <button>Messages</button>
          <button>Partners</button>
        </div>
        <div className={UserDashboardStyles.navbarRight}>
          <div className={UserDashboardStyles.profileButton}>
            Profile
            <div className={UserDashboardStyles.profileDropdown}>
              <button>Edit Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <div className={UserDashboardStyles.content}>
        <div className={UserDashboardStyles.sloganBox}>
          <h2>Guide Finder.</h2>
          <p>From Summit to sea, find your adventure</p>
        </div>

        <div className={UserDashboardStyles.favoritesBox}>
          <h2>Favorites</h2>
          <div className={UserDashboardStyles.favoritesList}>
            {favorites.length > 0 ? (
              favorites.map(favorite => (
                <div key={favorite.id} className={UserDashboardStyles.favoriteItem} onClick={() => handleFavoriteClick(favorite.service_id)}>
                  <img src={favorite.image} alt={favorite.title} />
                  <p>{favorite.title}</p>
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