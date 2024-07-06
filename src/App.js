import "./App.css";

import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// App.js
import React, { useEffect, useState } from "react";

import AboutUs from "./pages/AboutUs.jsx";
import BabyVaccinationType from "./pages/BabyVaccinationType.jsx";
import BabyVaccinations from "./pages/BabyVaccinations.jsx";
import ChatBot from "./pages/ChatBot.jsx";
import CompleteExamination from "./pages/CompleteExamination";
import Dashboard from "./pages/Dashboard.jsx";
import DoctorVaccines from "./pages/DoctorVaccines.jsx";
import EpidemicVaccinationType from "./pages/EpidemicVaccinationType.jsx";
import EpidemicVaccinations from "./pages/EpidemicVaccinations.jsx";
import FamilyRecord from "./pages/FamilyRecord.jsx";
import FamilyRegistry from "./pages/FamilyRegistry";
import ForgetPassword from "./pages/ForgetPassword";
import { HashRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MedicalHistory from "./pages/MedicalHistory";
import PatientSearch from "./pages/PatientSearch.jsx";
import PregnantVaccinationType from "./pages/PregnantVaccinationType.jsx";
import PregnantVaccinations from "./pages/PregnantVaccinations.jsx";
import PreviousVaccinations from "./pages/PreviousVaccinations.jsx";
import Profile from "./pages/Profile";
import { Provider } from "react-redux";
import Register1 from "./pages/Register1";
import Register2 from "./pages/Register2";
import ResetPassword from "./pages/ResetPassword";
import TravelVaccinationType from "./pages/TravelVaccinationType.jsx";
import TravelVaccinations from "./pages/TravelVaccinations.jsx";
import Vaccinations from "./pages/Vaccinations";
import Vaccines from "./pages/Vaccines.jsx";
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
      <HashRouter
        future={{ v7_startTransition: true }}
      >
        <AppLayout isAuthenticated={isAuthenticated} userRole={userRole} setIsAuthenticated={setIsAuthenticated} />
      </HashRouter>
    </Provider>
  );
}

function AppLayout({ isAuthenticated, userRole, setIsAuthenticated }) {
  const location = useLocation();

  const protectedRoutes = ["/Profile", "/MedicalHistory", "/Vaccinations", "/FamilyRegistry", "/CompleteExamination", "/AboutUs", "/ChatBot"];

  const requiresAuth = protectedRoutes.includes(location.pathname);

  if (requiresAuth && !isAuthenticated) {
    return <Navigate to="/Login" />;
  }

  if (userRole === "owner") {
    return (
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />

        <Route path="/Login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/Register1" element={<Register1 />} />
        <Route path="/Register2" element={<Register2 />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/password/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/Dashboard" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/Register1" element={<Register1 />} />
      <Route path="/Register2" element={<Register2 />} />
      <Route path="/ForgetPassword" element={<ForgetPassword />} />
      <Route path="/password/reset-password/:token" element={<ResetPassword />} />
      <Route path="/vaccines" element={userRole === "admin" ? <DoctorVaccines /> : <Vaccines />} />
      <Route path="/previous-vaccinations" element={<PreviousVaccinations />} />
      <Route path="/baby-vaccinations" element={<BabyVaccinations />} />
      <Route path="/baby-vaccination/:id" element={<BabyVaccinationType />} />
      <Route path="/pregnant-vaccinations" element={<PregnantVaccinations />} />
      <Route path="/pregnant-vaccination/:id" element={<PregnantVaccinationType />} />
      <Route path="/travel-vaccinations" element={<TravelVaccinations />} />
      <Route path="/travel-vaccination/:id" element={<TravelVaccinationType />} />
      <Route path="/epidemic-vaccinations" element={<EpidemicVaccinations />} />
      <Route path="/epidemic-vaccination/:id" element={<EpidemicVaccinationType />} />
      <Route path="/patient-search" element={<PatientSearch />} />
      <Route path="/family-record" element={<FamilyRecord />} />
      {userRole !== "owner" && (
        <>
          <Route path="/Profile" element={<Profile />} />
          <Route path="/MedicalHistory" element={<MedicalHistory />} />
          <Route path="/Vaccinations" element={<Vaccinations />} />
          <Route path="/FamilyRegistry" element={<FamilyRegistry />} />
          <Route path="/CompleteExamination" element={<CompleteExamination />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ChatBot" element={<ChatBot />} />
        </>
      )}
      <Route path="*" element={<h1>page not found</h1>} />
    </Routes>
  );
}

export default App;
