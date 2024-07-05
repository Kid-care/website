import DoctorAmico from "../assets/Doctor-amico 2.svg";
import Logo from "../assets/LOGO.svg";
import { useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const Register1 = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [inputFocus, setInputFocus] = useState({});

  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    fatherName: "",
    motherName: "",
  });
  const [inputTouched, setInputTouched] = useState({
    userName: false,
    email: false,
    phoneNumber: false,
    fatherName: false,
    motherName: false,
  });

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!userData.userName.trim() || userData.userName.length < 3) {
      errors.userName = "الرجاء إدخال اسم المستخدم(على الأقل 3 أحرف)";
      isValid = false;
    } else if (!/^[\u0621-\u064Aa-zA-Z\s]+$/.test(userData.userName)) {
      errors.userName =
        "الرجاء ادخال اسم المستخدم يحتوي عل احرف عربيه او انجليزيه فقط";
      isValid = false;
    } else {
      delete errors.userName;
    }

    if (!userData.email.trim() || !/^\S+@\S+\.\S+$/.test(userData.email)) {
      errors.email = "الرجاء إدخال عنوان بريد إلكتروني صحيح";
    } else {
      delete errors.email;
    }

    if (
      !userData.phoneNumber.trim() ||
      !/^(01[0-2]|010|011|012)[0-9]{8}$/.test(userData.phoneNumber)
    ) {
      errors.phoneNumber = "الرجاء إدخال رقم هاتف مصري صحيح";
    } else {
      delete errors.phoneNumber;
    }

    if (!userData.fatherName.trim()) {
      errors.fatherName = "الرجاء إدخال اسم الاب (على الأقل 3 أحرف)";
    } else if (
      !/^[a-zA-Z\s]+$/.test(userData.fatherName) &&
      !/^[ء-ي\s]+$/.test(userData.fatherName)
    ) {
      errors.fatherName = "يجب أن يحتوي اسم الأب على أحرف فقط";
    } else {
      delete errors.fatherName;
    }

    if (!userData.motherName.trim() || userData.motherName.length < 3) {
      errors.motherName = "الرجاء إدخال اسم الام (على الأقل 3 أحرف)";
    } else if (
      !/^[a-zA-Z\s]+$/.test(userData.motherName) &&
      !/^[ء-ي\s]+$/.test(userData.motherName)
    ) {
      errors.motherName = "يجب أن يحتوي اسم الأم على أحرف فقط";
    } else {
      delete errors.motherName;
    }

    setFormErrors(errors);
    return isValid;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setInputTouched({ ...inputTouched, [name]: true });
  };

  const handleNext = () => {
    setInputTouched({
      userName: true,
      email: true,
      phoneNumber: true,
      fatherName: true,
      motherName: true,
    });
    if (validateForm()) {
      navigate("/Register2", { state: userData });
    }
  };
  const handleFocus = (name) => {
    setInputFocus({ ...inputFocus, [name]: true });
  };
  const handleBlur = (name) => {
    setInputFocus({ ...inputFocus, [name]: false });
  };

  return (
    <>
      <section className="grid grid-flow-row grid-cols-2 ">
        <div className="bg-[#28CC9E4D] h-screen  flex justify-center items-center">
          <img src={DoctorAmico} alt="Register" className="max-w-full " />
        </div>

        <div className="flex flex-nowrap flex-col flex-1  relative">
          <NavLink to="/" dir="rtl">
            <img
              src={Logo}
              alt="Logo"
              className="right-[60px] mt-2 w-24 absolute "
            />
          </NavLink>
          <div className=" flex flex-col justify-center items-center h-full mt-8">
            <form
              className=" absolute  w-[400px] mt-5 mr-9 flex flex-col gap-y-8 "
              method="POST">
              <h1
                className="  font-bold text-2xl  text-[#132F2B] tracking-wide"
                dir="rtl">
                أنشاء حساب
              </h1>
              <div>
                <div>
                  {inputTouched["userName"] && formErrors.userName && (
                    <span className="text-[#CC2828]  text-sm ">
                      {formErrors.userName}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={inputFocus["userName"] ? "" : "اسم المسخدم"}
                    name="userName"
                    value={userData.userName}
                    dir="rtl"
                    onChange={handleChange}
                    onKeyUp={validateForm}
                    className={`cursor-pointer items-center border px-6  placeholder-[#132F2BCC]   ${
                      inputTouched["userName"] && formErrors.userName
                        ? "border-[#CC2828]"
                        : "border-[#28CC9E]"
                    } focus:border-[#28CC9E] w-full px-6 border-[#28CC9E] text-[#00000] leading-tight focus:outline-none focus:shadow-outline h-[55px]  rounded-xl tracking-wide text-lg`}
                    onFocus={() => handleFocus("userName")}
                    onBlur={() => handleBlur("userName")}
                  />
                  {(inputFocus["userName"] || userData.userName) && (
                    <label
                      dir="rtl"
                      htmlFor="userName"
                      className={`absolute right-1 transform -translate-y-full text-[#132F2BCC] bg-slate-50 m-3 text-base transition-opacity duration-200`}>
                      اسم المستخدم
                    </label>
                  )}
                </div>
              </div>

              <div>
                <div>
                  {inputTouched["email"] && formErrors.email && (
                    <span className="text-[#CC2828]  text-sm ">
                      {formErrors.email}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={inputFocus["email"] ? "" : "البريد الالكتروني"}
                    name="email"
                    value={userData.email}
                    dir="rtl"
                    onChange={handleChange}
                    onKeyUp={validateForm}
                    className={`cursor-pointer items-center border px-6  placeholder-[#132F2BCC]   ${
                      inputTouched["email"] && formErrors.email
                        ? "border-[#CC2828]"
                        : "border-[#28CC9E]"
                    } focus:border-[#28CC9E] w-full px-6 border-[#28CC9E] text-[#00000] leading-tight focus:outline-none focus:shadow-outline h-[55px]  rounded-xl tracking-wide text-lg`}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                  />
                  {(inputFocus["email"] || userData.email) && (
                    <label
                      dir="rtl"
                      htmlFor="email"
                      className={`absolute right-1 transform -translate-y-full text-[#132F2BCC] bg-slate-50 m-3  text-base transition-opacity duration-200`}>
                      البريد الالكتروني
                    </label>
                  )}
                </div>
              </div>

              <div>
                <div>
                  {inputTouched["phoneNumber"] && formErrors.phoneNumber && (
                    <span className="text-[#CC2828]  text-sm ">
                      {formErrors.phoneNumber}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={
                      inputFocus["phoneNumber"] ? "" : "الرقم الهاتف"
                    }
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    dir="rtl"
                    onChange={handleChange}
                    onKeyUp={validateForm}
                    className={`cursor-pointer items-center border px-6  placeholder-[#132F2BCC]   ${
                      inputTouched["phoneNumber"] && formErrors.phoneNumber
                        ? "border-[#CC2828]"
                        : "border-[#28CC9E]"
                    } focus:border-[#28CC9E] w-full px-6 border-[#28CC9E] text-[#00000] leading-tight focus:outline-none focus:shadow-outline h-[55px]  rounded-xl tracking-wide text-lg`}
                    onFocus={() => handleFocus("phoneNumber")}
                    onBlur={() => handleBlur("phoneNumber")}
                  />
                  {(inputFocus["phoneNumber"] || userData.phoneNumber) && (
                    <label
                      dir="rtl"
                      htmlFor="phoneNumber"
                      className={`absolute right-1 transform -translate-y-full text-[#132F2BCC] bg-slate-50 m-3  text-base transition-opacity duration-200`}>
                      الرقم الهاتف
                    </label>
                  )}
                </div>
              </div>
              <div>
                <div>
                  {inputTouched["fatherName"] && formErrors.fatherName && (
                    <span className="text-[#CC2828]  text-sm ">
                      {formErrors.fatherName}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={inputFocus["fatherName"] ? "" : "اسم الاب"}
                    name="fatherName"
                    value={userData.fatherName}
                    dir="rtl"
                    onChange={handleChange}
                    onKeyUp={validateForm}
                    className={`cursor-pointer items-center border px-6  placeholder-[#132F2BCC]   ${
                      inputTouched["fatherName"] && formErrors.fatherName
                        ? "border-[#CC2828]"
                        : "border-[#28CC9E]"
                    } focus:border-[#28CC9E] w-full px-6 border-[#28CC9E] text-[#00000] leading-tight focus:outline-none focus:shadow-outline h-[55px]  rounded-xl tracking-wide text-lg`}
                    onFocus={() => handleFocus("fatherName")}
                    onBlur={() => handleBlur("fatherName")}
                  />
                  {(inputFocus["fatherName"] || userData.fatherName) && (
                    <label
                      dir="rtl"
                      htmlFor="fatherName"
                      className={`absolute right-1 transform -translate-y-full text-[#132F2BCC] bg-slate-50 m-3  text-base transition-opacity duration-200`}>
                      اسم الاب
                    </label>
                  )}
                </div>
              </div>

              <div>
                <div>
                  {inputTouched["motherName"] && formErrors.motherName && (
                    <span className="text-[#CC2828]  text-sm ">
                      {formErrors.motherName}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={inputFocus["motherName"] ? "" : "اسم الام"}
                    name="motherName"
                    value={userData.motherName}
                    dir="rtl"
                    onChange={handleChange}
                    onKeyUp={validateForm}
                    className={`cursor-pointer items-center border px-6  placeholder-[#132F2BCC]   ${
                      inputTouched["motherName"] && formErrors.motherName
                        ? "border-[#CC2828]"
                        : "border-[#28CC9E]"
                    } focus:border-[#28CC9E] w-full px-6 border-[#28CC9E] text-[#00000] leading-tight focus:outline-none focus:shadow-outline h-[55px]  rounded-xl tracking-wide text-lg`}
                    onFocus={() => handleFocus("motherName")}
                    onBlur={() => handleBlur("motherName")}
                  />
                  {(inputFocus["motherName"] || userData.motherName) && (
                    <label
                      dir="rtl"
                      htmlFor="motherName"
                      className={`absolute right-1 transform -translate-y-full text-[#132F2BCC] bg-slate-50 m-3 text-base transition-opacity duration-200`}>
                      اسم الام
                    </label>
                  )}
                </div>
              </div>
              <div className="flex flex-col my-[-30px]">
                <div dir="rtl" className="flex flex-row items-center my-5 ">
                  <p className="text-[#132F2BCC] tracking-wide text-lg ml-2 ">
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
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register1;
