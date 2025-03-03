import { useNavigate } from 'react-router-dom';

const Lodge = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleSeeMore = () => {
    navigate('/accommodation'); // Navigate to Accommodation page
  };

  return (
    <div className="lodge-container">
      <div className="lodge-image">
        <img
          src="/about-1-4.jpg"
          alt="Tungamalenga Lodge"
          loading="lazy" // Add lazy loading here
        />
      </div>

      <div className="lodge-text">
        <h2>The Lodge</h2>
        <p>
          Discover the perfect getaway at Tungamalenga Lodge, where nature and luxury meet. Enjoy breathtaking views, modern amenities, and a serene environment that makes your stay unforgettable.
        </p>
        <button className="see-more-btn" onClick={handleSeeMore}>
          See More
        </button>
      </div>
    </div>
  );
};

export default Lodge;