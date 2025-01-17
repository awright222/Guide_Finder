import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateService } from '../../redux/services';
import modalStyles from './EditServiceModal.module.css';

const serviceTypes = ['Hunting', 'Fishing', 'Climbing', 'Backpacking', 'Mountaineering', 'Water Sports', 'Training', 'Other'];
const experienceLevels = ['No Experience', 'Weekend Warrior', 'Pro'];

const EditServiceModal = ({ service, serviceId, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    location: '',
    country: '',
    state: '',
    description: '',
    cost: '',
    images: '',
    experience_requirement: '',
    about_guide: '',
    guide_id: '' 
  });

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        type: service.type,
        location: service.location,
        country: service.country,
        state: service.state,
        description: service.description,
        cost: service.cost,
        images: service.images,
        experience_requirement: service.experience_requirement,
        about_guide: service.about_guide,
        guide_id: service.guide_id 
      });
    }
  }, [service]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateService({ serviceId, formData }));
    if (result.meta.requestStatus === 'fulfilled') {
      onClose();
    } else {
      console.log("Form submission failed:", result);
      if (result.payload && result.payload.errors) {
        console.log("Errors:", result.payload.errors);
      }
    }
  };

  return (
    <div className={modalStyles.modal}>
      <div className={modalStyles.modalContent}>
        <span className={modalStyles.close} onClick={onClose}>&times;</span>
        <h2>Edit Service</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </label>
          <label>
            Type:
            <select name="type" value={formData.type} onChange={handleChange} required>
              <option value="">Select service type</option>
              {serviceTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <label>
            Location:
            <input type="text" name="location" value={formData.location} onChange={handleChange} required />
          </label>
          <label>
            Country:
            <input type="text" name="country" value={formData.country} onChange={handleChange} required />
          </label>
          <label>
            State:
            <input type="text" name="state" value={formData.state} onChange={handleChange} required />
          </label>
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </label>
          <label>
            Cost:
            <input type="number" name="cost" value={formData.cost} onChange={handleChange} required />
          </label>
          <label>
            Images:
            <input type="text" name="images" value={formData.images} onChange={handleChange} required />
          </label>
          <label>
            Experience Requirement:
            <select name="experience_requirement" value={formData.experience_requirement} onChange={handleChange} required>
              <option value="">Select experience level</option>
              {experienceLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </label>
          <label>
            About Guide:
            <textarea name="about_guide" value={formData.about_guide} onChange={handleChange} required />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditServiceModal;