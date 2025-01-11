import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices } from '../../redux/services';
import { useNavigate } from 'react-router-dom';
import servicesStyles from './Services.module.css';

const Services = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const services = useSelector(state => state.services.items);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchServices());
    }
  }, [dispatch, user]);

  const handleServiceClick = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <div className={servicesStyles.servicesPage}>
      <h1>Your Services</h1>
      <div className={servicesStyles.servicesList}>
        {services.length > 0 ? (
          services.map(service => (
            <div key={service.id} className={servicesStyles.serviceItem} onClick={() => handleServiceClick(service.id)}>
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

export default Services;