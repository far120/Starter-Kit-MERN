import { createBrowserRouter } from "react-router-dom";
import RootRoute from "./RootRoute";
import Login from "../features/auth/components/Login";
import HomePage from "../pages/Home";
import NotFound from "../pages/NotFound";
import Register from "../features/auth/components/Register";
import Profile from "../features/User/components/profile";
import { ProtectedRoute, PublicOnlyRoute } from "../utils/ProtectRoute";
import AdminUsers from "../features/User/components/AdminUsers";
import AdminUserLogs from "../features/User/components/AdminUserLogs";
import ResetPassword from "../features/User/components/ResetPassword";
import AdminDashboard from "../features/User/components/AdminDashboard";


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
        path: "admin/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        )
      },
      {
        path: "admin/users",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminUsers />
          </ProtectedRoute>
        )
      },
      {
        path: "admin/logs",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminUserLogs />
          </ProtectedRoute>
        )
      }

    ]
  }
]);