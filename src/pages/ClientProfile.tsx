import React from "react";
import NavBar from "../components/Header/Navbar";
import Profile from "../components/Agent/Profile";

const ClientProfile: React.FC = () => {
  return (
    <div>
      <NavBar />
      <div className="mt-10">
        <Profile />
      </div>
    </div>
  );
};

export default ClientProfile;
