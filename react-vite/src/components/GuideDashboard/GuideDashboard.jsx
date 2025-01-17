import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookings } from '../../redux/bookings';
import { fetchServices } from '../../redux/services';
import { useNavigate } from 'react-router-dom';
import GuideDashboardStyles from './GuideDashboard.module.css';

const GuideDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);
  const bookings = useSelector(state => state.bookings.items);
  const services = useSelector(state => state.services.items);

  useEffect(() => {
    if (user && user.is_guide) {
      dispatch(fetchBookings());
      dispatch(fetchServices());
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

  const ownedServices = user ? services.filter(service => service.guide_id === user.id) : [];

  return (
    <div className={GuideDashboardStyles.dashboard}>
      <div className={GuideDashboardStyles.content}>
        <div className={GuideDashboardStyles.sloganBox}>
          <h2>Guide Finder.</h2>
          <p>From Summit to sea, find your adventure</p>
        </div>

        <div className={GuideDashboardStyles.tripsBox}>
          <h2>Booked Trips</h2>
          {bookings.length > 0 ? (
            bookings.map(booking => (
              <div key={booking.id} className={GuideDashboardStyles.tripItem} onClick={() => handleBookingClick(booking.id)}>
                <p>{booking.title}</p>
              </div>
            ))
          ) : (
            <p>No trips booked at this time.</p>
          )}
        </div>

        <div className={GuideDashboardStyles.servicesBox}>
          <div className={GuideDashboardStyles.servicesHeader}>
            <h2>Your Services</h2>
            <button onClick={handleCreateServiceClick} className={GuideDashboardStyles.createServiceButton}>Create New Service</button>
          </div>
          {ownedServices.length > 0 ? (
            ownedServices.map(service => (
              <div key={service.id} className={GuideDashboardStyles.serviceItem} onClick={() => handleServiceClick(service.id)}>
                <img src={service.images} alt={service.title} />
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