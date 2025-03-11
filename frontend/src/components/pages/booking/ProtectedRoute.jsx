import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext"; // Adjust path if necessary

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();  // Get user from context

  // Check if the user is logged in, else redirect to home
  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
