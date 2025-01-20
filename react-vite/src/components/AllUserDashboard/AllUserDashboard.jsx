
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookings } from '../../redux/bookings';
import { fetchServices } from '../../redux/services';
import { getFavoritesThunk, removeFavorite } from '../../redux/favorites';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import AllUserDashboardStyles from './AllUserDashboard.module.css';

const AllUserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);
  const favorites = useSelector(state => state.favorites.items);
  const bookings = useSelector(state => state.bookings.items);
  const services = useSelector(state => state.services.items);

  useEffect(() => {
    if (user) {
      dispatch(fetchBookings());
      if (user.is_guide) {
        dispatch(fetchServices());
      } else {
        dispatch(getFavoritesThunk());
      }
    }
  }, [dispatch, user]);

  const handleBookingClick = (bookingId) => {
    navigate(`/bookings/${bookingId}`);
  };

  const handleServiceClick = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  const handleCreateServiceClick = () => {
    navigate('/create-service');
  };

  const handleFavoriteClick = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  const handleRemoveFavorite = (favoriteId) => {
    dispatch(removeFavorite(favoriteId));
  };

  if (!user) {
    return <div>Loading...</div>; 
  }

  const ownedServices = services.filter(service => service.guide_id === user.id);

  return (
    <div className={AllUserDashboardStyles.dashboard}>
      <div className={AllUserDashboardStyles.header}>
        <img src="https://www.patagonia.com/dw/image/v2/bdjb_PRD/on/demandware.static/-/Library-Sites-PatagoniaShared/default/dw26f45e6d/sports/mountain-biking/f24_mtb-hero-smith_dave_0028.jpg?" alt="Mountain Biking" />
        <img src="https://www.patagonia.com/dw/image/v2/bdjb_PRD/on/demandware.static/-/Library-Sites-PatagoniaShared/default/dw53531c85/sports/snow/f24_collections-shop-snow-hero.jpg?" alt="Snow" />
        <img src="https://www.patagonia.com/dw/image/v2/bdjb_PRD/on/demandware.static/-/Library-Sites-PatagoniaShared/default/dw94381e4f/sports/surfing/f24-surf-hero-mackinnon_a_0335.jpg" alt="Surfing" />
        <img src="https://www.patagonia.com/dw/image/v2/bdjb_PRD/on/demandware.static/-/Library-Sites-PatagoniaShared/default/dwe1d369bd/sports/climbing/F24-climb-hero.jpg" alt="Climbing" />
        <img src="https://www.patagonia.com/dw/image/v2/bdjb_PRD/on/demandware.static/-/Library-Sites-PatagoniaShared/default/dw247d3078/sports/fly-fishing/F24-collections_fly-fish-hero.jpg?" alt="Fly Fishing" />
        <img src="https://www.stoneglacier.com/cdn/shop/files/built-for-bowhunters_1000x.jpg?v=1736204937" alt="Bowhunting" />
      </div>
      <div className={AllUserDashboardStyles.content}>
        <div className={AllUserDashboardStyles.sloganBox}>
          <h2>Guide Finder.</h2>
          <p>From Summit to sea, find your adventure</p>
        </div>

        {user.is_guide ? (
          <>
            <div className={AllUserDashboardStyles.tripsBox}>
              <h2>Booked Trips</h2>
              {bookings.length > 0 ? (
                bookings.map(booking => (
                  <div key={booking.id} className={AllUserDashboardStyles.tripItem} onClick={() => handleBookingClick(booking.id)}>
                    <p>{booking.title}</p>
                  </div>
                ))
              ) : (
                <p>No trips booked at this time.</p>
              )}
            </div>

            <div className={AllUserDashboardStyles.servicesBox}>
              <div className={AllUserDashboardStyles.servicesHeader}>
                <h2>Your Services</h2>
                <button onClick={handleCreateServiceClick} className={AllUserDashboardStyles.createServiceButton}>Create New Service</button>
              </div>
              {ownedServices.length > 0 ? (
                ownedServices.map(service => (
                  <div key={service.id} className={AllUserDashboardStyles.serviceItem} onClick={() => handleServiceClick(service.id)}>
                    <img src={service.images} alt={service.title} />
                    <p>{service.title}</p>
                  </div>
                ))
              ) : (
                <p>No services available.</p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className={AllUserDashboardStyles.favoritesBox}>
              <h2>Favorites</h2>
              <div className={AllUserDashboardStyles.favoritesList}>
                {favorites.length > 0 ? (
                  favorites.map((favorite, index) => (
                    <div key={favorite.id}>
                      <div className={AllUserDashboardStyles.favoriteItem}>
                        <img src={favorite.service_image} alt={favorite.service_title} onClick={() => handleFavoriteClick(favorite.service_id)} />
                        <p onClick={() => handleFavoriteClick(favorite.service_id)}>{favorite.service_title}</p>
                        <button className={AllUserDashboardStyles.removeButton} onClick={() => handleRemoveFavorite(favorite.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                      {index < favorites.length - 1 && <div className={AllUserDashboardStyles.breakLine}></div>}
                    </div>
                  ))
                ) : (
                  <p>No saved favorites yet.</p>
                )}
              </div>
            </div>

            <div className={AllUserDashboardStyles.tripsBox}>
              <h2>Upcoming Trips</h2>
              {bookings.length > 0 ? (
                bookings.map(booking => (
                  <div key={booking.id} className={AllUserDashboardStyles.tripItem}>
                    <p>{booking.title}</p>
                  </div>
                ))
              ) : (
                <p>No trips booked at this time.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllUserDashboard;