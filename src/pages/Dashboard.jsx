import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserStatsAsync,
  fetchAdminCountAsync,
  fetchUserCountAsync,
  fetchAllAdminsAsync,
  addAdminAsync,
  addVaccinationAsync,
  updateAdminAsync,
  deleteAdminAsync,
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
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
  const [editedAdminData, setEditedAdminData] = useState({});
  const [vaccineData, setVaccineData] = useState({
    vaccineName: "",
    category: "",
  });
  const tableContainerRef = useRef(null);

  const { admins, userCount, adminCount, ageGroups, loading } = useSelector(
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
  const handleDeleteRaw = async (email, token) => {
    try {
      await dispatch(deleteAdminAsync(email, token));
      setAdminList((prevList) =>
        prevList.filter((admin) => admin.email !== email)
      );
    } catch (error) {
      console.error("Error deleting admin:", error);
      // Handle error state if necessary
    }
  };
  const handleAddAdmin = async () => {
    try {
      await dispatch(addAdminAsync(newAdmin));
      // Optionally, clear form inputs or close modal here
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
      // Close modal or reset UI state as needed
      setShowModal(false);
    } catch (error) {
      console.error("Error adding admin:", error);
      // Handle error state if necessary
    }
  };

  const ageData = {
    labels: ["0-18", "19-35", "36-60", "Other"],
    datasets: [
      {
        data: [
          ageGroups["0-18"],
          ageGroups["19-35"],
          ageGroups["36-60"],
          ageGroups["61-infinity"],
        ],
        backgroundColor: ["#1C1C1C99", "#196B69", "#28CC9E4D", "#28CC9E"],
        hoverBackgroundColor: ["#1C1C1C99", "#196B69", "#28CC9E4D", "#28CC9E"],
      },
    ],
  };

  const ageOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "",
      },
      animation: {
        animateRotate: true,
        animateScale: true,
      },
    },
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

  const saveEditedAdmin = (id) => {
    const adminData = {
      name: editedAdminData[id].name,
      email: editedAdminData[id].email,
      phoneNumber: editedAdminData[id].phoneNumber,
      city: editedAdminData[id].city,
      specialization: editedAdminData[id].specialization,
    };

    dispatch(updateAdminAsync(adminData));
    setEditingAdminId(null);
  };
  const handleEdit = (id) => {
    const admin = adminList.find((admin) => admin._id === id);
    if (admin) {
      setEditedAdminData((prevState) => ({
        ...prevState,
        [id]: { ...admin },
      }));
    }
    setEditingAdminId(id);
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

  const handleAddVaccination = async () => {
    try {
      const { vaccineName, category } = vaccineData;

      // Add validation here if needed for vaccineName and categoryId

      // Call your asynchronous action to add vaccination
      await dispatch(addVaccinationAsync({ id: category, name: vaccineName }));

      // Optionally, reset the form or close the modal after successful addition
      setVaccineData({
        vaccineName: "",
        category: "",
      });
      setShowVaccinationModal(false);
    } catch (error) {
      console.error("Error adding vaccination:", error);
      // Handle error state if necessary
    }
  };

  return (
    <>
      <div className="m-5 bg-[#FFFFFF] max-h-screen">
        <div className="p-8 bg-[#28CC9E4D] h-[95vh] rounded-[20px]">
          {loading === "pending" && <p className="animate-pulse">Loading...</p>}
          <div className="flex justify-around" dir="rtl">
            <div className="flex flex-col gap-8 mt-[-20px]">
              <div>
                <img
                  src={Logout}
                  alt="logout"
                  className="ml-7 cursor-pointer "
                  onClick={openLogoutModal}
                />
              </div>
              <div className="flex  flex-col gap-y-8  " dir="rtl">
                <div className="bg-[#FFFFFF]  shadow w-[414px] h-[164px] rounded-[20px] text-center flex justify-around items-center ">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-[30px] font-bold text-center ">
                      {adminCount}
                    </h2>
                    <h2 className="text-[#000000] font-semibold text-[24px] leading-[29.05px] ">
                      الاطباء
                    </h2>
                  </div>
                </div>
                <div className="bg-[#FFFFFF]  shadow w-[414px] h-[164px] rounded-[20px] text-center flex justify-around items-center">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-[30px] font-bold text-center ">
                      {userCount}
                    </h2>
                    <h2 className="text-[#000000] font-semibold text-[24px] leading-[29.05px] ">
                      المستخدمين
                    </h2>
                  </div>
                </div>
              </div>

              <div className="bg-[#FFFFFF] w-[414px] h-[264.06px] rounded-[20px] ">
                <div className="p-2">
                  <h2 className="flex justify-center p-2 text-[#1C1C1C] font-semibold text-[18px] leading-[20px]">
                    اعمار المستخدمين
                  </h2>
                </div>
                <div className="flex  justify-between ">
                  <div className="flex flex-col gap-5 py-6 w-[200px]" dir="ltr">
                    <div className="flex justify-around ">
                      <span className="text-[#1C1C1C] text-[16px] leading-[18px] font-normal ">
                        0-18
                      </span>
                      <span className="text-[#1C1C1C] text-[16px] leading-[18px] font-normal ">
                        {Math.ceil((ageGroups["0-18"] / userCount) * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-around">
                      <span className="text-[#1C1C1C] text-[16px] leading-[18px] font-normal ">
                        19-35
                      </span>
                      <span className="text-[#1C1C1C] text-[16px] leading-[18px] font-normal ">
                        {Math.ceil((ageGroups["19-35"] / userCount) * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-around">
                      <span className="text-[#1C1C1C] text-[16px] leading-[18px] font-normal ">
                        36-60
                      </span>
                      <span className="text-[#1C1C1C] text-[16px] leading-[18px] font-normal ">
                        {Math.ceil((ageGroups["36-60"] / userCount) * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-around">
                      <span className="text-[#1C1C1C] text-[16px] leading-[18px] font-normal ">
                        Other
                      </span>
                      <span className="text-[#1C1C1C] text-[16px] leading-[18px] font-normal ">
                        {Math.ceil(
                          (ageGroups["61-infinity"] / userCount) * 100
                        )}
                        %
                      </span>
                    </div>
                  </div>
                  <div className=" w-[200px]  ">
                    <Doughnut data={ageData} options={ageOptions} />
                  </div>
                </div>
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
                                value={editedAdminData[admin._id]?.name}
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
                                value={editedAdminData[admin._id]?.email}
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
                                value={editedAdminData[admin._id]?.phoneNumber}
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
                                value={editedAdminData[admin._id]?.city}
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
                                  editedAdminData[admin._id]?.specialization
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
                                  onClick={() => handleDeleteRaw(admin.email)}
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
