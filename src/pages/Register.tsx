import React, { useState } from "react";
import AgentForm from "../components/Register/AgentRegister";
import ClientForm from "../components/Register/ClientRegister";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"agent" | "client" | null>(null);
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };

  return (
    <div
      className="fixed h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/register-bg.jpg')" }}
    >
      <div>
        <button
          className="absolute z-50 left-10 top-10 text-white hover:text-gray-200 text-2xl "
          onClick={goToHome}
        >
          &larr; Back
        </button>
      </div>
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full">
        {activeTab === null && (
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("agent")}
              className="px-4 py-2 text-lg font-semibold text-white bg-black rounded hover:bg-gray-900 border-[1px] border-gray-50 "
            >
              Register as Agent
            </button>
            <button
              onClick={() => setActiveTab("client")}
              className="px-4 py-2 text-lg font-semibold text-black bg-white rounded hover:bg-gray-400 border-[1px] border-gray-900"
            >
              Register as Client
            </button>
          </div>
        )}

        {activeTab && (
          <div
            className="absolute w-full p-4 transition-transform duration-500 ease-in-out transform bg-white rounded-lg shadow-lg md:w-1/3"
            style={{ top: activeTab ? "20%" : "50%" }}
          >
            <div className="flex justify-between mb-4">
              <button
                onClick={() => setActiveTab(null)}
                className="text-gray-700 hover:text-gray-900"
              >
                &larr; Back
              </button>
              <h2 className="text-xl font-semibold">
                {activeTab === "agent"
                  ? "Agent Registration"
                  : "Client Registration"}
              </h2>
            </div>

            {/* Conditionally render the AgentForm or ClientForm */}

            {activeTab === "agent" ? <AgentForm /> : <ClientForm />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
