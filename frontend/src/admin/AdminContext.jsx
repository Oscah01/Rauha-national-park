import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase"; // Your Firebase configuration
import { checkAdminStatus, onAuthChange } from "../admin/firebaseService"; // Firebase service methods

// Create the context
const AdminContext = createContext();

// Create a provider component
export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false); // Define isAdmin and setIsAdmin
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Checking admin status...");
    const unsubscribe = onAuthChange(async (user) => {
      if (user) {
        console.log("User logged in:", user.email);
        try {
          const isAdminUser = await checkAdminStatus(user); // Check if the user is admin
          console.log("User is admin?", isAdminUser);
          setIsAdmin(isAdminUser); // Set isAdmin state
        } catch (error) {
          console.error("Error checking admin status:", error);
        }
      } else {
        setIsAdmin(false); // If no user is logged in, they are not an admin
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin, loading }}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook to use the admin context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};