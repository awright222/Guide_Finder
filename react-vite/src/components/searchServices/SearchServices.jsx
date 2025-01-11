import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices } from '../../redux/services';
import searchServicesStyles from './SearchServices.module.css';

const SearchServices = () => {
  const dispatch = useDispatch();
  const services = useSelector(state => state.services.items);
  const status = useSelector(state => state.services.status);
  const error = useSelector(state => state.services.error);

  const [filters, setFilters] = useState({
    name: '',
    state: '',
    country: '',
    activity_type: '',
    experience_level: ''
  });

  useEffect(() => {
    console.log('Component mounted. Dispatching fetchServices...');
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    console.log('Filters updated. Dispatching fetchServices with filters:', filters);
    dispatch(fetchServices(filters));
  }, [filters, dispatch]);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const activityTypes = [
    'Climbing', 'Snow Sports', 'Hunting', 'Fishing', 'Backpacking', 'Mountaineering', 'Water Sports', 'Other'
  ];

  const experienceLevels = [
    'No Experience', 'Weekend Warrior', 'Pro'
  ];

  if (status === 'loading') {
    return <p>Loading services...</p>;
  }

  if (status === 'failed') {
    return <p>Error loading services: {error}</p>;
  }

  return (
    <div className={searchServicesStyles.searchServicesPage}>
      <div className={searchServicesStyles.searchBar}>
        <input type="text" name="name" placeholder="Service Name" value={filters.name} onChange={handleChange} />
        <input type="text" name="state" placeholder="State" value={filters.state} onChange={handleChange} />
        <input type="text" name="country" placeholder="Country" value={filters.country} onChange={handleChange} />
        <select name="activity_type" value={filters.activity_type} onChange={handleChange}>
          <option value="">Select Activity Type</option>
          {activityTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select name="experience_level" value={filters.experience_level} onChange={handleChange}>
          <option value="">Select Experience Level</option>
          {experienceLevels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>
      <div className={searchServicesStyles.servicesList}>
        {Array.isArray(services) && services.length > 0 ? (
          services.map(service => (
            <div key={service.id} className={searchServicesStyles.serviceItem}>
              <img src={service.images} alt={service.title} />
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

export default SearchServices;