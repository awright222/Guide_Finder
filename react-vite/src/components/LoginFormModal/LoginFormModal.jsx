import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../redux/session';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';

const LoginFormModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("LOGIN RAN");
    const serverResponse = await dispatch(
      sessionActions.login({ email, password })
    );

    if (serverResponse.type === "session/login/rejected") {
      setErrors(serverResponse.payload.errors || {});
    } else {
      setLoginSuccess(true);
      setUserRole(serverResponse.payload?.user?.role);
      setErrors({});
      closeModal();
    }
  };

  useEffect(() => {
    if (loginSuccess) {
      const routeMap = {
        user: '/user-dashboard',
        guide: '/guide-dashboard',
        manager: '/manager-dashboard',
      };
      navigate(routeMap[userRole] || "/");
    }
  }, [loginSuccess, userRole, navigate]);

  return (
    <div className={styles.loginModal}>
      <div className={styles.loginModalBackground} onClick={closeModal}></div>
      <div className={styles.loginModalContent}>
        <h2 className={styles.modalTitle}>Login</h2>
        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <label className={styles.modalLabel}>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.modalInput}
              required
            />
          </label>
          {errors.email && <p className={styles.modalError}>{errors.email}</p>}
          <label className={styles.modalLabel}>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.modalInput}
              required
            />
          </label>
          {errors.password && <p className={styles.modalError}>{errors.password}</p>}
          <button type="submit" className={styles.modalButton}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginFormModal;