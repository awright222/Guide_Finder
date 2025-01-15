import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import { logout } from "../../redux/session";
import DemoButton from './DemoButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import navStyles from "./Navigation.module.css";

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.session.user);
  const userRole = useSelector((state) => state.session.userRole);
  const { setModalContent } = useModal();

  const toggleSidePanel = () => {
    setIsOpen(!isOpen);
  };

  const openLoginModal = (initialEmail = "", initialPassword = "") => {
    setModalContent(<LoginFormModal initialEmail={initialEmail} initialPassword={initialPassword} navigate={navigate} />);
  };

  const openSignupModal = () => {
    setModalContent(<SignupFormModal />);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const hideSidePanelRoutes = ["/user-dashboard", "/manager-dashboard", "/guide-dashboard"];
  const isDashboardPage = hideSidePanelRoutes.includes(location.pathname);

  return (
    <>
      {user ? (
        <nav className={navStyles.navbar}>
          <div className={navStyles.navbarContainer}>
            <NavLink to="/" className={navStyles.navbarLogo}>
              Guide Finder
            </NavLink>
            <ul className={navStyles.navMenu}>
              <li className={navStyles.navItem}>
                <NavLink to="/" className={navStyles.navLinks}>
                  Home
                </NavLink>
              </li>
              {userRole === 'guide' && (
                <li className={navStyles.navItem}>
                  <NavLink to="/guide-dashboard" className={navStyles.navLinks}>
                    Dashboard
                  </NavLink>
                </li>
              )}
              {userRole === 'user' && (
                <li className={navStyles.navItem}>
                  <NavLink to="/user-dashboard" className={navStyles.navLinks}>
                    Dashboard
                  </NavLink>
                </li>
              )}
              {userRole === 'manager' && (
                <li className={navStyles.navItem}>
                  <NavLink to="/manager-dashboard" className={navStyles.navLinks}>
                    Dashboard
                  </NavLink>
                </li>
              )}
              <li className={navStyles.navItem}>
                <button onClick={handleLogout} className={navStyles.navLinksBtn}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      ) : (
        <>
          {!isDashboardPage && (
            <>
              <button onClick={toggleSidePanel} className={`${navStyles.menuButton} ${isOpen ? navStyles.open : ""}`}>
                ☰
              </button>
              <div className={`${navStyles.sidePanel} ${isOpen ? navStyles.open : ""}`}>
                <button onClick={toggleSidePanel} className={`${navStyles.closeButton} ${isOpen ? navStyles.open : ""}`}>
                  &times;
                </button>
                <div className={navStyles.navItems}>
                  <div className={navStyles.navItem}>
                    <NavLink to="/" onClick={toggleSidePanel}>
                      <div className={navStyles.iconBox}>
                        <FontAwesomeIcon icon={faLocationDot} />
                      </div>
                      <div className={navStyles.linkBox}>Home</div>
                    </NavLink>
                  </div>
                  {!user && (
                    <>
                      <div className={navStyles.navItem}>
                        <button onClick={() => openLoginModal()}>
                          <div className={navStyles.iconBox}>
                            <FontAwesomeIcon icon={faLocationDot} />
                          </div>
                          <div className={navStyles.linkBox}>Login</div>
                        </button>
                      </div>
                      <div className={navStyles.navItem}>
                        <button onClick={openSignupModal}>
                          <div className={navStyles.iconBox}>
                            <FontAwesomeIcon icon={faLocationDot} />
                          </div>
                          <div className={navStyles.linkBox}>Sign Up</div>
                        </button>
                      </div>
                    </>
                  )}
                  <div className={navStyles.navItem}>
                    <NavLink to="/search-services" onClick={toggleSidePanel}>
                      <div className={navStyles.iconBox}>
                        <FontAwesomeIcon icon={faLocationDot} />
                      </div>
                      <div className={navStyles.linkBox}>Explore</div>
                    </NavLink>
                  </div>
                  <div className={navStyles.navItem}>
                    <DemoButton />
                  </div>
                  <div className={navStyles.navItem}>
                    <NavLink to="/partners" onClick={toggleSidePanel}>
                      <div className={navStyles.iconBox}>
                        <FontAwesomeIcon icon={faLocationDot} />
                      </div>
                      <div className={navStyles.linkBox}>Our Partners</div>
                    </NavLink>
                  </div>
                </div>
                <div className={navStyles.footerContent}>
                  <div className={navStyles.footerBox}>
                    <div className={navStyles.socialLinksBox}>
                      <div className={navStyles.socialLinks}>
                        <a href="https://www.linkedin.com/in/alexgwright2" target="_blank" rel="noopener noreferrer">
                          <FaLinkedin />
                        </a>
                        <a href="https://github.com/awright222" target="_blank" rel="noopener noreferrer">
                          <FaGithub />
                        </a>
                      </div>
                    </div>
                    <div className={navStyles.rightsReservedBox}>
                      <p>&copy; {new Date().getFullYear()} Guide Finder. All rights reserved.</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Navigation;