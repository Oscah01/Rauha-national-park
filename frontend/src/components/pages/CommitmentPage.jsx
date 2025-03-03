import './CommitmentPage.css'; // Your page styles

const CommitmentPage = () => {
  return (
    <div className="commitment-page-container">
      {/* Hero Section */}
      <div className="commitment-hero-section">
        <div className="commitment-hero-overlay">
          <h1>Commitment to Sustainability & Community</h1>
          <p>We believe in sustainable tourism practices that benefit both the environment and local communities.</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="commitment-content">
        <h2>Our Values</h2>
        <p>
          At Tungamalenga Lodge & Campsite, we are committed to preserving the beauty of Ruaha National Park and supporting
          the local communities. We adhere to sustainable tourism practices that minimize our environmental impact,
          promote eco-friendly accommodation, and contribute to the well-being of the communities we work with.
        </p>

        <h3>Environmental Sustainability</h3>
        <p>
          We actively engage in conservation efforts, including waste management, water conservation, and promoting
          biodiversity within the park. Our aim is to leave a lasting positive impact on the environment for future
          generations to enjoy.
        </p>

        <h3>Supporting Local Communities</h3>
        <p>
          We prioritize working with local businesses, craftspeople, and guides. Through fair trade practices and
          community-driven initiatives, we ensure that the benefits of tourism reach those who need it the most.
        </p>
      </div>

      {/* Call-to-Action Section */}
      <div className="commitment-cta">
        <h3>Join Us in Supporting Sustainable Tourism</h3>
        <p>
          Your visit to Tungamalenga Lodge & Campsite helps us continue our sustainability and community initiatives. If you&apos;d like
          to contribute further, consider participating in our volunteer programs or donating to local conservation projects.
        </p>
        <button className="cta-button">Learn More</button>
      </div>
    </div>
  );
};

export default CommitmentPage;
