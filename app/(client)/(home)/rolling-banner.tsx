"use client";
import { dummyTrade } from "@/dummy";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const RollingBanner = ({ exchanges }) => {
  const [animate, setAnimate] = useState(true);
  const onStop = () => setAnimate(false);
  const onRun = () => setAnimate(true);

  return (
    <div className="wrapper pt-6">
      <div className="slide_container">
        <ul className="slide_wrapper" onMouseEnter={onStop} onMouseLeave={onRun}>
          <div className={"slide original".concat(animate ? "" : " stop")}>
            {exchanges.map((s, i) => (
              <li key={i} className="w-[40px] md:w-[60px] mx-7 md:mx-14">
                <div className="item">
                  <Image src={s.image_thumb} width={60} height={60} alt="image" />
                </div>
              </li>
            ))}
          </div>
          <div className={"slide clone".concat(animate ? "" : " stop")}>
            {exchanges.map((s, i) => (
              <li key={i} className="w-[40px] md:w-[60px] mx-7 md:mx-14">
                <div className="item">
                  <Image src={s.image_thumb} width={60} height={60} alt="image" />
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
