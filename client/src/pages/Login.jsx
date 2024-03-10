import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginImg from "../assets/Login.svg";
import Logo from "../assets/LOGO.svg";
import { loginAsync } from "../store/slices/authSlice.js";
import openEye from "../assets/openEye.svg";
import closeEye from "../assets/closeEye.svg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [shouldSubmit, setShouldSubmit] = useState(true);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleFocus = () => {
    setIsPasswordFocused(true);
  };

  const handleBlur = () => {
    setIsPasswordFocused(false);
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.trim() === "") {
      errors.email = "غير صحيح";
      isValid = false;
    } else {
      errors.email = null;
    }

    if (password.length < 6 || password.trim() === "") {
      errors.password = "يجب أن يتجاوز 6 حروف";
      isValid = false;
    } else {
      errors.password = null;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }

    validateForm();
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (shouldSubmit) {
        const message = "تأكيد مغادرة الصفحة؟";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [shouldSubmit]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await dispatch(loginAsync({ email, password }));
        if (response.payload && response.payload.status === false) {
          console.log(response.payload.message);
          toast.error(response.payload.message || "المستخدم غير مسجل");
        } else {
          console.log("تم التسجيل الدخول بنجاح");
          console.log("Token:", response.payload.token);
          localStorage.setItem("token", response.payload.token);
          setShouldSubmit(false);

          navigate("/");
        }
      } catch (error) {
        console.error("Form validation failed.", error);
        toast.error(error.message || "حدث خطأ أثناء تسجيل الدخول");
        setEmail("");
        setPassword("");
        setFormErrors({});
        setShowPassword(false);
        setIsPasswordFocused(false);
      }
    }
  };

  return (
    <>
      <section className="grid grid-flow-row grid-cols-2">
        <div className="bg-[#28CC9E4D] min-h-screen">
          <img src={loginImg} alt="Register" className="my-48 mx-10" />
        </div>

        <div className="flex flex-nowrap flex-col flex-1">
          <img src={Logo} alt="Logo" className="ml-[730px] mt-2 w-28" />

          <form className="w-[400px] ml-[240px] mt-40" method="POST">
            <h1
              className="font-bold text-xl mb-7 text-[#132F2B] tracking-wide"
              dir="rtl">
              تسجيل الدخول بالبريد الإلكتروني
            </h1>
            <div className="mb-8">
              {formErrors.email && (
                <span className="text-[#CC2828]">{formErrors.email}</span>
              )}
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  dir="rtl"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onKeyUp={validateForm}
                  className={`items-center border ${
                    formErrors.email ? "border-[#CC2828]" : "border-[#28CC9E]"
                  } focus:border-[#28CC9E] w-full px-3 border-[#28CC9E] text-[#00000] leading-tight focus:outline-none focus:shadow-outline h-[55px]  rounded-xl tracking-wide text-lg`}
                />
                <label
                  dir="rtl"
                  htmlFor="email"
                  className={`absolute right-2 text-[#132F2BCC] bg-slate-50 m-2 transition-all duration-200 px-2 ${
                    isPasswordFocused || email
                      ? "text-lg -translate-y-6 -translate-x-4 text-[#132F2BCC]"
                      : "text-base"
                  }`}>
                  البريد الالكتروني
                </label>
              </div>
            </div>

            <div className="mb-5 relative">
              {formErrors.password && (
                <span className="text-[#CC2828]">{formErrors.password}</span>
              )}

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
                name="password"
                value={password}
                dir="rtl"
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`items-center border ${
                  formErrors.email ? "border-[#CC2828]" : "border-[#28CC9E]"
                } focus:border-[#28CC9E] w-full px-3 border-[#28CC9E] text-[#00000] leading-tight focus:outline-none focus:shadow-outline h-[55px]  rounded-xl tracking-wide text-lg`}
              />
              <label
                dir="rtl"
                htmlFor="password"
                className={`absolute right-2 text-[#132F2BCC] bg-slate-50 m-2 transition-all duration-200 px-2 ${
                  isPasswordFocused || password
                    ? "text-lg -translate-y-6 -translate-x-4 text-[#132F2BCC]"
                    : "text-base"
                }`}>
                كلمة المرور
              </label>
            </div>

            <div dir="rtl" className="mb-10">
              <Link
                className="inline-block align-baseline text-[#132F2BB2] tracking-wide text-lg"
                to="/ForgetPassword">
                نسيت الرقم السري؟
              </Link>
            </div>

            <div className="flex flex-col space-y-6">
              <button
                className="bg-[#196B69] focus:outline-none focus:shadow-outline h-[60px] w-full rounded-2xl text-[#FFFFFF] tracking-wider text-xl"
                type="submit"
                dir="rtl"
                onClick={handleLogin}>
                تسجيل الدخول
              </button>
              <button
                className="bg-[#28CC9E] focus:outline-none h-[60px] w-full rounded-2xl text-[#132F2B] tracking-wider text-xl "
                dir="rtl"
                onClick={() => navigate("/Register1")}>
                إنشاء حساب
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
