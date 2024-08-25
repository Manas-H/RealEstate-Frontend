import React, { useState, useEffect } from "react";
import apiService from "../../services/Api";
import UpdateProperty from "./UpdateProperty";

const ListProperty: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    null
  );
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const token = localStorage.getItem("user");
    if (token) {
      apiService.setToken(token);
    }
    try {
      const response = await apiService.getAgentProperties();
      setProperties(response.data);
    } catch (err) {
      setError("Failed to fetch properties.");
      console.error(err);
    }
  };

  const handleEditClick = (id: string) => {
    setSelectedPropertyId(id);
    setShowUpdateModal(true);
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setSelectedPropertyId(null);
  };

  const handlePropertyUpdated = () => {
    fetchProperties();
  };

  const handleDeleteClick = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (confirmDelete) {
      try {
        await apiService.deleteProperty(id);
        alert("Property deleted successfully!");
        fetchProperties();
      } catch (err) {
        alert("Failed to delete property.");
        console.error(err);
      }
    }
  };

  return (
    <div className="py-8 max-w-[325px] md:w-full md:mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Properties</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {properties.length === 0 ? (
        <p className="text-gray-500">No records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg overflow-x-auto">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {properties.map((property, index) => (
                <tr
                  key={property._id || index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {property.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${property.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {property.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-blue-600 hover:text-blue-900 mr-2"
                      onClick={() => handleEditClick(property._id)}
                    >
                      <i className="fa fa-edit" />
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteClick(property._id)}
                    >
                      <i className="fa fa-trash" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showUpdateModal && selectedPropertyId && (
        <UpdateProperty
          propertyId={selectedPropertyId}
          onClose={handleCloseModal}
          onUpdate={handlePropertyUpdated} // Pass the refresh function
        />
      )}
    </div>
  );
};

export default ListProperty;
