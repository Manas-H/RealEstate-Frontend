import React from "react";
import "../../App.css";

const LandingPage: React.FC = () => {
  return (
    <div className="relative h-[90vh] overflow-hidden flex items-center justify-center bg-gray-900 text-white">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{ backgroundImage: "url(/landing2.jpg)" }}
        ></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{ backgroundImage: "url(/landing1.jpg)" }}
        ></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{ backgroundImage: "url(/landing3.jpg)" }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-75"></div>
      </div>
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Find Your Dream Home</h1>
        <p className="text-lg mb-8">
          Discover the best properties with us and find your perfect match.
        </p>
        <button className="px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-white hover:text-black focus:outline-none">
          Explore Properties
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
