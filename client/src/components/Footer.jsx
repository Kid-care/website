// Footer.jsx
import React from "react";
import instagram from "../assets/instagram.svg";
import facebook from "../assets/facebook.svg";
import email from "../assets/email.svg";
import Logo from "../assets/LOGO.svg";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className=" w-full relative  " dir="rtl">
        <div className="bg-[#ffff] flex justify-around items-center z-999 border-t-2 border-t-[#00000059] p-3  ">
          <div className="flex items-center gap-x-8 mr-20">
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
              className="text-[#196B69] text-[18px] leading-[20px] tracking-[0.25px] font-[Roboto] font-semibold	">
              <p> معلومات عنا</p>
            </NavLink>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;