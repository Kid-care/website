import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Doctors from "../../assets/Doctors.svg";
import Firstvector from "../../assets/FirstVector.svg";
import Secondvector from "../../assets/SecondVector.svg";
import Thirdvector from "../../assets/ThirdVector.svg";
import Fourthvector from "../../assets/FourthVector.svg";
import doctor1 from "../../assets/doctor1.svg";
import doctor2 from "../../assets/doctor2.svg";
import doctor3 from "../../assets/doctor3.svg";
import doctor4 from "../../assets/doctor4.svg";
import frame1 from "../../assets/frame1.svg";
import frame2 from "../../assets/frame2.svg";
import frame3 from "../../assets/frame3.svg";
import frame4 from "../../assets/frame4.svg";
import family from "../../assets/family.svg";
import boychild from "../../assets/boychild.svg";
import women from "../../assets/women.png";
import chatbot from "../../assets/ChatBot.svg";
import Card from "../../components/Card";

const Content = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const loggedIN = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setRole(localStorage.getItem("role"));
    }
  }, []);

  return (
    <main className="flex-col gap-y-6 overflow-x-hidden ">
      {/* Section 1 */}
      <section dir="rtl" className="flex-col justify-around mb-10 sm:mb-20">
        <div className="flex justify-between">
          <div className="flex mr-6">
            {/* Adjust image widths based on screen size */}
            <img
              src={Firstvector}
              alt="vector"
              className="sm:w-[651px] w-[500px]  absolute sm:top-0  "
            />
            <img
              src={Doctors}
              alt="vector"
              className=" sm:w-[612px] sm:h-[612px] absolute sm:top-60 top-0 mr-8 w-[300px] h-[300px]"
            />
          </div>
          <div className="sm:ml-60 sm:flex sm:gap-40 my-[350px]">
            <div className="flex flex-col">
              <div className="sm:flex sm:flex-col sm:space-y-8 sm:w-[822px] sm:h-[256px]">
                <h1 className="text-[#132F2B] text-[32px] leading-[38.73px] font-[Inter] text-center font-semibold">
                  الرعاية الصحية الشاملة
                </h1>
                <p className="text-[#000000CC] font-[Inter] font-normal text-[24px] leading-[29.05px]">
                  يمكنك الاطمئنان علي صحتك وعافيتك بثقة. يوفر موقعنا المعلومات
                  الدقيقة والموثوقة حول التطعيمات، وتاريخ العائلة المرضي،
                  والفحوصات السنوية اللازمة، مما يسهل عليك متابعة صحتك بشكل
                  منتظم وفعال. اكتشف الآن كيف يمكن لموقعنا أن يكون رفيقك الموثوق
                  في رحلة العناية بصحتك.
                </p>
              </div>
              {role === "admin" ? (
                <div className="flex justify-center">
                  <Link
                    to="patient-search"
                    className="bg-[#28CC9E] focus:outline-none focus:shadow-outline h-[60px] w-[400px] flex justify-center items-center rounded-[20px] text-[#132F2B] tracking-wider text-xl"
                    type="button"
                    dir="rtl">
                    تسجيل مريض اخر
                  </Link>
                </div>
              ) : role === "owner" ? (
                <div className="flex justify-center">
                  <Link
                    to="Dashboard"
                    className="bg-[#28CC9E] focus:outline-none focus:shadow-outline h-[60px] w-[400px] flex justify-center items-center rounded-[20px] text-[#132F2B] tracking-wider text-xl"
                    type="button"
                    dir="rtl">
                    الانتقال الي الداشبورد
                  </Link>
                </div>
              ) : (
                loggedIN && (
                  <div className="flex-col space-y-4 items-center m-7">
                    <button
                      className="bg-[#28CC9E] focus:outline-none focus:shadow-outline h-[60px] sm:w-[400px] w-full rounded-[20px] text-[#132F2B] tracking-wider text-xl ml-5"
                      type="button"
                      dir="rtl"
                      onClick={() => navigate("/Register1")}>
                      إنشاء حساب
                    </button>
                    <button
                      className="bg-[#28CC9E] focus:outline-none focus:shadow-outline h-[60px] sm:w-[400px] w-full rounded-[20px] text-[#132F2B] tracking-wider text-xl"
                      type="button"
                      dir="rtl"
                      onClick={() => navigate("/Login")}>
                      تسجيل الدخول
                    </button>
                  </div>
                )
              )}
            </div>
            <div className="fixed left-44 mt-44 z-50 py-3 bg-[#196B69] w-[82px] h-[82px] flex items-center justify-center rounded-full">
              <Link to="/ChatBot">
                <img src={chatbot} alt="chatbot" />
              </Link>
            </div>
          </div>
        </div>
        <div dir="rtl" className="w-full flex relative">
          <div className="flex">
            <img
              src={Secondvector}
              alt="Secondvector"
              className="sm:w-[900px] sm:h-[595px] w-[550px] h-[400px] absolute left-[-100px] mt-[-250px]"
            />
            <img
              src={Thirdvector}
              alt="Thirdvector"
              className="sm:w-[612px] sm:h-[612px] w-[350px] h-[400px] absolute left-[-20px] mt-[-250px]"
            />
          </div>
          <div className="my-[300px] lg:my-[40px] w-full absolute right-10">
            <div className="flex flex-col items-center space-y-10 lg:space-y-20">
              <div className="flex flex-col lg:flex-row gap-x-0 lg:gap-x-20 gap-y-10 lg:gap-y-20">
                <Card
                  title="التاريخ المرضي"
                  description="نسجيل و نتابعة حالتك الصحية و زياراتك للطبيب بشكل دقيق و منظم."
                  imageSrc1={frame2}
                  imageSrc2={doctor2}
                  linkTo="/MedicalHistory"
                />
                <Card
                  title="التطعيمات"
                  description="التطعيم المناسب لحالتك وحسب احتياجك، وأيضًا جميع التطعيمات متوفرة مع تفاصيل عنها."
                  imageSrc1={frame1}
                  imageSrc2={doctor1}
                  linkTo="/vaccines"
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-x-0 lg:gap-x-20 gap-y-10 lg:gap-y-20">
                <Card
                  title="الفحص الكامل"
                  description="نحتفظ بجميع التحاليل و الفحوصات الخاصة بصحتك بشكل منظم حتى الحاجة إليها."
                  imageSrc1={frame4}
                  imageSrc2={doctor4}
                  linkTo="/CompleteExamination"
                />
                <Card
                  title="السجل العائلي"
                  description="نسجل فيها الأمراض المزمنة لأفراد العائلة مع نصائح للوقاية من الأمراض المزمنة."
                  imageSrc1={frame3}
                  imageSrc2={doctor3}
                  linkTo="/family-record"
                />
              </div>
            </div>
          </div>
          <div dir="rtl" className="mt-[100px]">
            <img
              src={Fourthvector}
              alt="Fourthvector"
              className="w-[776px] h-[675.37px]"
            />
          </div>
        </div>
      </section>
      {/* Section 2 */}
      <section dir="rtl" className="flex mt-[900px] sm:mt-20">
        <div className="flex flex-col items-center space-y-10 lg:space-y-20">
          <div className="mt-[200px] flex flex-col-reverse items-center lg:flex-row justify-between gap-10 lg:gap-24">
            <div className="flex items-center justify-center mx-4 lg:mx-32">
              <div className="w-full max-w-md lg:w-[605px] h-auto lg:h-[411px] flex flex-col items-center gap-10">
                <h2 className="text-[#196B69] text-[Inter] font-semibold text-2xl lg:text-[28px] leading-[34px] text-center">
                  الاطفال{" "}
                </h2>
                <p className="text-[#000000CC]  w-[500px] lg:w-[605px] font-[Inter] text-base lg:text-[24px] leading-[29px] text-center lg:text-justify">
                  التطعيمات تلعب دورًا حيويًا في الحفاظ على صحة الطفل ومنع
                  انتشار الأمراض الخطيرة. تشمل التطعيمات الروتينية مثل التهاب
                  الكبد الفيروسي، شلل الأطفال، الدفتيريا، والكزاز. كما يتم توفير
                  التطعيمات للوقاية من الحصبة، النكاف، والنزلة الوافدة. يُنصح
                  باتباع جدول منظم للتطعيمات الذي يحدده الأطباء لضمان تغطية
                  الحماية الكاملة والفعّالة للطفل ضد هذه الأمراض. بفضل التقدم
                  الطبي، تصبح التطعيمات سهلة الوصول وآمنة، مما يساعد في خفض
                  معدلات الإصابة بالأمراض والحفاظ على صحة الأفراد
                  والمجتمعات بشكل عام.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center mx-4 lg:mx-0">
              <img
                src={family}
                alt="Family"
                className="w-full max-w-full lg:max-w-full lg:w-auto h-auto"
              />
            </div>
          </div>
          <div className="flex flex-col-reverse items-center lg:flex-row-reverse justify-between gap-10 lg:gap-24">
            <div className="flex items-center justify-center mx-4 lg:mx-32">
              <div className="w-full max-w-md lg:w-[605px] h-auto lg:h-[411px] flex flex-col items-center gap-10">
                <h2 className="text-[#196B69] text-[Inter] font-semibold text-2xl lg:text-[28px] leading-[34px] text-center">
                  الكبار والحوامل{" "}
                </h2>
                <p className="text-[#000000CC] w-[500px] lg:w-[605px]  font-[Inter] text-lg lg:text-[24px] leading-[29px] text-center lg:text-justify">
                  الاهتمام بالصحة وتلقي اللقاحات أمران أساسيان للكبار والحوامل.
                  ينبغي للكبار الحفاظ على نمط حياة صحي، وتلقي اللقاحات الموصى
                  بها لتعزيز المناعة ضد الأمراض المعدية التي قد تكون خطرة بسبب
                  نقص المناعة بسبب التقدم في العمر. أما بالنسبة للحوامل،
                  فالرعاية الصحية تشمل تلقي اللقاحات والاهتمام بالتغذية السليمة
                  والنشاط البدني، لضمان صحة الأم والجنين والوقاية من المضاعفات
                  الصحية خلال فترة الحمل.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center mx-4 lg:mx-0">
              <img
                src={boychild}
                alt="Boy child"
                className="w-full max-w-full lg:max-w-full lg:w-auto h-auto"
              />
            </div>
          </div>
          <div className="flex flex-col-reverse items-center lg:flex-row justify-between gap-10 lg:gap-24">
            <div className="flex items-center justify-center mx-4 lg:mx-32">
              <div className="w-full max-w-md lg:w-[605px] h-auto lg:h-[411px] flex flex-col items-center gap-10">
                <h2 className="text-[#196B69] text-[Inter] font-semibold text-2xl lg:text-[28px] leading-[34px] text-center">
                  المسافرين{" "}
                </h2>
                <p className="text-[#000000CC] w-[500px] lg:w-[605px] font-[Inter] text-lg lg:text-[24px] leading-[29px] text-center lg:text-justify">
                  عند التخطيط للسفر، يعد الاهتمام بالصحة وتلقي التطعيمات اللازمة
                  أمرًا بالغ الأهمية. يجب على المسافرين الحصول على اللقاحات
                  الموصى بها للوجهات المقصودة، لحمايتهم من الأمراض المعدية
                  الشائعة في تلك المناطق. من الضروري اتباع الارشادات وتجنب تناول
                  الأطعمة والمياه غير المأمونة لضمان رحلة صحية وآمنة. تجهيز
                  حقيبة سفر تحتوي على مستلزمات طبية أساسية يمكن أن يكون مفيدًا
                  في التعامل مع أي حالات طارئة قد تحدث أثناء السفر. بهذا
                  الاهتمام الوقائي، يمكن للمسافرين الاستمتاع
                  برحلاتهم بثقة وأمان.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center mx-4 lg:mx-0">
              <img
                src={women}
                alt="Women"
                className="w-full max-w-full lg:max-w-full lg:w-auto h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Content;
