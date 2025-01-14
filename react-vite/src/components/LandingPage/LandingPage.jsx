import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-regular-svg-icons';
import { useModal } from '../../context/Modal';
import { SignupFormModal } from '../SignupFormModal';
import landingStyles from './LandingPage.module.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  //const loading = useSelector((state) => state.session.loading);
  const { setModalContent } = useModal();

  useEffect(() => {
    if (user) {
      navigate('/user-dashboard');
    }
  }, [user, navigate]);

  const openSignupModal = () => {
    setModalContent(<SignupFormModal />);
  };

  return (
    <div className={landingStyles.container}>
      <div className={landingStyles.headerSection}>
        <div className={landingStyles.headerContentBox}>
          <h1 className={landingStyles.title}>Guide Finder</h1>
          <h2 className={landingStyles.subtitle}>From summit to sea, find your adventure</h2>
          <button className={landingStyles.button} onClick={openSignupModal}>Start Your Adventure</button>
        </div>
      </div>

      <hr className={landingStyles.sectionDivider} />

      <div className={landingStyles.section}>
        <div className={landingStyles.aboutContainer}>
          <div className={landingStyles.imageBox}></div>
          <div className={landingStyles.aboutBox}>
            <h2 className={landingStyles.sectionTitle}>About Guide Finder</h2>
            <p> bla bla bla </p>
            <button className={landingStyles.readMoreButton}>Read More</button>
          </div>
        </div>
        <div className={landingStyles.infoContainer}>
          <div className={landingStyles.exploreBox}>
            <h3 className={landingStyles.sectionTitle}>
              <FontAwesomeIcon icon={faCompass} /> Explore
            </h3>
            <p>Short description about checking out the services.</p>
            <button className={landingStyles.readMoreButton}>Read More</button>
          </div>
          <div className={landingStyles.howItWorksBox}>
            <h3 className={landingStyles.sectionTitle}>How It Works</h3>
            <p>Short description about how it works.</p>
            <button className={landingStyles.readMoreButton}>Read More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
