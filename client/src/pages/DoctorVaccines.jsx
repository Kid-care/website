import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getData, postData } from "../Services/apiCalls";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import chatbot from "../assets/ChatBot.svg";
import previous from "../assets/Vector.png";

const DoctorVaccines = () => {
  const [query, setQuery] = useState("");
  const [list, setList] = useState([]);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [categories, setCategories] = useState([]);
  const [tempList, setTempList] = useState([]);
  const [loading, setLoading] = useState(false);
  const patientID = localStorage.getItem("patientID");

  useEffect(() => {
    const filteredList = list.filter((item) => item.name.includes(query));
    if(query !== ""){
      setList(filteredList);
    }else{
      setList(tempList);
    }
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getData("item/get_Item", {}, category);
      let temp = response.map((item) => {
        return { name: item.name, id: item._id };
      });
      setCategories(temp);
      setLoading(false);
    };
    if (category !== "") {
      fetchData();
    }
  }, [category, list]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getData("item/get_Item", {}, type);
      setList(response);
      setTempList(response)
      setLoading(false);
    };
    if (type !== "") {
      fetchData();
    }
  }, [type]);

  const handleClick = async (e, name) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      const response = await postData("Admin/create_Item", { name }, {}, category, patientID);
      console.log(response);
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-[#f6f6f6] minHeight">
        <div dir="rtl" className="mt-[100px] container mx-auto py-6 px-4 ">
          <div className="flex justify-end">
            <Link to="/previous-vaccinations" className="flex w-fit gap-2 items-center text-lg relative text-[#000000CC] mb-4 outline-none">
              <div className="absolute h-[2px] w-full bg-[#000000CC] bottom-0" />
              التطعيمات السابقة <img src={previous} alt="" />
            </Link>
          </div>
          <h1 className="text-center font-semibold  text-2xl mt-12 mb-6">التطعيمات</h1>
          <div className="flex gap-2 justify-center mb-12">
            <input onChange={(e) => setQuery(e.target.value)} className="text-right border-[#28CC9E] focus:outline-none min-w-[350px] rounded-lg" type="text" placeholder="ابحث" />
            <select onChange={(e) => setCategory(e.target.value)} className="w-[200px] text-right border-[#28CC9E] focus:outline-none rounded-lg">
              <option value="">اختر تصنيف التطعيم</option>
              <option value="662676e2454b048d7b203f3b">تطعيمات الاطفال</option>
              <option value="662677eb9ad7dd36168b89ed">تطعيمات الحوامل</option>
              <option value="6628fb667fa22e55072ca293">تطعيمات السفر</option>
              <option value="6664d153066089b0f8abed6c">تطعيمات الاوبئة</option>
            </select>
            <select onChange={(e) => setType(e.target.value)} className="w-[200px] text-right border-[#28CC9E] focus:outline-none rounded-lg">
              <option value="">اختر نوع التطعيم</option>
              {categories.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {!loading && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-[70px]">
              {list.map((item, index) => (
                <div className="bg-white p-6 rounded-xl flex flex-row items-center justify-between" key={index}>
                  <h4 className="text-center text-xl font-semibold">{item.name}</h4>
                  <input type="checkbox" onChange={(e) => handleClick(e, item.name)} name="" id="" />
                </div>
              ))}
            </div>
          )}
          {loading && category !== "" && <div className="text-center text-xl font-semibold">جاري التحميل</div>}
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

export default DoctorVaccines;
