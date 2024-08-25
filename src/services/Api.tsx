import axios, { AxiosInstance } from "axios";

const API_URL = "http://localhost:5000/api";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log("Initial headers:", this.api.defaults.headers.common);
  }

  // Set JWT Token in the headers
  setToken(token: string) {
    if (token) {
      // console.log(
      //   "Previous Authorization Header:",
      //   this.api.defaults.headers.common["Authorization"]
      // );

      // Remove any quotes and trim whitespace
      const cleanToken = token.replace(/"/g, "").trim();

      this.api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${cleanToken}`;

      // console.log(
      //   "New Authorization Header:",
      //   this.api.defaults.headers.common["Authorization"]
      // );
    } else {
      delete this.api.defaults.headers.common["Authorization"];
      console.log("Authorization Header Removed");
    }

    // console.log("All headers after setToken:", this.api.defaults.headers);
  }

  // Auth Endpoints
  async registerAgent(agentData: {
    name: string;
    email: string;
    password: string;
  }) {
    return this.api.post("/auth/agent/register", agentData);
  }

  async loginAgent(credentials: { email: string; password: string }) {
    return this.api.post("/auth/agent/login", credentials);
  }

  async registerClient(clientData: {
    name: string;
    email: string;
    password: string;
  }) {
    return this.api.post("/auth/client/register", clientData);
  }

  async loginClient(credentials: { email: string; password: string }) {
    return this.api.post("/auth/client/login", credentials);
  }

  async getUser() {
    return this.api.get("/auth/profile");
  }

  // Property Endpoints
  async getProperties() {
    return this.api.get("/properties");
  }

  async getPropertyById(id: string) {
    return this.api.get(`/properties/${id}`);
  }

  async createProperty(propertyData: {
    title: string;
    description: string;
    price: number;
    location: string;
    images: string[]; // Include images as Base64 strings
    propertyType: string;
    status: string;
    geoLocation: { lat: number; lng: number };
  }) {
    return this.api.post("/agents/properties", propertyData);
  }

  async updateProperty(
    id: string,
    propertyData: {
      title?: string;
      description?: string;
      price?: number;
      location?: string;
      images?: string[]; // Include images as Base64 strings
      propertyType?: string;
      status?: string;
      geoLocation?: { lat: number; lng: number };
    }
  ) {
    return this.api.put(`/agents/properties/${id}`, propertyData);
  }

  async deleteProperty(id: string) {
    return this.api.delete(`/agents/properties/${id}`);
  }
  async getClientById(id: string) {
    return this.api.get(`/agents/clients/${id}`);
  }

  // Agent-specific Property Management
  async getAgentProperties() {
    return this.api.get("/agents/properties");
  }

  // Client-specific Interest Management
  async getClientInterestedProperties() {
    return this.api.get("/clients/interests");
  }

  async searchProperties(params: {
    location?: string;
    price?: string;
    title?: string;
    propertyType?: string;
  }) {
    return this.api.get("clients/properties", { params });
  }

  async expressInterestInProperty(propertyId: string) {
    return this.api.post(`/clients/properties/${propertyId}/interest`);
  }
}

// Assign the instance to a variable before exporting it
const apiServiceInstance = new ApiService();
export default apiServiceInstance;
