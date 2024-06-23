import { useState } from "react";
import { postData } from "../Services/apiCalls";

import Modal from "@mui/material/Modal";

import plus from "../assets/plus.png";

const AddHistoryModal = ({ type }) => {
  const [open, setOpen] = useState(false);
  const [doctor, setDoctor] = useState("");
  const [illnes, setIllnes] = useState("");
  const [notes, setNotes] = useState("");
  const [number, setNumber] = useState(1);
  const [inputValues, setInputValues] = useState(Array(number).fill(""));
  const patientID = localStorage.getItem("patientID");

  const handleInputChange = (index, event) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
  };

  const handleClick = () => {
    if (number < 3) {
      setNumber((prevNumber) => prevNumber + 1);
      setInputValues([...inputValues, ""]);
    }
  };

  const handleSubmit = async () => {
    let category = "";
    if (type === "chronic") {
      category = "66266c73a068dc4d7041b9fd";
    } else if (type === "diagnosis") {
      category = "663a30f85bfb6ddbdb483a6d";
    }else{
      category = "6626784f9ad7dd36168b89f0";
    }
    const response = await postData("Admin/create_Item", { doctor, name: illnes, advice: notes }, {}, category, patientID);
    console.log(response);
    if (response.success === true) {
      console.log("Success");
      setOpen(false);
      window.location.reload();
    }
    console.log(response);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-white py-2 px-4 rounded-lg text-8xl">
        <i className="fa-solid fa-plus"></i>
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="bg-white p-6 sm:p-12 border-[1.5px] border-[#28CC9E] rounded-xl w-[300px] sm:w-[450px] lg:w-[800px]">
            <div className="text-right mb-12 flex flex-row-reverse items-center">
              <i className="fa-solid fa-x text-xl cursor-pointer" onClick={() => setOpen(false)}></i>
              <h4 className="font-semibold text-xl grow text-center">ادخل بيانات المرض</h4>
            </div>
            <div className="flex items-center justify-between gap-12">
              <div className="flex justify-end text-right mb-8 basis-1/2">
                <input onChange={(e) => setIllnes(e.target.value)} type="text" className="text-right border-[#28CC9E] focus:outline-none w-full  rounded-lg" placeholder="اسم المرض" />
              </div>
              <div className="flex justify-end text-right mb-8 basis-1/2">
                <input onChange={(e) => setDoctor(e.target.value)} type="text" className="text-right border-[#28CC9E] focus:outline-none w-full rounded-lg" placeholder="اسم الطبيب" />
              </div>
            </div>
            <div className="flex justify-end text-right mb-8">
              <textarea onChange={(e) => setNotes(e.target.value)} className="text-right border-[#28CC9E] outline-none w-full h-[300px] rounded-lg resize-none" placeholder="اضف ملاحظة"></textarea>
            </div>
            {/* <div dir="rtl" className="grid grid-cols-2 gap-6 justify-end mb-8">
              {Array.from({ length: number }, (_, index) => (
                <input onChange={(event) => handleInputChange(index, event)} key={index} type="text" className="text-right border-[#28CC9E] focus:outline-none w-full rounded-lg basis-1/2" placeholder="اسم الدواء" />
              ))}
              <div className="basis-1/2 flex justify-center">
                <button onClick={handleClick}>
                  <img className="size-[40px]" src={plus} alt="" />
                </button>
              </div>
            </div> */}
            <div className="flex justify-center">
              <button onClick={handleSubmit} className="bg-[#28CC9E] text-lg py-2 w-[60%] rounded-lg">
                اضف
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddHistoryModal;
