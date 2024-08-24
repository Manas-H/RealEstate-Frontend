import React, { useState } from "react";
import Sidebar from "../components/Agent/Sidebar";
import PropertyForm from "../components/Agent/AddProperty"; // Import the PropertyForm component
import ListProperty from "../components/Agent/ListProperty";
import InterestedClient from "../components/Agent/InterestedClients";
import Profile from "../components/Agent/Profile";

const AgentDashboard: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>("");

  const handleSidebarClick = (component: string) => {
    setActiveComponent(component);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "addProperty":
        return <PropertyForm />;
      case "properties":
        return <ListProperty />;
      case "clients":
        return <InterestedClient />;
      case "profile":
        return <Profile />;
      default:
        return (
          <h1 className="text-3xl font-bold">Welcome to the Agent Dashboard</h1>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar onSidebarClick={handleSidebarClick} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow bg-white lg:ml-64">
        {/* Header with Logo */}
        <div className="flex justify-between items-center shadow-md border-b border-gray-300 p-[6px]">
          <img
            src="/logo.jpg"
            alt="estate logo"
            className="w-36 md:w-36 md:h-12 cursor-pointer"
          />
        </div>

        {/* Page Content */}
        <div className="flex-grow p-6">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default AgentDashboard;
