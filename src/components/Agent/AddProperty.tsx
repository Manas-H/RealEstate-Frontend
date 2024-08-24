import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProperty } from "../../redux/slices/propertySlice";
import { RootState } from "../../redux/store";
import apiServiceInstance from "../../services/Api";

const AddProperty: React.FC = () => {
  const dispatch = useDispatch();
  const property = useSelector((state: RootState) => state.property);

  const [title, setTitle] = useState(property.title);
  const [description, setDescription] = useState(property.description);
  const [price, setPrice] = useState(property.price);
  const [location, setLocation] = useState(property.location);
  const [propertyType, setPropertyType] = useState(property.propertyType);
  const [status, setStatus] = useState(property.status);
  const [geoLocation, setGeoLocation] = useState(property.geoLocation);
  const [images, setImages] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const base64Images: Promise<string>[] = files.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      );
      Promise.all(base64Images).then((images) => setImages(images));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Assuming you get the token from local storage
    const token = localStorage.getItem("user");
    console.log("Token being sent:", token); // Debugging

    // Set token in ApiService
    apiServiceInstance.setToken(token || "");

    // Update Redux state
    dispatch(
      setProperty({
        title,
        description,
        price,
        location,
        images, // Base64 encoded images
        propertyType,
        status,
        geoLocation,
      })
    );

    // Prepare data for API request
    const propertyData = {
      title,
      description,
      price,
      location,
      images,
      propertyType,
      status,
      geoLocation,
    };
    console.log(propertyData);
    // Send data to the backend
    try {
      await apiServiceInstance.createProperty(propertyData);
      console.log("Property submitted successfully");
      // Optionally clear the form or redirect after successful submission
      // dispatch(clearProperty()); // If you want to clear the form after submission
    } catch (error) {
      console.error("Error submitting property:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white border border-gray-300 shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-black mb-6 border-b-[1px] pb-3">
        Add Property
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2 text-left">
            Title
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2 text-left">
            Description
          </label>
          <textarea
            className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2 text-left">
            Price
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2 text-left">
            Location
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        {/* Property Type */}
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2 text-left">
            Property Type
          </label>
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

        {/* Status */}
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2 text-left">
            Status
          </label>
          <select
            className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="pending">Pending</option>
            <option value="rented">Rented</option>
          </select>
        </div>

        {/* GeoLocation */}
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2 text-left">
            GeoLocation (Latitude, Longitude)
          </label>
          <input
            type="number"
            placeholder="Latitude"
            className="w-full mb-2 px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            value={geoLocation.lat}
            onChange={(e) =>
              setGeoLocation({ ...geoLocation, lat: Number(e.target.value) })
            }
            required
          />
          <input
            type="number"
            placeholder="Longitude"
            className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            value={geoLocation.lng}
            onChange={(e) =>
              setGeoLocation({ ...geoLocation, lng: Number(e.target.value) })
            }
            required
          />
        </div>

        {/* Images */}
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2 text-left">
            Images
          </label>
          <input
            type="file"
            multiple
            className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            onChange={handleImageChange}
          />
          {/* <div className="mt-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Property shots ${index}`}
                className="w-24 h-24 object-cover mr-2 mb-2"
              />
            ))}
          </div> */}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
