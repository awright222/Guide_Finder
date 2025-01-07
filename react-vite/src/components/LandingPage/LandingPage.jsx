import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
      // Fetch user-specific data or perform other actions
    }
  }, [dispatch, user, navigate]);

  return (
    <div className={landingStyles.container}>
      <h1 className={landingStyles.title}>Guide Finder</h1>
      <h2 className={landingStyles.subtitle}>From summit to sea, find your adventure</h2>
      <button className={landingStyles.button}>Start Your Adventure</button>

      {errors && errors !== null && !user && <p className={landingStyles.error}>Error: {errors}</p>}
      {loading && <p>Loading...</p>}

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

      <div className={landingStyles.section}>
        <div className={landingStyles.aboutBox}>
          <h2 className={landingStyles.sectionTitle}>About Guide Finder</h2>
          <p>About Guide Finder</p>
          <button className={landingStyles.readMoreButton}>Read More</button>
        </div>
        <div className={landingStyles.whoWeAreBox}>
          <h3 className={landingStyles.sectionTitle}>Who We Are</h3>
          <p>Short description about who we are.</p>
          <button className={landingStyles.readMoreButton}>Read More</button>
        </div>
        <div className={landingStyles.howItWorksBox}>
          <h3 className={landingStyles.sectionTitle}>How It Works</h3>
          <p>Short description about how it works.</p>
          <button className={landingStyles.readMoreButton}>Read More</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;