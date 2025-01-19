import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/session";
import userSignupStyles from "./SignupForm.module.css";

const SignUpFormModal = ({ closeModal, navigate }) => {
  const dispatch = useDispatch();

  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [isGuide, setIsGuide] = useState(false);
  const [businessname, setBusinessname] = useState("");
  const [insuranceProviderName, setInsuranceProviderName] = useState("");
  const [insuranceNumber, setInsuranceNumber] = useState("");

  // Form validation state
  const [errors, setErrors] = useState({});

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);

  // Redux state for user
  const user = useSelector(state => state.session.user);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors at the start

    // Check if password meets the requirements
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrors({ password: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character." });
      return;
    }

    const userInfo = {
      email,
      username,
      password,
      firstname,
      lastname,
      phone_num: phoneNum,
      address,
      city,
      state,
      zip,
      is_guide: isGuide,
      businessname: isGuide ? businessname : null,
      insurance_provider_name: isGuide ? insuranceProviderName : null,
      insurance_number: isGuide ? insuranceNumber : null,
    };

    console.log("Submitting signup form with userInfo:", userInfo);

    const serverResponse = await dispatch(signup(userInfo));

    console.log("Server response:", serverResponse);

    if (serverResponse?.payload?.errors) {
      // If there are errors returned from the backend, display them
      console.error("Signup errors:", serverResponse.payload.errors);
      setErrors(serverResponse.payload.errors);
      return; // Prevent form submission if there are errors
    } else if (serverResponse?.payload) {
      // Only close modal if no errors exist
      closeModal();
      navigate("/dashboard"); // Updated navigation
    }
  };

  // Clear errors on modal close
  const handleClose = () => {
    setErrors({});
    closeModal();
  };

  // Redirect if user is already logged in
  if (user) {
    navigate("/dashboard"); // Updated navigation
    return null;
  }

  // Prevent clicks inside the modal content from closing the modal
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={userSignupStyles.signupModal} onClick={handleClose}>
      <div className={userSignupStyles.signupModalContent} onClick={handleContentClick}>
        <button onClick={closeModal} className={userSignupStyles.closeButton}>X</button>
        <h1>Sign Up</h1>
        {errors.general && <p className={userSignupStyles.modalError}>{errors.general}</p>}
        <form onSubmit={handleSubmit}>
          <div className={userSignupStyles.formGroup}>
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            {errors.email && <p className={userSignupStyles.modalError}>{errors.email}</p>}
          </div>
          <div className={userSignupStyles.formGroup}>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              required
            />
            {errors.username && <p className={userSignupStyles.modalError}>{errors.username}</p>}
          </div>
          <div className={userSignupStyles.formGroup}>
            <label>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
            {errors.password && <p className={userSignupStyles.modalError}>{errors.password}</p>}
          </div>
          <div className={userSignupStyles.formGroup}>
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
          <div className={userSignupStyles.formGroup}>
            <label>First Name</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="Enter your first name"
              required
            />
            {errors.firstname && <p className={userSignupStyles.modalError}>{errors.firstname}</p>}
          </div>
          <div className={userSignupStyles.formGroup}>
            <label>Last Name</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Enter your last name"
              required
            />
            {errors.lastname && <p className={userSignupStyles.modalError}>{errors.lastname}</p>}
          </div>
          <div className={userSignupStyles.formGroup}>
            <label>Phone Number</label>
            <input
              type="text"
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
              placeholder="Enter your phone number"
            />
            {errors.phone_num && <p className={userSignupStyles.modalError}>{errors.phone_num}</p>}
          </div>
          <div className={userSignupStyles.formGroup}>
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
            />
            {errors.address && <p className={userSignupStyles.modalError}>{errors.address}</p>}
          </div>
          <div className={userSignupStyles.formGroup}>
            <label>City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city"
            />
            {errors.city && <p className={userSignupStyles.modalError}>{errors.city}</p>}
          </div>
          <div className={userSignupStyles.formGroup}>
            <label>State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Enter your state"
            />
            {errors.state && <p className={userSignupStyles.modalError}>{errors.state}</p>}
          </div>
          <div className={userSignupStyles.formGroup}>
            <label>Zip Code</label>
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="Enter your zip code"
            />
            {errors.zip && <p className={userSignupStyles.modalError}>{errors.zip}</p>}
          </div>
          <div className={userSignupStyles.formGroup}>
            <label>
              <input
                type="checkbox"
                checked={isGuide}
                onChange={(e) => setIsGuide(e.target.checked)}
              />
              Sign up as a guide
            </label>
          </div>
          {isGuide && (
            <>
              <div className={userSignupStyles.formGroup}>
                <label>Business Name</label>
                <input
                  type="text"
                  value={businessname}
                  onChange={(e) => setBusinessname(e.target.value)}
                  placeholder="Enter your business name"
                />
                {errors.businessname && <p className={userSignupStyles.modalError}>{errors.businessname}</p>}
              </div>
              <div className={userSignupStyles.formGroup}>
                <label>Insurance Provider Name</label>
                <input
                  type="text"
                  value={insuranceProviderName}
                  onChange={(e) => setInsuranceProviderName(e.target.value)}
                  placeholder="Enter your insurance provider name"
                />
                {errors.insurance_provider_name && <p className={userSignupStyles.modalError}>{errors.insurance_provider_name}</p>}
              </div>
              <div className={userSignupStyles.formGroup}>
                <label>Insurance Number</label>
                <input
                  type="text"
                  value={insuranceNumber}
                  onChange={(e) => setInsuranceNumber(e.target.value)}
                  placeholder="Enter your insurance number"
                />
                {errors.insurance_number && <p className={userSignupStyles.modalError}>{errors.insurance_number}</p>}
              </div>
            </>
          )}
          <div className={userSignupStyles.joinButtonContainer}>
            <button type="submit" className={userSignupStyles.joinButton}>Join</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpFormModal;