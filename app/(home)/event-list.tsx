"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { dummyEvent } from "@/dummy";
import "swiper/css";

const EventList = () => {
  return (
    <div className="py-20 max-w-screen-xl mx-auto">
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        {dummyEvent.map((dummy, index) => (
          <SwiperSlide id="event-slide" about="" key={index}>
            <div className="w-full max-w-[155px] md:max-w-[200px]" key={index}>
              <Image style={{ borderRadius: 20 }} src={dummy.image} className="object-cover w-full max-h-[155px]" alt="eventImage" />
              {/* <div className="relative w-full"> */}
              {/* <Image className="rounded-lg object-cover" src={dummy.image} fill alt="eventImage" /> */}
              {/* <div className="relative"> */}
              {/* </div> */}
              {/* </div> */}
              <p className="w-full text-gray-600 dark:text-gray-400 text-sm pt-3">{dummy.title}</p>
              <p className="w-full py-1 text-lg font-bold ">{dummy.contents}</p>
              <div className="flex gap-1 text-sm text-gray-600 dark:text-gray-200">
                <p>{dummy.sdate}</p>
                <p>~</p>
                <p>{dummy.edate}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EventList;
