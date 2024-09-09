import { dummyTrade } from "@/dummy";
import Image from "next/image";
import { useState } from "react";

export default function Dropdown({ item, setItem, data, isVisible, setIsVisible }: { item: any; setItem: any; data: any; isVisible: boolean; setIsVisible: any }) {
  console.log("data", data);

  return (
    <>
      <div
        onClick={() => setIsVisible((prev) => !prev)}
        className=" flex items-center border md:p-2 border-gray-300 dark:border-gray-600 rounded-sm  gap-2 md:gap-4 hover:border-orange-400 hover:dark:border-orange-200 focus-within:dark:border-orange-200 focus-within:border-orange-400 h-[46px] p-2 font-bold md:h-[62px]  relative z-10 cursor-pointer w-[150px] sm:w-[200px] w-full"
      >
        {item?.image_thumb && (
          <div className="w-[24px] h-[24px] md:w-[36px] md:h-[36px] relative flex justify-center items-center">
            <Image src={item.image_thumb} width={30} height={30} alt="exchange-logo" objectFit="contain" />
          </div>
        )}
        <p className=" text-gray-600 font-bold dark:text-gray-200 white">{item?.name}</p>
        <div
          className={`absolute w-[100%] top-[103%] border border-gray-100 dark:border-gray-800 left-0 bg-background rounded-sm opacity-${isVisible ? 100 : 0} ${
            isVisible ? "pointer-events-auto" : "pointer-events-none"
          } transition-opacity duration-300`}
        >
          {data
            .filter((v: any) => v.name !== item.name)
            .map((item: any, index: number, arr: []) => (
              <div
                onClick={() => setItem(item)}
                key={index}
                className={`flex items-center mt-1  border-b border-gray-100 dark:border-gray-800 md:p-2  gap-2 md:gap-4 hover:border-orange-400 hover:dark:border-orange-200 focus-within:dark:border-orange-200 focus-within:border-orange-400 h-[46px] p-2 font-bold md:h-[62px]  relative z-10 cursor-pointer w-full`}
              >
                {item?.image_thumb && (
                  <div className="w-[24px] h-[24px] md:w-[36px] md:h-[36px] relative flex justify-center items-center">
                    <Image src={item.image_thumb} width={30} height={30} alt="exchange-logo" objectFit="contain" />
                  </div>
                )}
                <p className="font-bold text-gray-600 dark:text-gray-200">{item.name}</p>
              </div>
            ))}
        </div>
      </div>
      <div onClick={() => setIsVisible(false)} className={`bg-black absolute top-0 left-0 right-0 bottom-0  ${isVisible ? "pointer-events-auto opacity-0" : "pointer-events-none opacity-0"}`}></div>
    </>
  );
}
