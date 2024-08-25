import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { useEffect } from "react";
import { logout } from "../../redux/slices/authSlice";
import { isTokenExpired } from "../Auth/Utility";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenExpired(token)) {
      dispatch(logout());
    }
  }, [dispatch]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role === "agent" && location.pathname === "/") {
    return <Navigate to="/agent-dashboard" />;
  }

  if (user.role === "client" && location.pathname === "/agent-dashboard") {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
