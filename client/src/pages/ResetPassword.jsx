import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import resetPassword from "../assets/My password-pana 2.svg";
import Logo from "../assets/LOGO.svg";
import { resetPasswordAsync } from "../store/slices/authSlice.js";
import openEye from "../assets/openEye.svg";
import closeEye from "../assets/closeEye.svg";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user_id, token } = useParams();

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [inputFocus, setInputFocus] = useState({});

  const [userData, setUserData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [inputTouched, setInputTouched] = useState({
    password: false,
    confirmPassword: false,
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

    if (userData.password.length < 6 || userData.password.trim() === "") {
      errors.password = "يجب أن يتجاوز 6 ارقام";
      isValid = false;
    } else {
      errors.password = null;
    }
    if (userData.password !== userData.confirmPassword) {
      errors.confirmPassword = "يجب أن تتطابق كلمتي المرور";
      isValid = false;
    } else {
      errors.confirmPassword = null;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setInputTouched({
      password: true,
      confirmPassword: true,
    });
    if (!validateForm()) return;
    try {
      const response = await dispatch(
        resetPasswordAsync(user_id, token, userData.password)
      );

      if (response.payload && response.payload.message) {
        toast.success(response.payload.message);
        navigate("/login");
      } else {
        toast.error(
          response.payload.error || "حدث خطأ أثناء إعادة تعيين كلمة المرور"
        );
      }
    } catch (error) {
      console.error("فشل إعادة تعيين كلمة المرور:", error);
      toast.error(error.message || "حدث خطأ أثناء إعادة تعيين كلمة المرور");
    }
  };

  return (
    <>
      <section className="grid grid-cols-2 grid-flow-row">
        <div className="bg-[#28CC9E4D] h-screen flex justify-center items-center">
          <img src={resetPassword} alt="loginImg" className="max-w-full" />
        </div>

        <div className="flex flex-nowrap flex-col flex-1 relative">
          <img
            src={Logo}
            alt="Logo"
            className="right-[60px] mt-2 w-24 absolute"
          />
          <div className=" flex flex-col justify-center items-center h-full ">
            <form
              className="absolute w-[400px]  mr-9 flex flex-col gap-y-7 "
              method="POST">
              <h1
                className="font-bold text-2xl mb-1 text-[#132F2B] tracking-wide"
                dir="rtl">
                إعادة تعيين كلمة المرور
              </h1>

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

              <div className="">
                <div className="py-1">
                  {inputTouched["confirmPassword"] &&
                    formErrors.confirmPassword && (
                      <span className="text-[#CC2828] text-sm ">
                        {formErrors.confirmPassword}
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
                    placeholder={
                      inputFocus["confirmPassword"] ? "" : "تأكيد الرقم السري"
                    }
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    dir="rtl"
                    onChange={handleChange}
                    onKeyUp={validateForm}
                    className={`cursor-pointer items-center border px-6  placeholder-[#132F2BCC]   ${
                      inputTouched["confirmPassword"] &&
                      formErrors.confirmPassword
                        ? "border-[#CC2828]"
                        : "border-[#28CC9E]"
                    } focus:border-[#28CC9E] w-full px-6 border-[#28CC9E] text-[#00000] leading-tight focus:outline-none focus:shadow-outline h-[55px]  rounded-xl tracking-wide text-lg`}
                    onFocus={() => handleFocus("confirmPassword")}
                    onBlur={() => handleBlur("confirmPassword")}
                  />
                  {(inputFocus["confirmPassword"] ||
                    userData.confirmPassword) && (
                    <label
                      dir="rtl"
                      htmlFor="confirmPassword"
                      className={`absolute right-1 transform -translate-y-full text-[#132F2BCC] bg-slate-50 m-3 text-base transition-opacity duration-200`}>
                      تأكيد الرقم السري
                    </label>
                  )}
                </div>
              </div>

              <div>
                <button
                  className="bg-[#28CC9E] focus:outline-none focus:shadow-outline h-[60px] w-full rounded-2xl text-[#132F2B] tracking-wider text-xl"
                  type="button"
                  dir="rtl"
                  onClick={handleResetPassword}>
                  تسجيل الدخول
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
