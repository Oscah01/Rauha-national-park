// src/admin/BookingsTable.jsx
import React from "react";

const BookingsTable = ({ bookings, onDeleteBooking }) => {
  if (!bookings || bookings.length === 0) {
    return <p>No bookings available.</p>; // Handle empty or undefined bookings
  }

  return (
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
              <button className="delete" onClick={() => onDeleteBooking(booking.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookingsTable;