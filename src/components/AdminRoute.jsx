import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export function AdminRoute({ children }) {
  const { token, role } = useAuth();

  const decodedUsr = jwtDecode(token);
  console.log(decodedUsr);
  if (role === "admin") {
    return children;
  }

  return <Navigate to="/" />;
}
