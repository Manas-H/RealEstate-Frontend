import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAgent, loginClient } from "../redux/slices/authSlice";
import { RootState, AppDispatch } from "../redux/store";

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"agent" | "client" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Access Redux state
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const goToHome = () => {
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (activeTab === "agent") {
        await dispatch(loginAgent({ email, password })).unwrap();
        navigate("/agent-dashboard");
      } else if (activeTab === "client") {
        await dispatch(loginClient({ email, password })).unwrap();
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      console.error(err);
    }
  };

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/login-bg.jpg')" }}
    >
      <div>
        <button
          className="absolute z-50 left-10 top-10 text-white hover:text-gray-200 text-2xl"
          onClick={goToHome}
        >
          &larr; Back
        </button>
      </div>
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-75"></div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full">
        {activeTab === null && (
          <div className="flex flex-col md:flex-row  items-center md:space-x-4">
            <button
              onClick={() => setActiveTab("agent")}
              className="px-4 py-2 my-3 md:my-0 text-lg font-semibold text-white bg-black rounded hover:bg-gray-900 border-[1px] border-gray-50"
            >
              Agent Login
            </button>
            <button
              onClick={() => setActiveTab("client")}
              className="px-4 py-2 text-lg font-semibold text-black bg-white rounded hover:bg-gray-100 border-[2px] border-gray-900"
            >
              Client Login
            </button>
          </div>
        )}

        {activeTab && (
          <div
            className="absolute w-[95%] p-4 transition-transform duration-500 ease-in-out transform bg-white rounded-lg shadow-lg md:w-1/3"
            style={{ top: activeTab ? "20%" : "50%" }}
          >
            <div className="flex justify-between mb-4 border-b-[1px] border-black w-full pb-2">
              <button
                onClick={() => setActiveTab(null)}
                className="text-gray-700 hover:text-gray-900"
              >
                &larr; Back
              </button>
              <h2 className="text-xl font-semibold">
                {activeTab === "agent" ? " Login" : " Login"}
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-black text-start">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 leading-tight text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-bold text-black text-start">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 mb-3 leading-tight text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  placeholder="Enter your password"
                />
              </div>
              {error && <div className="mb-4 text-red-500">{error}</div>}

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className={`px-6 py-2 font-bold text-white ${
                    loading ? "bg-gray-500" : "bg-black hover:bg-gray-900"
                  } rounded-2xl focus:outline-none focus:shadow-outline`}
                  disabled={loading}
                >
                  {loading ? "Logging In..." : "Login"}
                </button>
              </div>
            </form>

            <div className="text-sm mt-2">
              Don't have an account?{" "}
              <Link className="text-sm text-blue-500 pl-2" to="/register">
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
