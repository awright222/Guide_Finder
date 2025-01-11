import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchService, updateService, deleteService } from '../../redux/services';
import serviceDetailStyles from './ServiceDetail.module.css';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const service = useSelector(state => state.services.items.find(s => s.id === parseInt(serviceId)));
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (serviceId) {
      dispatch(fetchService(serviceId));
    }
  }, [dispatch, serviceId]);

  useEffect(() => {
    if (service) {
      setFormData(service);
    }
  }, [service]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateService(serviceId, formData));
  };

  const handleDelete = () => {
    dispatch(deleteService(serviceId));
    navigate('/services');
  };

  if (!service) return <p>Loading...</p>;

  return (
    <div className={serviceDetailStyles.serviceDetailPage}>
      <h1>Edit Service</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={formData.title || ''} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description || ''} onChange={handleChange} />
        </label>
        <label>
          Cost:
          <input type="number" name="cost" value={formData.cost || ''} onChange={handleChange} />
        </label>
        {/* Add other fields as necessary */}
        <button type="submit">Update Service</button>
      </form>
      <button onClick={handleDelete}>Delete Service</button>
    </div>
  );
};

export default ServiceDetail;