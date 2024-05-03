import React from "react";
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
import women from "../../assets/women.svg";
import chatbot from "../../assets/ChatBot.svg";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
const Content = () => {
  return (
    <>
      <main className="">
        <div>
          {/* section 1 */}
          <section dir="rtl" className="">
            <div className="flex gap-72 items-center ">
              <div dir="rtl" className="flex  ">
                <img src={Firstvector} alt="vector" className=" w-[651px]  " />
                <img
                  src={Doctors}
                  alt="vector"
                  className=" w-[612px] h-[612px]  absolute top-36 right-36"
                />
              </div>
              <div
                dir="rtl"
                className="flex flex-col space-y-6 text-center w-[580px]  h-[256px] py-60 ">
                <h1 className="text-[#132F2B] text-[32px] leading-[38.73px] font-[Inter] font-semibold	">
                  الرعاية الصحية الشاملة
                </h1>
                <p className="text-[#000000CC] font-[Inter] font-normal	 text-[24px] leading-[29.05px]">
                  يمكنك الاطمئنان علي صحتك وعافيتك بثقة. يوفر موقعنا المعلومات
                  الدقيقة والموثوقة حول التطعيمات، وتاريخ العائلة المرضي،
                  والفحوصات السنوية اللازمة، مما يسهل عليك متابعة صحتك بشكل
                  منتظم وفعال. اكتشف الآن كيف يمكن لموقعنا أن يكون رفيقك الموثوق
                  في رحلة العناية بصحتك
                </p>
              </div>
            </div>

            <div dir="rtl" className="w-full flex my-10">
              <div className=" flex   ">
                <img
                  src={Secondvector}
                  alt="Secondvector"
                  className="  w-[814px] h-[595px] absolute left-[-120px] my-20 top[582px]  "
                />
                <img
                  src={Thirdvector}
                  alt="Thirdvector"
                  className="w-[612px] h-[612px] absolute left-0 my-36
                  "
                />
                <div className="fixed left-44 z-50 py-3 my-72 bg-[#196B69] w-[82px] h-[82px] flex items-center justify-center rounded-full">
                  <Link to="/ChatBot">
                    <img src={chatbot} className="  " alt="chatbot" />
                  </Link>
                </div>
              </div>
              <div dir="rtl" className="my-[30rem]">
                <img
                  src={Fourthvector}
                  alt="Fourthvector"
                  className="w-[776px] h-[675.37px]  "
                />
              </div>
              <div className=" my-[30rem] w-full absolute right-60">
                <div className="flex flex-col space-y-20 ">
                  <div className="flex gap-x-20 ">
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
                      linkTo="/Vaccinations"
                    />
                  </div>
                  <div className="flex gap-x-20">
                    <Card
                      title="الفحص الكامل"
                      description="نحتفظ بجميع التحاليل و الفحوصات الخاصة بصحتك بشكل منظم حتى الحاجة إليها."
                      imageSrc1={frame4}
                      imageSrc2={doctor4}
                      linkTo="/CompleteExamination"
                    />
                    <Card
                      title="السجل العائلي"
                      description="ُسجل فيها الأمراض المزمنة لأفراد العائلة مع نصائح للوقاية من الأمراض المزمنة "
                      imageSrc1={frame3}
                      imageSrc2={doctor3}
                      linkTo="/FamilyRegistry"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* section 2 */}
          <section dir="rtl">
            <div className="flex flex-col ">
              <div className="flex justify-between  gap-24">
                <div className="flex  items-center justify-center mx-32">
                  <div className="w-[605px] h-[411px] flex flex-col items-center justify-between ">
                    <h2 className="text-[#196B69] text-[Inter] font-semibold	text-[28px] leading-[33.89px]">
                      الاطفال
                    </h2>
                    <p className="text-[#000000B2]  text-[Inter] font-medium text-[20px] leading-[24.2px]">
                      Lorem ipsum dolor sit amet consectetur. Tellus quis auctor
                      semper pretium turpis et suscipit felis. Lectus mauris
                      ullamcorper non egestas sem. Molestie metus netus diam
                      vestibulum nunc euismod nec. Dui faucibus elit leo libero
                      luctus tellus. Rhoncus lobortis tincidunt scelerisque
                      felis et sem commodo id. Potenti pharetra fringilla
                      lacinia ut et Lorem ipsum dolor sit amet consectetur.
                      Tellus quis auctor semper pretium turpis et suscipit
                      felis. Lectus mauris ullamcorper non egestas sem. Molestie
                      metus netus diam vestibulum nunc euismod nec. Dui faucibus
                      elit leo libero luctus tellus. Rhoncus lobortis tincidunt
                      scelerisque feliadipiscing.volutpat bibendum eget
                      adipiscing.
                    </p>
                  </div>
                </div>
                <div>
                  <img src={boychild} alt="boychild" />
                </div>
              </div>
              <div className="flex justify-between ">
                <div>
                  <img src={family} alt="boychild" />
                </div>
                <div className="flex  items-center justify-center mx-32">
                  <div className="w-[605px] h-[411px] flex flex-col items-center justify-between ">
                    <h2 className="text-[#196B69] text-[Inter] font-semibold	text-[28px] leading-[33.89px]">
                      الكبار والحوامل
                    </h2>
                    <p className="text-[#000000B2]  text-[Inter] font-medium text-[20px] leading-[24.2px]">
                      Lorem ipsum dolor sit amet consectetur. Tellus quis auctor
                      semper pretium turpis et suscipit felis. Lectus mauris
                      ullamcorper non egestas sem. Molestie metus netus diam
                      vestibulum nunc euismod nec. Dui faucibus elit leo libero
                      luctus tellus. Rhoncus lobortis tincidunt scelerisque
                      felis et sem commodo id. Potenti pharetra fringilla
                      lacinia ut et Lorem ipsum dolor sit amet consectetur.
                      Tellus quis auctor semper pretium turpis et suscipit
                      felis. Lectus mauris ullamcorper non egestas sem. Molestie
                      metus netus diam vestibulum nunc euismod nec. Dui faucibus
                      elit leo libero luctus tellus. Rhoncus lobortis tincidunt
                      scelerisque feliadipiscing.volutpat bibendum eget
                      adipiscing.
                    </p>
                  </div>
                </div>
              </div>{" "}
              <div className="flex justify-between gap-24 ">
                <div className="flex  items-center justify-center mx-32">
                  <div className="w-[605px] h-[411px] flex flex-col items-center justify-between ">
                    <h2 className="text-[#196B69] text-[Inter] font-semibold	text-[28px] leading-[33.89px]">
                      المسافرين
                    </h2>
                    <p className="text-[#000000B2]  text-[Inter] font-medium text-[20px] leading-[24.2px]">
                      Lorem ipsum dolor sit amet consectetur. Tellus quis auctor
                      semper pretium turpis et suscipit felis. Lectus mauris
                      ullamcorper non egestas sem. Molestie metus netus diam
                      vestibulum nunc euismod nec. Dui faucibus elit leo libero
                      luctus tellus. Rhoncus lobortis tincidunt scelerisque
                      felis et sem commodo id. Potenti pharetra fringilla
                      lacinia ut et Lorem ipsum dolor sit amet consectetur.
                      Tellus quis auctor semper pretium turpis et suscipit
                      felis. Lectus mauris ullamcorper non egestas sem. Molestie
                      metus netus diam vestibulum nunc euismod nec. Dui faucibus
                      elit leo libero luctus tellus. Rhoncus lobortis tincidunt
                      scelerisque feliadipiscing.volutpat bibendum eget
                      adipiscing.
                    </p>
                  </div>
                </div>
                <div>
                  <img src={women} alt="women" />
                </div>
              </div>{" "}
            </div>
          </section>
        </div>
      </main>
      ;
    </>
  );
};
export default Content;