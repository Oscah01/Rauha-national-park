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
// Client-side function to promote a user to admin
export const makeUserAdmin = async (uid) => {
  try {
    // Get the current user's token, and force refresh to get the updated claims
    const idToken = await auth.currentUser.getIdToken(true);

    // Send the API request to promote the user to admin
    const response = await fetch("http://localhost:5000/api/make-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ uid }),
    });

    const result = await response.json();
    return result; // Handle the result on success or failure
  } catch (error) {
    console.error("Error making user admin:", error);
    return { success: false, message: "Failed to make user admin." };
  }
};

// Client-side function to check if the user is an admin
export const checkAdminStatus = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("No user is currently logged in.");
      return false;
    }

    const idToken = await user.getIdToken();

    const response = await fetch("http://localhost:5000/api/check-admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    });

    const result = await response.json();
    return result.isAdmin; // true or false
  } catch (error) {
    console.error("Error checking admin status:", error);
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
