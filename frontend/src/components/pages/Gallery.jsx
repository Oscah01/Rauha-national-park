import { useState } from "react";
import "./Gallery.css";

// Import images from the assets folder
const images = [
  "about-1-1.jpg", "about-1-2.jpg", "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg", "img7.jpg", "img8.jpg", "img9.jpg", "img10.jpg", "img11.jpg", "img12.jpg", "img13.jpg", "img14.jpg", "img15.jpg", "img16.jpg", "img17.jpg", "img18.jpg", "img19.jpg", "img20.jpg", "img21.jpg", "img22.jpg", "img23.jpg", "img24.jpg", "img25.jpg", "img26.jpg", "img27.jpg", "img28.jpg", "img29.jpg", "img30.jpg", "img31.jpg", "img32.jpg", "img33.jpg", "img34.jpg", "img35.jpg", "img36.jpg", "img37.jpg", "img38.jpg", "img39.jpg", "img40.jpg", "img41.jpg", "img42.jpg", "img43.jpg", "img44.jpg", "img45.jpg", "img46.jpg", "img47.jpg", "img48.jpg", "img49.jpg", "img50.jpg", "about-1-3.jpg", "about-1-4.jpg", "about-1-5.webp",
  "activity1-1.jpg", "alike.webp", "bed-1-1.jpg", "bed-1-2.jpg", "bed-1-3.jpg",
  "bird-1-1.jpg", "dining.jpg", "experience.jpg", "hero-1-1.jpg",
  "hero-1-2.jpg", "hero-ruaha-1-1.jpg", "location-img.jpg", "lodge-1-2.jpg",
  "logo.png", "restaurant.jpg", "shop.jpg"
].map(img => `/${img}`);

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="gallery">
        {images.map((src, index) => (
          <div 
            key={index} 
            className={`image-container ${[3, 6, 11, 12, 15, 16, 18, 19, 20, 22].includes(index + 1) ? "tall" : ""}`} 
            onClick={() => setSelectedImage(src)}
          >
            <img 
              src={src} 
              alt={`Gallery Image ${index + 1}`} 
              loading="lazy" // Add lazy loading here
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal">
            <span className="close" onClick={() => setSelectedImage(null)}>&times;</span>
            <img className="modal-content" src={selectedImage} alt="Expanded view" />
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;