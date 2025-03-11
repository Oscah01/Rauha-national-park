import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../pages/Navbar.css";
import logo from "/logo.png";
import { FaCalendarDays } from "react-icons/fa6";
import { faChevronDown, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthComponent from "../AuthComponent"; // Import the AuthComponent
import { auth, googleProvider } from "../../firebase";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true); // Track login/signup mode
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Track authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Google Sign-In
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      setIsModalOpen(false); // Close modal after successful sign-in
    } catch (error) {
      console.error("Google Sign-in Error:", error);
    }
  };

  // Email/Password Sign-In
  const signInWithEmail = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      setIsModalOpen(false); // Close modal after successful sign-in
    } catch (error) {
      console.error("Email Sign-in Error:", error);
    }
  };

  // Email/Password Sign-Up
  const signUpWithEmail = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setIsModalOpen(false); // Close modal after successful sign-up
      setIsLoginMode(true);  // Switch to login mode after successful signup
    } catch (error) {
      console.error("Email Sign-up Error:", error);
    }
  };

  // Sign Out
  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    setDropdownOpen(false);
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar-container">
        <Link to="/" onClick={closeMobileMenu} className="navbar-logo">
          <img src={logo} alt="Ruaha Camp" />
        </Link>

        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
        </div>

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
            {user ? (
              <Link to="/booking" onClick={closeMobileMenu}>
                <button className="book-now-btn">
                  <span className="calender-icon"><FaCalendarDays /></span>
                  <span className="book-now">Book Now</span>
                </button>
              </Link>
            ) : (
              <button
                className="book-now-btn"
                onClick={() => {
                  alert("You need to be logged in to book.");
                  setIsModalOpen(true); // Open login modal
                  setIsLoginMode(true);
                }}
              >
                <span className="calender-icon"><FaCalendarDays /></span>
                <span className="book-now">Book Now</span>
              </button>
            )}
          </li>

          {/* Conditionally render profile picture or login/signup buttons */}
          {user ? (
            <div className="auth-profile">
              <img
                src={user.photoURL || "https://via.placeholder.com/50"}
                alt="Profile"
                className="auth-avatar"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="auth-dropdown">
                  <button onClick={handleSignOut}>Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <div className="authorized">
              <button className="login" onClick={() => { setIsModalOpen(true); setIsLoginMode(true); }}>Login</button>
              <button className="signup" onClick={() => { setIsModalOpen(true); setIsLoginMode(false); }}>Signup</button>
            </div>
          )}
        </ul>
      </nav>
      
      {/* Modal */}
      {isModalOpen && (
  <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-button" onClick={() => setIsModalOpen(false)}>×</button>
      <AuthComponent
        setIsModalOpen={setIsModalOpen} // Pass the function to close the modal
        setIsLoginMode={setIsLoginMode} // Pass the function to toggle login/signup mode
      />
    </div>
  </div>
)}
    </>
  );
};

export default Navbar;
