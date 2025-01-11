import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, restoreUser } from "../../redux/session";
import { useModal } from "../../context/Modal";
import loginFormStyles from "./LoginForm.module.css";

function LoginFormModal({ initialEmail = "", initialPassword = "", navigate }) {
  const dispatch = useDispatch();
 
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
        console.log("Closing modal after successful login");
        closeModal();

        // Navigate to the appropriate route based on the user's role
        const userRole = serverResponse.user.role;
        const routeMap = {
          user: '/user-dashboard',
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
    <div className={loginFormStyles.loginModalContainer}>
      <div className={loginFormStyles.loginModalBackground} onClick={closeModal} />
      <div className={loginFormStyles.loginModalContent}>
        <h1 className={loginFormStyles.modalTitle}>Log In</h1>
        <form onSubmit={handleSubmit} className={loginFormStyles.modalForm}>
          <div>
            <label htmlFor="email" className={loginFormStyles.modalLabel}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={loginFormStyles.modalInput}
            />
            {errors.email && <p className={loginFormStyles.modalError}>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className={loginFormStyles.modalLabel}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={loginFormStyles.modalInput}
            />
            {errors.password && <p className={loginFormStyles.modalError}>{errors.password}</p>}
          </div>
          {errors.general && <p className={loginFormStyles.modalError}>{errors.general}</p>}
          <button type="submit" className={loginFormStyles.modalButton}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;