"use client";
import React, { useState } from "react";

const ExchangeTab = ({ data, tab, setTab }) => {
  console.log("data", data);
  return (
    <div className="py-4 flex gap-2">
      <div onClick={() => setTab("all")} className={tab === "all" ? "text-orange-400  cursor-pointer" : "text-black dark:text-white cursor-pointer"}>
        전체
      </div>
      {data.map((v) => (
        <div key={v.id} onClick={() => setTab(v.id)} className={tab === v.id ? "text-orange-400 cursor-pointer" : "text-black dark:text-white  cursor-pointer"}>
          {v.name}
        </div>
      ))}
    </div>
  );
};

export default ExchangeTab;
