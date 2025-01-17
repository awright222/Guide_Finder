import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateProfile } from "../../redux/session";
import styles from "./EditProfileModal.module.css";

const EditProfileModal = ({ navigate }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user);

  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [phoneNum, setPhoneNum] = useState(user.phone_num);
  const [address, setAddress] = useState(user.address);
  const [city, setCity] = useState(user.city);
  const [state, setState] = useState(user.state);
  const [zip, setZip] = useState(user.zip);
  const [isGuide] = useState(user.is_guide); 
  const [businessname, setBusinessname] = useState(user.businessname);
  const [insuranceProviderName, setInsuranceProviderName] = useState(user.insurance_provider_name);
  const [insuranceNumber, setInsuranceNumber] = useState(user.insurance_number);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); 

    const updatedUserInfo = {
      email,
      username,
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

    const serverResponse = await dispatch(updateProfile(updatedUserInfo));

    if (serverResponse?.errors) {
      setErrors(serverResponse.errors);
    } else {
      closeModal();
      navigate('/dashboard'); 
    }
  };

  return (
    <div className={styles.editProfileModal}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && <p className={styles.error}>{errors.username}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>First Name</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
          {errors.firstname && <p className={styles.error}>{errors.firstname}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>Last Name</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
          {errors.lastname && <p className={styles.error}>{errors.lastname}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>Phone Number</label>
          <input
            type="text"
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
          />
          {errors.phoneNum && <p className={styles.error}>{errors.phoneNum}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && <p className={styles.error}>{errors.address}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {errors.city && <p className={styles.error}>{errors.city}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          {errors.state && <p className={styles.error}>{errors.state}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>Zip Code</label>
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
          {errors.zip && <p className={styles.error}>{errors.zip}</p>}
        </div>
        {isGuide && (
          <>
            <div className={styles.formGroup}>
              <label>Business Name</label>
              <input
                type="text"
                value={businessname}
                onChange={(e) => setBusinessname(e.target.value)}
              />
              {errors.businessname && <p className={styles.error}>{errors.businessname}</p>}
            </div>
            <div className={styles.formGroup}>
              <label>Insurance Provider Name</label>
              <input
                type="text"
                value={insuranceProviderName}
                onChange={(e) => setInsuranceProviderName(e.target.value)}
              />
              {errors.insuranceProviderName && <p className={styles.error}>{errors.insuranceProviderName}</p>}
            </div>
            <div className={styles.formGroup}>
              <label>Insurance Number</label>
              <input
                type="text"
                value={insuranceNumber}
                onChange={(e) => setInsuranceNumber(e.target.value)}
                placeholder="Enter your insurance number"
              />
              {errors.insuranceNumber && <p className={styles.error}>{errors.insuranceNumber}</p>}
            </div>
          </>
        )}
        <div className={styles.submitButtonContainer}>
          <button type="submit" className={styles.submitButton}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileModal;