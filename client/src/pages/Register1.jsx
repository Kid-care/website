import DoctorAmico from "../assets/Doctor-amico 2.svg";
import Logo from "../assets/LOGO.svg";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import { registerAsync } from "../store/slices/userSlice.js";
import { useDispatch } from "react-redux";

const Register1 = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    fatherName: "",
    motherName: "",
  });

  const handleNext = () => {
    navigate("/register2");
  };

  const handleRegister = () => {
    dispatch(registerAsync(userData));
  };

  return (
    <>
      <section className="grid grid-flow-row grid-cols-2  ">
        <div className="bg-[#28CC9E4D] min-h-screen">
          <img src={DoctorAmico} alt="Register" className="m-28" />
        </div>

        <div className="flex flex-nowrap flex-col flex-1 ">
          <img src={Logo} alt="Logo" className="ml-[700px] mt-2 w-28 " />

          {/* form */}

          <form className="  w-[400px]  ml-[200px] mt-14 ">
            <h1
              className="  font-bold text-2xl mb-7 text-[#132F2B] tracking-wide"
              dir="rtl">
             أنشاء حساب 
            </h1>
            <div className="mb-8">
              <input
                type="text"
                name="userName"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
                className="shadow border-[#28CC9E] border  w-full  px-6  leading-tight focus:outline-none focus:shadow-outline h-[55px] rounded-xl  placeholder-[#132F2BCC] tracking-wide text-lg"
                placeholder="اسم المستخدم"
                dir="rtl"
              />
            </div>

            <div className="mb-8">
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="shadow border-[#28CC9E] border  w-full px-6  text-black leading-tight focus:outline-none focus:shadow-outline h-[55px] rounded-xl placeholder-[#132F2BCC] tracking-wide text-lg"
                placeholder="البريد الالكتروني"
                dir="rtl"
              />
            </div>

            <div className="mb-8">
              <input
                type="text"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={(e) =>
                  setUserData({ ...userData, phoneNumber: e.target.value })
                }
                className="shadow border-[#28CC9E] border  w-full  px-6  text-black leading-tight focus:outline-none focus:shadow-outline h-[55px] rounded-xl placeholder-[#132F2BCC] tracking-wide text-lg"
                placeholder="رقم الهاتف"
                dir="rtl"
              />
            </div>
            <div className="mb-8">
              <input
                type="text"
                name="fatherName"
                value={userData.fatherName}
                onChange={(e) =>
                  setUserData({ ...userData, fatherName: e.target.value })
                }
                className="shadow border-[#28CC9E] border  w-full  px-6  text-black leading-tight focus:outline-none focus:shadow-outline h-[55px] rounded-xl placeholder-[#132F2BCC] tracking-wide text-lg"
                placeholder="اسم الاب"
                dir="rtl"
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="motherName"
                value={userData.motherName}
                onChange={(e) =>
                  setUserData({ ...userData, motherName: e.target.value })
                }
                className="shadow border-[#28CC9E] border  w-full px-6 text-black leading-tight focus:outline-none focus:shadow-outline h-[55px] rounded-xl placeholder-[#132F2BCC] tracking-wide text-lg"
                placeholder="اسم الام"
                dir="rtl"
              />
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
              onClick={handleNext}>
              التالي
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register1;
