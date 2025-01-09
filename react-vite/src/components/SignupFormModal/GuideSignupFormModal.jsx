import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signupGuide } from "../../redux/session"; 
import guideSignupStyles from "./GuideSignupFormModal.module.css";

function GuideSignupFormModal() {
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
  const [businessname, setBusinessname] = useState("");
  const [insuranceProviderName, setInsuranceProviderName] = useState("");
  const [insuranceNumber, setInsuranceNumber] = useState("");
  const [services, setServices] = useState("");
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
        phone_num: phoneNum,
        address,
        city,
        state,
        zip,
        businessname,
        insurance_provider_name: insuranceProviderName,
        insurance_number: insuranceNumber,
        services,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.className.includes(guideSignupStyles.guideSignupModal)) {
      closeModal();
    }
  };

  return (
    <div className={guideSignupStyles.guideSignupModal} onClick={handleOutsideClick}>
      <div className={guideSignupStyles.guideSignupModalContent}>
        <button onClick={closeModal} className={guideSignupStyles.closeButton}>X</button>
        <h1>Guide Sign Up</h1>
        {errors.server && <p>{errors.server}</p>}
        <form onSubmit={handleSubmit}>
          <div className={guideSignupStyles.formGroup}>
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
          <div className={guideSignupStyles.formGroup}>
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
          <div className={guideSignupStyles.formGroup}>
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
          <div className={guideSignupStyles.formGroup}>
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
          <div className={guideSignupStyles.formGroup}>
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
          <div className={guideSignupStyles.formGroup}>
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
          <div className={guideSignupStyles.formGroup}>
            <label>Phone Number</label>
            <input
              type="text"
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
              placeholder="Enter your phone number"
            />
            {errors.phoneNum && <p>{errors.phoneNum}</p>}
          </div>
          <div className={guideSignupStyles.formGroup}>
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
            />
            {errors.address && <p>{errors.address}</p>}
          </div>
          <div className={guideSignupStyles.formGroup}>
            <label>City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city"
            />
            {errors.city && <p>{errors.city}</p>}
          </div>
          <div className={guideSignupStyles.formGroup}>
            <label>State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Enter your state"
            />
            {errors.state && <p>{errors.state}</p>}
          </div>
          <div className={guideSignupStyles.formGroup}>
            <label>Zip Code</label>
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="Enter your zip code"
            />
            {errors.zip && <p>{errors.zip}</p>}
          </div>
          <div className={guideSignupStyles.formGroup}>
            <label>Business Name</label>
            <input
              type="text"
              value={businessname}
              onChange={(e) => setBusinessname(e.target.value)}
              placeholder="Enter your business name"
            />
            {errors.businessname && <p>{errors.businessname}</p>}
          </div>
          <div className={guideSignupStyles.formGroup}>
            <label>Insurance Provider Name</label>
            <input
              type="text"
              value={insuranceProviderName}
              onChange={(e) => setInsuranceProviderName(e.target.value)}
              placeholder="Enter your insurance provider name"
            />
            {errors.insuranceProviderName && <p>{errors.insuranceProviderName}</p>}
          </div>
          <div className={guideSignupStyles.formGroup}>
            <label>Insurance Number</label>
            <input
              type="text"
              value={insuranceNumber}
              onChange={(e) => setInsuranceNumber(e.target.value)}
              placeholder="Enter your insurance number"
            />
            {errors.insuranceNumber && <p>{errors.insuranceNumber}</p>}
          </div>
          <div className={guideSignupStyles.formGroup}>
            <label>Services</label>
            <input
              type="text"
              value={services}
              onChange={(e) => setServices(e.target.value)}
              placeholder="Enter the services you offer"
            />
            {errors.services && <p>{errors.services}</p>}
          </div>
          <div className={guideSignupStyles.joinButtonContainer}>
            <button type="submit" className={guideSignupStyles.joinButton}>Join</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GuideSignupFormModal;