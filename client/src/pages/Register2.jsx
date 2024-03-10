import Register2Img from "../assets/Blood donation-amico 2.svg";
import Logo from "../assets/LOGO.svg";
import Oblus from "../assets/O+.svg";
import Ominus from "../assets/O-.svg";
import Ablus from "../assets/A+.svg";
import Aminus from "../assets/A-.svg";
import Bblus from "../assets/B+.svg";
import Bminus from "../assets/B-.svg";
import ABblus from "../assets/AB+.svg";
import ABminus from "../assets/AB-.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerAsync } from "../store/slices/authSlice";


const Register2 = () => {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    day: "",
    month: "",
    year: "",
    nationalID: "",
    password: "",
  });

 

  const handleRegister = () => {
    const birthDate = userData.day + "/" + userData.month + "/" + userData.year;
    dispatch(
      registerAsync(
        [userData.nationalID, userData.password, userData.birthDate]
      )
    );
    navigate("/");
  };

  return (
    <>
      <section className="grid grid-flow-row grid-cols-2  ">
        <div className="bg-[#28CC9E4D] h-screen">
          <img src={Register2Img} alt="Register2Img" className="m-44" />
        </div>

        <div className="flex flex-nowrap flex-col flex-1 ">
          <img src={Logo} alt="Logo" className="ml-[700px] mt-2 w-28 " />

          {/* form */}

          <form
            className="  w-[400px]  ml-[200px] mt-14 "
            onSubmit={handleRegister}
            method="POST">
            <h1
              className="  font-bold text-2xl mb-5 text-[#132F2B] tracking-wide"
              dir="rtl">
              إنشاء حساب
            </h1>
            <div>
              <p
                dir="rtl"
                className=" text-xl mb-7 text-[#132F2B] tracking-wide">
                تاريخ الميلاد
              </p>

              <div className="flex flex-row-reverse space-x-7 space-x-reverse mb-5 ">
                <div>
                  <input
                    type="text"
                    name="day"
                    value={userData.day}
                    className="shadow border-[#28CC9E] border  w-[114.29px]  px-6  leading-tight focus:outline-none focus:shadow-outline h-[55px] rounded-xl  placeholder-[#132F2BCC] tracking-wide text-lg"
                    placeholder="اليوم"
                    dir="rtl"
                    onChange={(e) =>
                      setUserData({ ...userData, day: e.target.value })
                    }
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={userData.month}
                    name="month"
                    className="shadow border-[#28CC9E] border w-[114.29px]  px-6  leading-tight focus:outline-none focus:shadow-outline h-[55px] rounded-xl  placeholder-[#132F2BCC] tracking-wide text-lg"
                    placeholder="الشهر"
                    dir="rtl"
                    onChange={(e) =>
                      setUserData({ ...userData, month: e.target.value })
                    }
                  />
                </div>

                <div>
                  <input
                    type="text"
                    value={userData.year}
                    name="year"
                    className="shadow border-[#28CC9E] border  w-[114.29px] px-6  leading-tight focus:outline-none focus:shadow-outline h-[55px] rounded-xl  placeholder-[#132F2BCC] tracking-wide text-lg"
                    placeholder="السنة"
                    dir="rtl"
                    onChange={(e) =>
                      setUserData({ ...userData, year: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <input
                value={userData.NationalID}
                type="text"
                name="NationalID"
                className="shadow border-[#28CC9E] border  w-full px-6  text-black leading-tight focus:outline-none focus:shadow-outline h-[55px] rounded-xl placeholder-[#132F2BCC] tracking-wide text-lg "
                placeholder="الرقم القومي"
                dir="rtl"
                onChange={(e) =>
                  setUserData({ ...userData, nationalID: e.target.value })
                }
              />
            </div>

            <div className="mb-8">
              <input
                type="text"
                value={userData.password}
                name="password"
                className="shadow border-[#28CC9E] border  w-full  px-6  text-black leading-tight focus:outline-none focus:shadow-outline h-[55px] rounded-xl placeholder-[#132F2BCC] tracking-wide text-lg"
                placeholder="الرقم السري"
                dir="rtl"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </div>
            <div>
              <p
                dir="rtl"
                className="text-[#000000] leading-tight tracking-wide text-lg">
                فصيلة الدم
              </p>
              <div className="flex flex-col ml-20 my-7">
                <div className="flex flex-row">
                  <img
                    src={Oblus}
                    alt="O+"
                    className="cursor-pointer"
                    name="Oblus"
                  />

                  <img
                    src={Ominus}
                    alt="O-"
                    className="cursor-pointer"
                    name="Ominus"
                  />
                  <img
                    src={Ablus}
                    alt="A+"
                    className="cursor-pointer"
                    name="Ablus"
                  />
                  <img
                    src={Aminus}
                    alt="A-"
                    className="cursor-pointer"
                    name="Aminus"
                  />
                </div>
                <div className="flex flex-row">
                  <img
                    src={Bblus}
                    alt="B+"
                    className="text-[#EA2B2B] cursor-pointer"
                    name="Bblus"
                  />

                  <img
                    src={Bminus}
                    alt="B-"
                    className="cursor-pointer"
                    name="Bminus"
                  />
                  <img
                    src={ABblus}
                    alt="AB+"
                    className="cursor-pointer"
                    name="ABblus"
                  />
                  <img
                    src={ABminus}
                    alt="AB-"
                    className="cursor-pointer"
                    name="ABminus"
                  />
                </div>
              </div>
            </div>

            <div dir="rtl" className="flex flex-row items-center mb-6 ">
              <p className="text-[#132F2BCC] tracking-wide text-lg ml-2">
                لديك حساب؟
              </p>
              <Link
                className="inline-block align-baseline   text-[#132F2B] tracking-wide text-lg"
                to="/Login">
                تسجيل الدخول
              </Link>
            </div>

            <button
              className="bg-[#28CC9E] focus:outline-none focus:shadow-outline h-[60px] w-full rounded-2xl text-[#132F2B] tracking-wider text-xl "
              type="button"
              dir="rtl"
           
              onClick={handleRegister}
            >
              إنشاء حساب
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
export default Register2;
