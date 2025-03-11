// src/admin/ReviewsTable.jsx
import React from "react";

const ReviewsTable = ({
  reviews,
  editingReview,
  updatedReview,
  onEditReview,
  onSaveReview,
  onCancelEdit,
  onDeleteReview,
  onUpdateReview,
}) => {
  if (!reviews || reviews.length === 0) {
    return <p>No reviews available.</p>; // Handle empty or undefined reviews
  }

  return (
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
                  name="name"
                  value={updatedReview.name}
                  onChange={onUpdateReview}
                />
              ) : (
                review.name
              )}
            </td>
            <td>
              {editingReview === review.id ? (
                <input
                  type="text"
                  name="position"
                  value={updatedReview.position}
                  onChange={onUpdateReview}
                />
              ) : (
                review.position
              )}
            </td>
            <td>
              {editingReview === review.id ? (
                <textarea
                  name="testimonial"
                  value={updatedReview.testimonial}
                  onChange={onUpdateReview}
                />
              ) : (
                review.testimonial
              )}
            </td>
            <td>
              {editingReview === review.id ? (
                <>
                  <button onClick={() => onSaveReview(review.id)}>Save</button>
                  <button onClick={onCancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => onEditReview(review)}>Edit</button>
                  <button onClick={() => onDeleteReview(review.id)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReviewsTable;