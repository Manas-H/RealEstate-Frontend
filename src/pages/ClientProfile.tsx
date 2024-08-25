import React from "react";
import NavBar from "../components/Header/Navbar";
import Profile from "../components/Agent/Profile";
import Footer from "../components/Footer/Footer";

const ClientProfile: React.FC = () => {
  return (
    <div>
      <NavBar />
      <div className="mt-10">
        <Profile />
      </div>
      <Footer />
    </div>
  );
};

export default ClientProfile;
