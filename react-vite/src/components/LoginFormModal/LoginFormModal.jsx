import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../redux/session";
import loginFormStyles from "./LoginForm.module.css";

function LoginFormModal({ navigate }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userRole, setUserRole] = useState(null); 
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log("LOGIN RAN")
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
              autoComplete="email"
              required
            />
            {errors.payload?.email && <p className={loginFormStyles.modalError}>{errors.payload?.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className={loginFormStyles.modalLabel}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={loginFormStyles.modalInput}
              autoComplete="current-password"
              required
            />
            {errors.payload?.password && <p className={loginFormStyles.modalError}>{errors.payload?.password}</p>}
          </div>
          {errors.general && <p className={loginFormStyles.modalError}>{errors.general}</p>}
          <button type="submit" className={loginFormStyles.modalButton}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
