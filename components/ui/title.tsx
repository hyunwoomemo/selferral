"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Title = ({ text, buttons }: { text: string; buttons?: Array<any> }) => {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center p-5 bg-white dark:bg-gray-950  rounded-md">
      <div onClick={() => router.back()} className="px-2 cursor-pointer">
        <ChevronLeft />
      </div>
      <div className="flex-auto">{text}</div>
      <div className="flex gap-4">
        {/* <LogoutButton /> */}
        {buttons?.map((v) => v)}
        {/* <WithdrawalButton />
      <LogoutButton /> */}
      </div>
    </div>
  );
};

export default Title;
