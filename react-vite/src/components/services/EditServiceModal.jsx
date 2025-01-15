import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateService } from '../../redux/services';
import modalStyles from './EditServiceModal.module.css';

const EditServiceModal = ({ service, serviceId, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cost: '',
    location: '',
    experience_requirement: '',
    images: ''
  });

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        description: service.description,
        cost: service.cost,
        location: service.location,
        experience_requirement: service.experience_requirement,
        images: service.images
      });
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
    dispatch(updateService({ serviceId, formData }));
    onClose();
  };

  return (
    <div className={modalStyles.modal}>
      <div className={modalStyles.modalContent}>
        <span className={modalStyles.close} onClick={onClose}>&times;</span>
        <h2>Edit Service</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" value={formData.title} onChange={handleChange} />
          </label>
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </label>
          <label>
            Cost:
            <input type="number" name="cost" value={formData.cost} onChange={handleChange} />
          </label>
          <label>
            Location:
            <input type="text" name="location" value={formData.location} onChange={handleChange} />
          </label>
          <label>
            Experience Requirement:
            <input type="text" name="experience_requirement" value={formData.experience_requirement} onChange={handleChange} />
          </label>
          <label>
            Images:
            <input type="text" name="images" value={formData.images} onChange={handleChange} />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditServiceModal;