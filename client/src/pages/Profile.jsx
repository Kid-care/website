import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import AddUser from "../components/AddUser";
import addUserIcon from "../assets/addUser.svg";
import addIcon from "../assets/addAccount.svg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getDataFromBackendAsync,
  sendDataToBackendAsync,
  getUserDataAsync,
  logout,
  setToken,
} from "../store/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const getAccounts=() => {
  const storedAccounts = localStorage.getItem("accounts");
  if (storedAccounts) {
    return JSON.parse(storedAccounts);
  } 
  return [];

}


const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);
  const [inputFieldsData, setInputFieldsData] = useState([]);
  const [birthdate, setBirthdate] = useState({ day: "", month: "", year: "" });
  const [bloodType, setBloodType] = useState("");
  const [accounts, setAccounts] = useState(getAccounts());
  const [currentUser, setCurrentUser] = useState(user);
  const patientID = localStorage.getItem("patientID");

  const role = localStorage.getItem("role");
  console.log(role);

  useEffect(() => {
    if (token) {
      if (role === "admin") {
        dispatch(getUserDataAsync({ token, id: patientID }));
     
      } else {
        dispatch(getDataFromBackendAsync(token));
      }
    }
  }, [dispatch, token, role]);





  console.log(user);
  useEffect(() => {
    if (user) {
      // setCurrentUser(user);
      initializeInputFields(user);
    }
  }, [user]);

  const initializeInputFields = (user) => {
    setInputFieldsData([
      { id: 1, label: "اسم المستخدم", initialValue: user.userName || "" },
      { id: 2, label: "اسم الاب", initialValue: user.fatherName || "" },
      { id: 3, label: "رقم الهاتف", initialValue: user.phoneNumber || "" },
      { id: 4, label: "البريد الالكتروني", initialValue: user.email || "" },
      { id: 5, label: "اسم الام", initialValue: user.motherName || "" },
      { id: 6, label: "الرقم القومي", initialValue: user.NationalID || "" },
    ]);

    if (user.birthDate) {
      const [year, month, day] = user.birthDate.split("/");
      setBirthdate({ day: day || "", month: month || "", year: year || "" });
    } else {
      setBirthdate({ day: "", month: "", year: "" });
    }

    setBloodType(user.bloodType || "");
  };

  const handleFieldUpdate = (fieldId, updatedValue) => {
    const updatedData = inputFieldsData.map((field) =>
      field.id === fieldId ? { ...field, initialValue: updatedValue } : field
    );
    setInputFieldsData(updatedData);
  };

  const handleSave = () => {
    const updatedData = {
      userName: inputFieldsData.find((field) => field.label === "اسم المستخدم")
        .initialValue,
      fatherName: inputFieldsData.find((field) => field.label === "اسم الاب")
        .initialValue,
      phoneNumber: inputFieldsData.find((field) => field.label === "رقم الهاتف")
        .initialValue,
      email: inputFieldsData.find(
        (field) => field.label === "البريد الالكتروني"
      ).initialValue,
      motherName: inputFieldsData.find((field) => field.label === "اسم الام")
        .initialValue,
      NationalID: inputFieldsData.find(
        (field) => field.label === "الرقم القومي"
      ).initialValue,
      birthDate: `${birthdate.year}/${birthdate.month}/${birthdate.day}`,
      bloodType: bloodType,
    };

    dispatch(sendDataToBackendAsync({ token, data: updatedData }));
  };

  const handleAddAccount = async () => {
    // Redirect to login page to add a new account
    navigate("/login");
  };

  const handleSwitchAccount = (account) => {
        // initializeInputFields(account);

    if (role === "admin") {
      dispatch(getUserDataAsync({ token, id: patientID }));
    } else {
      dispatch(getDataFromBackendAsync(account.token));
      
          dispatch(setToken(account.token));

      console.log({ account });
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <>
      <main>
        <header>
          <Navbar />
        </header>

        <div className="flex justify-center items-center gap-80 " dir="rtl">
          <div dir="rtl" className="">
            <aside className="bg-[#28CC9E4D] w-[350px] h-screen flex flex-col items-center fixed top-0 right-0 z-40">
              <div className="w-[250px] m-28  flex flex-col h-screen space-y-32">
                <div className=" flex flex-col   items-center text-center gap-y-5 ">
                  <div className="rounded-full  w-[121.08px] h-[130.51px] bg-[#B4B4B4] flex items-center justify-center  cursor-pointer">
                    <img
                      src={addUserIcon}
                      alt="user"
                      className="w-[72.65px] h-[78.3px]"
                    />
                  </div>
                  <h3 className="text-center cursor-pointer text-[#000000] text-[20px] leading-[20px] tracking-[0.25px]">
                    {currentUser.email}
                  </h3>
                </div>

                <div className=" flex flex-col gap-4">
                  {accounts.map((account) => (
                    <div
                      key={account.id}
                      account={account}
                      isActive={account === currentUser}
                      onClick={() => handleSwitchAccount(account)}>
                      <AddUser account={account} />
                    </div>
                  ))}

                  <div>
                    <div className="flex gap-4 w-[178.88px] items-center ">
                      <div
                        className="rounded-full w-[37.25px] h-[40.16px] bg-[#B4B4B4] flex items-center justify-center cursor-pointer"
                        onClick={handleAddAccount}>
                        <img
                          src={addIcon}
                          alt="addUser"
                          className="w-[22.35px] h-[24.09px]"
                        />
                      </div>
                      <h3 className="cursor-pointer text-[#000000CC] text-[16px] leading-[20px] tracking-[0.25px]">
                        اضافة حساب جديد
                      </h3>
                    </div>
                  </div>
                </div>
                <div className=" text-center">
                  <button
                    onClick={handleLogout}
                    className="bg-[#28CC9E] w-[234px] h-[57.46px] rounded-[20px] text-[#132F2B] text-center text-[18px]
                    leading-[20px] tracking
-[0.25px]">
                    تسجيل الخروج
                  </button>
                </div>
              </div>
            </aside>
          </div>

          {/* Main Content */}
          <div dir="rtl" className="p-20 mt-16 ">
            <main className="bg-gradient-to-r from-[#28CC2F1F] to-[#28CC9E33] rounded-[20px] w-[1230px] h-[700px] flex flex-col justify-around">
              <div className="p-6 m-5">
                <div>
                  <h1 className="text-center text-[22px] leading-[20px] tracking-[0.25px] text-[#000000] font-[Roboto] font-semibold">
                    الحساب الشخصي
                  </h1>
                </div>
                {/* Form Fields */}
                <div className="flex flex-col justify-between py-5">
                  <div className="flex justify-between items-center">
                    {/* First Column of Inputs */}
                    <div className="flex flex-col space-y-10">
                      {inputFieldsData.slice(0, 3).map((field) => (
                        <Input
                          key={field.id}
                          label={field.label}
                          initialValue={field.initialValue}
                          onFieldUpdate={(updatedValue) =>
                            handleFieldUpdate(field.id, updatedValue)
                          }
                          width="390px"
                          borderWidth="390px"
                        />
                      ))}
                    </div>
                    {/* Second Column of Inputs */}
                    <div className="flex flex-col space-y-10">
                      {inputFieldsData.slice(3).map((field) => (
                        <Input
                          key={field.id}
                          label={field.label}
                          initialValue={field.initialValue}
                          onFieldUpdate={(updatedValue) =>
                            handleFieldUpdate(field.id, updatedValue)
                          }
                          width="390px"
                          borderWidth="390px"
                        />
                      ))}
                    </div>
                  </div>
                  {/* Birthdate and Blood Type */}
                  <div dir="rtl" className="flex justify-between items-center">
                    {/* Birthdate */}
                    <div className="flex flex-col gap-3">
                      <label className="text-[#00000099] my-6">
                        تاريخ الميلاد
                      </label>
                      <div
                        className="flex items-center  justify-between w-[390px] "
                        dir="rtl">
                        <div dir="rtl">
                          <Input
                            label="اليوم"
                            initialValue={birthdate.day}
                            onFieldUpdate={(updatedValue) =>
                              setBirthdate({ ...birthdate, day: updatedValue })
                            }
                            width="90px"
                            borderWidth="90px"
                          />
                        </div>
                        <div>
                          <Input
                            label="الشهر"
                            initialValue={birthdate.month}
                            onFieldUpdate={(updatedValue) =>
                              setBirthdate({
                                ...birthdate,
                                month: updatedValue,
                              })
                            }
                            width="90px"
                            borderWidth="90px"
                          />
                        </div>
                        <div>
                          <Input
                            htmlFor=""
                            label="السنة"
                            initialValue={birthdate.year}
                            onFieldUpdate={(updatedValue) =>
                              setBirthdate({ ...birthdate, year: updatedValue })
                            }
                            width="90px"
                            borderWidth="90px"
                          />
                        </div>
                      </div>
                      <div>
                        <Link
                          className="  text-[#132F2BB2] tracking-wide text-lg "
                          to="/ForgetPassword"
                          dir="rtl">
                          نسيت الرقم السري ؟
                        </Link>{" "}
                      </div>
                    </div>

                    {/* Blood Type */}
                    <div className="flex flex-col w-[390px] my-5">
                      <label htmlFor="bloodTypes" className="text-[#00000099]">
                        فصيلة الدم
                      </label>
                      <div className="mt-5 ">
                        <select
                          id="bloodTypes"
                          className="w-[70px]  h-[50px] bg-[#28CC2F1F] focus:outline-none"
                          value={bloodType}
                          onChange={(e) => setBloodType(e.target.value)}>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center w-full ">
                  <button
                    onClick={handleSave}
                    className="bg-[#28CC9E] text-center rounded-[20px] text-[22px] leading-[20px] tracking-[0.25px] text-[#132F2B] w-[400px] h-[60px]">
                    حفظ
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </main>
    </>
  );
};

export default Profile;
