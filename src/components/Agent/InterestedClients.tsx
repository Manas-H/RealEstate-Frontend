import React, { useEffect, useState } from "react";
import apiService from "../../services/Api";

interface Property {
  _id: string;
  title: string;
  propertyType: string;
  interestedClients: string[]; 
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
      const propertiesData = response.data.filter(
        (property: Property) => property.interestedClients.length > 0
      ); // Only include properties with interested clients
      setProperties(propertiesData);

      // Collect unique client IDs from all properties
      const clientIds: string[] = Array.from(
        new Set(
          propertiesData.flatMap((prop: Property) => prop.interestedClients)
        )
      );

      // Fetch client details for each unique client ID
      const clientDetailsPromises = clientIds.map(async (clientId: string) => {
        try {
          const clientResponse = await apiService.getClientById(clientId);
          return clientResponse.data;
        } catch (err) {
          // Handle the case where a client is not found
          console.error(`Client ID ${clientId} not found:`, err);
          return null; // Return null or some indicator of a failed fetch
        }
      });

      const clientsData = await Promise.all(clientDetailsPromises);

      // Reduce client data into a map, ignoring null entries
      const clientsMap = clientsData.reduce(
        (acc: { [key: string]: Client }, client) => {
          if (client) { // Only add valid clients
            acc[client._id] = client;
          }
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
    <div className="py-8 max-w-[325px] md:max-w-full mx-auto">
      <h1 className="text-3xl font-bold mb-6">Interested Clients</h1>
      {error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg overflow-x-auto">
            <thead className="bg-black text-white">
              <tr>
                <th className="py-3 px-6 text-left">Property Name</th>
                <th className="py-3 px-6 text-left">Property Type</th>
                <th className="py-3 px-6 text-left">Client Name</th>
                <th className="py-3 px-6 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {properties.length > 0 ? (
                properties.flatMap((property) =>
                  property.interestedClients.map((clientId) => {
                    const client = clients[clientId];
                    return client ? (
                      <tr
                        key={`${property._id}-${client._id}`}
                        className="border-b hover:bg-gray-200 transition-colors"
                      >
                        <td className="py-4 px-6">{property.title}</td>
                        <td className="py-4 px-6">{property.propertyType}</td>
                        <td className="py-4 px-6">{client.name}</td>
                        <td className="py-4 px-6">{client.email}</td>
                      </tr>
                    ) : (
                      <tr key={`${property._id}-${clientId}`} className="border-b">
                        <td colSpan={4} className="py-4 px-6 text-center text-red-500">
                          Client details not found for ID: {clientId}
                        </td>
                      </tr>
                    );
                  })
                )
              ) : (
                <tr>
                  <td colSpan={4} className="py-4 px-6 text-center text-gray-500">
                    No clients have expressed interest in any properties.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InterestedClients;
