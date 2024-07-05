import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import AddHistoryModal from "../components/AddHistoryModal";

import empty from "../assets/empty.png";

const Slider = ({ data, type, colors }) => {
  const role = localStorage.getItem("role");

  return (
    <div>
      <Swiper
        rtl="true"
        className="mb-6"
        slidesPerGroup={1}
        pagination={{ dynamicBullets: true }}
        modules={[Pagination]}
        spaceBetween={30}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {data.length === 0 && (
          <SwiperSlide className="mb-6">
            <div className="bg-[#E6E6E6] h-[308px] rounded-lg flex flex-col gap-2 justify-center items-center p-4">
              <img src={empty} alt="" />
              <p className="font-semibold text-lg">لا يوجد بيانات حاليا</p>
            </div>
          </SwiperSlide>
        )}
        {data.map((item, index) => (
          <SwiperSlide className="mb-6" key={index}>
            <div className={`bg-[${colors.bgColor}] p-4 rounded-lg border-2 border-[#28CC9E]`}>
              <h4 className={`text-center text-xl bg-[${colors.headerBg}] w-fit mx-auto py-2 px-3 rounded-2xl text-[${colors.headerColor}] font-medium mb-4`}>{item.name}</h4>
              <p className="text-center  font-semibold mb-6">الملاحظات</p>
              <p className="mb-6 text-lg">{item.advice}</p>
              <div className="flex items-center justify-between">
                <span>{item.doctor}</span>
                <span>{item.createdAt.split("T")[0]}</span>
              </div>
            </div>
            <div className="hidden bg-[#37C8BF4D]" />
          </SwiperSlide>
        ))}
        {role === "admin" && (
          <SwiperSlide className="mb-6">
            <div className="bg-[#E6E6E6] hover:bg-[#a8a5a5] duration-200 h-[212px] rounded-lg flex justify-center items-center">
              <AddHistoryModal type={type} />
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default Slider;
