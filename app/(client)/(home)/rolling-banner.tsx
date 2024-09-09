"use client";
import { dummyTrade } from "@/dummy";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const RollingBanner = () => {
  const [animate, setAnimate] = useState(true);
  const onStop = () => setAnimate(false);
  const onRun = () => setAnimate(true);

  return (
    <div className="wrapper pt-6">
      <div className="slide_container">
        <ul className="slide_wrapper" onMouseEnter={onStop} onMouseLeave={onRun}>
          <div className={"slide original".concat(animate ? "" : " stop")}>
            {dummyTrade.map((s, i) => (
              <li key={i} className="w-[40px] md:w-[60px] mx-7 md:mx-14">
                <div className="item">
                  <Image src={s.round_image} alt="image" />
                </div>
              </li>
            ))}
          </div>
          <div className={"slide clone".concat(animate ? "" : " stop")}>
            {dummyTrade.map((s, i) => (
              <li key={i} className="w-[40px] md:w-[60px] mx-7 md:mx-14">
                <div className="item">
                  <Image src={s.round_image} alt="image" />
                </div>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default RollingBanner;
