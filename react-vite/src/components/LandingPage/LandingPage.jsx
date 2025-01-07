import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFavoritesThunk } from '../../redux/favorites';
import { useNavigate } from 'react-router-dom'; 
import landingStyles from './LandingPage.module.css'; 

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites);
  const user = useSelector((state) => state.session.user);
  const loading = useSelector((state) => state.session.loading);
  const errors = useSelector((state) => state.session.errors);

  useEffect(() => {
    if (user) {
      dispatch(getFavoritesThunk());

      // Redirect based on user role after login
      if (user.role === 'guide') navigate('/guide-dashboard');
      else if (user.role === 'manager') navigate('/manager-dashboard');
      else navigate('/user-dashboard');
    }
  }, [dispatch, user, navigate]);

  return (
    <div className={landingStyles.container}>
      <h1 className={landingStyles.title}>Welcome to Guide Finder</h1>

      {errors && errors !== null && !user && <p className={landingStyles.error}>Error: {errors}</p>}

      {loading && <p>Loading...</p>}

      {/* Public content here */}
      {!user && (
        <p>Explore the platform and find your next adventure!</p>
      )}

      {/* Show user content only if authenticated */}
      {user && !loading && (
        <>
          <h2 className={landingStyles.subtitle}>Your Favorites</h2>
          <ul className={landingStyles.favoritesList}>
            {favorites.map((favorite) => (
              <li key={favorite.id} className={landingStyles.favoriteItem}>
                Service ID: {favorite.service_id}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default LandingPage;
