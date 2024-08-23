import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Access user role from Redux store (adjust according to your state structure)
  const { user } = useSelector((state: RootState) => state.auth);
  console.log(user)

  const goToLogin = () => navigate("/login");
  const goToRegister = () => navigate("/register");

  // Logout function
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2 shadow-md">
      <div className="flex flex-wrap justify-between items-end mx-auto max-w-screen-xl">
        <Link to="/">
          <img
            src="/logo.jpg"
            alt="estate logo"
            className="w-36 md:w-36 md:h-12 cursor-pointer"
          />
        </Link>

        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="mobile-menu"
            aria-expanded={isOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div
          className={`justify-between items-center w-full lg:flex lg:w-auto lg:order-1 ${
            isOpen ? "block" : "hidden"
          }`}
          id="mobile-menu"
        >
          <ul className="flex flex-col justify-center items-center mt-4 md:text-xl lg:flex-row lg:space-x-16 lg:mt-0">
            <li>
              <Link
                to="/home"
                className="block py-2 text-gray-700 rounded hover:bg-gray-100 lg:hover:bg-transparent  lg:hover:text-gray-900 lg:p-0 lg:border-b-2 lg:border-transparent lg:hover:border-black"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/properties"
                className="block py-2 text-gray-700 rounded hover:bg-gray-100 lg:hover:bg-transparent  lg:hover:text-gray-900 lg:p-0 lg:border-b-2 lg:border-transparent lg:hover:border-black"
              >
                Properties
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 text-gray-700 rounded hover:bg-gray-100 lg:hover:bg-transparent  lg:hover:text-gray-900 lg:p-0 lg:border-b-2 lg:border-transparent lg:hover:border-black"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 text-gray-700 rounded hover:bg-gray-100 lg:hover:bg-transparent  lg:hover:text-gray-900 lg:p-0 lg:border-b-2 lg:border-transparent lg:hover:border-black"
              >
                Contact
              </Link>
            </li>
            {user ? (
              <li className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-[16px] text-gray-700 hover:text-gray-900 border border-black rounded-md px-4 py-0.5"
                >
                  <i className="fa fa-user" />
                  <span>{user.name}</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-52">
                    <ul className="py-2">
                      {user.role === "client" ? (
                        <>
                          <li>
                            <Link
                              to="/interested-properties"
                              className="block text-sm text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              Interested Properties
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/profile"
                              className="block text-sm text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              Profile
                            </Link>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link
                              to="/manage"
                              className="block px-4 text-sm text-left py-2 text-gray-700 hover:bg-gray-100"
                            >
                              Manage
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/profile"
                              className="block px-4 text-sm text-left py-2 text-gray-700 hover:bg-gray-100"
                            >
                              Profile
                            </Link>
                          </li>
                        </>
                      )}
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left text-sm  px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            ) : (
              <li className="lg:hidden">
                <Link
                  to="/login"
                  className="block py-2 text-blue-600 font-medium rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0"
                >
                  Login
                </Link>
              </li>
            )}
            {user ? null : (
              <li className="lg:hidden">
                <Link
                  to="/register"
                  className="block py-2 text-blue-600 font-medium rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0"
                >
                  Register
                </Link>
              </li>
            )}
          </ul>
          {user ? null : (
            <div className="flex items-center">
              <button
                className="hidden lg:block bg-black text-white font-medium py-1 px-6 md:ml-10 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 md:mr-2 mb-1"
                onClick={goToLogin}
              >
                Login
              </button>

              <button
                className="hidden lg:block bg-black text-white font-medium py-1 px-6 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 md:mr-8 mb-1"
                onClick={goToRegister}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
