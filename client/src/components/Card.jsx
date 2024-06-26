import React from "react";
import { Link } from "react-router-dom";
const Card = ({ title, description, imageSrc1, imageSrc2, linkTo }) => {
  return (
    <>
      <div className="w-[660px] h-[342.17px] bg-[#ffff] drop-shadow-2xl flex items-center justify-center gap-10">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col gap-10">
            <h2 className="font-[Inter] font-semibold text-center text-[22px] leading-[26.63px] text-[#2BB785]">
              {title}
            </h2>
            <p className="text-[#000000CC] font-[Inter] w-[264px] font-normal text-center text-[20px] leading-[24.2px]">
              {description}
            </p>
          </div>
          <div>
            <Link to={linkTo}>
              <img
                src={imageSrc1}
                alt="img-arrrraw"
                className="w-[44.25px] h-[45.24px]"
              />
            </Link>
          </div>
        </div>
        <div>
          <img src={imageSrc2} alt={title} className="w-[290px] h-[356.7px]" />
        </div>
      </div>
    </>
  );
};

export default Card;
