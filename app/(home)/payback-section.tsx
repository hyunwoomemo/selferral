"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useCountUp } from "react-countup";

const PaybackSection = () => {
  const countUpRef = useRef(null);
  const [countStart, setCountStart] = useState(false);

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
    onStart: ({ pauseResume }) => console.log(pauseResume),
    onEnd: ({ pauseResume }) => console.log(pauseResume),
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
    <div className="py-20 md:py-48 flex flex-col md:flex-row gap-28 justify-center items-center ">
      <div className="flex-1  flex flex-col gap-5 items-center">
        <p className="font-bold text-orange-400">손쉽게 확인해 보세요! {countStart ? "true" : "false"}</p>
        <h1 className="font-bold text-3xl">예상 페이맥 평균</h1>
        <div className="flex justify-center items-end">
          {/* <h1 className="font-bold text-5xl text-orange-400">685,842</h1> */}
          <div ref={countUpRef} className={`font-bold text-5xl text-orange-400 min-w-64 transition-opacity duration-3000 ${countStart ? "opacity-100" : "opacity-0"} text-center`}></div>
          {/* <CountUp className="font-bold text-5xl text-orange-400 min-w-64" end={685842} duration={2}></CountUp> */}
          <h1 className="font-bold text-3xl whitespace-nowrap">원 입니다.</h1>
        </div>
        <Button className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full max-w-64 text-orange-400 border-orange-400 dark:text-orange-200 dark:border-orange-200")}>
          <p className="font-bold">내 예상 페이백 확인하기</p>
        </Button>
      </div>
      <div className="w-full min-h-60 flex-1 flex justify-center items-center bg-gray-100 dark:bg-stone-800 rounded-md">
        {/* <Image src={require("@/assets/img_sec2_mainimg.png")} width={280} height={303} alt="image" /> */}
        거래소 이미지
      </div>
    </div>
  );
};

export default PaybackSection;
