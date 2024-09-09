"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Title = ({ text, buttons }: { text: string; buttons?: Array<any> }) => {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2 justify-between items-center  py-2 bg-white dark:bg-gray-950  rounded-md">
      <div onClick={() => router.back()} className="md:px-2 cursor-pointer">
        <ChevronLeft />
      </div>
      <div className="flex-auto">{text}</div>
      <div className="flex gap-4">
        {/* <LogoutButton /> */}
        {buttons?.map((v, i) => {
          return <React.Fragment key={i}>{v}</React.Fragment>;
        })}
        {/* <WithdrawalButton />
      <LogoutButton /> */}
      </div>
    </div>
  );
};

export default Title;
