import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-regular-svg-icons';
import { useModal } from '../../context/Modal';
import { SignupFormModal } from '../SignupFormModal';
import landingStyles from './LandingPage.module.css';

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites);
  const user = useSelector((state) => state.session.user);
  const loading = useSelector((state) => state.session.loading);
  const { setModalContent } = useModal();

  useEffect(() => {
    if (user) {
      navigate('/user-dashboard'); // Redirect to user dashboard if logged in
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

          {/* {errors && errors !== null && !user && <p className={landingStyles.error}>Error: {errors}</p>}
          {loading && <p>Loading...</p>} */}

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


// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCompass } from '@fortawesome/free-regular-svg-icons';
// import { useModal } from '../../context/Modal';
// import { SignupFormModal } from '../SignupFormModal';
// import landingStyles from './LandingPage.module.css';

// const LandingPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const favorites = useSelector((state) => state.favorites);
//   const user = useSelector((state) => state.session.user);
//   const loading = useSelector((state) => state.session.loading);
//   // const errors = useSelector((state) => state.session.errors);
//   // const { setModalContent } = useModal();

//   useEffect(() => {
//     if (user) {
//       // Fetch user-specific data or perform other actions
//     }
//   }, [dispatch, user, navigate]);
//   const openSignupModal = () => {
//     setModalContent(<SignupFormModal />);
//   };

//   return (
//     <div className={landingStyles.container}>
//       <div className={landingStyles.headerSection}>
//         <div className={landingStyles.headerContentBox}>
//           <h1 className={landingStyles.title}>Guide Finder</h1>
//           <h2 className={landingStyles.subtitle}>From summit to sea, find your adventure</h2>
//           <button className={landingStyles.button} onClick={openSignupModal}>Start Your Adventure</button>

//           {/* {errors && errors !== null && !user && <p className={landingStyles.error}>Error: {errors}</p>}
//           {loading && <p>Loading...</p>} */}

//           {user && !loading && (
//             <>
//               <h2 className={landingStyles.subtitle}>Your Favorites</h2>
//               <ul className={landingStyles.favoritesList}>
//                 {favorites.map((favorite) => (
//                   <li key={favorite.id} className={landingStyles.favoriteItem}>
//                     Service ID: {favorite.service_id}
//                   </li>
//                 ))}
//               </ul>
//             </>
//           )}
//         </div>
//       </div>

//       <hr className={landingStyles.sectionDivider} />

//       <div className={landingStyles.section}>
//         <div className={landingStyles.aboutContainer}>
//           <div className={landingStyles.imageBox}></div>
//           <div className={landingStyles.aboutBox}>
//             <h2 className={landingStyles.sectionTitle}>About Guide Finder</h2>
//             <p> bla bla bla </p>
//             <button className={landingStyles.readMoreButton}>Read More</button>
//           </div>
//         </div>
//         <div className={landingStyles.infoContainer}>
//           <div className={landingStyles.exploreBox}>
//             <h3 className={landingStyles.sectionTitle}>
//               <FontAwesomeIcon icon={faCompass} /> Explore
//             </h3>
//             <p>Short description about checking out the services.</p>
//             <button className={landingStyles.readMoreButton}>Read More</button>
//           </div>
//           <div className={landingStyles.howItWorksBox}>
//             <h3 className={landingStyles.sectionTitle}>How It Works</h3>
//             <p>Short description about how it works.</p>
//             <button className={landingStyles.readMoreButton}>Read More</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;