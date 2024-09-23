"use client";
import { useToast } from "@/hooks/useToast";
import React, { useState } from "react";

const Switch = ({ active, setActive }) => {
  // const [active, setActive] = useState(false);

  const { addToast } = useToast();

  return (
    <div
      className={`hidden lg:inline-block ${active ? "bg-orange-400 dark:bg-orange-600" : "bg-gray-200 dark:bg-gray-400"}`}
      onClick={(e) => {
        e.stopPropagation();
        setActive((prev) => !prev);
      }}
      style={{ position: "relative", width: 60, height: 30, borderRadius: 30 }}
    >
      <div
        style={{
          position: "absolute",
          backgroundColor: "#fff",
          width: 26,
          height: 26,
          top: "50%",
          left: !active ? 3 : "52%",
          // right: active ? 3 : undefined,
          transform: "translateY(-50%)",
          borderRadius: 30,
          transition: "all .3s",
        }}
      ></div>
    </div>
  );
};

export default Switch;
