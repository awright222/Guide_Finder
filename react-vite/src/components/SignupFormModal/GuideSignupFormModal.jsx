import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signupGuide } from "../../redux/session"; 
import "./GuideSignupFormModal.module.css";

function GuideSignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      signupGuide({
        email,
        username,
        password,
        firstname,
        lastname,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="guideSignupModal">
      <div className="guideSignupModalContent">
        <h1>Guide Sign Up</h1>
        {errors.server && <p>{errors.server}</p>}
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>First Name</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="Enter your first name"
              required
            />
            {errors.firstname && <p>{errors.firstname}</p>}
          </div>
          <div className="formGroup">
            <label>Last Name</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Enter your last name"
              required
            />
            {errors.lastname && <p>{errors.lastname}</p>}
          </div>
          <div className="formGroup">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div className="formGroup">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              required
            />
            {errors.username && <p>{errors.username}</p>}
          </div>
          <div className="formGroup">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <div className="formGroup">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          </div>
          <button type="submit" className="joinButton">Join</button>
        </form>
      </div>
    </div>
  );
}

export default GuideSignupFormModal;