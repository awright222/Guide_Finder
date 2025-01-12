import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/session";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import DemoButtonStyles from "./DemoButton.module.css";

const demoUsers = [
  {
    username: "demo-client",
    email: "demo-client@aa.io",
    password: "password",
  },
  {
    username: "demo-manager",
    email: "demo-manager@aa.io",
    password: "password",
  },
  {
    username: "demo-guide",
    email: "demo-guide@aa.io",
    password: "password",
  },
];

const DemoButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const csrfToken = useSelector(state => state.session.csrfToken); // Get CSRF token from state

  const handleDemoLogin = (email, password) => {
    if (!csrfToken) {
      console.error("CSRF token missing");
      return; // Prevent the login if CSRF token is missing
    }

    dispatch(login({ email, password, csrfToken }));
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <div className={DemoButtonStyles.demoButton}>
      <button
        className={DemoButtonStyles.dropdownButton}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle the dropdown
      >
        Demo
      </button>
      {isDropdownOpen && (
        <div className={DemoButtonStyles.dropdownContent}>
          {demoUsers.map((user) => (
            <button
              key={user.username}
              onClick={() => handleDemoLogin(user.email, user.password)}
            >
              <div className={DemoButtonStyles.iconBox}>
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              {user.username}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DemoButton;
