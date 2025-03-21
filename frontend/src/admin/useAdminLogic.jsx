import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  fetchBookings,
  fetchReviews,
  deleteBooking,
  deleteReview,
  updateReview,
  checkAdminStatus,
  onAuthChange,
  makeUserAdmin,
} from "./firebaseService";
import { useAdmin } from "./AdminContext";

export const useAdminLogic = () => {
  const { isAdmin, setIsAdmin, loading } = useAdmin(); // Destructure setIsAdmin from useAdmin
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Function to force token refresh
  const refreshToken = async () => {
    await auth.currentUser?.getIdToken(true); // Force token refresh
  };

  // Check admin status on mount
  useEffect(() => {
    console.log("Checking admin status...");

    const unsubscribe = onAuthChange(async (user) => {
      if (user) {
        console.log("User logged in:", user.email);

        // Force token refresh after login
        await refreshToken();

        try {
          const isAdminUser = await checkAdminStatus(user); // Check if the user is an admin
          console.log("User is admin?", isAdminUser);
          setIsAdmin(isAdminUser); // Update isAdmin state in AdminContext

          if (!isAdminUser) {
            navigate("/"); // Redirect to home if the user is not an admin
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          navigate("/"); // Redirect to home on error
        }
      } else {
        setIsAdmin(false); // Set isAdmin to false if no user is logged in
        navigate("/"); // Redirect to home if no user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup the auth listener on unmount
  }, [navigate, setIsAdmin]);

  // Fetch bookings and reviews when isAdmin changes
  useEffect(() => {
    if (isAdmin) {
      fetchBookingsData(); // Fetch bookings
      fetchReviewsData(); // Fetch reviews
    }
  }, [isAdmin]);

  // Fetch bookings data
  const fetchBookingsData = async () => {
    try {
      const data = await fetchBookings(); // Call the fetchBookings function
      setBookings(data); // Set the bookings state
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // Fetch reviews data
  const fetchReviewsData = async () => {
    try {
      const data = await fetchReviews(); // Call the fetchReviews function
      setReviews(data); // Set the reviews state
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Promote a user to admin
  const handleMakeAdmin = async (uid) => {
    try {
      const result = await makeUserAdmin(uid); // Call the makeUserAdmin function
      setMessage(result.message); // Set the result message
    } catch (error) {
      console.error("Error making user admin:", error);
      setMessage("Failed to make user admin.");
    }
  };

  // Delete a booking
  const handleDeleteBooking = async (id) => {
    try {
      await deleteBooking(id);
      setBookings((prev) => prev.filter((booking) => booking.id !== id)); // Update the bookings state
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  // Delete a review
  const handleDeleteReview = async (id) => {
    try {
      await deleteReview(id);
      setReviews((prev) => prev.filter((review) => review.id !== id)); // Update the reviews state
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  // Update a review
  const handleUpdateReview = async (id, updatedData) => {
    try {
      await updateReview(id, updatedData);
      setReviews((prev) =>
        prev.map((review) =>
          review.id === id ? { ...review, ...updatedData } : review
        )
      ); // Update the reviews state
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  return {
    bookings,
    reviews,
    isAdmin,
    loading,
    message,
    handleDeleteBooking,
    handleDeleteReview,
    handleUpdateReview,
    handleMakeAdmin,
  };
};