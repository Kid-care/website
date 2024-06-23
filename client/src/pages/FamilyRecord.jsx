import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getData } from "../Services/apiCalls";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AddIllnessModal from "../components/AddIllnessModal";

import chatbot from "../assets/ChatBot.svg";
import image from "../assets/familyRecord.svg";
import heart from "../assets/heart.png";
import empty from "../assets/empty.png";

const FamilyRecord = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const role = localStorage.getItem("role");
  const patientID = localStorage.getItem("patientID");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getData("Admin/getItemsByCategory", {}, "66266c65a068dc4d7041ba00", patientID);
      setList(response);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <section className="bg-[#f6f6f6] minHeight">
        <div className="mt-[100px] container mx-auto py-6 px-4 flex gap-12">
          <div className="pt-12 basis-1/3">
            <img src={image} alt="" />
          </div>
          <div className="pt-24 basis-2/3 flex flex-col gap-6">
            {loading ? (
              <p className="text-right text-xl font-semibold">جاري التحميل</p>
            ) : (
              list.map((item, index) => (
                <Accordion key={index} className="group">
                  <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                    <p className="text-right ml-auto font-semibold text-xl">{item.name}</p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="mb-4 flex items-center justify-end gap-2">
                      <img className="size-[35px]" src={heart} alt="" />
                      <div className="text-right text-[#2CB438] font-semibold text-xl flex flex-row-reverse gap-1">
                        <span>نصائح لحمايتك من </span>
                        <span>{item.name}</span>
                      </div>
                    </div>
                    <p className="text-right ml-auto text-[#000000BF] text-lg">{item.advice}</p>
                  </AccordionDetails>
                </Accordion>
              ))
            )}
            {!loading && list.length === 0 && (
              <div className="flex flex-col justify-end items-end">
                <div>
                  <img className="max-w-[350px] mb-5" src={empty} alt="" />
                  <p className="text-center text-lg font-semibold">لا يوجد سجلات حتى الآن</p>
                </div>
              </div>
            )}
            {role === "admin" && <AddIllnessModal />}
          </div>
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

export default FamilyRecord;
