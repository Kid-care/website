import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { getData } from "../Services/apiCalls";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import chatbot from "../assets/ChatBot.svg";

const EpidemicVaccinationType = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const { id } = useParams();
  
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await getData("item/get_Item", {}, id);
      setList(response);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <section className="bg-[#f6f6f6] minHeight">
        <div dir="rtl" className="mt-[100px] container mx-auto py-6 px-4 ">
          <h1 className="text-center font-semibold  text-2xl mt-12 mb-12">تطعيمات الاوبئة</h1>
          {loading ? (
            <div className="text-center text-xl font-semibold">جاري التحميل</div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-[70px]">
              {list.map((item, index) => (
                <div  className="bg-[#28CC9E4D] hover:bg-[#6bb19e4d] duration-200 p-6 rounded-xl" key={index}>
                  <h4 className="text-center text-xl font-semibold">{item.name}</h4>
                </div>
              ))}
            </div>
          )}
          {!loading && list.length === 0 && (
            <div className="text-center text-xl font-semibold">لا يوجد بيانات</div>  
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
  )
}

export default EpidemicVaccinationType