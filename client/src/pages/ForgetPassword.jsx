import { useState } from "react";
import Modal from "../components/Modal.jsx";
import ForgetPassword from "../assets/Forgot password-rafiki 1.svg";
import Logo from "../assets/LOGO.svg";
import { useDispatch } from "react-redux";
import { forgotPasswordAsync } from "../store/slices/authSlice.js";
import imageUrl from "../assets/New message-pana 2 .svg";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});
  const [inputFocus, setInputFocus] = useState({});
  const [userData, setUserData] = useState({
    email: "",
  });

  const [inputTouched, setInputTouched] = useState({
    email: false,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setInputTouched({ ...inputTouched, [name]: true });
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email) || userData.email.trim() === "") {
      errors.email = "الرجاء إدخال عنوان بريد إلكتروني صحيح";
      isValid = false;
    } else {
      errors.email = null;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    setInputTouched({
      email: false,
    });
    if (!validateForm()) return;
    try {
      const response = await dispatch(forgotPasswordAsync(userData.email));

      if (response.payload && response.payload.message) {
        openModal(response.payload.message);
        // console.log(response.payload.message);
      } else if (
        response.error &&
        response.error.response &&
        response.error.response.status === 404
      ) {
        openModal(response.payload.message || "المستخدم غير موجود");
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
        openModal(response.error.message || "تحقق من بريدك الالكتروني");
      }
    } catch (error) {
      openModal(error.message || "حدث خطأ أثناء معالجة الطلب");
    }
  };

  return (
    <>
      <section className="grid grid-cols-2 grid-flow-row">
        <div className="bg-[#28CC9E4D] h-screen flex justify-center items-center">
          <img
            src={ForgetPassword}
            alt="ForgetPassword"
            className="max-w-full"
          />
        </div>

        <div className="flex flex-nowrap flex-col flex-1 relative">
          <img
            src={Logo}
            alt="Logo"
            className="right-[60px] mt-2 w-24 absolute"
          />
          <div className=" flex flex-col justify-center items-center h-full">
            <form
              className="absolute w-[400px]  mr-9 flex flex-col gap-y-9 "
              onSubmit={handleForgetPassword}>
              <h1
                className="font-bold text-2xl  text-[#132F2B] tracking-wide"
                dir="rtl">
                نسيت الرقم السري
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
                <button
                  className="bg-[#28CC9E] focus:outline-none focus:shadow-outline h-[60px] w-full rounded-2xl text-[#132F2B] tracking-wider text-xl"
                  type="submit"
                  dir="rtl">
                  التالي
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

export default ForgotPassword;
