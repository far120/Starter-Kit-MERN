import { createBrowserRouter } from "react-router-dom";
import RootRoute from "./RootRoute";
import Login from "../features/auth/components/Login";
import HomePage from "../pages/Home";
import NotFound from "../pages/NotFound";
import Register from "../features/auth/components/Register";
import Profile from "../features/User/components/profile";
import { ProtectedRoute, PublicOnlyRoute } from "../utils/ProtectRoute";
import ManagerUsers from "../features/User/components/managerUsers";
import ManagerUserLogs from "../features/User/components/managerUserLogs";
import ResetPassword from "../features/User/components/ResetPassword";
import ManagerDashboard from "../features/User/components/managerDashboard";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
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
        )
      },
      {
        path: "register",
        element: (
          <PublicOnlyRoute>
            <Register />
          </PublicOnlyRoute>
        )
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },
      {
        path: "reset-password",
        element: (
          <ProtectedRoute>
            <ResetPassword />
          </ProtectedRoute>
        )
      },
      {
        path: "manager/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["manager"]}>
            <ManagerDashboard />
          </ProtectedRoute>
        )
      },
      {
        path: "manager/users",
        element: (
          <ProtectedRoute allowedRoles={["manager"]}>
            <ManagerUsers />
          </ProtectedRoute>
        )
      },
      {
        path: "manager/logs",
        element: (
          <ProtectedRoute allowedRoles={["manager"]}>
            <ManagerUserLogs />
          </ProtectedRoute>
        )
      }

    ]
  }
]);