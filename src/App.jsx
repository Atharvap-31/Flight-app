import { useState } from "react";
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import ViewFlights from "./pages/Flights/ViewFlights";
import BookingDetails from "./pages/BookingDetails";
import ConfirmationPage from "./pages/Flights/ConfirmationPage";

function App() {

  function ProtectedRoute({ children }) {
    const isLogin = true;
    if (!isLogin) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/viewflights" element={<ViewFlights />} />
        <Route path="/viewflights/:id/:roundtripId?" element={<BookingDetails />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
