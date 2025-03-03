import './Activities.css';
import guidingImage from '/about-1-5.webp'; // Example image
import gameDriveImage from '/about-1-2.jpg'; // Example image
import specialExperienceImage from '/experience.jpg'; // Example image
import giftShop from '/img43.jpg'; // Example image

const ActivitiesPage = () => {

  const activities = [
    {
      title: "Guiding",
      description: "At Tungamalenga Lodge & Campsite, our guides bring decades of experience working in the park, making them true experts in the wonders of Ruaha National Park. Their deep knowledge is continuously refined through annual training, ensuring that every safari is led by a passionate and highly skilled guide dedicated to providing an unforgettable experience.",
      image: guidingImage
    },
    {
      title: "Game Drives",
      description: "An exceptional game drive begins with expert knowledge, seasoned experience, and the right vehicle. In Ruaha, all game drives are conducted in open 4-wheel drive vehicles, specifically designed to provide unobstructed views for every passenger. These drives are led by professional, English-speaking guides who are dedicated to enhancing your safari experience. Additionally, during the dry season, balloon safaris offer a unique way to see the park from above, and can be easily pre-booked or arranged onsite for an unforgettable adventure.",
      image: gameDriveImage
    },
    { 
      title: "Special Experiences",
      description: "Experience unforgettable moments with private dinners on your veranda, bush breakfasts, or a sundowner by the river’s edge—just a few of the personalized touches that make your safari with us exceptional. If you’re seeking something extra special, simply let us know, and we’ll be happy to organize it. For an even deeper connection with nature, consider fly camping in Ruaha. Enjoy a unique adventure with small tents set up in a secluded camp, complete with your own host, guide, and chef. Available for a minimum of two nights for two guests, this experience is offered exclusively during the dry season—an exciting alternative to the main lodge.",
      image: specialExperienceImage
    },
    { 
      title: "Gift Shop",
      description: "Tungamalenga Lodge & Campsite Gift Shop, offers a unique selection of authentic Tanzanian crafts, including handmade wooden carvings, beaded jewelry, traditional fabrics, artwork, safari essentials, and many more products. Perfect for souvenirs or gifts, every purchase supports local artisans and celebrates Tanzanian culture. Visit us during your stay and take home a piece of your African adventure!",
      image: giftShop
    },
  ];


  return (
    <div className="activities-page-container">
      <div className="activities-hero-section">
        <div className="activities-hero-overlay">
          <h1>Activities</h1>
        </div>
      </div>

      {/* Activities Section */}
      <div className="activities-list">
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <img src={activity.image} alt={activity.title} className="activity-image" />
            <h2>{activity.title}</h2>
            <p>{activity.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesPage;
