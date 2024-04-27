import React from 'react'
import addUser from "../assets/Vector (3).svg";
const AddUser = () => {
  return (
    <>
      <div className="flex gap-4 w-[178.88px] items-center ">
        <div className="rounded-full  w-[37.25px] h-[40.16px] bg-[#B4B4B4] flex items-center justify-center cursor-pointer">
          <img src={addUser} alt="user" className="w-[22.35px] h-[24.09px]  " />
        </div>
        <h3
          dir="rtl"
          className="cursor-pointer text-[#000000CC] text-[16px] leading-[20px] tracking-[0.25px]">
          alaa shokry
        </h3>
      </div>
    </>
  );
}

export default AddUser;
