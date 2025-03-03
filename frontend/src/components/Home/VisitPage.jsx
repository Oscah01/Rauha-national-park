import "./VisitPage.css";
import { useNavigate } from 'react-router-dom';

const VisitPage = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleDiscoverMore = () => {
    navigate('/about-us'); // Navigate to About Us page
  };

  return (
    <div className="visit-container">
      <h2 className="visit-heading">When to Visit</h2>
      <p className="visit-text">
        Ruaha can be visited at any time of year, however the best time for game 
        viewing is during the dry season from June to December when wildlife 
        converges on the dwindling water reserves notably the river in front of the Lodge.
      </p>

      <div className="visit-grid">
        <div className="visit-card">
          <img 
            src="/visit-ruaha.jpg" 
            alt="Ruaha Park" 
            className="visit-image"
            loading="lazy" // Add lazy loading here
          />
          <h3 className="visit-subheading">About the Park</h3>
          <p className="visit-description">
            The Great Ruaha River forms the spine of this vast and varied park. 
            Most of our game drives spend at least some of their time following 
            the river, before breaking off and exploring the bushland and kopjes beyond.
          </p>
          <button className="visit-button">Learn More</button>
        </div>

        <div className="visit-card">
          <img 
            src="/activity1-1.jpg" 
            alt="Safari Experience" 
            className="visit-image"
            loading="lazy" // Add lazy loading here
          />
          <h3 className="visit-subheading">About Us</h3>
          <p className="visit-description">
            The success of our camps ultimately comes down to our extensive and 
            hands-on experience managing safaris. From the beginning, the company 
            has grown from the interests and talents of the family.
          </p>
          <button className="visit-button" onClick={handleDiscoverMore}>Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default VisitPage;