import React, { useState } from "react";
import apiService from "../services/Api";
import NavBar from "../components/Header/Navbar";
import { Link } from "react-router-dom";

const PropertySearch: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [properties, setProperties] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const response = await apiService.searchProperties({
        location,
        price,
        title,
        propertyType,
      });
      setProperties(response.data);
    } catch (err) {
      setError("Failed to fetch properties.");
      console.error(err);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Search Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="Max Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded-lg"
          />

          {/* Property Type */}
          <div className="">
            <select
              className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
              <option value="land">Land</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleSearch}
          className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Search
        </button>

        {error && <div className="mt-6 text-red-500 text-center">{error}</div>}

        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
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
                      <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700">
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
    </div>
  );
};

export default PropertySearch;
