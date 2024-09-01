import { dummyTrade } from "@/dummy";
import Image from "next/image";
import { useState } from "react";

export default function Dropdown({ item, setItem, data, isVisible, setIsVisible }: { item: any; setItem: any; data: any; isVisible: boolean; setIsVisible: any }) {
  return (
    <>
      <div
        onClick={() => setIsVisible((prev) => !prev)}
        className=" flex items-center border md:p-2 border-gray-400 dark:border-white rounded-sm  gap-2 md:gap-4 hover:border-orange-400 hover:dark:border-orange-200 focus-within:dark:border-orange-200 focus-within:border-orange-400 h-[46px] p-2 font-bold md:h-[62px] flex-auto relative z-10 cursor-pointer"
      >
        {item?.image_thumb && (
          <div className="w-[24px] h-[24px] md:w-[36px] md:h-[36px] relative flex justify-center items-center">
            <Image src={item.image_thumb} width={30} height={30} alt="exchange-logo" objectFit="contain" />
          </div>
        )}
        <p className="md:text-2xl">{item?.name}</p>
        <div
          className={`absolute w-[100%] top-[120%] left-0 bg-background rounded-sm opacity-${isVisible ? 100 : 0} ${
            isVisible ? "pointer-events-auto" : "pointer-events-none"
          } transition-opacity duration-300`}
        >
          {data
            .filter((v: any) => v.name !== item.name)
            .map((item: any, index: number, arr: []) => (
              <div onClick={() => setItem(item)} key={index} className={`border flex gap-2 md:gap-4 p-2 py-4 opacity-${isVisible ? 100 : 0} transition-opacity min-w-32 border-1`}>
                {item.round_image && (
                  <div className="w-[24px] h-[24px] md:w-[36px] md:h-[36px] relative flex justify-center items-center">
                    <Image src={item.round_image} alt="exchange-logo" objectFit="contain" />
                  </div>
                )}
                <p className="md:text-2xl">{item.name}</p>
              </div>
            ))}
        </div>
      </div>
      <div onClick={() => setIsVisible(false)} className={`bg-black absolute top-0 left-0 right-0 bottom-0  ${isVisible ? "pointer-events-auto opacity-5" : "pointer-events-none opacity-0"}`}></div>
    </>
  );
}
