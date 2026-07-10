import { Navigate } from "react-router-dom";
import Spinner from "../components/ui/Spinner";
import { useAuth } from "../features/auth/hooks/useAuth";

function LoadingFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}

export function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, user, isBootstrapping } = useAuth();

  // wait for the authentication state to be determined and the user data to be fetched and token to be validated
  if (isBootstrapping) {
    return <LoadingFallback />;
  }

  // check if the user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // check if the user has the required role to access the route
  if ( allowedRoles.length > 0 && !allowedRoles.includes(user?.role) ) {
    return <Navigate to="/" replace />;
  }

  // if the user is authenticated and has the required role, render the children components
  return children;
}

export function PublicOnlyRoute({ children }) {
  const { isAuthenticated, isBootstrapping } = useAuth();

  // wait for the authentication state to be determined and the user data to be fetched and token to be validated
  if (isBootstrapping) {
    return <LoadingFallback />;
  }

  // if the user is authenticated, don't allow them to access the login or register pages
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // if the user is not authenticated, display the requested page
  return children;
}

export default ProtectedRoute;