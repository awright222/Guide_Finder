import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/session";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import DemoButtonStyles from "./DemoButton.module.css";

const demoUsers = [
  { username: "Demo Client", email: "demo-client@aa.io", password: "password" },
  { username: "Demo Guide", email: "demo-guide@aa.io", password: "password" },
  // { username: "Demo Manager", email: "demo-manager@aa.io", password: "password" }
];

const DemoButton = ({ navigate }) => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDemoLogin = async (email, password) => {
    const serverResponse = await dispatch(login({ email, password }));
    setIsDropdownOpen(false);

    if (serverResponse.type === "session/login/fulfilled") {
      navigate('/dashboard');
    }
  };

  return (
    <div className={DemoButtonStyles.demoButton}>
      <button
        className={DemoButtonStyles.dropdownButton}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className={DemoButtonStyles.iconBox}>
          <FontAwesomeIcon icon={faLocationDot} />
        </div>
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