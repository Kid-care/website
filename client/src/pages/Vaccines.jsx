import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import previous from "../assets/Vector.png";
import pregnant from "../assets/pregnant.png";
import children from "../assets/children.png";
import corona from "../assets/corona.png";
import travel from "../assets/travel.png";
import chatbot from "../assets/ChatBot.svg";

const Vaccines = () => {
  return (
    <>
      <Navbar />
      <section className="mt-[120px] container mx-auto py-6 px-4">
        <Link to="/previous-vaccinations" className="flex flex-row-reverse w-fit gap-2 items-center text-lg relative text-[#000000CC] mb-4 outline-none">
          التطعيمات السابقة <img src={previous} alt="" />
          <div className="absolute h-[2px] w-full bg-[#000000CC] bottom-0" />
        </Link>
        <div className="flex justify-center items-center gap-12 mb-12">
          <div className="relative">
            <img src={pregnant} alt="" />
            <div className="absolute bottom-0 w-full right-0 px-6 py-12 text-xl font-semibold flex flex-row-reverse items-center justify-between">
              <span>الحوامل</span>
              <div className="bg-white size-[45px] flex items-center justify-center rounded-full text-3xl">
                <Link to="/pregnant-vaccinations">
                  <i className="fa-solid fa-arrow-left"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src={children} alt="" />
            <div className="absolute bottom-0 w-full right-0 px-6 py-12 text-xl font-semibold flex flex-row-reverse items-center justify-between">
              <span>الاطفال</span>
              <div className="bg-white size-[45px] flex items-center justify-center rounded-full text-3xl">
                <Link to="/baby-vaccinations">
                  <i className="fa-solid fa-arrow-left"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-12">
          <div className="relative">
            <img src={corona} alt="" />
            <div className="absolute bottom-0 w-full right-0 px-6 py-12 text-xl font-semibold flex flex-row-reverse items-center justify-between">
              <span>الاوبئة</span>
              <div className="bg-white size-[45px] flex items-center justify-center rounded-full text-3xl">
                <Link to="/epidemic-vaccinations">
                  <i className="fa-solid fa-arrow-left"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src={travel} alt="" />
            <div className="absolute bottom-0 w-full right-0 px-6 py-12 text-xl font-semibold flex flex-row-reverse items-center justify-between">
              <span>السفر</span>
              <div className="bg-white size-[45px] flex items-center justify-center rounded-full text-3xl">
                <Link to="/travel-vaccinations">
                  <i className="fa-solid fa-arrow-left"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="fixed bottom-[100px] left-[100px] z-50 py-3  bg-[#196B69] w-[82px] h-[82px] flex items-center justify-center rounded-full">
        <Link to="/ChatBot">
          <img src={chatbot} className="  " alt="chatbot" />
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Vaccines;
