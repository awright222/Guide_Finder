import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createService, fetchServices } from '../../../redux/services';
import CreateServiceStyles from './CreateService.module.css';

const serviceTypes = ['Hunting', 'Fishing', 'Climbing', 'Backpacking', 'Mountaineering', 'Water Sports', 'Training', 'Other'];
const experienceLevels = ['No Experience', 'Weekend Warrior', 'Pro'];

const CreateService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);

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
    csrf_token: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to create a service.');
      navigate('/login');
      return;
    }
    const newService = {
      ...formData,
      guide_id: user.id
    };
    try {
      await dispatch(createService(newService));
      await dispatch(fetchServices());
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  return (
    <div className={CreateServiceStyles.createServicePage}>
      <h1>Create New Service</h1>
      <form onSubmit={handleSubmit} className={CreateServiceStyles.form}>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter service title" required />
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
          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Enter service location" required />
        </label>
        <label>
          Country:
          <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Enter country" required />
        </label>
        <label>
          State:
          <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="Enter state" required />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter service description" required />
        </label>
        <label>
          Cost:
          <input type="number" name="cost" value={formData.cost} onChange={handleChange} placeholder="Enter service cost" required />
        </label>
        <label>
          Images:
          <input type="text" name="images" value={formData.images} onChange={handleChange} placeholder="Enter image URLs" required />
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
          <textarea name="about_guide" value={formData.about_guide} onChange={handleChange} placeholder="Enter information about the guide" required />
        </label>
        <button type="submit">Create Service</button>
      </form>
    </div>
  );
};

export default CreateService;