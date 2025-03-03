import './WhyChooseUs.css';  // Link to your CSS file
import { useNavigate } from "react-router-dom"; // Import useNavigate


const WhyChooseUs = () => {
  const navigate = useNavigate();
  const handleBookNowClick = () => {
    navigate("/booking"); // Navigate to the booking page
   
  };
  return (
    <div className="why-choose-us-container">
      {/* Hero Section */}
      <div className="why-choose-us-hero">
        <div className="why-choose-us-overlay">
          <h1>Why Choose Us?</h1>
        </div>
      </div>

      {/* Reasons Section */}
      <div className="reasons-section">
        <h2>What Makes Us Special?</h2>
        <div className="reason-cards">
          <div className="reason-card">
            <h3>Unique Hospitality</h3>
            <p>Our dedicated staff ensures your stay is comfortable and memorable with exceptional service at every step.</p>
          </div>
          <div className="reason-card">
            <h3>Strategic Location</h3>
            <p>Located near Ruaha National Park, we offer easy access to the park’s scenic landscapes and wildlife experiences.</p>
          </div>
          <div className="reason-card">
            <h3>Comfortable Accommodation</h3>
            <p>Relax in well-appointed rooms and enjoy our luxurious amenities tailored to make your stay as comfortable as possible.</p>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="cta-section">
        <h3>Ready for Your Adventure?</h3>
        <p>Book your stay with us today and experience the best of nature, hospitality, and adventure.</p>
        <button className="cta-button" onClick={handleBookNowClick}>
            Book Now
          </button>
      </div>
    </div>
  );
};

export default WhyChooseUs;
