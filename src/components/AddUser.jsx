// AddUser.js
import React from "react";
import addUserIcon from "../assets/addUser.svg";

const AddUser = ({ account }) => {
  return (
    <div className="flex items-center gap-4 cursor-pointer">
      <div className="rounded-full w-[37.25px] h-[40.16px] bg-[#B4B4B4] flex items-center justify-center">
        <img src={addUserIcon} alt="user" className="w-[22.35px] h-[24.09px]" />
      </div>
      <h3 className="text-[#000000CC] text-[16px] leading-[20px] tracking-[0.25px]">
        {account.email}
      </h3>
    </div>
  );
};

export default AddUser;
