import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../services/Api";
import NavBar from "../components/Header/Navbar";
import MapComponent from "../components/Map/Map";
// import Footer from "../components/Footer/Footer";

const DetailsProperty: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // id is possibly undefined
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status
  const [interestSubmitted, setInterestSubmitted] = useState<boolean>(false); // Track interest submission
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        console.error("Property ID is not defined");
        setLoading(false); // Stop loading if there's no ID
        return;
      }

      try {
        const response = await ApiService.getPropertyById(id); // Adjust API method if necessary
        setProperty(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchProperty();
  }, [id]);

  const handleInterest = async () => {
    if (!id) return;

    const token = localStorage.getItem("user");
    // console.log("Token being sent:", token);

    if (!token) {
      // Redirect to login if token is not present
      navigate("/login");
      return;
    }

    // Set token in ApiService
    ApiService.setToken(token || "");
    try {
      await ApiService.expressInterestInProperty(id);
      setInterestSubmitted(true);
      alert("Interest noted successfully!");
    } catch (error) {
      console.error("Error expressing interest:", error);
      alert("Failed to submit interest. Please try again.");
    }
  };

  return (
    <div className="bg-linear">
      <NavBar />
      <div className="bg-white px-14 py-5 rounded-lg shadow-lg mt-10 max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center text-xl font-semibold">Loading...</div>
        ) : (
          property && (
            <>
              <div className="flex flex-col md:flex-row gap-8">
                {/* Image Carousel */}
                <div className="w-full md:w-1/2">
                  <div className="relative h-96 overflow-hidden rounded-lg shadow-lg">
                    {property.images.map((image: string, index: number) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${property.title} pics ${index + 1}`}
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                          index === 0 ? "opacity-100" : "opacity-0"
                        }`}
                        style={{
                          animation: `fade ${
                            property.images.length * 4
                          }s infinite`,
                          animationDelay: `${index * 4}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Property Details */}
                <div className="w-full md:w-1/2">
                  <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
                  <p className="text-lg mb-4">{property.description}</p>
                  <p className="text-lg mb-4">
                    <strong>Price:</strong> ${property.price.toLocaleString()}
                  </p>
                  <p className="text-lg mb-4">
                    <strong>Location:</strong> {property.location}
                  </p>
                  <p className="text-lg mb-4">
                    <strong>Status:</strong> {property.status}
                  </p>
                  <button
                    onClick={handleInterest}
                    disabled={interestSubmitted}
                    className={`px-6 py-2 text-lg font-semibold text-white rounded-lg ${
                      interestSubmitted
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-black hover:bg-gray-700"
                    }`}
                  >
                    {interestSubmitted ? "Interest Noted" : "I'm Interested"}
                  </button>
                </div>
              </div>
            </>
          )
        )}
      </div>

      {property && property.geoLocation && (
        <div className="mt-8 mx-5">
          <MapComponent
            lat={property.geoLocation.lat}
            lon={property.geoLocation.lng}
          />
        </div>
      )}

      {/* <Footer /> */}
    </div>
  );
};

export default DetailsProperty;
