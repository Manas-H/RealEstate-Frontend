import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerClient } from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const ClientRegister: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    } else {
      newErrors.name = "";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    if (!formData.number) {
      newErrors.number = "Number is required";
      isValid = false;
    } else {
      newErrors.number = "";
    }

    const password = formData.password;
    const passwordErrors: string[] = [];

    if (!password) {
      passwordErrors.push("Password is required");
    } else {
      if (password.length < 6) {
        passwordErrors.push("Password must be at least 6 characters");
      }
      if (!/[A-Z]/.test(password)) {
        passwordErrors.push(
          "Password must include at least one uppercase letter"
        );
      }
      if (!/[a-z]/.test(password)) {
        passwordErrors.push(
          "Password must include at least one lowercase letter"
        );
      }
      if (!/[0-9]/.test(password)) {
        passwordErrors.push("Password must include at least one number");
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        passwordErrors.push(
          "Password must include at least one special character"
        );
      }
    }

    newErrors.password = passwordErrors.join(", ");
    isValid = isValid && passwordErrors.length === 0;

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    } else {
      newErrors.confirmPassword = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      try {
        // Dispatch the registerClient action
        const actionResult = await dispatch(
          registerClient({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            number: formData.number,
          })
        ).unwrap(); // unwrap the result to get the resolved value or throw an error

        // Check if registration was successful
        if (actionResult) {
          // Navigate to the login page
          navigate("/login");
        }
      } catch (error) {
        // Handle errors if needed
        console.error("Registration failed:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields with error handling */}
      {/* Name */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700 text-start">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          placeholder="Enter your name"
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700 text-start">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>

      {/* Number */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700 text-start">
          Number
        </label>
        <input
          type="text"
          name="number"
          value={formData.number}
          onChange={handleChange}
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          placeholder="Enter your number"
        />
        {errors.number && (
          <p className="text-red-500 text-xs">{errors.number}</p>
        )}
      </div>

      {/* Password */}
      <div className="flex">
        <div className="mb-4 mx-1">
          <label className="block mb-2 text-sm font-bold text-gray-700 text-start">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4 mx-1">
          <label className="block mb-2 text-sm font-bold text-gray-700 text-start">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Confirm your password"
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password}</p>
        )}
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className={`px-6 py-2 font-bold text-white ${
            loading ? "bg-gray-500" : "bg-black hover:bg-gray-900"
          } rounded-2xl focus:outline-none focus:shadow-outline`}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </form>
  );
};

export default ClientRegister;
