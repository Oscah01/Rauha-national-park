import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./BookingPage.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase"; 
import { db } from "../../../firebase"; 
import { collection, addDoc } from "firebase/firestore";

const BookingPage = () => {
  const navigate = useNavigate();

  // State for date selection
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedMealOption, setSelectedMealOption] = useState(null);
  const [selectedBedOption, setSelectedBedOption] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [email, setEmail] = useState(""); // State for email input

  // Get the authenticated user's email on component mount
  useEffect(() => {
    const user = auth.currentUser; // Get the currently logged-in user
    if (user && user.email) {
      setEmail(user.email); // Set the email state to the logged-in user's email
    }
  }, []);

  const pricingOptions = [
    { id: 1, title: "Full Board", description: "Includes breakfast, lunch, and dinner.", price: 65, type: "meal" },
    { id: 2, title: "Half Board", description: "Includes breakfast and dinner.", price: 55, type: "meal" },
    { id: 3, title: "Bed and Breakfast", description: "Includes breakfast only.", price: 35, type: "bed" },
    { id: 4, title: "Bed Only", description: "Accommodation only, no meals included.", price: 30, type: "bed" },
    { id: 5, title: "Camping", description: "Bring your own tent and enjoy the outdoors.", price: 10, type: "addOn" },
    { id: 6, title: "Vehicle for Game Drive", description: "Per day trip for game drives.", price: 250, type: "addOn" },
  ];

  const handleMealOptionSelect = (id) => {
    setSelectedMealOption((prev) => (prev === id ? null : id));
  };

  const handleBedOptionSelect = (id) => {
    setSelectedBedOption((prev) => (prev === id ? null : id));
  };

  const handleAddOnSelect = (id) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedItems = [
    selectedMealOption && pricingOptions.find((o) => o.id === selectedMealOption),
    selectedBedOption && pricingOptions.find((o) => o.id === selectedBedOption),
    ...selectedAddOns.map((id) => pricingOptions.find((o) => o.id === id)),
  ].filter(Boolean);

  const totalAmount = selectedItems.reduce((sum, item) => sum + item.price, 0);


  const handleCheckoutClick = async () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select check-in and check-out dates.");
      return;
    }
  
    if (!email) {
      alert("Please enter your email.");
      return;
    }
  
    const selectedOptions = selectedItems;
  
    try {
      // Save booking to Firestore
      const bookingRef = await addDoc(collection(db, "bookings"), {
        email,
        checkInDate: checkInDate.toISOString().split("T")[0], // Format date as YYYY-MM-DD
        checkOutDate: checkOutDate.toISOString().split("T")[0], // Format date as YYYY-MM-DD
        selectedOptions,
        totalAmount,
        createdAt: new Date().toISOString(), // Add a timestamp
      });
  
      alert("Booking created successfully!");
  
      // Optionally, send an email (if your backend supports it)
      const response = await fetch("https://tungacamp-national-park.onrender.com/api/email/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          checkInDate: checkInDate.toISOString().split("T")[0],
          checkOutDate: checkOutDate.toISOString().split("T")[0],
          selectedOptions,
          totalAmount,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert(result.message); // "Email sent successfully!"
        navigate("/checkout", {
          state: {
            totalAmount,
            selectedOptions,
            checkInDate,
            checkOutDate,
          },
        });
      } else {
        alert(result.error); // "Failed to send email."
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Error creating booking.");
    }
  };
  
  return (
    <div className="booking-page">
      <h2>Choose Your Booking Dates</h2>
      <div className="date-selection">
        <label>Check-in Date:</label>
        <DatePicker
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          minDate={new Date()}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select Check-in Date"
        />

        <label>Check-out Date:</label>
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          minDate={checkInDate || new Date()}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select Check-out Date"
        />
      </div>

      {/* Email Input Field */}
      <div className="email-input">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={!!auth.currentUser} // Disable the input if the user is logged in
        />
      </div>

      <h2>Choose Your Option</h2>
      <div className="pricing-options">
        {pricingOptions.map((option) => (
          <div
            key={option.id}
            className={`pricing-card ${
              (option.type === "meal" && selectedMealOption === option.id) ||
              (option.type === "bed" && selectedBedOption === option.id) ||
              (option.type === "addOn" && selectedAddOns.includes(option.id))
                ? "selected"
                : ""
            }`}
            onClick={() => {
              if (option.type === "meal") handleMealOptionSelect(option.id);
              else if (option.type === "bed") handleBedOptionSelect(option.id);
              else handleAddOnSelect(option.id);
            }}
          >
            <h3>{option.title}</h3>
            <p>{option.description}</p>
            <p className="price">{option.price} USD</p>
            <button className="select-button">
              {(option.type === "meal" && selectedMealOption === option.id) ||
              (option.type === "bed" && selectedBedOption === option.id) ||
              (option.type === "addOn" && selectedAddOns.includes(option.id))
                ? "Selected"
                : "Select"}
            </button>
          </div>
        ))}
      </div>

      {selectedItems.length > 0 && (
        <div className="selected-options">
          <h3>Selected Options</h3>
          <table>
            <thead>
              <tr>
                <th>Item Selected</th>
                <th>Price (USD)</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.price} USD</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td><strong>Total Amount</strong></td>
                <td><strong>{totalAmount} USD</strong></td>
              </tr>
            </tfoot>
          </table>

          <div className="checkout-section">
            <button className="checkout-button" onClick={handleCheckoutClick}>
              Complete Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;