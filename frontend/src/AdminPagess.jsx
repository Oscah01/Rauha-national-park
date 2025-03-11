import { useState, useEffect } from "react";
import { db, auth } from "./firebase"; // Import Firebase Auth and Firestore
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth"; // Import Firebase Auth functions
import { useNavigate } from "react-router-dom"; // For redirecting unauthorized users
import "./AdminPage.css";

const AdminPagee = () => {
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("bookings"); // Track active tab
  const [editingReview, setEditingReview] = useState(null); // Track which review is being edited
  const [updatedReview, setUpdatedReview] = useState({
    name: "",
    position: "",
    testimonial: "",
  });
  const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an admin
  const navigate = useNavigate(); // For redirecting

  // Check if the user is an admin
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch the user's role from Firestore
        const userDoc = await getDocs(collection(db, "users"));
        const userData = userDoc.docs.find((doc) => doc.id === user.uid)?.data();
        if (userData && userData.role === "admin") {
          setIsAdmin(true); // User is an admin
        } else {
          // User is not an admin, redirect to home page
          navigate("/");
        }
      } else {
        // User is not logged in, redirect to login page
        navigate("/login");
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [navigate]);

  // Fetch bookings from Firestore
  useEffect(() => {
    if (!isAdmin) return; // Only fetch data if the user is an admin

    const fetchBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bookings"));
        const bookingsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [isAdmin]);

  // Fetch reviews from Firestore
  useEffect(() => {
    if (!isAdmin) return; // Only fetch data if the user is an admin

    const fetchReviews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reviews"));
        const reviewsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [isAdmin]);

  // Delete a booking
  const handleDeleteBooking = async (id) => {
    try {
      await deleteDoc(doc(db, "bookings", id));
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
      alert("Booking deleted successfully!");
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  // Delete a review
  const handleDeleteReview = async (id) => {
    try {
      await deleteDoc(doc(db, "reviews", id));
      setReviews((prev) => prev.filter((review) => review.id !== id));
      alert("Review deleted successfully!");
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  // Start editing a review
  const startEditReview = (review) => {
    setEditingReview(review.id);
    setUpdatedReview({
      name: review.name,
      position: review.position,
      testimonial: review.testimonial,
    });
  };

  // Save the updated review
  const saveEditedReview = async (id) => {
    if (!updatedReview.name || !updatedReview.position || !updatedReview.testimonial) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await updateDoc(doc(db, "reviews", id), updatedReview);
      setReviews((prev) =>
        prev.map((review) =>
          review.id === id ? { ...review, ...updatedReview } : review
        )
      );
      setEditingReview(null);
      alert("Review updated successfully!");
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // If the user is not an admin, do not render the admin page
  if (!isAdmin) {
    return null; // Or a loading spinner
  }

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>

      {/* Tabs for Bookings and Reviews */}
      <div className="tabs">
        <button
          onClick={() => setActiveTab("bookings")}
          className={activeTab === "bookings" ? "active" : ""}
        >
          Bookings
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={activeTab === "reviews" ? "active" : ""}
        >
          Reviews
        </button>
      </div>

      {/* Bookings Table */}
      {activeTab === "bookings" && (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Check-In Date</th>
              <th>Check-Out Date</th>
              <th>Selected Options</th>
              <th>Total Amount</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.email}</td>
                <td>{booking.checkInDate}</td>
                <td>{booking.checkOutDate}</td>
                <td>
                  <ul>
                    {booking.selectedOptions.map((option) => (
                      <li key={option.id}>
                        {option.title} - ${option.price}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>${booking.totalAmount}</td>
                <td>
                  <span
                    style={{
                      color:
                        booking.paymentStatus === "Success"
                          ? "green"
                          : booking.paymentStatus === "Processing"
                          ? "orange"
                          : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {booking.paymentStatus || "Not Paid"}
                  </span>
                </td>
                <td>
                  <button
                    className="delete"
                    onClick={() => handleDeleteBooking(booking.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Reviews Table */}
      {activeTab === "reviews" && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Testimonial</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td>
                  {editingReview === review.id ? (
                    <input
                      type="text"
                      value={updatedReview.name}
                      onChange={(e) =>
                        setUpdatedReview({ ...updatedReview, name: e.target.value })
                      }
                    />
                  ) : (
                    review.name
                  )}
                </td>
                <td>
                  {editingReview === review.id ? (
                    <input
                      type="text"
                      value={updatedReview.position}
                      onChange={(e) =>
                        setUpdatedReview({ ...updatedReview, position: e.target.value })
                      }
                    />
                  ) : (
                    review.position
                  )}
                </td>
                <td>
                  {editingReview === review.id ? (
                    <textarea
                      value={updatedReview.testimonial}
                      onChange={(e) =>
                        setUpdatedReview({ ...updatedReview, testimonial: e.target.value })
                      }
                    />
                  ) : (
                    review.testimonial
                  )}
                </td>
                <td>
                  {editingReview === review.id ? (
                    <>
                      <button onClick={() => saveEditedReview(review.id)}>Save</button>
                      <button onClick={() => setEditingReview(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEditReview(review)}>Edit</button>
                      <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPagee;