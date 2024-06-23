import React from "react";
import Docotors from "../assets/Doctors-bro 1.svg";
import Vector8 from "../assets/Vector (8).svg";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Alaa from "../assets/Alaa.svg";
import Radwa from "../assets/Radwa.svg";
import Esraa from "../assets/Esraa.svg";
import Khououd from "../assets/Khouloud.png";
import Sherry from "../assets/Sherry.svg";
import Abdelfatah from "../assets/Abdelfatah.svg";
import Gehad from "../assets/Gehad.svg";
import Shrouk from "../assets/Shrouk.svg";
import WorkTeam from "../components/WorkTeam";

const AboutUS = () => {
  return (
    <>
      <main className="flex flex-col justify-around gap-10">
        <Navbar />
        <div dir="rtl" className="flex flex-col gap-5 justify-around  ">
          <section className="w-full  flex flex-col gap-20  ">
            <div className="flex justify-around w-full h-[25rem] items-center mt-32 ">
              <div className="flex flex-col  text-center space-y-8">
                <h1 className="text-[#000000] font-[Roboto] font-semibold text-[26px] leading-[20px] tracking-[0.25px] ">
                  اهتم بكل ما يخص صحتك معانا
                </h1>
                <p className="text-[#000000] font-[Roboto] text-[22px] font-medium	 leading-[33px] tracking-[0.25px] w-[829px] h-[193px]">
                  استجابةً للحاجة المتزايدة للرعاية الصحية المجتمعية الشاملة،
                  يسعى مشروعنا إلى توفير منصة سهلة الاستخدام. تمكّن هذه المنصة
                  الأفراد من جميع الأعمار من إدارة صحتهم بشكل استباقي، حيث توفر
                  ميزات مثل تتبع التطعيمات ومراقبة الصحة وتحديد الاستعدادات
                  الوراثية والتواصل السلس مع المستشفيات. بالإضافة إلى ذلك، يتوفر
                  روبوت دردشة مخصص للإجابة على الاستفسارات الطبية للمستخدمين.
                </p>
              </div>
              <div dir="rtl" className="flex ">
                <img src={Vector8} alt="vector" className="relative" />
                <img src={Docotors} alt="imageDoctors" className="absolute" />
              </div>
            </div>
            <div>
              <div className="bg-[#28CC9E4D] w-full h-[303px] flex flex-col justify-around">
                <div className=" gap-10 flex flex-col items-center justify-center  ">
                  <h2 className="text-center text-[#000000] font-[Roboto]  font-semibold text-[28px] leading-[33px] tracking-[0.25px] ">
                    هدفنا
                  </h2>
                  <p className="text-center text-[#000000] font-[Roboto] font-medium	 text-[22px] leading-[33px] tracking-[0.25px] w-[929px] h-[86px]">
                    يهدف مشروعنا إلى إحداث ثورة في إمكانية الوصول إلى الرعاية
                    الصحية من خلال تقديم نهج شامل. من خلال تسهيل إدارة الصحة
                    الشخصية من خلال الميزات المتقدمة، نسعى إلى تمكين الأفراد من
                    تولي مسؤولية رفاههم بغض النظر عن العمر.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section dir="rtl" className=" w-full flex flex-col justify-evenly  ">
            <div
              dir="rtl"
              className="flex flex-col items-center justify-center mb-5">
              <h2 className="text-center font-[Roboto] font-semibold text-[26px] tracking-[0.25px] leading-[20px] p-14 text-[#000000]">
                فريق العمل
              </h2>
              <div dir="rtl" className="flex flex-col space-y-10  ">
                <div className="flex gap-x-28">
                  <WorkTeam
                    name="Alaa shokry"
                    image={Alaa}
                    linkedIn="https://www.linkedin.com/in/alaa-shokry/"
                    email="alaa.shokry760@gmail.com"
                    github="https://github.com/AlaaShokry76"
                  />
                  <WorkTeam
                    name="Kholoud Osama"
                    image={Khououd}
                    linkedIn="https://www.linkedin.com/in/kholoud-osama-176a99240?trk=contact-info"
                    email=""
                    github="https://github.com/KhouloodOsama"
                  />
                  <WorkTeam
                    name="Shorok Atwa"
                    image={Shrouk}
                    linkedIn="https://www.linkedin.com/in/shorokatwa14"
                    email="shorokrashid14@gmail.com"
                    github="https://github.com/shorokatwa14"
                  />
                  <WorkTeam
                    name="Esraa Ehab"
                    image={Esraa}
                    linkedIn="https://www.linkedin.com/in/esraa-syam17/"
                    email="esraasyam15@gmail.com"
                    github="https://github.com/EsraaSyam"
                  />
                </div>
                <div className="flex gap-x-28">
                  <WorkTeam
                    name="Abdelfatah Mohamed"
                    image={Abdelfatah}
                    linkedIn="https://www.linkedin.com/in/abdelfatah-mohammed-554205282?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                    email="abdelfatahmoha575@gmail.com"
                    github="https://github.com/AbdelfatahMohammed"
                  />
                  <WorkTeam
                    name="Sherry ahmos"
                    image={Sherry}
                    linkedIn="https://www.linkedin.com/in/sherry-ahmos-413a02222/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                    email="sherry.ahmos@gmail.com "
                    github="https://github.com/sherryahmos473"
                  />
                  <WorkTeam
                    name="Radwa Nagy"
                    image={Radwa}
                    linkedIn="https://www.linkedin.com/in/radwa-nagy-3020ab254?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                    email="radwanagy561@gmail.com"
                    github="https://github.com/RadwaNagy44"
                  />
                  <WorkTeam
                    name="Gehad Ahmed"
                    image={Gehad}
                    linkedIn="https://www.linkedin.com/in/gehad-shalaby-7aa3b5250?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                    email="gehadshalaby66@gmail.com"
                    github="https://github.com/Gehad555"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default AboutUS;
