import { useEffect, useRef } from 'react';
import styles from './ReadMoreModal.module.css';
import landingStyles from '../LandingPage/LandingPage.module.css'; 
import { useModal } from '../../context/Modal'; 
import SignupFormModal from '../SignupFormModal/SignupFormModal'; 

const ReadMoreModal = ({ closeModal, content }) => {
  const modalRef = useRef();
  const { setModalContent } = useModal(); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  const modalClass = content.title === 'How It Works' ? styles.howItWorksModal : styles.modalContent;
  const buttonClass = content.title === 'How It Works' ? landingStyles.adventureButton : styles.aboutAdventureButton;

  const openSignupModal = () => {
    setModalContent(<SignupFormModal closeModal={closeModal} />);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={modalClass} ref={modalRef}>
        <button className={styles.closeButton} onClick={closeModal}>X</button>
        <div className={styles.titleBox}>
          <h2>{content.title}</h2>
        </div>
        <div className={styles.contentBox}>
          <div className={styles.imageBox}>
            <img src={content.image} alt={content.title} className={styles.modalImage} />
          </div>
          <div className={styles.textBox}>
            <p>{content.text}</p>
          </div>
        </div>
        <div className={styles.adventureButtonBox}>
          <button className={buttonClass} onClick={openSignupModal}>
            Start Your Adventure
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadMoreModal;