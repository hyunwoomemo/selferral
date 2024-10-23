"use client";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Banner = ({ banners }) => {
  return (
    <div className="py-20 px-2 max-w-screen-xl mx-auto">
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        {Object.entries(banners).map(([key, data]) => {
          return data.map((banner, index) => {
            return (
              <SwiperSlide id="event-slide" about="" key={index}>
                <div className="w-full max-w-[255px] md:max-w-[400px] cursor-pointer" key={index}>
                  {banner.path && <Image style={{ borderRadius: 20 }} src={banner.path} className="object-cover w-full max-h-[155px]" width={500} height={100} alt="banner image" />}
                  <p className="w-full text-gray-600 dark:text-gray-400 text-sm pt-3">{banner.title}</p>
                  <p className="w-full py-1 text-lg font-bold ">{banner.memo}</p>
                </div>
              </SwiperSlide>
            );
          });
        })}
      </Swiper>
    </div>
  );
};

export default Banner;
