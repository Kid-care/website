import React from "react";
import { NavLink } from "react-router-dom";
import LinkedIn from "../assets/LinkedIn.svg";
import githup from "../assets/Githup.svg";
import gmail from "../assets/Gmail.svg";

const WorkTeam = ({ name, image, linkedIn, email, github }) => {
  return (
    <>
      <div className="flex flex-col items-center space-y-4">
        <img src={image} alt="{name}" />
        <p
          dir="rtl"
          className="font-[Roboto] font-normal leading-[20px] tracking-[0.25px] text-[#000000] text-[22px]">
          {name}
        </p>
        <div>
          <div className="flex items-center gap-5 w-[170px] h-[50px] ">
            <NavLink to={linkedIn} target="_blank" rel="noopener noreferrer">
              <img
                src={LinkedIn}
                alt="linkedIn"
                className="w-[38.89px] h-[31.11px]"
              />
            </NavLink>
            <NavLink
              to={`mailto:${email}`}
              target="_blank"
              rel="noopener noreferrer">
              <img
                src={gmail}
                alt="email"
                className="w-[38.89px] h-[31.11px]"
              />
            </NavLink>
            <NavLink to={github} target="_blank" rel="noopener noreferrer">
              <img
                src={githup}
                alt="githup"
                className="w-[38.89px] h-[31.11px]"
              />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkTeam;
