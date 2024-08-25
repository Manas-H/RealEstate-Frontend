import React, { useEffect, useState } from "react";
import ApiService from "../services/Api"; // Adjust the import based on your file structure
import NavBar from "../components/Header/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";

interface Property {
  _id: number; // Ensure this matches your API response
  title: string;
  description: string;
  images: string[];
}

const AllProperties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchProperties = async () => {
      try {
        const response = await ApiService.getProperties();
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="flex flex-col justify-between bg-linear min-h-[100vh] max-h-fit">
      <div>
        <NavBar />

        <div className="bg-white px-5 py-3 rounded-lg shadow-lg  m-3 md:mx-20 md:my-10">
          <h2 className="text-4xl font-semibold my-5"> All Properties</h2>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 md:mx-20">
            {loading ? (
              <div className="col-span-full text-center text-gray-500">
                Loading...
              </div>
            ) : properties.length > 0 ? (
              properties.map((property) => (
                <div
                  key={property._id} // Use 'id' if it's the correct field
                  className="relative bg-white rounded-lg shadow-lg overflow-hidden group"
                >
                  <div className="relative h-48">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
                      style={{ backgroundImage: `url(${property.images[0]})` }}
                    >
                      {" "}
                      <h2 className="bg-black text-white">{property.title}</h2>
                    </div>
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundImage: `url(${property.images[1]})` }}
                    >
                      {" "}
                      <h2 className="bg-black text-white">{property.title}</h2>
                    </div>
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundImage: `url(${property.images[2]})` }}
                    >
                      {" "}
                      <h2 className="bg-black text-white">{property.title}</h2>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                      <div className="text-white text-center p-4">
                        <h3 className="text-lg font-bold mb-2">
                          {property.title}
                        </h3>
                        <p className="mb-4">{property.description}</p>
                        <Link to={`/properties/${property._id}`}>
                          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700">
                            Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No properties found
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllProperties;
