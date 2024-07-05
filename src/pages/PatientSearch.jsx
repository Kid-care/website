import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../Services/apiCalls";
import image from "../assets/patientSearch.png";
import logo from "../assets/LOGO.svg";

const PatientSearch = () => {
  const [email, setEmail] = useState("");
  const [NationalID, setNationalId] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    const response = await postData("search/userSearch", { email, NationalID });
    console.log(response);
    if (response.status === true) {
      localStorage.setItem("patientID", response.user._id);
      
      navigate("/");
    }
  };

  return (
    <section className="flex h-screen">
      <div className="basis-1/2 py-16 px-12 bg-[#28CC9E4D]">
        <img src={image} alt="" />
      </div>
      <div className="basis-1/2 py-16 px-12 relative flex flex-col items-center justify-center">
        <div className="flex justify-end absolute right-12 top-0">
          <Link to="/">
            <img className="size-[80px]" src={logo} alt="" />
          </Link>
        </div>
        <div className="text-right">
          <h2 className="text-[#132F2B] font-semibold text-xl mb-8">ادخل بيانات المريض</h2>
          <div className="flex flex-col gap-8 mb-8">
            <input onChange={(e) => setEmail(e.target.value)} className="text-right border-[#28CC9E] focus:outline-none min-w-[350px] rounded-lg" type="text" placeholder="البريد الالكتروني" />
            <input onChange={(e) => setNationalId(e.target.value)} className="text-right border-[#28CC9E] focus:outline-none min-w-[350px] rounded-lg" type="text" placeholder="الرقم القومي" />
          </div>
          <button onClick={handleSearch} className="bg-[#28CC9E] min-w-[350px] py-3 rounded-lg text-lg font-semibold">
            التالي
          </button>
        </div>
      </div>
    </section>
  );
};

export default PatientSearch;
