import React from "react";
import NavBar from "../components/Header/Navbar";
// import Footer from "../components/Footer/Footer";

const About: React.FC = () => {
  return (
    <div>
      <NavBar />
      <div className="bg-white text-black min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
          <div className="flex flex-col lg:flex-row lg:space-x-12">
            {/* Image Section */}
            {/* <div className="lg:w-1/2 mb-8 lg:mb-0">
              <img
                src="/team.jpg"
                alt="Team"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div> */}

            {/* Content Section */}
            <div className="lg:w-full lg:mx-20">
              <h2 className="text-3xl font-semibold mb-4 lg:text-left">
                Who We Are
              </h2>
              <p className="text-lg mb-6 text-justify">
                We are a dedicated team of professionals committed to providing
                exceptional real estate services. Our team combines industry
                expertise with a passion for helping clients find their perfect
                homes and investment properties.
              </p>
              <h2 className="text-3xl font-semibold mb-4 lg:text-left">
                Our Mission
              </h2>
              <p className="text-lg mb-6 text-justify">
                Our mission is to revolutionize the real estate experience by
                offering personalized and innovative solutions. We aim to exceed
                expectations and create lasting relationships with our clients
                through transparency, integrity, and excellence.
              </p>
              <h2 className="text-3xl font-semibold mb-4 lg:text-left">
                Our Values
              </h2>
              <ul className="list-disc list-inside mb-6 space-y-2 text-justify">
                <li className="text-lg">
                  Integrity - We uphold the highest ethical standards in
                  everything we do.
                </li>
                <li className="text-lg">
                  Innovation - We continuously seek new and better ways to serve
                  our clients.
                </li>
                <li className="text-lg">
                  Excellence - We are dedicated to delivering top-notch service
                  and results.
                </li>
              </ul>
              <p className="text-lg text-justify">
                Whether you are buying, selling, or investing, we are here to
                guide you every step of the way. Contact us today to learn more
                about how we can assist you.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default About;
