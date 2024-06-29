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
import profileIcon from "../assets/iconamoon_profile.svg";
import { FaUserCircle, FaTimes } from "react-icons/fa"; // FontAwesome icons

const getAccounts = () => {
  const storedAccounts = localStorage.getItem("accounts");
  return storedAccounts ? JSON.parse(storedAccounts) : [];
};

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
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar state

  const role = localStorage.getItem("role");

  useEffect(() => {
    if (token) {
      if (role === "admin") {
        dispatch(getUserDataAsync({ token, id: patientID }));
      } else {
        dispatch(getDataFromBackendAsync(token));
      }
    }
  }, [dispatch, token, role]);

  useEffect(() => {
    if (user) {
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
    navigate("/login");
  };

  const handleSwitchAccount = (account) => {
    if (role === "admin") {
      dispatch(getUserDataAsync({ token, id: patientID }));
    } else {
      dispatch(getDataFromBackendAsync(account.token));
      dispatch(setToken(account.token));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <main>
        <header>
          <Navbar />
        </header>

        <div
          className="flex flex-col md:flex-row justify-around items-center p-4 md:p-0"
          dir="rtl">
          <button
            onClick={toggleSidebar}
            className="fixed top-10 left-5 z-50 rounded-md md:hidden">
            <img src={profileIcon} alt="profile icon" className="w-6 h-6" />
          </button>

          <div
            className={`fixed top-0 z-40 ${
              sidebarOpen ? "left-0" : "-left-full"
            } z-40 transition-transform duration-300 transform md:left-auto md:right-0`}>
            <aside className="bg-[#BFF0E2] w-[350px] h-screen flex flex-col items-center">
              <div className="w-[250px] m-28 flex flex-col h-screen space-y-32">
                <div className="flex flex-col items-center text-center gap-y-5">
                  <div className="rounded-full w-[121.08px] h-[130.51px] bg-[#B4B4B4] flex items-center justify-center cursor-pointer">
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

                <div className="flex flex-col gap-4">
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
                    <div className="flex gap-4 w-[178.88px] items-center">
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
                <div className="text-center">
                  <button
                    onClick={handleLogout}
                    className="bg-[#28CC9E] w-[234px] h-[57.46px] rounded-[20px] text-[#132F2B] text-center text-[18px] leading-[20px] tracking-[0.25px]">
                    تسجيل الخروج
                  </button>
                </div>
              </div>
            </aside>
          </div>

          <div dir="rtl" className="sm:p-16 sm:w-[1200px] sm:mt-12 sm:mr-[200px]">
            <main className="bg-gradient-to-r from-[#28CC2F1F] to-[#28CC9E33] rounded-[20px] max-w-full h-full sm:h-min flex flex-col  items-center justify-around mt-16">
              <div className="p-20 w-full h-full sm:p-10">
                <div>
                  <h1 className="text-center text-[22px] leading-[20px] tracking-[0.25px] text-[#000000] font-[Roboto] font-semibold">
                    الحساب الشخصي
                  </h1>
                </div>

                <div className="flex flex-col md:flex-row gap-10 justify-between pt-12">
                  <div className="flex flex-col space-y-10 ">
                    {inputFieldsData.slice(0, 3).map((field) => (
                      <Input
                        key={field.id}
                        label={field.label}
                        initialValue={field.initialValue}
                        onFieldUpdate={(updatedValue) =>
                          handleFieldUpdate(field.id, updatedValue)
                        }
                        width="300px"
                        borderWidth="300px"
                      />
                    ))}
                  </div>
                  <div className="flex flex-col space-y-10 md:mr-10">
                    {inputFieldsData.slice(3).map((field) => (
                      <Input
                        key={field.id}
                        label={field.label}
                        initialValue={field.initialValue}
                        onFieldUpdate={(updatedValue) =>
                          handleFieldUpdate(field.id, updatedValue)
                        }
                        width="300px"
                        borderWidth="300px"
                      />
                    ))}
                  </div>
                </div>

                <div
                  className="flex  flex-col md:flex-row justify-between items-center "
                  dir="rtl">
                  {/* Birthdate */}
                  <div className="flex  w-[350px] flex-col gap-10 ">
                    <label className="text-[#00000099]  ">
                      تاريخ الميلاد
                    </label>
                    <div className="flex  md:flex-row md:gap-4">
                      <div className="flex flex-col w-full md:w-[130px]">
                        <label
                          className="text-[#00000099] mb-2"
                          htmlFor="dayInput">
                          اليوم
                        </label>
                        <Input
                          id="dayInput"
                          initialValue={birthdate.day}
                          onFieldUpdate={(updatedValue) =>
                            setBirthdate({ ...birthdate, day: updatedValue })
                          }
                          width="70%"
                          borderWidth="70%"
                        />
                      </div>
                      <div className="flex flex-col w-full md:w-[130px]">
                        <label
                          className="text-[#00000099] mb-2"
                          htmlFor="monthInput">
                          الشهر
                        </label>
                        <Input
                          id="monthInput"
                          initialValue={birthdate.month}
                          onFieldUpdate={(updatedValue) =>
                            setBirthdate({ ...birthdate, month: updatedValue })
                          }
                          width="70%"
                          borderWidth="70%"
                        />
                      </div>
                      <div className="flex flex-col w-full md:w-[130px]">
                        <label
                          className="text-[#00000099] mb-2"
                          htmlFor="yearInput">
                          السنة
                        </label>
                        <Input
                          id="yearInput"
                          initialValue={birthdate.year}
                          onFieldUpdate={(updatedValue) =>
                            setBirthdate({ ...birthdate, year: updatedValue })
                          }
                          width="70%"
                          borderWidth="70%"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link
                        className="text-[#132F2BB2] tracking-wide text-lg"
                        to="/ForgetPassword"
                        dir="rtl">
                        نسيت الرقم السري؟
                      </Link>{" "}
                    </div>
                  </div>

                  <div className="flex flex-col w-full md:w-[100px] my-3 sm:ml-[200px] ">
                    <label htmlFor="bloodTypes" className="text-[#00000099]">
                      فصيلة الدم
                    </label>
                    <div className="mt-2 md:mt-5">
                      <select
                        id="bloodTypes"
                        className="w-full h-[50px] bg-[#28CC2F1F] focus:outline-none"
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

                <div className="text-center w-full">
                  <button
                    onClick={handleSave}
                    className="bg-[#28CC9E] text-center rounded-[20px] text-[22px] leading-[20px] tracking-[0.25px] text-[#132F2B] w-full md:w-[400px] h-[60px]">
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
