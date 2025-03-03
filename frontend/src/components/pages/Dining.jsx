import { useState } from "react";
import "./Dining.css";
import dining1 from "/dining1.jpg";
import dining2 from "/dining2.jpg";
import dining3 from "/dining3.jpg";
import dining4 from "/dining4.jpg";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

const images = [dining1, dining2, dining3, dining4];

const Dining = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="dining-page">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Dining</h1>
      </div>

      {/* Dining Description */}
      <div className="dining-content">
        <h2>Dining</h2>
        <p>
          The lodge offers a full-service dining room, bar, gift shop & can
          arrange game drives. We are family-friendly and can also accommodate
          large groups as we have a range of room sizes from single up to 5 per
          room.
        </p>
        <p>
          Our rates include meals, and the lodge has both traditional Swahili
          food as well as continental cuisine. Our chefs are flexible and can
          prepare your food preferences such as vegetarian or halal.
        </p>
        <p>
          We can prepare lunch boxes for your game drive or an early morning
          breakfast for the early riser to enjoy the beauty of a savannah
          sunrise.
        </p>
      </div>

      {/* Dining Images Section */}
      <div className="dining-images">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Dining image ${index + 1}`}
            onClick={() => openModal(index)}
            className="thumbnail"
          />
        ))}
      </div>

      {/* Modal for Enlarged Image */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              <FaTimes />
            </button>
            <button className="prev-btn" onClick={prevImage}>
              <FaArrowLeft />
            </button>
            <img src={images[currentImageIndex]} alt="Enlarged view" />
            <button className="next-btn" onClick={nextImage}>
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dining;
