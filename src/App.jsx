import { useState } from "react";
import { Routes, Route, Navigate } from "react-router";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import ViewFlights from "./pages/Flights/ViewFlights";
import BookingDetails from "./pages/BookingDetails";
import ConfirmationPage from "./pages/Flights/ConfirmationPage";
import Unauthorized from "./pages/Unauthorized";
import useAutoLogout from "./pages/useAutoLogout";

function App() {
  useAutoLogout();
  const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user || !user.role) {
      return <Navigate to="/" replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/user"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <User />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/viewflights"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <ViewFlights />
          </ProtectedRoute>
        }
      />
      <Route
        path="/viewflights/:id/:roundtripId?"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <BookingDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/confirmation"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <ConfirmationPage />
          </ProtectedRoute>
        }
      />

      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}

export default App;
