import React from "react";
import instagram from "../assets/instagram.svg";
import facebook from "../assets/facebook.svg";
import email from "../assets/email.svg";
import Logo from "../assets/LOGO.svg";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full">
      <div
        dir="rtl"
        className="flex justify-around items-center border-2 border-[#00000059] p-6">
        <div dir="rtl" className="flex items-center gap-x-8">
          <NavLink to="/instagram" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="instagram" />
          </NavLink>
          <NavLink to="/facebook" target="_blank" rel="noopener noreferrer">
            <img src={facebook} alt="facebook" />
          </NavLink>
          <NavLink to="/email" target="_blank" rel="noopener noreferrer">
            <img src={email} alt="email" />
          </NavLink>
        </div>
        <div dir="rtl">
          <img src={Logo} alt="Logo" />
        </div>
        <div dir="rtl">
          <NavLink
            to="/AboutUs"
            className="text-[#196B69] text-[18px] leading-[20px] tracking-[0.25px]">
            <p> معلومات عنا</p>
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
