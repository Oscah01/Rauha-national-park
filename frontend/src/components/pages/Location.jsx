import "./Location.css";

const Location = () => {
  return (
    <div className="location-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay">
          <h1>Location & Natural Surroundings</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="content">
        <h2>Discover the Beauty of Ruaha</h2>
        <p>
          Located 93 km southwest of Iringa in Tungamalenga village
          which is 15 km from the entrance gate to Ruaha
          National Park.
          It is approx 2-2 1/2 hours drive from Iringa and
          this is the last village on the road to the park.


        </p>
        <p>
          Wake up to the sounds of exotic birds, witness elephants roaming nearby, and
          experience mesmerizing sunsets over the African savanna. Ruaha is home to
          diverse ecosystems, making it a paradise for photographers and wildlife
          enthusiasts.
        </p>

        <div className="image-containers">
            <img src="/location-img.jpg" alt="Ruaha Landscape" className="hero-image" />
            <img src="/bird-1-1.jpg" alt="Ruaha Wildlife" className="hero-image" />
            </div>

      </div>
    </div>
  );
};

export default Location;