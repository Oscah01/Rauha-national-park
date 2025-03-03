import { useState, useEffect, useRef } from 'react';
import './AboutUs.css';
import { useNavigate } from 'react-router-dom';

const images = [
  "/hero-ruaha-1-1.jpg",
  "/hero-ruaha-1-1.jpg",
  "/visit-ruaha.jpg"
];

const AboutUs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Initialize navigation
  const landingSectionRef = useRef(null); // Ref for the landing section
  const [isLandingVisible, setIsLandingVisible] = useState(false); // State for landing section visibility

  // Intersection Observer for landing section background image
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLandingVisible(true);
          observer.unobserve(entry.target); // Stop observing once the image is loaded
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (landingSectionRef.current) {
      observer.observe(landingSectionRef.current);
    }

    return () => {
      if (landingSectionRef.current) {
        observer.unobserve(landingSectionRef.current);
      }
    };
  }, []);

  // Slideshow logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    navigate('/accommodation');
  };

  const handleReadMoreClick = () => {
    navigate('/activities'); // Redirects to the activities page
  };

  const handleReadMoreClicks = () => {
    navigate('/commitment'); // Navigate to the Commitment page
  };

  const handleReadMore = () => {
    navigate('/why-choose-us'); // Navigate to the Why Choose Us? page
  };

  return (
    <div className="about-us">
      {/* Landing Section with Slideshow */}
      <div
        ref={landingSectionRef}
        className={`landing-section ${isLandingVisible ? 'loaded' : ''}`}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="Slideshow"
            className={index === currentIndex ? 'active' : 'inactive'}
            loading="lazy" // Lazy load slideshow images
          />
        ))}
        <div className="overlay">
          <h1>About Us</h1>
        </div>
      </div>

      <div className="about-para">
        <h1>Welcome to Tungamalenga Lodge</h1>
        <p>
          Tungamalenga Lodge offers a unique blend of comfort, culture, and nature, located 93 km southwest of Iringa in Tungamalenga village, which is 15 km from the entrance gate to Ruaha National Park. It is approximately a 2-2 1/2 hour drive from Iringa and this is the last village on the road to the park. Whether you’re visiting for a safari or conducting research, our lodge provides affordable, well-appointed rooms, all with ensuite bathrooms and stunning views. Enjoy a variety of accommodations, from single rooms to family-sized options, and savor delicious meals, including vegetarian and halal dishes.
        </p>
        <p>
          We also offer exciting cultural activities like traditional dances and walking safaris, along with convenient services like lunch boxes for game drives. Explore the beautiful Iringa region, home to attractions such as the Iringa Boma Museum, Isimila Stone Age site, and Mkwawa Memorial.
        </p>
      </div>

      <div className="about-uss">
        {/* Cards Section */}
        <div className="cards-container">
          {/* Card 1 */}
          <div className="card">
            <img src="/hero-ruaha-1-1.jpg" alt="Card 1" loading="lazy" />
            <div className="card-text">
              <h3>History & Background</h3>
              <p>
                Founded in [Year], Tungamalenga Lodge was established to serve travelers seeking an authentic Tanzanian experience.
              </p>
              <button className="about-read-btn" onClick={() => navigate("/history")}>
                Read more
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card">
            <img src="/about-1-3.jpg" alt="Card 2" loading="lazy" />
            <div className="card-text">
              <h3>Location & Natural Surroundings</h3>
              <p>
                Located near **Ruaha National Park**, we are surrounded by lush landscapes, rolling hills, and majestic wildlife.
              </p>
              <button className="about-read-btn" onClick={() => navigate("/location")}>
                Read more
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card">
            <img src="/about-1-4.jpg" alt="Card 3" loading="lazy" />
            <div className="card-text">
              <h3>Accommodation & Facilities</h3>
              <p>
                We offer a variety of accommodations, including chalets, tents, cottages, and camping sites, all designed for comfort.
              </p>
              <button className="about-read-btn" onClick={handleClick}>
                Read more
              </button>
            </div>
          </div>

          {/* Card 4 */}
          <div className="card">
            <img src="/activity1-1.jpg" alt="Card 4" loading="lazy" />
            <div className="card-text">
              <h3>Activities & Experiences</h3>
              <p>
                From exhilarating safaris in Ruaha National Park to cultural experiences with local communities.
              </p>
              <button className="about-read-btn" onClick={handleReadMoreClick}>
                Read more
              </button>
            </div>
          </div>

          {/* Card 5 */}
          <div className="card">
            <img src="/about-1-1.jpg" alt="Card 5" loading="lazy" />
            <div className="card-text">
              <h3>Commitment to Sustainability & Community</h3>
              <p>
                We believe in sustainable tourism practices that benefit both the environment and local communities.
              </p>
              <button className="about-read-btn" onClick={handleReadMoreClicks}>
                Read more
              </button>
            </div>
          </div>

          {/* Card 6 */}
          <div className="card">
            <img src="/about-1-2.jpg" alt="Card 6" loading="lazy" />
            <div className="card-text">
              <h3>Why Choose Us?</h3>
              <p>
                Choose Tungamalenga Lodge for our unique hospitality, strategic location near Ruaha National Park.
              </p>
              <button className="about-read-btn" onClick={handleReadMore}>
                Read more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;