import './LifeAtCamp.css'; // Import your CSS file
import WelcomePDF from './WelcomePDF'; // Import the WelcomePDF component

const LifeAtCamp = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <h1 className="hero-title">Life at Camp</h1>
      </section>

      {/* Main Content */}
      <section className="main-content">
        <div className="container">
          {/* Heading */}
          <h2 className="content-heading">Life at Camp</h2>

          {/* Image Section */}
          <div className="image-section">
            <img 
              src="life-at-camp.jpg" 
              alt="Camp" 
              className="camp-image"
            />
          </div>

          {/* Text Content */}
          <p className="content-text">
            At our camps, we offer a truly immersive wildlife experience, far from the crowds and deep into nature.  
            The remote location of our lodges allows guests to connect with the wilderness in a way that is both authentic and unforgettable.  
            While some aspects of daily life here may differ from what you are accustomed to, they enrich the experience of being in the heart of the African bush.
          </p>

          <p className="content-text">
            Tungamalenga Lodge & Sitecamp strike the perfect balance between adventure and comfort.  
            You’ll wake up to the sounds of nature, yet still enjoy modern conveniences that make your stay relaxing and enjoyable.
          </p>

          {/* Call to Action */}
          <WelcomePDF />
        </div>
      </section>
    </div>
  );
};

export default LifeAtCamp;