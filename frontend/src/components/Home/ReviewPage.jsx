import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../../firebase.js"; // Import Firestore instance
import { collection, getDocs, addDoc } from "firebase/firestore";
import "../Home/ReviewPage.css";

const ReviewPage = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [reviews, setReviews] = useState([]); // State for reviews
  const [newReview, setNewReview] = useState({
    name: "",
    position: "",
    testimonial: "",
  });
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Default reviews
  const defaultReviews = [
    {
      id: "default1",
      name: "Mary Smith",
      position: "Tourist",
      testimonial:
        "Peaceful and serene! The campsite was clean, the food was delicious, and the nature walks were unforgettable. Will be back!",
    },
    {
      id: "default2",
      name: "Sophia Martinez",
      position: "Tourist",
      testimonial:
        "A hidden gem! Great hospitality, comfy lodges, and stunning views. Perfect escape from the city. 10/10!",
    },
    {
      id: "default3",
      name: "Daniel Martinez",
      position: "Tourist",
      testimonial:
        "Fantastic experience! Friendly staff, tasty meals, and lots of fun activities. Highly recommend for a relaxing getaway.",
    },
    {
      id: "default4",
      name: "Matthew Davis",
      position: "Explorer",
      testimonial:
        "Loved every moment! The campsite was well-organized, the lodge was cozy, and the nature walks were breathtaking. Can't wait to return!",
    },
  ];

  // Fetch reviews from Firestore (only for new reviews)
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reviews"));
        const reviewsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Combine default reviews with Firestore reviews
        setReviews([...defaultReviews, ...reviewsData]);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        // If Firestore fails, use default reviews only
        setReviews(defaultReviews);
      }
    };

    fetchReviews();
  }, []);

  // Auto-slide every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) =>
        prevIndex < reviews.length - 1 ? prevIndex + 1 : 0
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  // Manual navigation
  const handleArrowClick = (direction) => {
    if (direction === "next") {
      setCurrentReviewIndex((prevIndex) =>
        prevIndex < reviews.length - 1 ? prevIndex + 1 : 0
      );
    } else {
      setCurrentReviewIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : reviews.length - 1
      );
    }
  };

  // Handle form input changes
  const handleReviewChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  // Add new review to Firestore
  const handleAddReview = async () => {
    if (newReview.name && newReview.position && newReview.testimonial) {
      try {
        const docRef = await addDoc(collection(db, "reviews"), newReview);
        setReviews([...reviews, { id: docRef.id, ...newReview }]); // Update local state
        setNewReview({ name: "", position: "", testimonial: "" });
        setShowReviewForm(false);
      } catch (error) {
        console.error("Error adding review:", error);
      }
    }
  };

  return (
    <div className="review-container">
      <h2>What Our Visitors Say</h2>
      <div className="review-card">
        <button onClick={() => handleArrowClick("prev")} className="nav-button">
          &#10094;
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentReviewIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="review-content"
          >
            <p className="review-text">"{reviews[currentReviewIndex]?.testimonial}"</p>
            <h4 className="review-author">{reviews[currentReviewIndex]?.name}</h4>
            <p className="review-position">{reviews[currentReviewIndex]?.position}</p>
          </motion.div>
        </AnimatePresence>

        <button onClick={() => handleArrowClick("next")} className="nav-button">
          &#10095;
        </button>
      </div>

      <button className="add-review-btn" onClick={() => setShowReviewForm(true)}>
        Add Your Review
      </button>

      {showReviewForm && (
        <div className="review-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={newReview.name}
            onChange={handleReviewChange}
          />
          <input
            type="text"
            name="position"
            placeholder="Your Country"
            value={newReview.position}
            onChange={handleReviewChange}
          />
          <textarea
            name="testimonial"
            placeholder="Your Testimonial"
            value={newReview.testimonial}
            onChange={handleReviewChange}
          />
          <button onClick={handleAddReview}>Submit</button>
          <button className="cancel-btn" onClick={() => setShowReviewForm(false)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewPage;