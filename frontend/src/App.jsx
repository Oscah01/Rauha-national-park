import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/pages/Navbar";
import "./app.css";
import AboutUs from "./components/pages/AboutUs";
import HomePage from "./components/pages/HomePage";
import Gallery from "./components/pages/Gallery";
import Contact from "./components/pages/Contact";
import Nav from "./components/pages/nav";
import Footer from "./components/Home/Footer";
import HistoryPage from "./components/pages/HistoryPage";
import Location from "./components/pages/Location";
import Accommodation from "./components/pages/Accomodation";
import Activities from "./components/pages/Activities";
import CommitmentPage from "./components/pages/CommitmentPage";
import WhyChooseUs from "./components/pages/WhyChooseUs";
import Dining from "./components/pages/Dining";
import LifeAtCamp from "./components/pages/LifeAtCamp";
import BookingPage from "./components/pages/booking/BookingPage";
import CheckoutPage from "./components/pages/booking/CheckoutPage";
import Availability from "./components/pages/Availability";
import Layout from "./components/Home/Layout";
import ProtectedRoute from "./components/pages/booking/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { AdminProvider } from "./admin/AdminContext"; // Import AdminProvider
import AdminPage from "./admin/adminPage"; // Import AdminPage

function App() {
  return (
    <Router>
      <AuthProvider>
        <AdminProvider> {/* Wrap AdminProvider inside Router */}
          <AppContent />
        </AdminProvider>
      </AuthProvider>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const hideFooterPages = ["/checkout"];

  return (
    <>
      <Nav />
      <Navbar />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/location" element={<Location />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/commitment" element={<CommitmentPage />} />
          <Route path="/why-choose-us" element={<WhyChooseUs />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/life-in-camp" element={<LifeAtCamp />} />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/availability" element={<Availability />} />
        </Routes>
      </Layout>
      {!hideFooterPages.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
