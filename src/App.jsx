import { useState } from "react";
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

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
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
