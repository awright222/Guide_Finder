import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateProfile, deleteUser } from "../../redux/session";
import editModalStyles from "./EditProfileModal.module.css";

const EditProfileModal = ({ navigate }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
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
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setUsername(user.username || "");
      setFirstname(user.firstname || "");
      setLastname(user.lastname || "");
      setPhoneNum(user.phone_num || "");
      setAddress(user.address || "");
      setCity(user.city || "");
      setState(user.state || "");
      setZip(user.zip || "");
      setIsGuide(user.is_guide || false);
      setBusinessname(user.businessname || "");
      setInsuranceProviderName(user.insurance_provider_name || "");
      setInsuranceNumber(user.insurance_number || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const sanitizedPhoneNum = phoneNum.replace(/\D/g, '');

    if (sanitizedPhoneNum.length < 9 || sanitizedPhoneNum.length > 15) {
      setErrors({ phoneNum: "Invalid phone number. Please use a valid format." });
      return; 
    }

    const updatedUserInfo = {
      email,
      username,
      firstname,
      lastname,
      phone_num: sanitizedPhoneNum,
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
      navigate("/dashboard");
    }
  };

  const handleDeleteAccount = async () => {
    await dispatch(deleteUser(user.id));
    closeModal();
    navigate("/");
  };

  return (
    <div className={editModalStyles.editProfileModal}>
      <div className={editModalStyles.editProfileModalContent}>
        <div className={editModalStyles.header}>
          <h2>Profile Information</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={editModalStyles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className={editModalStyles.error}>{errors.email}</p>}
          </div>
          <div className={editModalStyles.formGroup}>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {errors.username && <p className={editModalStyles.error}>{errors.username}</p>}
          </div>
          <div className={editModalStyles.formGroup}>
            <label>First Name</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
            {errors.firstname && <p className={editModalStyles.error}>{errors.firstname}</p>}
          </div>
          <div className={editModalStyles.formGroup}>
            <label>Last Name</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
            {errors.lastname && <p className={editModalStyles.error}>{errors.lastname}</p>}
          </div>
          <div className={editModalStyles.formGroup}>
            <label>Phone Number</label>
            <input
              type="text"
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
            />
            {errors.phoneNum && <p className={editModalStyles.error}>{errors.phoneNum}</p>}
          </div>
          <div className={editModalStyles.formGroup}>
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <p className={editModalStyles.error}>{errors.address}</p>}
          </div>
          <div className={editModalStyles.formGroup}>
            <label>City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {errors.city && <p className={editModalStyles.error}>{errors.city}</p>}
          </div>
          <div className={editModalStyles.formGroup}>
            <label>State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            {errors.state && <p className={editModalStyles.error}>{errors.state}</p>}
          </div>
          <div className={editModalStyles.formGroup}>
            <label>Zip Code</label>
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
            {errors.zip && <p className={editModalStyles.error}>{errors.zip}</p>}
          </div>
          {isGuide && (
            <>
              <div className={editModalStyles.formGroup}>
                <label>Business Name</label>
                <input
                  type="text"
                  value={businessname}
                  onChange={(e) => setBusinessname(e.target.value)}
                />
                {errors.businessname && <p className={editModalStyles.error}>{errors.businessname}</p>}
              </div>
              <div className={editModalStyles.formGroup}>
                <label>Insurance Provider Name</label>
                <input
                  type="text"
                  value={insuranceProviderName}
                  onChange={(e) => setInsuranceProviderName(e.target.value)}
                />
                {errors.insuranceProviderName && <p className={editModalStyles.error}>{errors.insuranceProviderName}</p>}
              </div>
              <div className={editModalStyles.formGroup}>
                <label>Insurance Number</label>
                <input
                  type="text"
                  value={insuranceNumber}
                  onChange={(e) => setInsuranceNumber(e.target.value)}
                />
                {errors.insuranceNumber && <p className={editModalStyles.error}>{errors.insuranceNumber}</p>}
              </div>
            </>
          )}
          <div className={editModalStyles.buttonContainer}>
            <button type="submit" className={editModalStyles.saveButton}>Save</button>
            <button type="button" onClick={() => setShowDeleteConfirmation(true)} className={editModalStyles.deleteButton}>Delete Account</button>
          </div>
        </form>
      </div>
      {showDeleteConfirmation && (
        <div className={editModalStyles.confirmationModal}>
          <div className={editModalStyles.confirmationModalContent}>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <button onClick={handleDeleteAccount} className={editModalStyles.confirmButton}>Yes</button>
            <button onClick={() => setShowDeleteConfirmation(false)} className={editModalStyles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfileModal;