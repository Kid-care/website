import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerAsync } from "../store/slices/authSlice";
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
import openEye from "../assets/openEye.svg";
import closeEye from "../assets/closeEye.svg";
import Modal from "../components/Modal.jsx";
import imageUrl from "../assets/errors.svg";

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

  const [modalContent, setModalContent] = useState("");
  const [showModal, setShowModal] = useState(false);

  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [inputTouched, setInputTouched] = useState({
    NationalID: false,
    bloodType: false,
    password: false,
    day: false,
    month: false,
    year: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setInputTouched({ ...inputTouched, [name]: true });
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
      errors.NationalID = "يجب أن يحتوي الرقم القومي على 14 رقمًا";
      isValid = false;
    }
    if (userData.password.length < 6 || userData.password.trim() === "") {
      errors.password = "يجب أن يتجاوز 6 ارقام";
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
    setInputTouched({
      NationalID: false,
      bloodType: false,
      password: false,
      day: false,
      month: false,
      year: false,
    });
    if (!validateForm()) return;
    const { day, month, year, ...rest } = userData;
    const birthDate = `${userData.day}/${userData.month}/${userData.year}`;
    try {
      const response = await dispatch(registerAsync({ ...rest, birthDate }));

      if (response.payload && response.payload.status === true) {
        localStorage.setItem("token", response.payload.token);
        navigate("/Login");
      } else if (response.payload && response.payload.status === false) {
        openModal(response.payload.message || "فشل تسجيل الدخول");
      } else if (
        response.error &&
        response.error.response &&
        response.error.response.data &&
        response.error.response.data.errors
      ) {
        const errorMessages = response.error.response.data.errors;
        openModal(errorMessages.join("\n"));
      } else {
        console.log(response);
        openModal(response.payload.message || "حدث خطأ أثناء إنشاء الحساب");
      }
    } catch (error) {
      openModal(error.message || "حدث خطأ أثناء إنشاء الحساب");
    }
  };

  return (
    <>
      <section className="grid grid-cols-2 grid-flow-row">
        <div className="bg-[#28CC9E4D] h-screen flex justify-center items-center">
          <img src={Register2Img} alt="Register2Img" className="max-w-full" />
        </div>

        <div className="flex flex-nowrap flex-col flex-1 relative">
          <img
            src={Logo}
            alt="Logo"
            className="right-[60px] mt-2 w-24 absolute"
          />
          <div className=" flex flex-col justify-center items-center h-full mt-8">
            <form
              className="absolute w-[400px] mt-5 mr-9 flex flex-col gap-y-2 "
              method="POST">
              <h1
                className="font-bold text-2xl mb-1 text-[#132F2B] tracking-wide"
                dir="rtl">
                إنشاء حساب
              </h1>
              <div className="py-1">
                <p dir="rtl" className="text-xl  text-[#132F2B] tracking-wide">
                  تاريخ الميلاد
                </p>
                <div className="py-4">
                  {(inputTouched["day"] ||
                    inputTouched["month"] ||
                    inputTouched["year"]) &&
                    formErrors.birthday && (
                      <span className="text-[#CC2828] text-[15px] ">
                        {formErrors.birthday}
                      </span>
                    )}
                </div>

                <div className="flex items-center gap-x-3  flex-row-reverse">
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={inputFocus["day"] ? "" : "اليوم"}
                        name="day"
                        value={userData.day}
                        dir="rtl"
                        onChange={handleChange}
                        onKeyUp={validateForm}
                        className={`cursor-pointer items-center border px-6  placeholder-[#132F2BCC]   ${
                          inputTouched["day"] && formErrors.day
                            ? "border-[#CC2828]"
                            : "border-[#28CC9E]"
                        } focus:border-[#28CC9E] w-full px-6 border-[#28CC9E] text-[#00000] leading-tight focus:outline-none focus:shadow-outline h-[55px]  rounded-xl tracking-wide text-lg`}
                        onFocus={() => handleFocus("day")}
                        onBlur={() => handleBlur("day")}
                      />
                      {(inputFocus["day"] || userData.day) && (
                        <label
                          dir="rtl"
                          htmlFor="day"
                          className={`absolute right-5 transform -translate-y-full text-[#132F2BCC] bg-slate-50 m-3 text-base transition-opacity duration-200`}>
                          اليوم
                        </label>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={inputFocus["month"] ? "" : "الشهر"}
                        name="month"
                        value={userData.month}
                        dir="rtl"
                        onChange={handleChange}
                        onKeyUp={validateForm}
                        className={`cursor-pointer items-center border px-6  placeholder-[#132F2BCC]   ${
                          inputTouched["month"] && formErrors.day
                            ? "border-[#CC2828]"
                            : "border-[#28CC9E]"
                        } focus:border-[#28CC9E] w-full px-6 border-[#28CC9E] text-[#00000] leading-tight focus:outline-none focus:shadow-outline h-[55px]  rounded-xl tracking-wide text-lg`}
                        onFocus={() => handleFocus("month")}
                        onBlur={() => handleBlur("month")}
                      />
                      {(inputFocus["month"] || userData.month) && (
                        <label
                          dir="rtl"
                          htmlFor="month"
                          className={`absolute right-5 transform -translate-y-full text-[#132F2BCC] bg-slate-50 m-3 text-base transition-opacity duration-200`}>
                          الشهر
                        </label>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={inputFocus["year"] ? "" : "الشهر"}
                        name="year"
                        value={userData.year}
                        dir="rtl"
                        onChange={handleChange}
                        onKeyUp={validateForm}
                        className={`cursor-pointer items-center border px-6  placeholder-[#132F2BCC]   ${
                          inputTouched["year"] && formErrors.year
                            ? "border-[#CC2828]"
                            : "border-[#28CC9E]"
                        } focus:border-[#28CC9E] w-full px-6 border-[#28CC9E] text-[#00000] leading-tight focus:outline-none focus:shadow-outline h-[55px]  rounded-xl tracking-wide text-lg`}
                        onFocus={() => handleFocus("year")}
                        onBlur={() => handleBlur("year")}
                      />
                      {(inputFocus["year"] || userData.year) && (
                        <label
                          dir="rtl"
                          htmlFor="year"
                          className={`absolute right-5 transform -translate-y-full text-[#132F2BCC] bg-slate-50 m-3 text-base transition-opacity duration-200`}>
                          السنه
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="">
                <div className="py-1">
                  {inputTouched["NationalID"] && formErrors.NationalID && (
                    <span className="text-[#CC2828] text-sm ">
                      {formErrors.NationalID}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={inputFocus["NationalID"] ? "" : "الرقم القومي"}
                    name="NationalID"
                    value={userData.NationalID}
                    dir="rtl"
                    onChange={handleChange}
                    onKeyUp={validateForm}
                    className={`cursor-pointer items-center border px-6  placeholder-[#132F2BCC]   ${
                      inputTouched["NationalID"] && formErrors.NationalID
                        ? "border-[#CC2828]"
                        : "border-[#28CC9E]"
                    } focus:border-[#28CC9E] w-full px-6 border-[#28CC9E] text-[#00000] leading-tight focus:outline-none focus:shadow-outline h-[55px]  rounded-xl tracking-wide text-lg`}
                    onFocus={() => handleFocus("NationalID")}
                    onBlur={() => handleBlur("NationalID")}
                  />
                  {(inputFocus["NationalID"] || userData.NationalID) && (
                    <label
                      dir="rtl"
                      htmlFor="NationalID"
                      className={`absolute right-1 transform -translate-y-full text-[#132F2BCC] bg-slate-50 m-3 text-base transition-opacity duration-200`}>
                      الرقم القومي
                    </label>
                  )}
                </div>
              </div>

              <div className="">
                <div className="py-1">
                  {inputTouched["password"] && formErrors.password && (
                    <span className="text-[#CC2828] text-sm ">
                      {formErrors.password}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <span
                    onClick={handleTogglePassword}
                    role="button"
                    tabIndex={0}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer"
                    aria-label={
                      showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
                    }>
                    {showPassword ? (
                      <img
                        src={openEye}
                        alt="show password"
                        width="25px"
                        height="25px"
                      />
                    ) : (
                      <img
                        src={closeEye}
                        alt="close password"
                        width="25px"
                        height="25px"
                      />
                    )}
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={inputFocus["password"] ? "" : "الرقم السري"}
                    name="password"
                    value={userData.password}
                    dir="rtl"
                    onChange={handleChange}
                    onKeyUp={validateForm}
                    className={`cursor-pointer items-center border px-6  placeholder-[#132F2BCC]   ${
                      inputTouched["password"] && formErrors.password
                        ? "border-[#CC2828]"
                        : "border-[#28CC9E]"
                    } focus:border-[#28CC9E] w-full px-6 border-[#28CC9E] text-[#00000] leading-tight focus:outline-none focus:shadow-outline h-[55px]  rounded-xl tracking-wide text-lg`}
                    onFocus={() => handleFocus("password")}
                    onBlur={() => handleBlur("password")}
                  />
                  {(inputFocus["password"] || userData.password) && (
                    <label
                      dir="rtl"
                      htmlFor="password"
                      className={`absolute right-1 transform -translate-y-full text-[#132F2BCC] bg-slate-50 m-3 text-base transition-opacity duration-200`}>
                      الرقم السري
                    </label>
                  )}
                </div>
              </div>
              <div className="flex flex-col ">
                <p
                  dir="rtl"
                  className="text-[#000000] leading-tight mt-[14px] tracking-wide text-xl">
                  فصيلة الدم
                </p>
                <div className="py-4">
                  {inputTouched["bloodType"] && formErrors.bloodType && (
                    <span className="text-[#CC2828] text-sm ">
                      {formErrors.bloodType}
                    </span>
                  )}
                </div>
                <div className="flex flex-col mx-14 my-3 space-y-3">
                  <div className="flex flex-row space-x-2">
                    <img
                      src={userData.bloodType === "O+" ? colorfulOblus : Oblus}
                      alt="O+"
                      name="O+"
                      className="cursor-pointer"
                      onClick={() => handleBloodTypeClick("O+")}
                    />

                    <img
                      src={
                        userData.bloodType === "O-" ? colorfulOminus : Ominus
                      }
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
                      src={
                        userData.bloodType === "A-" ? colorfulAminus : Aminus
                      }
                      alt="A-"
                      name="A-"
                      className="cursor-pointer"
                      onClick={() => handleBloodTypeClick("A-")}
                    />
                  </div>
                  <div className="flex flex-row space-x-2">
                    <img
                      src={userData.bloodType === "B+" ? colorfulBblus : Bblus}
                      alt="B+"
                      name="B+"
                      className="cursor-pointer"
                      onClick={() => handleBloodTypeClick("B+")}
                    />

                    <img
                      src={
                        userData.bloodType === "B-" ? colorfulBminus : Bminus
                      }
                      alt="B-"
                      name="B-"
                      className="cursor-pointer"
                      onClick={() => handleBloodTypeClick("B-")}
                    />
                    <img
                      src={
                        userData.bloodType === "AB+" ? colorfulABblus : ABblus
                      }
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
              <div className="flex flex-col ">
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
              </div>
            </form>
          </div>
        </div>
      </section>
      {showModal && (
        <Modal closeModal={closeModal} imageUrl={imageUrl}>
          <>
            <p className="text-center">{modalContent}</p>
          </>
        </Modal>
      )}
    </>
  );
};

export default Register2;
