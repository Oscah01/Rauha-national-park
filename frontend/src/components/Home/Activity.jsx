import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';

const Activity = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleDiscoverMore = () => {
    navigate('/activities'); // Navigate to Activity page
  };

  return (
    <LazyLoadComponent>
      <div className="activity-container">
        <div className="activity-content">
          <h2>Unforgettable Safari Experiences</h2>
          <p>
            Explore the untouched beauty of Ruaha, where wildlife roams freely, and every sunrise
            brings a new adventure. From guided game drives to immersive walking safaris,
            every moment here is a step closer to nature.
          </p>
          <button className="see-offer-btn" onClick={handleDiscoverMore}>
            Discover More
          </button>
        </div>
      </div>
    </LazyLoadComponent>
  );
};

export default Activity;