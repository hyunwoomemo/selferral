"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { dummyEvent } from "@/dummy";
import "swiper/css";
import moment from "moment";
import { CalendarDaysIcon } from "lucide-react";

const EventList = ({ data }) => {
  return (
    <div className="py-10 px-2 max-w-screen-xl mx-auto">
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        {data.map((v, index) => (
          <SwiperSlide id="event-slide" about="" key={index}>
            <div className="w-full max-w-[155px] md:max-w-[200px] cursor-pointer" key={index} onClick={() => v.link && v.link != "null" && window.open(v.link)}>
              <Image style={{ borderRadius: 20 }} width={200} height={180} src={`http://api.xn--3l2b13oekp.com${v.path}`} className="object-cover w-full max-h-[180px]" alt="eventImage" />
              {/* <div className="relative w-full"> */}
              {/* <Image className="rounded-lg object-cover" src={dummy.image} fill alt="eventImage" /> */}
              {/* <div className="relative"> */}
              {/* </div> */}
              {/* </div> */}
              <p className="text-sm w-full font-bold text-gray-400  pt-3">{v.title}</p>
              <p className="text-sm md:text-[16px] w-full py-1  font-bold break-keep">{v.memo}</p>
              <div className="flex gap-1 text-[10px] md:text-xs text-gray-600 dark:text-gray-200">
                <CalendarDaysIcon size={16} />
                <p>{moment(v.starttime).format("YYYY-MM-DD")}</p>
                <p>~</p>
                <p>{moment(v.endtime).format("YYYY-MM-DD")}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EventList;
