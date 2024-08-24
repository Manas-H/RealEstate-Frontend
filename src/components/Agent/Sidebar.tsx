import React, { useState } from "react";

interface SidebarProps {
  onSidebarClick: (component: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSidebarClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 right-4 z-50 p-2 text-gray-700 bg-white border rounded-full shadow-lg focus:outline-none md:hidden lg:hidden"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="p-4 border-b-[1px] border-black">
          <h2 className="text-xl font-semibold">Agent Dashboard</h2>
        </div>
        <div className="mt-10 w-full">
          <ul className="flex flex-col items-start w-full px-5 space-y-4">
            <li>
              <button
                onClick={() => onSidebarClick("addProperty")}
                className="block px-4 py-2 rounded hover:bg-gray-700 hover:text-white"
              >
                Add Property
              </button>
            </li>
            <li>
              <button
                onClick={() => onSidebarClick("properties")}
                className="block px-4 py-2 rounded hover:bg-gray-700 hover:text-white"
              >
                Properties
              </button>
            </li>
            <li>
              <button
                onClick={() => onSidebarClick("clients")}
                className="block px-4 py-2 rounded hover:bg-gray-700 hover:text-white"
              >
                Interested Clients
              </button>
            </li>
            <li>
              <button
                onClick={() => onSidebarClick("profile")}
                className="block px-4 py-2 rounded hover:bg-gray-700 hover:text-white"
              >
                Profile
              </button>
            </li>
            <li>
              <button className="block px-4 py-2 rounded hover:bg-gray-700 hover:text-white">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
