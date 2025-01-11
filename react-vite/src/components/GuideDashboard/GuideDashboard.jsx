import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/session';
import { fetchBookings } from '../../redux/bookings';
import { fetchServices } from '../../redux/services';
import GuideDashboardStyles from './GuideDashboard.module.css';

const GuideDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const bookings = useSelector(state => state.bookings.items);
  const services = useSelector(state => state.services.items);

  useEffect(() => {
    if (user) {
      dispatch(fetchBookings());
      dispatch(fetchServices());
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleBookingClick = (booking) => {
    // Open modal to edit or delete booking
  };

  const handleServiceClick = (service) => {
    // Navigate to service detail page
  };

  return (
    <div className={GuideDashboardStyles.guideDashboard}>
      <nav className={GuideDashboardStyles.navbar}>
        <div className={GuideDashboardStyles.navbarLeft}>
          <a href="/guide-dashboard">GF</a>
        </div>
        <div className={GuideDashboardStyles.navbarCenter}>
          <button>Search</button>
          <button>Gallery</button>
          <button>Messages</button>
          <button>Partners</button>
        </div>
        <div className={GuideDashboardStyles.navbarRight}>
          <button className={GuideDashboardStyles.profileButton}>
            Profile
            <div className={GuideDashboardStyles.profileDropdown}>
              <button>Edit Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </button>
        </div>
      </nav>

      <div className={GuideDashboardStyles.content}>
        <div className={GuideDashboardStyles.sloganBox}>
          <h2>Guide Finder.</h2>
          <p>From Summit to sea, find your adventure</p>
        </div>

        <div className={GuideDashboardStyles.bookingsBox}>
          <h2>Bookings</h2>
          <div className={GuideDashboardStyles.bookingsList}>
            {bookings.length > 0 ? (
              bookings.map(booking => (
                <div key={booking.id} className={GuideDashboardStyles.bookingItem} onClick={() => handleBookingClick(booking)}>
                  <img src={booking.image} alt={booking.title} />
                  <p>{booking.title}</p>
                </div>
              ))
            ) : (
              <p>No bookings yet.</p>
            )}
          </div>
        </div>

        <div className={GuideDashboardStyles.servicesBox}>
          <h2>Services</h2>
          {services.length > 0 ? (
            services.map(service => (
              <div key={service.id} className={GuideDashboardStyles.serviceItem} onClick={() => handleServiceClick(service)}>
                <p>{service.title}</p>
              </div>
            ))
          ) : (
            <p>No services available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuideDashboard;