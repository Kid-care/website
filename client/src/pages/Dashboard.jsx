import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserStatsAsync,
  fetchAdminCountAsync,
  fetchUserCountAsync,
  fetchAllAdminsAsync,
  logout,
} from "../store/slices/authSlice";
import addAdmin from "../assets/addAdmin.svg";
import Modal from "../components/Modal.jsx";
import deleteAdmin from "../assets/deleteAdmin.svg";
import edit from "../assets/edit.svg";
import EditableTextField from "../components/Input.jsx";
import Logout from "../assets/logout.svg";
import save from "../assets/save.svg";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State for logout modal

  const [showModal, setShowModal] = useState(false);
  const [showVaccinationModal, setShowVaccinationModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    city: "",
    specialization: "",
    password: "",
  });
  const [adminList, setAdminList] = useState([]);
  const [editingAdminId, setEditingAdminId] = useState(null);
  const [editedAdminData, setEditedAdminData] = useState({}); // Initialize as empty object
  const [vaccineData, setVaccineData] = useState({
    vaccineName: "",
    category: "",
  });
  const tableContainerRef = useRef(null);

  const { admins, userCount, adminCount, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(fetchUserStatsAsync());
    dispatch(fetchAdminCountAsync());
    dispatch(fetchUserCountAsync());
    dispatch(fetchAllAdminsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(admins)) {
      setAdminList(admins);
    }
  }, [admins]);

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop =
        tableContainerRef.current.scrollHeight;
    }
  }, [adminList]);

  const handleInputChange = (name, value, id) => {
    if (id) {
      setEditedAdminData((prevState) => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          [name]: value,
        },
      }));
    } else {
      setNewAdmin((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddAdmin = () => {
    setAdminList((prevList) => [
      ...prevList,
      { ...newAdmin, _id: Date.now().toString() },
    ]);
    setNewAdmin({
      name: "",
      email: "",
      phoneNumber: "",
      city: "",
      specialization: "",
      password: "",
    });
    setShowModal(false);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Viewers Statistics",
      },
    },
  };
const viewData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Viewers",
      data: [120, 190, 300, 500, 200, 300],
      backgroundColor: "#28CC9E",
    },
  ],
};
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openVaccinationModal = () => {
    setShowVaccinationModal(true);
  };

  const closeVaccinationModal = () => {
    setShowVaccinationModal(false);
  };

  const handleAddVaccination = () => {
    console.log("Adding Vaccination:", vaccineData);
    setShowVaccinationModal(false);
  };

  const handleEdit = (id) => {
    setEditingAdminId(id);
  };

  const handleDelete = (id) => {
    setAdminList((prevList) => prevList.filter((admin) => admin._id !== id));
  };

  const saveEditedAdmin = (id) => {
    setAdminList((prevList) =>
      prevList.map((admin) =>
        admin._id === id ? { ...admin, ...editedAdminData[id] } : admin
      )
    );
    setEditingAdminId(null); // Clear editing state
  };

  const getCellClass = (id) => {
    return editingAdminId === id
      ? "py-5 text-center ml-10"
      : "py-5 text-center";
  };

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };
  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };
  const confirmLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <div className="m-5 bg-[#FFFFFF] max-h-screen">
        <div className="p-2 bg-[#28CC9E4D] h-[95vh] rounded-[20px]">
          {loading === "pending" && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-around" dir="rtl">
            <div className="flex flex-col gap-3">
              <div>
                <img
                  src={Logout}
                  alt="logout"
                  className="ml-6 cursor-pointer "
                  onClick={openLogoutModal}
                />
              </div>
              <div className="flex gap-x-5  " dir="rtl">
                <div className="bg-[#FFFFFF] p-4 shadow w-[200px] h-[163px] rounded-[20px] text-center">
                  <h2 className="text-2xl font-bold text-center mt-7">
                    {adminCount}
                  </h2>
                  <h2 className="text-[#000000] font-semibold text-[24px] leading-[29.05px] mt-9">
                    الاطباء
                  </h2>
                </div>
                <div className="bg-[#FFFFFF] p-4 shadow w-[200px] h-[163px] rounded-[20px] text-center">
                  <h2 className="text-2xl font-bold text-center mt-7">
                    {userCount}
                  </h2>
                  <h2 className="text-[#000000] font-semibold text-[24px] leading-[29.05px] mt-9">
                    المستخدمين
                  </h2>
                </div>
              </div>
              <div className="bg-[#FFFFFF] w-[414px] h-[264.06px] rounded-[20px] ">
                <h2 className="flex justify-center p-4 text-[#1C1C1C] font-semibold text-[18px] leading-[20px]">
                  {" "}
                  نسبة المشاهدات
                </h2>
                <Bar data={viewData} options={options} />
              </div>
              <div className="bg-[#FFFFFF] w-[414px] h-[264.06px] rounded-[20px] ">
                <h2 className="flex justify-center p-4 text-[#1C1C1C] font-semibold text-[18px] leading-[20px]">
                  {" "}
                  اعمار المستخدمين
                </h2>
              </div>
              <div>
                <button
                  onClick={openVaccinationModal}
                  className="bg-[#28CC9E] text-[#132F2B] text-[22px] text-center rounded-[20px] w-[400px] h-[60px]">
                  إضافة تطعيم{" "}
                </button>
              </div>
            </div>
            <div className="bg-[#FFFFFF] w-[1127px] rounded-[20px]" dir="ltr">
              <h2 className="text-[#000000] font-semibold text-[24px] leading-[29.05px] flex justify-center my-2">
                الاطباء
              </h2>
              <div
                ref={tableContainerRef}
                style={{ maxHeight: "750px", overflowY: "auto" }}
                dir="rtl"
                className="m-3">
                <table className="w-[1060px] bg-white rounded-[20px]" dir="rtl">
                  <thead>
                    <tr className="border-b border-gray-300  ">
                      <th className="py-10 text-center sticky top-0 bg-white z-10">
                        الاسم
                      </th>
                      <th className="py-10 text-center sticky top-0 bg-white z-10">
                        الإيميل
                      </th>
                      <th className="py-10 text-center sticky top-0 bg-white z-10">
                        الرقم
                      </th>
                      <th className="py-10 text-center sticky top-0 bg-white z-10">
                        المحافظة
                      </th>
                      <th className="py-10 text-center sticky top-0 bg-white z-10">
                        التخصص الطبي
                      </th>
                      <th className="py-10 text-center sticky top-0 bg-white z-10">
                        التحكم
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {adminList.length > 0 ? (
                      adminList.map((admin) => (
                        <tr
                          key={admin._id}
                          className="border-b border-gray-300">
                          <td className={getCellClass(admin._id)}>
                            {editingAdminId === admin._id ? (
                              <input
                                type="text"
                                value={
                                  editedAdminData[admin._id]?.name || admin.name
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    "name",
                                    e.target.value,
                                    admin._id
                                  )
                                }
                                className="w-3/4 text-center"
                              />
                            ) : (
                              admin.name
                            )}
                          </td>
                          <td className={getCellClass(admin._id)}>
                            {editingAdminId === admin._id ? (
                              <input
                                type="text"
                                value={
                                  editedAdminData[admin._id]?.email ||
                                  admin.email
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    "email",
                                    e.target.value,
                                    admin._id
                                  )
                                }
                                className="w-3/4 text-center"
                              />
                            ) : (
                              admin.email
                            )}
                          </td>
                          <td className={getCellClass(admin._id)}>
                            {editingAdminId === admin._id ? (
                              <input
                                type="text"
                                value={
                                  editedAdminData[admin._id]?.phoneNumber ||
                                  admin.phoneNumber
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    "phoneNumber",
                                    e.target.value,
                                    admin._id
                                  )
                                }
                                className="w-3/4 text-center"
                              />
                            ) : (
                              admin.phoneNumber
                            )}
                          </td>
                          <td className={getCellClass(admin._id)}>
                            {editingAdminId === admin._id ? (
                              <input
                                type="text"
                                value={
                                  editedAdminData[admin._id]?.city || admin.city
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    "city",
                                    e.target.value,
                                    admin._id
                                  )
                                }
                                className="w-3/4 text-center"
                              />
                            ) : (
                              admin.city
                            )}
                          </td>
                          <td className={getCellClass(admin._id)}>
                            {editingAdminId === admin._id ? (
                              <input
                                type="text"
                                value={
                                  editedAdminData[admin._id]?.specialization ||
                                  admin.specialization
                                }
                                onChange={(e) =>
                                  handleInputChange(
                                    "specialization",
                                    e.target.value,
                                    admin._id
                                  )
                                }
                                className="w-3/4 text-center"
                              />
                            ) : (
                              admin.specialization
                            )}
                          </td>
                          <td className="py-5 flex justify-between text-center">
                            {editingAdminId === admin._id ? (
                              <img
                                src={save}
                                alt="save"
                                onClick={() => saveEditedAdmin(admin._id)}
                                className="cursor-pointer w-[40px]"
                              />
                            ) : (
                              <div className="flex justify-center gap-5">
                                <img
                                  src={edit}
                                  alt="Edit"
                                  className="cursor-pointer"
                                  onClick={() => handleEdit(admin._id)}
                                />
                                <img
                                  src={deleteAdmin}
                                  alt="Delete"
                                  className="cursor-pointer"
                                  onClick={() => handleDelete(admin._id)}
                                />
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="py-2 text-center" colSpan="6">
                          لا توجد بيانات
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="flex justify-center mt-4">
                  <img
                    src={addAdmin}
                    className="cursor-pointer"
                    alt="addAdmin"
                    onClick={openModal}
                  />
                </div>
              </div>
            </div>
          </div>
          {showModal && (
            <Modal closeModal={closeModal} width="1000px" height="550px">
              <div className="bg-white p-8 rounded" dir="rtl">
                <h2
                  dir="rtl"
                  className="text-[22px] font-semibold leading-[26.63px] text-[#000000] flex justify-center">
                  ادخل بيانات الطبيب
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-9 mt-20">
                  <EditableTextField
                    label="اسم المستخدم"
                    initialValue={newAdmin.name}
                    onFieldUpdate={(value) => handleInputChange("name", value)}
                    width="390px"
                    borderWidth="390px"
                    className="text-[#132F2BCC] text-[20px] leading-[20px] tracking-[0.25px] font-normal"
                    dir="rtl"
                  />
                  <EditableTextField
                    label="البريد الالكتروني"
                    initialValue={newAdmin.email}
                    onFieldUpdate={(value) => handleInputChange("email", value)}
                    width="390px"
                    borderWidth="390px"
                    className="text-[#132F2BCC] text-[20px] leading-[20px] tracking-[0.25px] font-normal"
                    dir="rtl"
                  />
                  <EditableTextField
                    label="الرقم الهاتف"
                    initialValue={newAdmin.phoneNumber}
                    onFieldUpdate={(value) =>
                      handleInputChange("phoneNumber", value)
                    }
                    width="390px"
                    borderWidth="390px"
                    className="text-[#132F2BCC] text-[20px] leading-[20px] tracking-[0.25px] font-normal"
                    dir="rtl"
                  />
                  <EditableTextField
                    label="اسم المحافظة"
                    initialValue={newAdmin.city}
                    onFieldUpdate={(value) => handleInputChange("city", value)}
                    width="390px"
                    borderWidth="390px"
                    className="text-[#132F2BCC] text-[20px] leading-[20px] tracking-[0.25px] font-normal"
                    dir="rtl"
                  />
                  <EditableTextField
                    label="اسم التخصص"
                    initialValue={newAdmin.specialization}
                    onFieldUpdate={(value) =>
                      handleInputChange("specialization", value)
                    }
                    width="390px"
                    borderWidth="390px"
                    className="text-[#132F2BCC] text-[20px] leading-[20px] tracking-[0.25px] font-normal"
                    dir="rtl"
                  />
                  <EditableTextField
                    label="الرقم السري"
                    initialValue={newAdmin.password}
                    onFieldUpdate={(value) =>
                      handleInputChange("password", value)
                    }
                    width="390px"
                    borderWidth="390px"
                    className="text-[#132F2BCC] text-[20px] leading-[20px] tracking-[0.25px] font-normal"
                    dir="rtl"
                  />
                </div>
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleAddAdmin}
                    className="bg-[#28CC9E] text-[#132F2B] text-[22px] text-center rounded-[20px] w-[400px] h-[60px]">
                    اضف
                  </button>
                </div>
              </div>
            </Modal>
          )}
          {showVaccinationModal && (
            <Modal
              closeModal={closeVaccinationModal}
              width="1000px"
              height="500px">
              <div className="bg-white p-8 rounded-[20px]" dir="rtl">
                <h2
                  dir="rtl"
                  className="text-[22px] font-semibold leading-[26.63px] text-[#000000] flex justify-center">
                  أضف تطعيم
                </h2>

                <div className="flex justify-between my-24">
                  <EditableTextField
                    label="اسم التطعيم"
                    initialValue={vaccineData.vaccineName}
                    onFieldUpdate={(value) =>
                      setVaccineData((prev) => ({
                        ...prev,
                        vaccineName: value,
                      }))
                    }
                    width="390px"
                    borderWidth="390px"
                    className="text-[#132F2BCC] text-[20px] leading-[20px] tracking-[0.25px] font-normal"
                    dir="rtl"
                  />
                  <EditableTextField
                    label="الفئة"
                    initialValue={vaccineData.category}
                    onFieldUpdate={(value) =>
                      setVaccineData((prev) => ({
                        ...prev,
                        category: value,
                      }))
                    }
                    width="390px"
                    borderWidth="390px"
                    className="text-[#132F2BCC] text-[20px] leading-[20px] tracking-[0.25px] font-normal"
                    dir="rtl"
                  />
                </div>
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleAddVaccination}
                    className="bg-[#28CC9E] text-[#132F2B] text-[22px] text-center rounded-[20px] w-[400px] h-[60px]">
                    اضف
                  </button>
                </div>
              </div>
            </Modal>
          )}
          {showLogoutModal && (
            <Modal closeModal={closeLogoutModal} width="500px" height="250px">
              <div dir="rtl" className="p-10">
                <h2
                  dir="rtl"
                  className="text-[22px] font-semibold leading-[26.63px] text-[#000000] flex justify-center">
                  هل تريد تاكيد تسجيل الخروج ؟
                </h2>

                <div className="flex gap-10 my-12 ">
                  <button
                    onClick={confirmLogout}
                    className="bg-[#28CC9E] text-white text-[22px] text-center rounded-[20px] w-[200px] h-[60px]">
                    تأكيد
                  </button>
                  <button
                    onClick={closeLogoutModal}
                    className="bg-gray-400 text-white text-[22px] text-center rounded-[20px] w-[200px] h-[60px]">
                    إلغاء
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
