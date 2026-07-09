import { createBrowserRouter } from "react-router-dom";
import { lazy} from "react";

import RootRoute from "./RootRoute";
import { ProtectedRoute, PublicOnlyRoute } from "../utils/ProtectRoute";

const HomePage = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../features/auth/components/Login"));
const Register = lazy(() => import("../features/auth/components/Register"));
const Profile = lazy(() => import("../features/User/components/profile"));
const ResetPassword = lazy(() => import("../features/User/components/ResetPassword"));
const ManagerDashboard = lazy(() => import("../features/User/components/managerDashboard"));
const ManagerUsers = lazy(() => import("../features/User/components/managerUsers"));
const ManagerUserLogs = lazy(() => import("../features/User/components/managerUserLogs"));
import NotFound from "../pages/NotFound";

function Loader() {
  return <h2>Loading...</h2>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element:  <RootRoute />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: (
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PublicOnlyRoute>
            <Register />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "reset-password",
        element: (
          <ProtectedRoute>
            <ResetPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "manager/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["manager"]}>
            <ManagerDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "manager/users",
        element: (
          <ProtectedRoute allowedRoles={["manager"]}>
            <ManagerUsers />
          </ProtectedRoute>
        ),
      },
      {
        path: "manager/logs",
        element: (
          <ProtectedRoute allowedRoles={["manager"]}>
            <ManagerUserLogs />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);