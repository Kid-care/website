import { NavLink, useLocation } from "react-router-dom";
import profileIcon from "../assets/iconamoon_profile.svg";
import logo from "../assets/LOGO.svg";
import Modal from "../components/Modal.jsx";
import Logout from "../assets/logout.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { logout } from "../store/slices/authSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };
  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const confirmLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

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
      className={`w-full z-50 fixed top-0 z-50  ${
        isHomePage || isProfilePage
          ? "bg-transparent"
          : "bg-gradient-to-r  from-[#28CC2F2E] to-[#28CC9E4D] rounded-b-[35px]  "
      } `}>
      <div className="flex items-center justify-around px-4 ">
        <div>
          <NavLink to="/" dir="rtl">
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
            to="/vaccines"
            dir="rtl"
            className="text-[#000000CC] text-[18px] leading-[20px] tracking-[0.25px] font-[Roboto] font-light">
            <p className="hover:text-[#28CC9E] "> التطعيمات</p>
          </NavLink>
          <NavLink
            style={navLinkStyles}
            to="/family-record"
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
        <div>
          <img
            src={Logout}
            alt="logout"
            className="ml-7 cursor-pointer "
            onClick={openLogoutModal}
          />
        </div>
        {showLogoutModal && (
          <Modal closeModal={closeLogoutModal} width="500px" height="250px">
            <div dir="rtl" className="p-10">
              <h2
                dir="rtl"
                className="text-[22px] font-semibold leading-[26.63px] text-[#000000] flex justify-center">
                هل تريد تاكيد تسجيل الخروج ؟
              </h2>

              <div className="flex gap-10 my-12 ">
                <button
                  onClick={confirmLogout}
                  className="bg-[#28CC9E] text-white text-[22px] text-center rounded-[20px] w-[200px] h-[60px]">
                  تأكيد
                </button>
                <button
                  onClick={closeLogoutModal}
                  className="bg-gray-400 text-white text-[22px] text-center rounded-[20px] w-[200px] h-[60px]">
                  إلغاء
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
