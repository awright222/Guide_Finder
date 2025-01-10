
import { useModal } from "./context/Modal"; 

function TestModalButton() {
  const { setModalContent } = useModal();

  const handleTestModal = () => {
    setModalContent(<div style={{ padding: "20px" }}>Test Modal Content</div>);
  };

  return (
    <button
      onClick={handleTestModal}
      style={{ padding: "10px", margin: "20px" }}
    >
      Open Test Modal
    </button>
  );
}

export default TestModalButton;
