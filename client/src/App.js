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
import ChatBot from "./pages/ChatBot.jsx"
import Home from "./pages/Home";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false // Check session storage
  );

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppLayout
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      </BrowserRouter>
    </Provider>
  );
}

function AppLayout({ isAuthenticated, setIsAuthenticated }) {
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

  return (
    <>
      {(location.pathname === "/" || requiresAuth) }
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
        <Route path="/Profile" element={<Profile />} />
        <Route path="/MedicalHistory" element={<MedicalHistory />} />
        <Route path="/Vaccinations" element={<Vaccinations />} />
        <Route path="/FamilyRegistry" element={<FamilyRegistry />} />
        <Route path="/CompleteExamination" element={<CompleteExamination />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ChatBot" element={<ChatBot />} />
        <Route path="*" element={<h1>page not found </h1>} />
      </Routes>
      {(location.pathname === "/" || requiresAuth) }
    </>
  );
}

export default App;
