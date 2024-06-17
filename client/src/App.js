// App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Register1 from "./pages/Register1";
import Register2 from "./pages/Register2";
import MedicalHistory from "./pages/MedicalHistory";
import Vaccinations from "./pages/Vaccinations";
import FamilyRegistry from "./pages/FamilyRegistry";
import CompleteExamination from "./pages/CompleteExamination";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs.jsx";
import ChatBot from "./pages/ChatBot.jsx";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard.jsx";

import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false // Check local storage
  );

  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      const role = localStorage.getItem("role"); // Fetch user role from local storage
      setUserRole(role);
    }
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppLayout
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          setIsAuthenticated={setIsAuthenticated}
        />
      </BrowserRouter>
    </Provider>
  );
}

function AppLayout({ isAuthenticated, userRole, setIsAuthenticated }) {
  const location = useLocation();

  const protectedRoutes = [
    "/Profile",
    "/MedicalHistory",
    "/Vaccinations",
    "/FamilyRegistry",
    "/CompleteExamination",
    "/AboutUs",
    "/ChatBot",
  ];

  const requiresAuth = protectedRoutes.includes(location.pathname);

  if (requiresAuth && !isAuthenticated) {
    return <Navigate to="/Login" />;
  }

  if (userRole === "owner") {
    return (
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />

        <Route
          path="/Login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/Register1" element={<Register1 />} />
        <Route path="/Register2" element={<Register2 />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route
          path="/password/reset-password/:token"
          element={<ResetPassword />}
        />
        <Route path="*" element={<Navigate to="/Dashboard" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/Login"
        element={<Login setIsAuthenticated={setIsAuthenticated} />}
      />
      <Route path="/Register1" element={<Register1 />} />
      <Route path="/Register2" element={<Register2 />} />
      <Route path="/ForgetPassword" element={<ForgetPassword />} />
      <Route
        path="/password/reset-password/:token"
        element={<ResetPassword />}
      />
      {userRole !== "owner" && (
        <>
          <Route path="/Profile" element={<Profile />} />
          <Route path="/MedicalHistory" element={<MedicalHistory />} />
          <Route path="/Vaccinations" element={<Vaccinations />} />
          <Route path="/FamilyRegistry" element={<FamilyRegistry />} />
          <Route
            path="/CompleteExamination"
            element={<CompleteExamination />}
          />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ChatBot" element={<ChatBot />} />
        </>
      )}
      <Route path="*" element={<h1>page not found</h1>} />
    </Routes>
  );
}

export default App;
