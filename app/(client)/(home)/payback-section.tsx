"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { dummyTrade } from "@/dummy";
import { cn } from "@/lib/utils";
import { HandCoins } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCountUp } from "react-countup";
import { Swiper, SwiperSlide } from "swiper/react";
import { info } from "../../action";

const PaybackSection = () => {
  const countUpRef = useRef(null);
  const [countStart, setCountStart] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const options = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.1, // 50% of the element is visible
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Start CountUp animation
          // countUpRef?.current.start();
          setCountStart(true);
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(countUpRef?.current);

    return () => {
      setCountStart(false);

      observer.disconnect();
    };
  }, []);

  const { start, pauseResume, reset, update } = useCountUp({
    ref: countUpRef,
    start: 1,
    end: 685842,
    delay: 0,
    duration: 2,
    onReset: () => console.log("Resetted!"),
    onUpdate: () => console.log("Updated!"),
    onPauseResume: () => console.log("Paused or resumed!"),
    // onStart: ({ pauseResume }) => console.log(pauseResume),
    // onEnd: ({ pauseResume }) => console.log(pauseResume),
  });

  useEffect(() => {
    pauseResume();
  }, []);

  useEffect(() => {
    if (countStart) {
      start();
    }
  }, [countStart, update]);

  return (
    <div className="py-20 md:py-36 my-12 flex flex-col-reverse md:flex-row gap-8 md:gap-28 justify-center items-center bg-gray-50 dark:bg-gray-900 bg-gradient-to-t to-gray-50 from-gray-100 dark:from-gray-950">
      <div className="flex-1  flex flex-col gap-5 items-center">
        <p className="font-bold text-orange-400">손쉽게 확인해 보세요! </p>
        <h1 className="font-bold text-3xl">셀퍼럴닷컴 이용자님들의</h1>
        <h1 className="font-bold text-3xl ">예상 페이백은</h1>
        <div className="flex justify-center items-end">
          {/* <h1 className="font-bold text-5xl text-orange-400">685,842</h1> */}
          <h1 className="font-bold text-3xl whitespace-nowrap">평균</h1>
          <div ref={countUpRef} className={`font-bold text-5xl text-orange-400 min-w-64 transition-opacity duration-3000 ${countStart ? "opacity-100" : "opacity-0"} text-center`}></div>
          {/* <CountUp className="font-bold text-5xl text-orange-400 min-w-64" end={685842} duration={2}></CountUp> */}
          <h1 className="font-bold text-3xl whitespace-nowrap">원</h1>
        </div>
        <Button
          onClick={() => router.push("/payback")}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full max-w-64 text-orange-400 border-orange-400 dark:text-orange-200 dark:border-orange-200")}
        >
          <p className="font-bold">내 예상 페이백 확인하기</p>
        </Button>
      </div>
      <div className="w-full max-w-[700px]  min-h-60 flex-1  rounded-md px-8 md:px-2 gap-4 md:gap-10 flex md:grid md:grid-cols-4 items-center justify-center">
        {dummyTrade.map((item, index) => (
          <div key={index} className="w-12 h-12 md:w-20 md:h-20  relative flex flex-auto md:justify-center items-center justify-self-center">
            <Image src={item.image} objectFit="contain" className="text-center" alt="trade-logo" />
          </div>
        ))}
        {/* <Swiper slidesPerView={5}>
          {dummyTrade.map((item, index) => (
            <SwiperSlide key={index}>
              <Image src={item.image} />
            </SwiperSlide>
          ))}
        </Swiper> */}
      </div>
    </div>
  );
};

export default PaybackSection;
