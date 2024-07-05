import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getData } from "../Services/apiCalls";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import chatbot from "../assets/ChatBot.svg";
import empty from "../assets/empty.png";

const PreviousVaccinations = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const patientID = localStorage.getItem("patientID");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getData("Admin/getItemsByCategory", {}, category, patientID);
      setList(response);
      setLoading(false);
    };
    if (category !== "") {
      fetchData();
    }
  }, [category]);

  return (
    <>
      <Navbar />
      <section className="bg-[#f6f6f6] minHeight">
        <div dir="rtl" className="mt-[100px] container mx-auto py-6 px-4 ">
          <h1 className="text-center font-semibold  text-2xl mt-12 mb-12">التطعيمات السابقة</h1>
          <div className="flex gap-2 justify-center mb-12">
            <select onChange={(e) => setCategory(e.target.value)} className="w-[200px] text-right border-[#28CC9E] focus:outline-none rounded-lg">
              <option value="">اختر تصنيف التطعيم</option>
              <option value="662676e2454b048d7b203f3b">تطعيمات الاطفال</option>
              <option value="662677eb9ad7dd36168b89ed">تطعيمات الحوامل</option>
              <option value="6628fb667fa22e55072ca293">تطعيمات السفر</option>
              <option value="6664d153066089b0f8abed6c">تطعيمات الاوبئة</option>
            </select>
          </div>
          {loading ? (
            <p className="text-center text-xl font-semibold">جاري التحميل</p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {list.map((item, index) => (
                <div className="bg-white p-4 cardShadow flex flex-row-reverse justify-between" key={index}>
                  <span>{item.createdAt.split("T")[0]}</span>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          )}
          {!loading && list.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-12">
              <img src={empty} alt="empty" />
              <p className="text-center text-xl font-semibold">لا يوجد سجلات سابقة</p>
            </div>
          )}
        </div>
      </section>
      <div className="fixed bottom-[100px] left-[100px] z-50 py-3  bg-[#196B69] w-[82px] h-[82px] flex items-center justify-center rounded-full">
        <Link to="/ChatBot">
          <img src={chatbot} className="  " alt="chatbot" />
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default PreviousVaccinations;
