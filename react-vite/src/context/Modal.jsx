import { useRef, useState, useContext, createContext, useEffect } from "react";
import ReactDOM from "react-dom";
import modalStyles from "./Modal.module.css";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [modalContent, setModalContent] = useState(null);
  const [onModalClose, setOnModalClose] = useState(null);

  const closeModal = () => {
    console.log("Closing modal");
    setModalContent(null);
    if (typeof onModalClose === "function") {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const contextValue = {
    modalRef,
    modalContent,
    setModalContent,
    setOnModalClose,
    closeModal,
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal() {
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);

  useEffect(() => {
    if (modalRef.current) {
      console.log("Modal height:", modalRef.current.style.height);
    }
  }, [modalRef]);

  if (!modalRef || !modalRef.current || !modalContent) return null;

  return ReactDOM.createPortal(
    <div className={modalStyles.modal}>
      <div className={modalStyles.modalBackground} onClick={closeModal} />
      <div className={modalStyles.modalContent}>{modalContent}</div>
    </div>,
    modalRef.current
  );
}

export const useModal = () => useContext(ModalContext);