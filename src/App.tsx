import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./redux/store";
import { fetchUser, logout } from "./redux/slices/authSlice";
import { isTokenExpired } from "./components/Auth/Utility";
import { jwtDecode } from "jwt-decode";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./components/Auth/PrivateRoutes";
import AgentDashboard from "./pages/AgentDashboard";
import AddProperty from "./components/Agent/AddProperty";
import AllProperties from "./pages/AllProperties";
import PropertyDetail from "./pages/PropertyDetail";
import InterestedProperties from "./pages/ClientInterest";

interface DecodedToken {
  id: string;
  role: string;
  exp: number;
}

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        jwtDecode<DecodedToken>(token); // Decode the token but don't store it
        if (isTokenExpired(token)) {
          dispatch(logout());
        } else {
          dispatch(fetchUser());
        }
      } catch (error) {
        console.error("Token decoding error:", error);
        dispatch(logout());
      }
    }
  }, [dispatch]);

  if (user) {
    if (user.role === "agent" && window.location.pathname === "/") {
      return <Navigate to="/agent-dashboard" />;
    }
    if (
      user.role === "client" &&
      window.location.pathname === "/agent-dashboard"
    ) {
      return <Navigate to="/" />;
    }
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/agent-dashboard"
            element={
              <PrivateRoute>
                <AgentDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-property"
            element={
              <PrivateRoute>
                <AddProperty />
              </PrivateRoute>
            }
          />
          <Route
            path="/all-properties"
            element={
              <PrivateRoute>
                <AllProperties />
              </PrivateRoute>
            }
          />
          <Route
            path="/properties/:id"
            element={
              <PrivateRoute>
                <PropertyDetail />
              </PrivateRoute>
            }
          />

          <Route
            path="/interests"
            element={
              <PrivateRoute>
                <InterestedProperties />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
