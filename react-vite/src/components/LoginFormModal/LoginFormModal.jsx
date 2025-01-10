import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, restoreUser } from "../../redux/session";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";

function LoginFormModal({ initialEmail = "", initialPassword = "" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({}); // Clear previous errors

    try {
      const serverResponse = await dispatch(
        login({ email, password })
      );

      console.log("Server Response:", serverResponse);

      // Check if the server responded with errors
      if (serverResponse?.errors) {
        console.error("Login Errors:", serverResponse.errors);
        // Handling error based on array or object error response
        if (Array.isArray(serverResponse.errors)) {
          setErrors({ general: serverResponse.errors[0] });
        } else {
          setErrors(serverResponse.errors);
        }
      } else {
        await dispatch(restoreUser());
        closeModal();

        // Navigate to the appropriate route based on the user's role
        const userRole = serverResponse.user.role;
        const routeMap = {
          user: '/user-home',
          guide: '/guide-dashboard',
          manager: '/manager-dashboard',
        };
        navigate(routeMap[userRole]);
      }
    } catch (error) {
      console.error("Unexpected Error:", error);
      setErrors({ general: "An unexpected error occurred. Please try again." });
    }
  };

  return (
    <div className={styles.loginModal}>
      <div className={styles.loginModalBackground} onClick={closeModal} />
      <div className={styles.loginModalContent}>
        <h1 className={styles.modalTitle}>Log In</h1>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className={styles.error}>{errors.password}</p>}
          </div>
          {errors.general && <p className={styles.error}>{errors.general}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;