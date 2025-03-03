import { useNavigate } from 'react-router-dom';


const HeroSection = () => {
  const navigate = useNavigate(); 

  const handleExploreMore = () => {
    navigate('/about-us');
  };
  return (
    <header className="hero">
      <div className="hero-content">
        <h1 className="hero-content-h1">Escape to Nature, Stay in Comfort</h1>
        <p className="hero-content-p">Experience the perfect blend of nature, relaxation, and adventure in one unforgettable stay.</p>
        <button className="book-now-btn-p" onClick={handleExploreMore}>
          Explore more
        </button>
      </div>
    </header>
  );
};
export default HeroSection
