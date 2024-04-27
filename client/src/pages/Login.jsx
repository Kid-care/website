import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import loginImg from "../assets/Login.svg";
import Logo from "../assets/LOGO.svg";
import { loginAsync } from "../store/slices/authSlice.js";
import openEye from "../assets/openEye.svg";
import closeEye from "../assets/closeEye.svg";
import Modal from "../components/Modal.jsx";
import imageUrl from "../assets/errors.svg";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [inputFocus, setInputFocus] = useState({});

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
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
    email: false,
    password: false,
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

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
;
    if (!emailRegex.test(userData.email) || userData.email.trim() === "") {
      errors.email = "الرجاء إدخال عنوان بريد إلكتروني صحيح";
      isValid = false;
    } else {
      errors.email = null;
    }

    if (userData.password.length < 6 || userData.password.trim() === "") {
      errors.password = "يجب أن يتجاوز 6 ارقام";
      isValid = false;
    } else {
      errors.password = null;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setInputTouched({
      email: false,
      password: false,
    });
    if (!validateForm()) return;

    try {
      const response = await dispatch(loginAsync(userData));

      if (response.payload && response.payload.status === true) {
        localStorage.setItem("token", response.payload.token);
        setIsAuthenticated(true);
        navigate("/");
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
        openModal(response.error.message || "حدث خطأ أثناء تسجيل الدخول");
      }
    } catch (error) {
      openModal(error.message || "حدث خطأ أثناء تسجيل الدخول");
    }
  };

  return (
    <>
      <section className="grid grid-cols-2 grid-flow-row">
        <div className="bg-[#28CC9E4D] h-screen flex justify-center items-center">
          <img src={loginImg} alt="loginImg" className="max-w-full" />
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
                تسجيل الدخول بالبريد الالكتروني
              </h1>

              <div className="">
                <div className="py-1">
                  {inputTouched["email"] && formErrors.email && (
                    <span className="text-[#CC2828] text-sm ">
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
                      className={`absolute right-1 transform -translate-y-full text-[#132F2BCC] bg-slate-50 m-3 text-base transition-opacity duration-200`}>
                      البريد الالكتروني
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
                <div dir="rtl" className="flex flex-row items-center mb-6 ">
                  <Link
                    className="inline-block align-baseline text-[#132F2BB2] tracking-wide text-lg"
                    to="/ForgetPassword">
                    نسيت الرقم السري ؟
                  </Link>
                </div>
                <div className="flex flex-col space-y-6">
                  <button
                    className="bg-[#196B69] focus:outline-none focus:shadow-outline h-[60px] w-full rounded-2xl text-[#FFFFFF] tracking-wider text-xl"
                    type="button"
                    dir="rtl"
                    onClick={handleLogin}>
                    تسجيل الدخول
                  </button>
                  <button
                    className="bg-[#28CC9E] focus:outline-none focus:shadow-outline h-[60px] w-full rounded-2xl text-[#132F2B] tracking-wider text-xl"
                    type="button"
                    dir="rtl"
                    onClick={() => navigate("/Register1")}>
                    إنشاء حساب
                  </button>
                </div>
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

export default Login;
