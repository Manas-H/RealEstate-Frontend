import Footer from "../components/Footer/Footer";
import NavBar from "../components/Header/Navbar";
import LandingPage from "../components/LandingPages/Landingpage";
import ServicesOverview from "../components/LandingPages/ServicesOverview";
import WhyChooseUs from "../components/LandingPages/WhyChooseUs";

const Home: React.FC = () => {
  return (
    <div>
      <NavBar />
      <LandingPage />
      <WhyChooseUs />
      <ServicesOverview />
      <Footer />
    </div>
  );
};

export default Home;
