import { useState } from "react";
import AuthComponent from "../AuthComponent";

const LoginModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Login</button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setIsModalOpen(false)}>×</button>
            <AuthComponent/>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginModal;
