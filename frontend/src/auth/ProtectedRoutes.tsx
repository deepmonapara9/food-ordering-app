import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

// This component will be used to protect routes that require authentication.
// It will check if the user is authenticated and then render the children if they are.
// If the user is not authenticated, it will redirect them to the login page.
const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  // console.log("Is Authenticated:", isAuthenticated);
  // console.log("isAuthenticated:", isAuthenticated);
  // console.log("isLoading:", isLoading);
  // console.log("User:", user);

  // If the user is authenticated, render the children (nested routes)
  if (isLoading) return <p>Loading authentication...</p>; 

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
