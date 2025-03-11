// src/context/AdminContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { checkAdminStatus, onAuthChange } from "../admin/firebaseService";

// Create the context
const AdminContext = createContext();

// Create a provider component
export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false); // Define isAdmin and setIsAdmin
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Checking admin status...");
    const unsubscribe = onAuthChange(async (user) => {
      if (user) {
        console.log("User logged in:", user.email);

        try {
          const isAdminUser = await checkAdminStatus(user);
          console.log("User is admin?", isAdminUser);
          setIsAdmin(isAdminUser); // Use setIsAdmin to update the state
          if (!isAdminUser) {
            navigate("/"); // Redirect if not admin
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          navigate("/home");
        }
      } else {
        navigate("/home");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  // Provide isAdmin and setIsAdmin in the context value
  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin, loading }}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook to use the admin context
export const useAdmin = () => {
  return useContext(AdminContext);
};