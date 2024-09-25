"use client";
import Tab from "@/components/tab";
import { CalendarDaysIcon, Plus } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const tabData = [
  {
    value: 1,
    label: "사용중",
  },
  {
    value: 0,
    label: "사용안함",
  },
];

const Container = ({ data, exchanges }) => {
  const router = useRouter();
  const [tab, setTab] = useState(tabData[0].value);

  const renderItem = useCallback(() => {
    return (
      <div className="gap-5">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {data
            .sort((a, b) => a.order - b.order)
            .filter((v) => v.status === 1)
            .map((v, i) => {
              const exchange = exchanges.find((v1) => v1.exchange_id === v.exchange_id);

              return (
                <SwiperSlide id="event-slide" about="" key={i} className="relative">
                  <div className="">
                    <div className="w-full max-w-[155px] md:max-w-[200px] cursor-pointer" key={i} onClick={() => router.push(`/admin/exchange/event/edit/${v.id}`)}>
                      <Image style={{ borderRadius: 20 }} width={200} height={180} src={`http://api.xn--3l2b13oekp.com${v.path}`} className="object-cover w-full max-h-[180px]" alt="eventImage" />
                      {/* <div className="relative w-full"> */}
                      {/* <Image className="rounded-lg object-cover" src={dummy.image} fill alt="eventImage" /> */}
                      {/* <div className="relative"> */}
                      {/* </div> */}
                      {/* </div> */}
                      <p className="w-full font-bold text-gray-400  pt-3">{v.title}</p>
                      <p className="w-full py-1 text-lg font-bold break-keep">{v.memo}</p>
                      <div className="flex gap-1 text-xs text-gray-600 dark:text-gray-200">
                        <CalendarDaysIcon size={16} />
                        <p>{moment(v.starttime).format("YYYY-MM-DD")}</p>
                        <p>~</p>
                        <p>{moment(v.endtime).format("YYYY-MM-DD")}</p>
                      </div>
                    </div>
                    {exchange && exchange.image_thumb && <Image src={exchange.image_thumb} width={45} height={45} className="absolute top-[-15px] right-[-15px]" alt="logo" />}
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    );
  }, [data]);

  return (
    <div>
      <Link href={"/admin/exchange/event/add"} className="p-5 my-10 bg-gray-100 flex gap-2 rounded-md hover:bg-orange-50 cursor-pointer hover:text-orange-500">
        <Plus />
        <p>이벤트 추가</p>
      </Link>
      {/* <div className="pb-10">
        <Tab data={tabData} tab={tab} setTab={setTab} />
      </div> */}
      {renderItem()}
    </div>
  );
};

export default Container;
