import { useState } from "react";
import "./BookingPage.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const BookingPage = () => {
  const navigate = useNavigate();

  const [selectedMealOption, setSelectedMealOption] = useState(null);
  const [selectedBedOption, setSelectedBedOption] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

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

  const handleCheckoutClick = () => {
    const selectedOptions = [
      selectedMealOption && pricingOptions.find((o) => o.id === selectedMealOption),
      selectedBedOption && pricingOptions.find((o) => o.id === selectedBedOption),
      ...selectedAddOns.map((id) => pricingOptions.find((o) => o.id === id)),
    ].filter(Boolean);

    console.log("Selected Options:", selectedOptions); // Debugging: Log selected options

    navigate("/checkout", {
      state: {
        totalAmount,
        selectedOptions, // Pass selected options to the checkout page
      },
    });
  };

  return (
    <div className="booking-page">
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