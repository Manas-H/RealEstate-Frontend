import React, { useEffect, useState } from "react";
import apiService from "../../services/Api";

interface Property {
  _id: string;
  title: string;
  interestedClients: string[]; // Array of client IDs
}

interface Client {
  _id: string;
  name: string;
  email: string;
}

const InterestedClients: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [clients, setClients] = useState<{ [key: string]: Client }>({});
  const [error, setError] = useState<string | null>(null);

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
      const propertiesData = response.data;
      setProperties(propertiesData);

      // Collect unique client IDs from all properties
      const clientIds = Array.from(
        new Set(
          propertiesData.flatMap((prop: Property) => prop.interestedClients)
        )
      );

      // Fetch client details for each unique client ID
      const clientDetailsPromises = clientIds.map((clientId) => {
        if (typeof clientId === "string") {
          return apiService.getClientById(clientId);
        }
        return Promise.reject(new Error("Client ID must be a string"));
      });

      const clientsData = await Promise.all(clientDetailsPromises);
      const clientsMap = clientsData.reduce(
        (acc: { [key: string]: Client }, clientResponse) => {
          const client = clientResponse.data;
          acc[client._id] = client;
          return acc;
        },
        {}
      );

      setClients(clientsMap);
    } catch (err) {
      setError("Failed to fetch properties or client details.");
      console.error(err);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Interested Clients</h1>
      {error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="space-y-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-2xl font-semibold mb-4">{property.title}</h2>
              {property.interestedClients.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-gray-100 rounded-lg">
                    <thead className="bg-black text-white">
                      <tr>
                        <th className="py-3 px-6 text-left">Client Name</th>
                        <th className="py-3 px-6 text-left">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {property.interestedClients.map((clientId) => {
                        const client = clients[clientId];
                        return client ? (
                          <tr
                            key={client._id}
                            className="border-b hover:bg-gray-200 transition-colors"
                          >
                            <td className="py-4 px-6">{client.name}</td>
                            <td className="py-4 px-6">{client.email}</td>
                          </tr>
                        ) : (
                          <tr key={clientId}>
                            <td
                              colSpan={2}
                              className="py-4 px-6 text-center text-gray-500"
                            >
                              Loading client details...
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-gray-500">
                  No clients have expressed interest in this property.
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterestedClients;
