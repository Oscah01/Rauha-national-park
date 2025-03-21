// src/admin/firebaseService.jsx
import { db, auth } from "../firebase"; // Import Firestore and auth instances
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

// Fetch bookings from Firestore
export const fetchBookings = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "bookings")); // Query the "bookings" collection
    const bookings = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID
      ...doc.data(), // Spread the document data
    }));
    return bookings;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

// Fetch reviews from Firestore
export const fetchReviews = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "reviews")); // Query the "reviews" collection
    const reviews = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID
      ...doc.data(), // Spread the document data
    }));
    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

// Delete a booking from Firestore
export const deleteBooking = async (id) => {
  try {
    await deleteDoc(doc(db, "bookings", id)); // Delete the booking document
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

// Delete a review from Firestore
export const deleteReview = async (id) => {
  try {
    await deleteDoc(doc(db, "reviews", id)); // Delete the review document
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

// Update a review in Firestore
export const updateReview = async (id, updatedData) => {
  try {
    await updateDoc(doc(db, "reviews", id), updatedData); // Update the review document
  } catch (error) {
    console.error("Error updating review:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

// Promote a user to admin
export const makeUserAdmin = async (uid) => {
  try {
    const idToken = await auth.currentUser.getIdToken(); // Get the current user's ID token
    const response = await fetch("https://tungacamp-national-park.onrender.com/api/make-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`, // Send the ID token for verification
      },
      body: JSON.stringify({ uid }), // Send the UID of the user to promote
    });

    const result = await response.json();
    return result; // Return the result (success or error message)
  } catch (error) {
    console.error("Error making user admin:", error);
    return { success: false, message: "Failed to make user admin." };
  }
};

// Check if the user is an admin
export const checkAdminStatus = async (user) => {
  if (!user) return false;

  try {
    const idToken = await user.getIdToken();
    const response = await fetch('https://tungacamp-national-park.onrender.com/api/check-admin', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { isAdmin } = await response.json(); // Destructure isAdmin from the response
    return isAdmin; // Return the boolean value
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// Logout
export const logout = async () => {
  await signOut(auth);
};

// Listen for auth state changes
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};