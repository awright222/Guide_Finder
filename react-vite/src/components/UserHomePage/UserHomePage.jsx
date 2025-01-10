import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/session';
import { getFavoritesThunk } from '../../redux/favorites';
import { fetchBookings } from '../../redux/bookings';
import './UserHomePage.module.css';

const UserHomePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const favorites = useSelector(state => state.favorites);
  const bookings = useSelector(state => state.bookings.items);

  useEffect(() => {
    if (user) {
      dispatch(getFavoritesThunk());
      dispatch(fetchBookings());
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="user-home-page">
      <nav className="navbar">
        <div className="navbar-left">
          <a href="/user-home">GF</a>
        </div>
        <div className="navbar-center">
          <button>Search</button>
          <button>Gallery</button>
          <button>Messages</button>
          <button>Partners</button>
        </div>
        <div className="navbar-right">
          <button className="profile-button">
            Profile
            <div className="profile-dropdown">
              <button>Edit Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </button>
        </div>
      </nav>

      <div className="content">
        <div className="favorites-box">
          <h2>Favorites</h2>
          {favorites.length > 0 ? (
            favorites.map(favorite => (
              <div key={favorite.id} className="favorite-item">
                <img src={favorite.image} alt={favorite.title} />
                <p>{favorite.title}</p>
              </div>
            ))
          ) : (
            <p>No favorites yet.</p>
          )}
        </div>

        <div className="trips-box">
          <h2>Upcoming Trips</h2>
          {bookings.length > 0 ? (
            bookings.map(booking => (
              <div key={booking.id} className="trip-item">
                <p>{booking.title}</p>
              </div>
            ))
          ) : (
            <p>No adventures booked at this time.</p>
          )}
        </div>

        <div className="slogan-box">
          <h2>Explore the world with us!</h2>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;