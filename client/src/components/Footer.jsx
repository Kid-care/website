import React from "react";
import instagram from "../assets/instagram.svg";
import facebook from "../assets/facebook.svg";
import email from "../assets/email.svg";
import Logo from "../assets/LOGO.svg";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="w-full z-50 relative" dir="rtl">
        <div className="bg-[#ffff] flex flex-col md:flex-row justify-around items-center border-2 sm:p-8 border-[#00000059] p-3 space-y-4 md:space-y-0">
          <div className="flex items-center gap-x-8 md:mr-20">
            <NavLink to="/instagram" target="_blank">
              <img src={instagram} alt="instagram" />
            </NavLink>
            <NavLink to="/facebook" target="_blank">
              <img src={facebook} alt="facebook" />
            </NavLink>
            <NavLink to="/email" target="_blank">
              <img src={email} alt="email" />
            </NavLink>
          </div>
          <div>
            <img src={Logo} alt="Logo" />
          </div>
          <div>
            <NavLink
              to="/AboutUs"
              className="text-[#196B69] text-[18px] leading-[20px] tracking-[0.25px] font-[Roboto] font-semibold">
              <p>معلومات عنا</p>
            </NavLink>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
