import ForgotPasswordImg from "../assets/Forgot password-rafiki 1.svg";
import Logo from "../assets/LOGO.svg";
const ForgetPassword = () => {
  return (
    <>
      <section className="grid grid-flow-row grid-cols-2  ">
        <div className="bg-[#28CC9E4D] min-h-screen">
          <img src={ForgotPasswordImg} alt="Register" className="mt-28 mx-14 " />
        </div>

        <div className="flex flex-nowrap flex-col flex-1 ">
          <img src={Logo} alt="Logo" className="ml-[700px] mt-2 w-28 " />

          {/* form */}

          <form className="  w-[400px]  ml-[240px] mt-40">
            <h1
              className="  font-bold text-2xl mb-11 text-[#132F2B] tracking-wide"
              dir="rtl">
              نسيت الرقم السري
            </h1>

            <div className="mb-11">
              <input
                type="email"
                className="shadow border-[#28CC9E] border  w-full px-6  text-black leading-tight focus:outline-none focus:shadow-outline h-[55px] rounded-xl placeholder-[#132F2BCC] tracking-wide text-lg"
                id="البريد الالكتروني"
                placeholder="البريد الالكتروني"
                dir="rtl"
              />
            </div>

            <button
              className="bg-[#28CC9E] focus:outline-none focus:shadow-outline h-[60px] w-full rounded-2xl text-[#132F2B] tracking-wider text-xl "
              type="button"
              dir="rtl">
              التالي
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ForgetPassword;