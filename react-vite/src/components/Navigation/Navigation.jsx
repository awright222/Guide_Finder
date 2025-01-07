import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import navStyles from "./Navigation.module.css";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.session.user);

  const toggleSidePanel = () => {
    setIsOpen(!isOpen);
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
        <ul>
          <li>
            <NavLink to="/" onClick={toggleSidePanel}>
              <div className={navStyles.iconBox}>
                <FontAwesomeIcon icon={faLocationDot} className="fa-location-dot" />
              </div>
              <div className={navStyles.linkBox}>Home</div>
            </NavLink>
          </li>
          {user ? (
            <>
              {user.role === 'user' && (
                <>
                  <li>
                    <NavLink to="/user-dashboard" onClick={toggleSidePanel}>
                      <div className={navStyles.iconBox}>
                        <FontAwesomeIcon icon={faLocationDot} className="fa-location-dot" />
                      </div>
                      <div className={navStyles.linkBox}>User Dashboard</div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/user-profile" onClick={toggleSidePanel}>
                      <div className={navStyles.iconBox}>
                        <FontAwesomeIcon icon={faLocationDot} className="fa-location-dot" />
                      </div>
                      <div className={navStyles.linkBox}>Profile</div>
                    </NavLink>
                  </li>
                </>
              )}
              {user.role === 'manager' && (
                <>
                  <li>
                    <NavLink to="/manager-dashboard" onClick={toggleSidePanel}>
                      <div className={navStyles.iconBox}>
                        <FontAwesomeIcon icon={faLocationDot} className="fa-location-dot" />
                      </div>
                      <div className={navStyles.linkBox}>Manager Dashboard</div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/manager-profile" onClick={toggleSidePanel}>
                      <div className={navStyles.iconBox}>
                        <FontAwesomeIcon icon={faLocationDot} className="fa-location-dot" />
                      </div>
                      <div className={navStyles.linkBox}>Profile</div>
                    </NavLink>
                  </li>
                </>
              )}
              {user.role === 'guide' && (
                <>
                  <li>
                    <NavLink to="/guide-dashboard" onClick={toggleSidePanel}>
                      <div className={navStyles.iconBox}>
                        <FontAwesomeIcon icon={faLocationDot} className="fa-location-dot" />
                      </div>
                      <div className={navStyles.linkBox}>Guide Dashboard</div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/guide-profile" onClick={toggleSidePanel}>
                      <div className={navStyles.iconBox}>
                        <FontAwesomeIcon icon={faLocationDot} className="fa-location-dot" />
                      </div>
                      <div className={navStyles.linkBox}>Profile</div>
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                <ProfileButton />
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" onClick={toggleSidePanel}>
                  <div className={navStyles.iconBox}>
                    <FontAwesomeIcon icon={faLocationDot} className="fa-location-dot" />
                  </div>
                  <div className={navStyles.linkBox}>Log In</div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" onClick={toggleSidePanel}>
                  <div className={navStyles.iconBox}>
                    <FontAwesomeIcon icon={faLocationDot} className="fa-location-dot" />
                  </div>
                  <div className={navStyles.linkBox}>Sign Up</div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/demo-user" onClick={toggleSidePanel}>
                  <div className={navStyles.iconBox}>
                    <FontAwesomeIcon icon={faLocationDot} className="fa-location-dot" />
                  </div>
                  <div className={navStyles.linkBox}>Explore</div>
                </NavLink>
              </li>
              <hr className={navStyles.navDivider} />
              <li>
                <NavLink to="/partners" onClick={toggleSidePanel}>
                  <div className={navStyles.iconBox}>
                    <FontAwesomeIcon icon={faLocationDot} className="fa-location-dot" />
                  </div>
                  <div className={navStyles.linkBox}>Our Partners</div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" onClick={toggleSidePanel}>
                  <div className={navStyles.iconBox}>
                    <FontAwesomeIcon icon={faLocationDot} className="fa-location-dot" />
                  </div>
                  <div className={navStyles.linkBox}>Contact</div>
                </NavLink>
              </li>
            </>
          )}
        </ul>
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