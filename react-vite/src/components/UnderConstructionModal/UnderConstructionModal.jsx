import { useNavigate } from 'react-router-dom';
import styles from './UnderConstructionModal.module.css';

const UnderConstructionModal = ({ closeModal }) => {
  const navigate = useNavigate();

  const handleOkayClick = () => {
    if (closeModal) {
      closeModal(); 
    }
    navigate('/dashboard'); 
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Under Construction!</h2>
        <p>We apologize for any inconvenience. We want to make sure you have the best user experience. Please check in later!</p>
        <button onClick={handleOkayClick}>Okay!</button>
      </div>
    </div>
  );
};

export default UnderConstructionModal;
