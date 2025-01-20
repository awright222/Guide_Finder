import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-regular-svg-icons';
import { useModal } from '../../context/Modal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import ReadMoreModal from '../ReadMoreModal';
import landingStyles from './LandingPage.module.css';
import logo from '../../../public/Logos/Logo.png';

const LandingPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const userRole = useSelector((state) => state.session.userRole);
  const { setModalContent, closeModal } = useModal();

  useEffect(() => {
    if (user) {
      const routeMap = {
        user: '/dashboard',
        guide: '/dashboard',
        manager: '/dashboard',
      };
      navigate(routeMap[userRole] || '/dashboard');
    }
  }, [user, userRole, navigate]);

  const openSignupModal = () => {
    setModalContent(<SignupFormModal closeModal={closeModal} />);
  };

  const navigateToSearchServices = () => {
    navigate('/search-services');
  };

  const openReadMoreModal = (content) => {
    setModalContent(<ReadMoreModal closeModal={closeModal} content={content} />);
  };

  const aboutContent = {
    title: 'About Us',
    text: 'We are here to make sure access never holds you back from finding your adventure. Our mission is to connect you with the best guides and experiences around the world. Whether you are a beginner or a seasoned adventurer, we have something for everyone. Too many times people are held back from doing what they love due to lack of knowledge, access, or not having someone to do it with. We got your back',
    image: 'https://www.patagonia.com/dw/image/v2/bdjb_PRD/on/demandware.static/-/Library-Sites-PatagoniaShared/default/dw94381e4f/sports/surfing/f24-surf-hero-mackinnon_a_0335.jpg'
  };

  const howItWorksContent = {
    title: 'How It Works',
    text: 'Its easy! Sign up. Its FREE! Find your adventure of interest on our explore page, reach out to the guide to learn more about it or book it right there with our booking feature! Payment is secure and easy. Enjoy your adventure!',
    image: 'https://www.patagonia.com/dw/image/v2/bdjb_PRD/on/demandware.static/-/Library-Sites-PatagoniaShared/default/dwe1d369bd/sports/climbing/F24-climb-hero.jpg'
  };

  return (
    <div className={landingStyles.container}>
      <div className={landingStyles.headerSection}>
        <div className={landingStyles.headerWrapper}>
          <img src={logo} alt="Guide Finder Logo" className={landingStyles.logo} />
          <div className={landingStyles.headerContentBox}>
            <h1 className={landingStyles.title}>Guide Finder</h1>
            <h2 className={landingStyles.subtitle}>From summit to sea, find your adventure</h2>
          </div>
        </div>
      </div>

      <div className={landingStyles.section}>
        <div className={landingStyles.aboutContainer}>
          <div className={landingStyles.imageBox}></div>
          <div className={landingStyles.aboutBox}>
            <h2 className={landingStyles.sectionTitle}>About Guide Finder</h2>
            <p>We&apos;re here to make sure access never holds you back from finding your adventure.</p>
            <button className={landingStyles.readMoreButton} onClick={() => openReadMoreModal(aboutContent)}>Read More</button>
          </div>
        </div>
        <div className={landingStyles.infoContainer}>
          <div className={landingStyles.exploreBox}>
            <p>Check out all our available adventures. We&apos;re quickly growing and so are our offerings! Newbie? No problem we have something for you. Pro? We got you too.</p>
            <button className={landingStyles.exploreButton} onClick={navigateToSearchServices}>
              <FontAwesomeIcon icon={faCompass} /> Explore
            </button>
          </div>
          <div className={landingStyles.howItWorksBox}>
            <h3 className={landingStyles.sectionTitle}>How It Works</h3>
            <p>Not sure about the logistics? Let us explain how it works.</p>
            <button className={landingStyles.readMoreButton} onClick={() => openReadMoreModal(howItWorksContent)}>Read More</button>
          </div>
        </div>
        <div className={landingStyles.adventureSection}>
          
        </div>
      </div>
    </div>
  );
};

export default LandingPage;