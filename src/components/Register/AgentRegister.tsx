import React, { useState } from 'react';

const AgentRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    number: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
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

    // Basic validation logic
    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else {
      newErrors.name = '';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else {
      newErrors.email = '';
    }

    if (!formData.number) {
      newErrors.number = 'Number is required';
      isValid = false;
    } else {
      newErrors.number = '';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    } else {
      newErrors.password = '';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    } else {
      newErrors.confirmPassword = '';
    }

    if (!formData.licenseNumber) {
      newErrors.licenseNumber = 'Agent License Number is required';
      isValid = false;
    } else {
      newErrors.licenseNumber = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Submit the form
      console.log('Agent form submitted', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700">
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
      
      {/* Add the remaining form fields with validation */}
      {/* Email */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700">
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
        <label className="block mb-2 text-sm font-bold text-gray-700">
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
        {errors.number && <p className="text-red-500 text-xs">{errors.number}</p>}
      </div>
      
      {/* Password */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700">
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
        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
      </div>
      
      {/* Confirm Password */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700">
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
        {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
      </div>
      
      {/* Agent License Number */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Agent License Number
        </label>
        <input
          type="text"
          name="licenseNumber"
          value={formData.licenseNumber}
          onChange={handleChange}
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          placeholder="Enter your Agent License Number"
        />
        {errors.licenseNumber && <p className="text-red-500 text-xs">{errors.licenseNumber}</p>}
      </div>
      
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default AgentRegister;
