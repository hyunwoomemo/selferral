"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const TOTAL = 4;

export default function ProgressBar({ width }) {
  console.log("widtrh,", width);

  return <div style={{ width: width }} className={`h-[4px] bg-orange-200 fixed top-15 left-0 z-10 transition-all duration-300 rounded-lg`}></div>;
  // return <div className={`w-[25%] h-[2px] bg-orange-200 absolute top-0 left-0 z-10`}></div>;
}
