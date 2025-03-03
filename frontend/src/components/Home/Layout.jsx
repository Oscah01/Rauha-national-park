import { FaWhatsapp } from "react-icons/fa"; // Import WhatsApp icon

const Layout = ({ children }) => {
  return (
    <div>
      {/* WhatsApp Icon */}
      <a
        href="https://wa.me/255712407751" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-icon"
      >
        <FaWhatsapp />
      </a>

      {/* Page Content */}
      {children}
    </div>
  );
};

export default Layout;