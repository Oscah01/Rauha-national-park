// src/admin/AdminPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminLogic } from "./useAdminLogic";
import { logout } from "./firebaseService";
import BookingsTable from "./BookingsTable";
import ReviewsTable from "./ReviewsTable";
import "./AdminPage.css";

const AdminPage = () => {
  const {
    bookings,
    reviews,
    isAdmin,
    loading,
    message,
    handleDeleteBooking,
    handleDeleteReview,
    handleUpdateReview,
    handleMakeAdmin,
  } = useAdminLogic();
  const [userId, setUserId] = useState("");
  const [activeTab, setActiveTab] = useState("bookings");
  const [editingReview, setEditingReview] = useState(null);
  const [updatedReview, setUpdatedReview] = useState({
    name: "",
    position: "",
    testimonial: "",
  });
  const navigate = useNavigate();

  // Handling logout
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const startEditReview = (review) => {
    setEditingReview(review.id);
    setUpdatedReview({
      name: review.name,
      position: review.position,
      testimonial: review.testimonial,
    });
  };

  const saveEditedReview = async (id) => {
    if (!updatedReview.name || !updatedReview.position || !updatedReview.testimonial) {
      alert("Please fill all fields.");
      return;
    }
    await handleUpdateReview(id, updatedReview);
    setEditingReview(null);
  };

  const handleMakeAdminClick = async () => {
    if (!userId) {
      alert("Please enter a user ID.");
      return;
    }
    await handleMakeAdmin(userId);
  };

  if (loading) {
    return <p>Loading...</p>; // Show a loading spinner or message
  }

  if (!isAdmin) {
    navigate("/"); // Redirect if not admin
    return null; // Prevent rendering the rest of the component
  }

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>

      {/* Admin Promotion Section */}
      <div className="admin-promotion">
        <h2>Promote User to Admin</h2>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handleMakeAdminClick}>Make Admin</button>
        {message && <p>{message}</p>}
      </div>

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

      {activeTab === "bookings" && (
        <BookingsTable bookings={bookings} onDeleteBooking={handleDeleteBooking} />
      )}

      {activeTab === "reviews" && (
        <ReviewsTable
          reviews={reviews}
          editingReview={editingReview}
          updatedReview={updatedReview}
          onEditReview={startEditReview}
          onSaveReview={saveEditedReview}
          onCancelEdit={() => setEditingReview(null)}
          onDeleteReview={handleDeleteReview}
          onUpdateReview={(e) =>
            setUpdatedReview({ ...updatedReview, [e.target.name]: e.target.value })
          }
        />
      )}
    </div>
  );
};

export default AdminPage;