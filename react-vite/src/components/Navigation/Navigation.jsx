import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { SignupFormModal } from '../SignupFormModal';
import LoginFormModal from '../LoginFormModal'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'; 
import { FaLinkedin, FaGithub } from 'react-icons/fa'; 
import { login } from '../../redux/session'; 
import ProfileButton from './ProfileButton'; 
import navStyles from './Navigation.module.css'; 

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false); 
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { setModalContent } = useModal(); 
  const demoDropdownRef = useRef(null);

  const toggleSidePanel = () => {
    setIsOpen(!isOpen);
  };

  const toggleDemoDropdown = () => {
    setIsDemoOpen(!isDemoOpen);
  };

  useEffect(() => {
    if (isDemoOpen && demoDropdownRef.current) {
      demoDropdownRef.current.style.top = "100%";
    }
  }, [isDemoOpen]);

  const openLoginModal = () => {
    setModalContent(<LoginFormModal />); 
  };

  const openSignupModal = () => {
    setModalContent(<SignupFormModal />);
  };

  const handleDemoLogin = (role) => {
    const credentials = {
      manager: { email: "manager@example.com", password: "password" },
      user: { email: "user@example.com", password: "password" },
      guide: { email: "guide@example.com", password: "password" },
    };

    dispatch(login(credentials[role]));
    toggleSidePanel(); 
  };

  return (
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
                <FontAwesomeIcon icon={faLocationDot} className="fa-location-dot" />
              </div>
              <div className={navStyles.linkBox}>Home</div>
            </NavLink>
          </div>
          {user ? (
            <>
              {user.role === 'user' && (
                <>
                  <div className={navStyles.navItem}>
                    <NavLink to="/user-dashboard" onClick={toggleSidePanel}>
                      <div className={navStyles.iconBox}>
                        <FontAwesomeIcon icon={faLocationDot} className="fa-location-dot" />
                      </div>
                      <div className={navStyles.linkBox}>User Dashboard</div>
                    </NavLink>
                  </div>
                  <div className={navStyles.navItem}>
                    <NavLink to="/user-profile" onClick={toggleSidePanel}>
                      <div className={navStyles.iconBox}>
                        <FontAwesomeIcon icon={faLocationDot} className="fa-location-dot" />
                      </div>
                      <div className={navStyles.linkBox}>Profile</div>
                    </NavLink>
                  </div>
                </>
              )}
              {user.role === 'manager' && (
                <>
                  <div className={navStyles.navItem}>
                    <NavLink to="/manager-dashboard" onClick={toggleSidePanel}>
                      <div className={navStyles.iconBox}>
                        <FontAwesomeIcon icon={faLocationDot} className="fa-location-dot" />
                      </div>
                      <div className={navStyles.linkBox}>Manager Dashboard</div>
                    </NavLink>
                  </div>
                  <div className={navStyles.navItem}>
                    <NavLink to="/manager-profile" onClick={toggleSidePanel}>
                      <div className={navStyles.iconBox}>
                        <FontAwesomeIcon icon={faLocationDot} className="fa-location-dot" />
                      </div>
                      <div className={navStyles.linkBox}>Profile</div>
                    </NavLink>
                  </div>
                </>
              )}
              {user.role === 'guide' && (
                <>
                  <div className={navStyles.navItem}>
                    <NavLink to="/guide-dashboard" onClick={toggleSidePanel}>
                      <div className={navStyles.iconBox}>
                        <FontAwesomeIcon icon={faLocationDot} className="fa-location-dot" />
                      </div>
                      <div className={navStyles.linkBox}>Guide Dashboard</div>
                    </NavLink>
                  </div>
                  <div className={navStyles.navItem}>
                    <NavLink to="/guide-profile" onClick={toggleSidePanel}>
                      <div className={navStyles.iconBox}>
                        <FontAwesomeIcon icon={faLocationDot} className="fa-location-dot" />
                      </div>
                      <div className={navStyles.linkBox}>Profile</div>
                    </NavLink>
                  </div>
                </>
              )}
              <div className={navStyles.navItem}>
                <ProfileButton />
              </div>
            </>
          ) : (
            <>
              <div className={navStyles.navItem}>
                <button onClick={openLoginModal} className={navStyles.linkBox}>
                  <div className={navStyles.iconBox}>
                    <FontAwesomeIcon icon={faLocationDot} className="fa-location-dot" />
                  </div>
                  <div className={navStyles.linkBox}>Log In</div>
                </button>
              </div>
              <div className={navStyles.navItem}>
                <button onClick={openSignupModal} className={navStyles.linkBox}>
                  <div className={navStyles.iconBox}>
                    <FontAwesomeIcon icon={faLocationDot} className="fa-location-dot" />
                  </div>
                  <div className={navStyles.linkBox}>Sign Up</div>
                </button>
              </div>
              <div className={navStyles.navItem}>
                <button onClick={toggleSidePanel} className={navStyles.linkBox}>
                  <div className={navStyles.iconBox}>
                    <FontAwesomeIcon icon={faLocationDot} className="fa-location-dot" />
                  </div>
                  <div className={navStyles.linkBox}>Explore</div>
                </button>
              </div>
              <div className={`${navStyles.navItem} ${isDemoOpen ? navStyles.open : ""}`}>
                <div>
                  <button onClick={toggleDemoDropdown} className={navStyles.linkBox}>
                    <div className={navStyles.iconBox}>
                      <FontAwesomeIcon icon={faLocationDot} className="fa-location-dot" />
                    </div>
                    <div className={navStyles.linkBox}>Demo</div>
                  </button>
                  {isDemoOpen && (
                    <div className={navStyles.demoDropdown} ref={demoDropdownRef}>
                      <div>
                        <button onClick={() => handleDemoLogin("manager")} className={navStyles.linkBox}>
                          Manager
                        </button>
                      </div>
                      <div>
                        <button onClick={() => handleDemoLogin("user")} className={navStyles.linkBox}>
                          User
                        </button>
                      </div>
                      <div>
                        <button onClick={() => handleDemoLogin("guide")} className={navStyles.linkBox}>
                          Guide
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {isDemoOpen && <hr className={navStyles.navDivider} />} 
              <div className={navStyles.navItem}>
                <NavLink to="/partners" onClick={toggleSidePanel}>
                  <div className={navStyles.iconBox}>
                    <FontAwesomeIcon icon={faLocationDot} className="fa-location-dot" />
                  </div>
                  <div className={navStyles.linkBox}>Our Partners</div>
                </NavLink>
              </div>
            </>
          )}
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
  );
}

export default Navigation;