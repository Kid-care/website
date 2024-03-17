import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerAsync } from "../store/slices/authSlice";
import { toast } from "react-toastify";
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
import colorfulAblus from "../assets/colorfulA+.svg";
import colorfulAminus from "../assets/colorfulA-.svg";
import colorfulABblus from "../assets/colorfulAB+.svg";
import colorfulABminus from "../assets/colorfulAB-.svg";
import colorfulOblus from "../assets/colorfulO+.svg";
import colorfulOminus from "../assets/colorfulO-.svg";
import colorfulBblus from "../assets/colorfulB+.svg";
import colorfulBminus from "../assets/colorfulB-.svg";

const Register2 = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [inputFocus, setInputFocus] = useState({});
  const [userData, setUserData] = useState({
    email: "",
    userName: "",
    password: "",
    fatherName: "",
    motherName: "",
    phoneNumber: "",
    NationalID: "",
    day: "",
    month: "",
    year: "",
    bloodType: "",
    ...location.state,
  });

  useEffect(() => {
    if (!location.state) {
      // If no user data is received from Register1, redirect back
      navigate("/Register1");
    }
  }, [location.state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = (name) => {
    setInputFocus({ ...inputFocus, [name]: true });
  };

  const handleBlur = (name) => {
    setInputFocus({ ...inputFocus, [name]: false });
  };

  const handleBloodTypeClick = (bloodType) => {
    setUserData((prevUserData) => ({ ...prevUserData, bloodType }));
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};
    if (!userData.day || !userData.month || !userData.year) {
      errors.birthday = "يرجى إدخال تاريخ ميلادك الكامل";
      isValid = false;
    } else {
      const day = parseInt(userData.day);
      const month = parseInt(userData.month);
      const year = parseInt(userData.year);

      if (
        isNaN(day) ||
        day < 1 ||
        day > 31 ||
        isNaN(month) ||
        month < 1 ||
        month > 12 ||
        isNaN(year) ||
        year < 1900 ||
        year > new Date().getFullYear()
      ) {
        errors.birthday = "يرجى إدخال تاريخ ميلاد صحيح";
        isValid = false;
      }
    }
    if (
      userData.NationalID.length !== 14 ||
      userData.NationalID.trim() === ""
    ) {
      errors.NationalID = "يجب أن يحتوي الرقم الوطني على 14 رقمًا";
      isValid = false;
    }
    if (userData.password.length < 6 || userData.password.trim() === "") {
      errors.password = "يجب أن يتجاوز 6 حروف";
      isValid = false;
    }
    if (!userData.bloodType) {
      errors.bloodType = "يرجى اختيار فصيلة الدم";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const { day, month, year, ...rest } = userData;
    const birthDate = `${userData.day}/${userData.month}/${userData.year}`;
    try {
      const response = await dispatch(registerAsync({ ...rest, birthDate }));
      if (response.payload && response.payload.status === false) {
        toast.error(response.payload.message || "هذا المستخدم مسجل بالفعل");
      } else {
        localStorage.setItem("token", response.payload.token);
        navigate("/login");
      }
    } catch (error) {
      console.error("فشل التسجيل:", error.message);
      toast.error(error.message || "حدث خطأ أثناء تسجيل الدخول");
    }
  };

  return (
    <>
      <section className="grid grid-cols-2">
        <div className="bg-[#28CC9E4D] h-screen">
          <img src={Register2Img} alt="Register2Img" className="my-48 mx-10" />
        </div>

        <div className="flex flex-col">
          <img src={Logo} alt="Logo" className="ml-auto mt-2 w-28" />

          <form className="w-[400px] ml- mt-14" method="POST">
            <h1
              className="font-bold text-2xl mb-5 text-[#132F2B] tracking-wide"
              dir="rtl">
              إنشاء حساب
            </h1>
            <div>
              <p
                dir="rtl"
                className="text-xl mb-7 text-[#132F2B] tracking-wide">
                تاريخ الميلاد
              </p>
              {formErrors.birthday && (
                <span className="text-[#CC2828]">{formErrors.birthday}</span>
              )}

              <div className="flex items-center space-x-7 mb-5">
                <div>
                  <input
                    type="text"
                    name="day"
                    value={userData.day}
                    className="shadow border-[#28CC9E] border w-[114.29px] px-6 leading-tight focus:outline-none focus:shadow-outline h-[55px] rounded-xl placeholder-[#132F2BCC] tracking-wide text-lg"
                    placeholder="اليوم"
                    dir="rtl"
                    onChange={handleChange}
                    onKeyUp={validateForm}
                  />
                  <label
                    htmlFor="day"
                    className="absolute right-1 text-[#132F2BCC] bg-slate-50 m-2 transition-all duration-200 px-2">
                    اليوم
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={userData.month}
                    name="month"
                    className="shadow border-[#28CC9E] border w-[114.29px] px-6 leading-tight focus:outline-none focus:shadow-outline h-[55px] rounded-xl placeholder-[#132F2BCC] tracking-wide text-lg"
                    placeholder="الشهر"
                    dir="rtl"
                    onChange={handleChange}
                    onKeyUp={validateForm}
                  />
                  <label
                    htmlFor="month"
                    className="absolute right-1 text-[#132F2BCC] bg-slate-50 m-2 transition-all duration-200 px-2">
                    الشهر
                  </label>
                </div>

                <div>
                  <input
                    type="text"
                    value={userData.year}
                    name="year"
                    className="shadow border-[#28CC9E] border w-[114.29px] px-6 leading-tight focus:outline-none focus:shadow-outline h-[55px] rounded-xl placeholder-[#132F2BCC] tracking-wide text-lg"
                    placeholder="السنة"
                    dir="rtl"
                    onChange={handleChange}
                    onKeyUp={validateForm}
                  />
                  <label
                    htmlFor="year"
                    className="absolute right-1 text-[#132F2BCC] bg-slate-50 m-2 transition-all duration-200 px-2">
                    السنة
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-5">
              {formErrors.NationalID && (
                <span dir="rtl" className="text-[#CC2828]">
                  {formErrors.NationalID}
                </span>
              )}
              <div>
                <input
                  value={userData.NationalID}
                  type="text"
                  name="NationalID"
                  className="shadow border-[#28CC9E] border w-full px-6 text-black leading-tight focus:outline-none focus:shadow-outline h-[55px] rounded-xl placeholder-[#132F2BCC] tracking-wide text-lg"
                  dir="rtl"
                  onChange={handleChange}
                  onKeyUp={validateForm}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                />
                <label
                  htmlFor="NationalID"
                  className="absolute right-1 text-[#132F2BCC] bg-slate-50 m-2 transition-all duration-200 px-2">
                  الرقم القومي
                </label>
              </div>
            </div>

            <div className="mb-8">
              {formErrors.password && (
                <span className="text-[#CC2828]">{formErrors.password}</span>
              )}
              <input
                type="text"
                value={userData.password}
                name="password"
                dir="rtl"
                onChange={handleChange}
                onKeyUp={validateForm}
                className={`items-center border ${
                  formErrors.email ? "border-[#CC2828]" : "border-[#28CC9E]"
                } focus:border-[#28CC9E] w-full px-3 border-[#28CC9E] text-[#00000] leading-tight focus:outline-none focus:shadow-outline h-[55px] rounded-xl tracking-wide text-lg`}
              />
              <label
                htmlFor="password"
                className="absolute right-1 text-[#132F2BCC] bg-slate-50 m-2 transition-all duration-200 px-2">
                الرقم السري
              </label>
            </div>
            <div>
              <p
                dir="rtl"
                className="text-[#000000] leading-tight tracking-wide text-lg">
                فصيلة الدم
              </p>
              {formErrors.bloodType && (
                <span dir="rtl" className="text-[#CC2828]">
                  {formErrors.bloodType}
                </span>
              )}
              <div className="flex flex-col ml-20 my-7">
                <div className="flex flex-row">
                  <img
                    src={userData.bloodType === "O+" ? colorfulOblus : Oblus}
                    alt="O+"
                    name="O+"
                    className="cursor-pointer"
                    onClick={() => handleBloodTypeClick("O+")}
                  />

                  <img
                    src={userData.bloodType === "O-" ? colorfulOminus : Ominus}
                    alt="O-"
                    name="O-"
                    className="cursor-pointer"
                    onClick={() => handleBloodTypeClick("O-")}
                  />
                  <img
                    src={userData.bloodType === "A+" ? colorfulAblus : Ablus}
                    alt="A+"
                    name="A+"
                    className="cursor-pointer"
                    onClick={() => handleBloodTypeClick("A+")}
                  />
                  <img
                    src={userData.bloodType === "A-" ? colorfulAminus : Aminus}
                    alt="A-"
                    name="A-"
                    className="cursor-pointer"
                    onClick={() => handleBloodTypeClick("A-")}
                  />
                </div>
                <div className="flex flex-row">
                  <img
                    src={userData.bloodType === "B+" ? colorfulBblus : Bblus}
                    alt="B+"
                    name="B+"
                    className="cursor-pointer"
                    onClick={() => handleBloodTypeClick("B+")}
                  />

                  <img
                    src={userData.bloodType === "B-" ? colorfulBminus : Bminus}
                    alt="B-"
                    name="B-"
                    className="cursor-pointer"
                    onClick={() => handleBloodTypeClick("B-")}
                  />
                  <img
                    src={userData.bloodType === "AB+" ? colorfulABblus : ABblus}
                    alt="AB+"
                    name="AB+"
                    className="cursor-pointer"
                    onClick={() => handleBloodTypeClick("AB+")}
                  />
                  <img
                    src={
                      userData.bloodType === "AB-" ? colorfulABminus : ABminus
                    }
                    alt="AB-"
                    name="AB-"
                    className="cursor-pointer"
                    onClick={() => handleBloodTypeClick("AB-")}
                  />
                </div>
              </div>
            </div>

            <div dir="rtl" className="flex flex-row items-center mb-6 ">
              <p className="text-[#132F2BCC] tracking-wide text-lg ml-2">
                لديك حساب؟
              </p>
              <Link
                className="inline-block align-baseline text-[#132F2B] tracking-wide text-lg"
                to="/Login">
                تسجيل الدخول
              </Link>
            </div>

            <button
              className="bg-[#28CC9E] focus:outline-none focus:shadow-outline h-[60px] w-full rounded-2xl text-[#132F2B] tracking-wider text-xl"
              type="button"
              dir="rtl"
              onClick={handleRegister}>
              إنشاء حساب
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register2;
