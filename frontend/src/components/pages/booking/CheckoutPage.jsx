import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./CheckoutPage.css";

// Import SVGs
import VisaLogo from "/visa.svg";
import MastercardLogo from "/master.svg";

const CheckoutPage = () => {
  const location = useLocation();
  const { totalAmount = 10, selectedOptions = [] } = location.state || {};

  const [email, setEmail] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 

  const applyPromoCode = () => {
    if (promoCode === "DISCOUNT10") {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };

  const handlePayment = async () => {
    if (!agreeToTerms) {
      setError("You must agree to the terms and conditions to proceed.");
      return;
    }
  
    if (paymentMethod === "pay-on-arrival") {
      alert("Booking confirmed. Pay on arrival.");
      return;
    }
  
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/payment/create-transaction",
        { amount: totalAmount - discount, currency: "USD" }
      );
  
      if (!response.data.TransToken) {
        throw new Error("Transaction token not found.");
      }
  
      // Redirect to DPO payment page (using payv3.php)
      window.location.href = `https://secure.3gdirectpay.com/payv3.php?ID=${response.data.TransToken}`;
    } catch (error) {
      setError("Coming Soon ....");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="checkout-container">
      <div className="checkout-layout">
        {/* Right Column - Booking Summary & Discounts (Moved to Top on Mobile) */}
        <div className="checkout-right">
          <div className="promo-section">
            <input
              type="text"
              placeholder="Enter Promo Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="checkout-input"
            />
            <div className="discount-btn"></div>
            <button onClick={applyPromoCode} className="apply-discount-button">
              Apply
            </button>
          </div>

          <div className="booking-summary">
            <h3>Booking Summary</h3>
            <p>Guest Name: {guestName || "Not provided"}</p>
            <p>Guest Email: {email || "Not provided"}</p>
            <p>Guest Phone: {guestPhone || "Not provided"}</p>
            <p>Promo Code: {promoCode || "None"}</p>
            <p>Discount Applied: ${discount}</p>
            <h4>Selected Options:</h4>
            {selectedOptions.length > 0 ? (
              <ul>
                {selectedOptions.map((option) => (
                  <li key={option.id}>
                    {option.title} - ${option.price} USD
                  </li>
                ))}
              </ul>
            ) : (
              <p>No options selected.</p>
            )}
            <p>Total Amount: ${totalAmount - discount} USD</p>
          </div>
        </div>

        {/* Left Column - Checkout Process with Calendar */}
        <div className="checkout-left">
          <div className="checkout-section">
            <h3>Contact</h3>
            <input
              type="text"
              placeholder="Enter your name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="checkout-input"
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="checkout-input"
            />
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              className="checkout-input"
            />
          </div>

        

          <div className="pay">
            <h3>Payment Method</h3>
            <p>All transactions are secure and encrypted.</p>
          </div>

          <div className="checkout-section payment-section">
            <label
              className={`payment-method-label ${
                paymentMethod === "card" ? "active-payment-method" : ""
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              <span>Dpo pay</span>
              <img src={VisaLogo} alt="Visa" className="payment-logo" />
              <img src={MastercardLogo} alt="Mastercard" className="payment-logos" />
            </label>

            {paymentMethod === "card" && (
              <div className="payment-redirect-message">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-270.8 371 102 52"
                  className="payment-svg"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                    d="M-182 404v16.8c0 .7-.4 1.2-1 1.2h-75.7c-.7 0-1.2-.6-1.2-1.2v-47.6c0-.7.6-1.2 1.2-1.2h75.7c.7 0 1 .6 1 1.2V395m-78-14h78m-17 18h27m-3.9-4.6 4.5 4.6-4.5 4.6"
                  ></path>
                  <circle cx="-255.5" cy="376.5" r="1.5" fill="currentColor"></circle>
                  <circle cx="-250.5" cy="376.5" r="1.5" fill="currentColor"></circle>
                  <circle cx="-245.5" cy="376.5" r="1.5" fill="currentColor"></circle>
                </svg>
                <p>
                  After clicking “Pay now”, you will be redirected to Dpo Group to
                  complete your Payment securely.
                </p>
              </div>
            )}

            <div className="pay-on-arrival-option">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="pay-on-arrival"
                  checked={paymentMethod === "pay-on-arrival"}
                  onChange={() => setPaymentMethod("pay-on-arrival")}
                />
                Bank Deposit
              </label>
            </div>
          </div>

          <div className="checkout-section">
            <label>
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
              I agree to the terms and conditions
            </label>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button onClick={handlePayment} disabled={loading} className="pay-now-button">
            {loading ? "Processing..." : paymentMethod === "pay-on-arrival" ? "Confirm Booking" : "Pay Now"}
          </button>

          {/* Footer */}
          <div className="checkout-footer">
            <a href="/refund-policy">Refund Policy</a>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;