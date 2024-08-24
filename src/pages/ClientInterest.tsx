import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "../services/Api";
import NavBar from "../components/Header/Navbar";

interface Property {
  _id: string;
  title: string;
  price: number;
  status: string;
}

const InterestedProperties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInterestedProperties = async () => {
      try {
        const response = await ApiService.getClientInterestedProperties();
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching interested properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterestedProperties();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Interested Properties</h1>
        {loading ? (
          <div className="text-center text-xl font-semibold">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead className="bg-black text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Title</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Price</th>
                  <th className="py-3 px-6 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                {properties.length > 0 ? (
                  properties.map((property) => (
                    <tr
                      key={property._id}
                      className="border-b hover:bg-gray-100 transition-colors"
                    >
                      <td className="py-4 px-6">{property.title}</td>
                      <td className="py-4 px-6 capitalize">
                        {property.status}
                      </td>
                      <td className="py-4 px-6">
                        ${property.price.toLocaleString()}
                      </td>
                      <td className="py-4 px-6">
                        <Link to={`/properties/${property._id}`}>
                          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                            View Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-4 px-6 text-center text-gray-500"
                    >
                      No interested properties found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterestedProperties;
