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
    if (user && user.is_guide) {
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
    <div className={GuideDashboardStyles.dashboard}>
      <h1>Welcome, {user.firstname} {user.lastname}</h1>
      <button onClick={handleLogout} className={GuideDashboardStyles.logoutButton}>Logout</button>
      <div className={GuideDashboardStyles.section}>
        <h2>Your Bookings</h2>
        {bookings.length > 0 ? (
          bookings.map(booking => (
            <div key={booking.id} className={GuideDashboardStyles.booking} onClick={() => handleBookingClick(booking)}>
              <p>{booking.details}</p>
            </div>
          ))
        ) : (
          <p>No bookings available.</p>
        )}
      </div>
      <div className={GuideDashboardStyles.section}>
        <h2>Your Services</h2>
        {services.length > 0 ? (
          services.map(service => (
            <div key={service.id} className={GuideDashboardStyles.service} onClick={() => handleServiceClick(service)}>
              <p>{service.title}</p>
            </div>
          ))
        ) : (
          <p>No services available.</p>
        )}
      </div>
    </div>
  );
};

export default GuideDashboard;