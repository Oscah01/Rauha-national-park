import "./Accomodation.css";

const Accommodation = () => {
  return (
    <div className="accommodation-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay">
          <h1>Accommodation & Facilities</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="content">
        <h2>Experience Comfort in the Heart of Nature</h2>
        <p>
          We offer luxurious <strong>lodges</strong> in the heart of Ruaha, designed for comfort and relaxation. Whether you&apos;re seeking a peaceful retreat or adventure, our rooms provide the perfect space to unwind after a day of exploring.
        </p>
        <p>
          Our facilities ensure a memorable stay, with each lodge equipped to provide a serene and comfortable atmosphere.
        </p>
      </div>

      {/* Accommodation Grid */}
      <div className="accommodation-grid">
      <div className="accommodation-card">
  <div className="image-container">
    <img src="/dining.jpg" alt="Lodge 1" />
    <img src="/restaurant.jpg" alt="Lodge 2" />
    <img src="/shop.jpg" alt="Lodge 3" />
  </div>
  <div className="image-container">
    <img src="/bed-1-1.jpg" alt="Lodge 1" />
    <img src="/bed-1-2.jpg" alt="Lodge 2" />
    <img src="/bed-1-3.jpg" alt="Lodge 3" />
  </div>
  
</div>

      </div>

      <div className="amenities">
        <ul>
        <h2>Our Facilities</h2>
                  <li>
            <strong>Lodge Accommodation:</strong> Comfortable and well-furnished rooms offering a relaxing stay in a serene environment.
          </li>

          <li>
            <strong> Restaurant:</strong> Enjoy local and international dishes prepared with fresh ingredients.
          </li>
          <li>
            <strong> Bar:</strong> Enjoy local and imported beers, liquor, spirit & wines, gines, whisk, Vodka, soft drinks, ciggarates.
          </li>
          <li>
            <strong>Wi-Fi:</strong> Stay connected with high-speed internet throughout the property.
          </li>
          <li>
            <strong>Hot Water:</strong> Each room is equipped with hot water to ensure your comfort.
          </li>
          <li>
            <strong>Campfire Area:</strong> Gather around the campfire for a cozy, social experience under the stars.
          </li>
          <li>
            <strong>Guided Tours:</strong> Experience guided safaris and excursions in the stunning Ruaha National Park.
          </li>

        </ul>
      </div>
    </div>
  );
};

export default Accommodation;
