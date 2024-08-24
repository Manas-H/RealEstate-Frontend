import React, { useEffect, useState } from "react";
import ApiService from "../services/Api"; // Adjust the import based on your file structure
import NavBar from "../components/Header/Navbar";
import { Link } from "react-router-dom";

interface Property {
  _id: number; // Ensure this matches your API response
  title: string;
  description: string;
  images: string[];
}

const AllProperties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await ApiService.getProperties();
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {properties.map((property) => (
          <div
            key={property._id} // Use 'id' if it's the correct field
            className="relative bg-white rounded-lg shadow-lg overflow-hidden group"
          >
            <div className="relative h-48">
              <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
                style={{ backgroundImage: `url(${property.images[0]})` }}
              ></div>
              <div
                className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundImage: `url(${property.images[1]})` }}
              ></div>
              <div
                className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundImage: `url(${property.images[2]})` }}
              ></div>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                <div className="text-white text-center p-4">
                  <h3 className="text-lg font-bold mb-2">{property.title}</h3>
                  <p className="mb-4">{property.description}</p>
                  <Link to={`/properties/${property._id}`}>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProperties;
