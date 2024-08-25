import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProperty, clearProperty } from "../../redux/slices/propertySlice";
import { RootState } from "../../redux/store";
import apiServiceInstance from "../../services/Api";
import apiService from "../../services/Api"; // Ensure this action is available

interface UpdatePropertyProps {
  propertyId: string;
  onClose: () => void;
  onUpdate: () => void;
}

const UpdateProperty: React.FC<UpdatePropertyProps> = ({
  propertyId,
  onClose,
  onUpdate,
}) => {
  const dispatch = useDispatch();
  const property = useSelector((state: RootState) => state.property);

  const [title, setTitle] = useState(property.title || "");
  const [description, setDescription] = useState(property.description || "");
  const [price, setPrice] = useState(property.price || 0);
  const [location, setLocation] = useState(property.location || "");
  const [propertyType, setPropertyType] = useState(property.propertyType || "");
  const [status, setStatus] = useState(property.status || "available");
  const [geoLocation, setGeoLocation] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await apiServiceInstance.getPropertyById(propertyId);
        const data = response.data;
        dispatch(setProperty(data));
        setTitle(data.title || "");
        setDescription(data.description || "");
        setPrice(data.price || 0);
        setLocation(data.location || "");
        setPropertyType(data.propertyType || "");
        setStatus(data.status || "available");
        setGeoLocation(data.geoLocation || { lat: 0, lng: 0 });
        setImages(data.images || []);
      } catch (error) {
        console.error("Failed to fetch property data:", error);
      }
    };

    fetchProperty();
  }, [propertyId, dispatch]);

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

    const token = localStorage.getItem("user");
    apiServiceInstance.setToken(token || "");

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

    try {
      await apiServiceInstance.updateProperty(propertyId, propertyData);
      alert("Property updated successfully");
      apiService.getAgentProperties();
      onClose(); 
      onUpdate();
      dispatch(clearProperty()); 
    } catch (error) {
      console.error("Error updating property:", error);
      alert("Failed to update property. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white border border-gray-300 shadow-lg rounded-lg">
      <span className="flex justify-end cursor-pointer" onClick={() => onClose()}>
        <i className="fa fa-close"></i>
      </span>
      <h1 className="text-2xl font-semibold text-black mb-6 border-b-[1px] pb-3">
        Update Property
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
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
            <option value="under contract">Under Contract</option>
            <option value="sold">Sold</option>
          </select>
        </div>
        {/* GeoLocation */}
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2 text-left">
            Latitude
          </label>
          <input
            type="number"
            placeholder="Latitude"
            className="w-full mb-2 px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            value={geoLocation.lat || 0}
            onChange={(e) =>
              setGeoLocation({
                ...geoLocation,
                lat: parseFloat(e.target.value),
              })
            }
          />
          <label className="block text-black text-sm font-bold mb-2 text-left">
            Longitude
          </label>
          <input
            type="number"
            placeholder="Longitude"
            className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            value={geoLocation.lng || 0}
            onChange={(e) =>
              setGeoLocation({
                ...geoLocation,
                lng: parseFloat(e.target.value),
              })
            }
          />
        </div>
        {/* Images */}
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2 text-left">
            Images
          </label>
          <input type="file" multiple onChange={handleImageChange} />
          <div className="mt-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Preview ${index}`}
                className="w-20 h-20 object-cover mr-2 mb-2"
              />
            ))}
          </div>
        </div>
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Update Property
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default UpdateProperty;
