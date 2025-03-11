import { IoMdCall } from "react-icons/io";
import "./Footer.css"; // Import CSS file
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6"; // Social media icons
import { FaTripadvisor } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";

 


const Footer = () => {

  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate("/admin"); // Navigate to the AdminPage
  };
  return (
    <footer className="footer-container">
      {/* Footer Top - Subscription Form */}
      <div className="footer-top">
        <form className="subscribe-form">
          <input type="email" placeholder="Email Address" required />
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      {/* Footer Bottom - Four Columns */}
      <div className="footer-bottom">
        {/* First Column */}
        <div className="footer-column">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">The Lodge</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Activities</a></li>
          </ul>
        </div>

        {/* Second Column */}
        <div className="footer-column">
          <ul>
            <li><a href="#">Gallery</a></li>
            <li><a href="#">Ruaha National Park</a></li>
            <li><a href="#">Camp Availability</a></li>
            <li><a href="#">Location</a></li>
          </ul>
        </div>

        {/* Third Column - Contact Information */}
        <div className="footer-column">

<p className="contact-item">
  <span className="phone-icon"><IoMdCall /></span> +255 712 407 751  
</p>

<p className="reservation-whatsapp">Reservations (WhatsApp)</p>

<p className="contact-item">
  <span className="phone-icon"><IoMdCall /></span> +255 768 093 853 
</p>

<p className="reservation-whatsapp" >(Tanzania Emergency)</p>
 

<p className="contact-item">
  <span className="phone-icon"><IoMdCall /></span> +255 752 897 042 
</p>
<p className="reservation-whatsapp">(Tanzania Emergency)</p>


<p className="email-reservation"> 
  <p className="email-icon"><MdOutlineMail/></p>
  <a href="mailto:tungacamp@gmail.com">tungacamp@gmail.com

</a></p>
          <p className="location">
            <span className="location-icon"><CiLocationOn/></span>
            <span>Ruaha National Park, Tanzania</span>   
          </p>
        </div>
        <div className="social">
        <div className="footer-column social-icons">
          <a href="https://www.instagram.com/ruahatungacamp?igsh=MXFjZXF6aTZkZnZrOA%3D%3D&utm_source=qr" className="icon"><FaInstagram /></a>
          <a href="https://www.facebook.com/share/15y9KKzpcs/?mibextid=wwXIfr" className="icon"><FaFacebook /></a>
          <a href="#" className="icon"><FaXTwitter /></a>
          <a href="https://www.tripadvisor.com/Profile/Scenic772750" className="icon"><FaTripadvisor /></a>
        </div>
          <img src="/logo.png" alt="logo" />
        </div>
      </div>
      <div className="footer-copyright">
      <p className="copyright">&copy; 2025 Tungamalenga Lodge & Camp. All Rights Reserved. <span> Privacy Policy.</span></p>
      <button className="admin-login" onClick={handleAdminLogin}>
        Owner Login
      </button>
      </div>
    </footer>
  );
};

export default Footer;
