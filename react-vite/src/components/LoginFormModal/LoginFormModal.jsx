import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, restoreUser } from "../../redux/session";
import { useModal } from "../../context/Modal";
import styles from "./LoginForm.module.css"; 

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      login({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      await dispatch(restoreUser());
      closeModal();
    }
  };

  console.log("LoginFormModal rendered");

  return (
    <div className={styles.loginModal}>
      <div className={styles.loginModalBackground} onClick={closeModal} />
      <div className={styles.loginModalContent}>
        <h1 className={styles.modalTitle}>Log In</h1>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <label className={styles.modalLabel}>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.modalInput}
              autoComplete="email"
              placeholder="Please enter email" 
            />
          </label>
          {errors.email && <p className={styles.modalError}>{errors.email}</p>}
          <label className={styles.modalLabel}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.modalInput}
              autoComplete="current-password"
              placeholder="Please enter password" 
            />
          </label>
          {errors.password && <p className={styles.modalError}>{errors.password}</p>}
          <button type="submit" className={styles.modalButton}>Log In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;