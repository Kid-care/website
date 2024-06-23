import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData } from "../Services/apiCalls";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Slider from "./Slider";

import chatbot from "../assets/ChatBot.svg";

const MedicalHistory = () => {
  const [loading1, setLoading1] = useState(false);
  const [chronicList, setChronicList] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [diagnosisList, setDiagnosisList] = useState([]);
  const [loading3, setLoading3] = useState(false);
  const [surgeryList, setSurgeryList] = useState([]);
  const patientID = localStorage.getItem("patientID");

  useEffect(() => {
    const fetchChronic = async () => {
      setLoading1(true);
      const data = await getData("Admin/getItemsByCategory", {}, "66266c73a068dc4d7041b9fd", patientID);
      if (data) {
        setChronicList(data);
        setLoading1(false);
      }
    };
    fetchChronic();
  }, []);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      setLoading2(true);
      const data = await getData("Admin/getItemsByCategory", {}, "663a30f85bfb6ddbdb483a6d", patientID);
      if (data) {
        setDiagnosisList(data);
        setLoading2(false);
      }
    };
    fetchDiagnosis();
  }, []);

  useEffect(() => {
    const fetchSurgery = async () => {
      setLoading3(true);
      const data = await getData("Admin/getItemsByCategory", {}, "6626784f9ad7dd36168b89f0", patientID);
      if (data) {
        setSurgeryList(data);
        setLoading3(false);
      }
    };
    fetchSurgery();
  }, []);

  return (
    <>
      <Navbar />
      <section dir="rtl" className="bg-[#f6f6f6] minHeight">
        <div className="mt-[100px] container mx-auto py-6 px-4">
          <h3 className="mt-[50px] mb-12 text-center font-semibold text-xl">الامراض المزمنة</h3>
          {loading1 ? <p className="text-center font-medium text-lg">جاري التحميل</p> : <Slider data={chronicList} className="mb-12" type="chronic" colors={{ bgColor: "#28CC9E4D", headerBg: "#FFFFFF", headerColor: "#196B69" }} />}
          <h3 className="mt-[50px] mb-12 text-center font-semibold text-xl">التشخيصات الطبية</h3>
          {loading2 ? <p className="text-center font-medium text-lg">جاري التحميل</p> : <Slider data={diagnosisList} className="mb-12" type="diagnosis" colors={{ bgColor: "#FFFFFF", headerBg: "#28CC9E4D", headerColor: "#000000" }} />}
          <h3 className="mt-[50px] mb-12 text-center font-semibold text-xl">العمليات الجراحية</h3>
          {loading3 ? <p className="text-center font-medium text-lg">جاري التحميل</p> : <Slider data={surgeryList} className="mb-12" type="surgery" colors={{ bgColor: "#37C8BF4D", headerBg: "#FFFFFF", headerColor: "#196B69" }} />}
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

export default MedicalHistory;
