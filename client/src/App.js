import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Register1 from "./pages/Register1";
import Register2 from "./pages/Register2";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MedicalHistory from "./pages/MedicalHistory";
import Vaccinations from "./pages/Vaccinations";
import FamilyRegistry from "./pages/FamilyRegistry";
import CompleteExamination from "./pages/CompleteExamination";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs.jsx";
import ChatBott from "./components/ChatBott.jsx";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </Provider>
  );
}

function AppLayout() {
  const location = useLocation();
  const showNavbarFooter =
    location.pathname === "/" ||
    location.pathname === "/Profile" ||
    location.pathname === "/MedicalHistory" ||
    location.pathname === "/Vaccinations" ||
    location.pathname === "/FamilyRegistry" ||
    location.pathname === "/CompleteExamination" ||
    location.pathname === "/AboutUs" ||
    location.pathname === "/ChatBott";
    console.log("Current location:", location.pathname);
  console.log("Show Navbar/Footer:", showNavbarFooter);


  return (
    <>
      {showNavbarFooter && <Navbar /> }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register1" element={<Register1 />} />
        <Route path="/Register2" element={<Register2 />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route
          path="/reset_password/:user_id/:token"
          element={<ResetPassword />}
        />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/MedicalHistory" element={<MedicalHistory />} />
        <Route path="/Vaccinations" element={<Vaccinations />} />
        <Route path="/FamilyRegistry" element={<FamilyRegistry />} />
        <Route path="/CompleteExamination" element={<CompleteExamination />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ChatBot" element={<ChatBott />} />
        <Route path="*" element={<h1>page not found </h1>} />
      </Routes>
      {showNavbarFooter && <Footer /> }
    </>
  );
}

export default App;
