// import { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCompass } from '@fortawesome/free-regular-svg-icons';
// import { logout } from "../../redux/session"; 
// import OpenModalMenuItem from "./OpenModalMenuItem";
// import { SignupFormModal } from "../SignupFormModal"; 
// import LoginFormModal from "../LoginFormModal"; 
// import EditProfileModal from "../EditProfileModal";
// import { useModal } from "../../context/Modal";
// import { useNavigate } from "react-router-dom";

// function ProfileButton() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { setModalContent, closeModal } = useModal();
//   const [showMenu, setShowMenu] = useState(false);
//   const user = useSelector((store) => store.session.user);
//   const ulRef = useRef();

//   const toggleMenu = (e) => {
//     e.stopPropagation(); 
//     setShowMenu(!showMenu);
//   };

//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = (e) => {
//       if (ulRef.current && !ulRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener("click", closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   const handleLogout = async () => {
//     await dispatch(logout());
//     navigate('/');
//   };

//   const openEditProfileModal = () => {
//     setModalContent(<EditProfileModal navigate={navigate} closeModal={closeModal} />);
//   };

//   return (
//     <div className={styles.profileButtonContainer}>
//       <button onClick={toggleMenu} className={styles.profileButton}>
//         <FontAwesomeIcon icon={faCompass} />
//       </button>
//       {showMenu && (
//         <ul ref={ulRef} className={`${styles.profileDropdown} ${showMenu ? styles.open : ''}`}>
//           {user ? (
//             <>
//               <li>{user.username}</li>
//               <li>
//                 <button onClick={openEditProfileModal}>Edit Profile</button>
//               </li>
//               <li>
//                 <button onClick={handleLogout}>Log Out</button>
//               </li>
//             </>
//           ) : (
//             <>
//               <li>
//                 <OpenModalMenuItem
//                   itemText="Log In"
//                   modalComponent={<LoginFormModal />}
//                 />
//               </li>
//               <li>
//                 <OpenModalMenuItem
//                   itemText="Sign Up"
//                   modalComponent={<SignupFormModal />}
//                 />
//               </li>
//             </>
//           )}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default ProfileButton;