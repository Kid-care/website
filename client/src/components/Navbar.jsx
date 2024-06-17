import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import profileIcon from "../assets/iconamoon_profile.svg";
import logo from "../assets/LOGO.svg";

const Navbar = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "#28CC9E" : "#000000CC",
      transition: "color 0.3s ease",
    };
  };

  const location = useLocation();

  const isProfilePage = location.pathname === "/Profile";
  const isHomePage = location.pathname === "/";
  

  return (
    <nav
      className={`w-full fixed top-0 z-50  ${
        isHomePage || isProfilePage
          ? "bg-transparent"
          : "bg-gradient-to-r  from-[#28CC2F2E] to-[#28CC9E4D] rounded-b-[35px]  "
      } `}>
      <div className="flex items-center justify-around px-4 ">
        <div>
          <NavLink  to="/" dir="rtl">
            <img src={logo} alt="Logo" />
          </NavLink>
        </div>
        <div className="flex items-center space-x-20 ">
          <NavLink
            style={navLinkStyles}
            to="/"
            dir="rtl"
            className="text-[#000000CC] text-[18px] leading-[20px] tracking-[0.25px] font-[Roboto] font-light	   ">
            <p className="hover:text-[#28CC9E]"> الصفحة الرئيسية</p>
          </NavLink>
          <NavLink
            style={navLinkStyles}
            to="/Vaccinations"
            dir="rtl"
            className="text-[#000000CC] text-[18px] leading-[20px] tracking-[0.25px] font-[Roboto] font-light">
            <p className="hover:text-[#28CC9E] "> التطعيمات</p>
          </NavLink>
          <NavLink
            style={navLinkStyles}
            to="/FamilyRegistry"
            dir="rtl"
            className="text-[#000000CC] text-[18px] leading-[20px] tracking-[0.25px] font-[Roboto] font-light">
            <p className="hover:text-[#28CC9E]"> السجل العائلي</p>
          </NavLink>
          <NavLink
            style={navLinkStyles}
            to="/CompleteExamination"
            dir="rtl"
            className="text-[#000000CC] text-[18px] leading-[20px] tracking-[0.25px] font-[Roboto] font-light">
            <p className="hover:text-[#28CC9E]"> الفحص الكامل</p>
          </NavLink>
          <NavLink
            style={navLinkStyles}
            to="/MedicalHistory"
            dir="rtl"
            className="text-[#000000CC] text-[18px] leading-[20px] tracking-[0.25px] font-[Roboto] font-light">
            <p className="hover:text-[#28CC9E]"> التاريخ المرضي</p>
          </NavLink>
        </div>
        {isProfilePage ? (
          <div style={{ width: "24px", height: "24px" }}></div>
        ) : (
          <div>
            <NavLink style={navLinkStyles} to="/Profile" dir="rtl">
              <img src={profileIcon} alt="profileIcon" dir="rtl" />
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;