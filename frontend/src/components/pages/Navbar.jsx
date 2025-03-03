import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import "../pages/Navbar.css";
import logo from "/logo.png";
import { FaCalendarDays } from "react-icons/fa6";
import { faChevronDown, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar-container">
      {/* Wrap the logo in a Link component */}
      <Link to="/" onClick={closeMobileMenu} className="navbar-logo">
        <img src={logo} alt="Ruaha Camp" />
      </Link>

      {/* Mobile Menu Toggle Button */}
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
      </div>

      {/* Navbar Links */}
      <ul className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
        <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
        <li><Link to="/about-us" onClick={closeMobileMenu}>About Us</Link></li>

        {/* Dropdown for "The Lodge" */}
        <li className="dropdown">
          <span className="dropdown-toggle">
            The Lodge <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />
          </span>
          <ul className="dropdown-menu">
            <li><Link to="/accommodation" onClick={closeMobileMenu}>Accommodation</Link></li>
            <li><Link to="/dining" onClick={closeMobileMenu}>Dining</Link></li>
            <li><Link to="/life-in-camp" onClick={closeMobileMenu}>Life in Camp</Link></li>
          </ul>
        </li>

        <li><Link to="/activities" onClick={closeMobileMenu}>Activities</Link></li>
        <li><Link to="/gallery" onClick={closeMobileMenu}>Gallery</Link></li>
        <li><Link to="/availability" onClick={closeMobileMenu}>Camp Availability</Link></li>

        <li>
          <Link to="/booking" onClick={closeMobileMenu}>
            <button className="book-now-btn">
              <span className="calender-icon"><FaCalendarDays /></span>
              <span className="book-now">Book Now</span>
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;