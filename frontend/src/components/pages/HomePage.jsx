import HeroSection from "../Home/HeroSection";
import About from "../Home/about";
import "../Home/styles.css";
import Lodge from "../Home/Lodge";
import Activity from "../Home/Activity";
import ReviewPage from "../Home/ReviewPage";
import VisitPage from "../Home/VisitPage";

const Homepage = () => {
  return (
    <div className="homepage">
      <HeroSection/>
        <About/>
        <Lodge/>
        <Activity/>
        <ReviewPage/>
        <VisitPage/>
    </div>
  );
};

export default Homepage;