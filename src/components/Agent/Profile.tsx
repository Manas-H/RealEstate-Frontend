import React, { useEffect, useState } from "react";
import apiService from "../../services/Api";

interface UserProfile {
  name: string;
  email: string;
  number: string;
  licenseNumber?: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    number: "",
    licenseNumber: undefined,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("user");
      // console.log("Token being sent:", token);

      // Set token in ApiService
      apiService.setToken(token || "");
      const response = await apiService.getUser();
      const userData = response.data;
      // console.log(userData)
  
      setProfile({
        name: userData.name || "",
        email: userData.email || "",
        number: userData.number || "",
        licenseNumber: userData.licenseNumber || undefined,
      });
    } catch (error) {
      setError("Failed to load profile data.");
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // await apiService.updateUser(profile); 
      // setSuccess("Profile updated successfully!");
      // setError(null);
    } catch (error) {
      setError("Failed to update profile.");
      setSuccess(null);
      console.error(error);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">
        Profile
      </h1>
      {error && <div className="text-center text-red-500 mb-4">{error}</div>}
      {success && (
        <div className="text-center text-green-500 mb-4">{success}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-black font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div>
            <label className="block text-black font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 bg-gray-200 rounded-lg cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-black font-semibold mb-2">
              number
            </label>
            <input
              type="text"
              name="number"
              value={profile.number}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 bg-gray-200 rounded-lg cursor-not-allowed"
            />
          </div>
          {profile.licenseNumber && (
            <div>
              <label className="block text-black font-semibold mb-2">
                License Number
              </label>
              <input
                type="text"
                name="licenseNumber"
                value={profile.licenseNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          )}
          {/* Add more fields here as necessary */}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
