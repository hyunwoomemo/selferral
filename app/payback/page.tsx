"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCountUp } from "react-countup";

const Page = () => {
  const router = useRouter();

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
    <div className="p-4 md:p-10">
      <div className="py-3 text-2xl font-bold">
        <p className="">지금 다른 사람들이</p>
        <p>돌려받는 수수료는 얼마?</p>

        <div className="flex py-5 items-end">
          {/* <h1 className="font-bold text-5xl text-orange-400">685,842</h1> */}
          <h1 className="font-bold text-3xl whitespace-nowrap">평균</h1>
          <div ref={countUpRef} className={`font-bold text-5xl text-orange-400 min-w-64 transition-opacity duration-3000 ${countStart ? "opacity-100" : "opacity-0"} text-center`}></div>
          {/* <CountUp className="font-bold text-5xl text-orange-400 min-w-64" end={685842} duration={2}></CountUp> */}
          <h1 className="font-bold text-3xl whitespace-nowrap">원</h1>
        </div>

        <p className="text-gray-400  text-[16px] py-3 ">간단하게 조회하세요. 40초면 끝나요!</p>
      </div>
      <div className="w-full px-2">
        <Button
          onClick={() => router.push("/payback/process/1")}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mb-5 text-orange-400 border-orange-400 dark:text-orange-200 dark:border-orange-200 self-center")}
        >
          <p className="font-bold">나도 거래 수수료 환급받기</p>
        </Button>
      </div>
    </div>
  );
};

export default Page;
