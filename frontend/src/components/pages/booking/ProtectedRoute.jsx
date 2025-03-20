import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext"; // Ensure correct path
import { useAdmin } from "../../../admin/AdminContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const { isAdmin, loading } = useAdmin(); // Access isAdmin and loading state
  const location = useLocation();

  // Wait until the auth status is loaded
  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  // If user is not logged in, redirect to home
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If trying to access /admin and user is not an admin, redirect to home
  if (location.pathname === "/admin" && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, allow access
  return children;
};

export default ProtectedRoute;