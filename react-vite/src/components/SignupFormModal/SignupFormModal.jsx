import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signup } from "../../redux/session";
import userSignupStyles from "./SignupForm.module.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    if (password !== confirmPassword) {
      return setErrors({ confirmPassword: "Passwords must match." });
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

    const serverResponse = await dispatch(signup(userInfo));

    if (serverResponse?.errors) {
      if (Array.isArray(serverResponse.errors)) {
        setErrors({ general: serverResponse.errors[0] });
      } else {
        setErrors(serverResponse.errors);
      }
    } else {
      closeModal();
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.className.includes(userSignupStyles.signupModal)) {
      closeModal();
    }
  };

  return (
    <div className={userSignupStyles.signupModal} onClick={handleOutsideClick}>
      <div className={userSignupStyles.signupModalContent}>
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
            {errors.password && <p className={userSignupStyles.modalError}>{errors.password}</p>}
          </div>
          <div className={userSignupStyles.formGroup}>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
            {errors.confirmPassword && <p className={userSignupStyles.modalError}>{errors.confirmPassword}</p>}
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
            {errors.phoneNum && <p className={userSignupStyles.modalError}>{errors.phoneNum}</p>}
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
                {errors.insuranceProviderName && <p className={userSignupStyles.modalError}>{errors.insuranceProviderName}</p>}
              </div>
              <div className={userSignupStyles.formGroup}>
                <label>Insurance Number</label>
                <input
                  type="text"
                  value={insuranceNumber}
                  onChange={(e) => setInsuranceNumber(e.target.value)}
                  placeholder="Enter your insurance number"
                />
                {errors.insuranceNumber && <p className={userSignupStyles.modalError}>{errors.insuranceNumber}</p>}
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
}

export default SignupFormModal;