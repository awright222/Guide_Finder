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
      <div className={servicesStyles.serviceGrid}>
        {services.length > 0 ? (
          services.map(service => (
            <div key={service.id} className={servicesStyles.serviceCard} onClick={() => handleServiceClick(service.id)}>
              <img src={service.images} alt={service.title} className={servicesStyles.serviceImage} />
              <h3 className={servicesStyles.serviceTitle}>{service.title}</h3>
              <p className={servicesStyles.serviceDescription}>{service.description}</p>
              <p><strong>Location:</strong> {service.location}</p>
              <p><strong>Experience Level:</strong> {service.experience_requirement}</p>
              <p><strong>Cost:</strong> ${service.cost}</p>
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