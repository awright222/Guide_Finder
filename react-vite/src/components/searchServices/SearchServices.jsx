import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices } from '../../redux/services';
import { fetchReviews } from '../../redux/reviews';
import { addFavorite, removeFavorite } from '../../redux/favorites'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import searchServicesStyles from './SearchServices.module.css'; 



const SearchServices = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const services = useSelector(state => Array.isArray(state.services.items) ? state.services.items : []);
    const favorites = useSelector(state => Array.isArray(state.favorites.items) ? state.favorites.items : []);
    const status = useSelector(state => state.services.status);
    const error = useSelector(state => state.services.error);
    const user = useSelector(state => state.session.user);
    const averageRatings = useSelector(state => state.reviews.averageRatings);

    const [filters, setFilters] = useState({
        name: '',
        state: '',
        country: '',
        experience_level: ''
    });

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    useEffect(() => {
        services.forEach(service => {
            dispatch(fetchReviews(service.id));
        });
    }, [dispatch, services]);

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleFavoriteClick = (serviceId) => {
        const isFavorite = favorites.some(fav => fav.service_id === serviceId);
        if (isFavorite) {
            dispatch(removeFavorite(serviceId));
        } else {
            dispatch(addFavorite(serviceId));
        }
    };

    const handleServiceClick = (serviceId) => {
        navigate(`/services/${serviceId}`);
    };

    const experienceLevels = ['No Experience', 'Weekend Warrior', 'Pro'];

    const search = (data) => {
        return data.filter(item =>
            Object.keys(filters).every(key => {
                if (filters[key] === '') return true;
                if (key === 'name') {
                    return item.title?.toLowerCase().includes(filters[key].toLowerCase());
                }
                return item[key]?.toString().toLowerCase().includes(filters[key].toLowerCase());
            })
        );
    };

    if (status === 'loading') {
        return <p>Loading services...</p>;
    }

    if (status === 'failed') {
        return <p>Error loading services: {error}</p>;
    }

    return (
        <div className={searchServicesStyles.searchServicesPage}>
            <h1 className={searchServicesStyles.title}>Find Your Next Adventure</h1>
            <div className={searchServicesStyles.searchContainer}>
                <div className={searchServicesStyles.instructionsBox}>
                    <p>Use the search bar to filter services by name, state, country, and experience level.</p>
                </div>
                <div className={searchServicesStyles.searchBar}>
                    <input type="text" name="name" placeholder="Service Name" value={filters.name} onChange={handleChange} />
                    <input type="text" name="state" placeholder="State" value={filters.state} onChange={handleChange} />
                    <input type="text" name="country" placeholder="Country" value={filters.country} onChange={handleChange} />
                    <select name="experience_level" value={filters.experience_level} onChange={handleChange}>
                        <option value="">Select Experience Level</option>
                        {experienceLevels.map(level => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>
                </div>
            </div>
            <hr className={searchServicesStyles.divider} />
            <div className={searchServicesStyles.serviceGrid}>
                {search(services).map(service => {
                    const isFavorite = favorites.some(fav => fav.service_id === service.id);
                    const averageRating = averageRatings[service.id] || 0;
                    console.log(`Service ID: ${service.id}, Average Rating: ${averageRating}`); // Debugging line
                    return (
                        <div key={service.id} className={searchServicesStyles.serviceCard} onClick={() => handleServiceClick(service.id)}>
                            <img src={service.images} alt={service.title} className={searchServicesStyles.serviceImage} />
                            <h3 className={searchServicesStyles.serviceTitle}>{service.title}</h3>
                            <p className={searchServicesStyles.serviceDescription}>{service.description}</p>
                            <p><strong>Location:</strong> {service.location}</p>
                            <p><strong>Experience Level:</strong> {service.experience_requirement}</p>
                            <p><strong>Cost:</strong> ${service.cost}</p>
                            <div className={searchServicesStyles.rating}>
                                {[...Array(5)].map((star, index) => (
                                    <span key={`star-${service.id}-${index}`} className={index < Math.round(averageRating) ? searchServicesStyles.filledStar : searchServicesStyles.emptyStar}>★</span>
                                ))}
                            </div>
                            {user && !user.is_guide && (
                                <button 
                                    className={isFavorite ? searchServicesStyles.favorited : ''} 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleFavoriteClick(service.id);
                                    }}
                                >
                                    <FontAwesomeIcon icon={isFavorite ? solidHeart : regularHeart} />
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SearchServices;