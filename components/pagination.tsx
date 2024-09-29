import { cn } from "@/lib/utils";
import React from "react";

const Pagination = ({ page = 1, total, offset = 10, setPage }) => {
  return (
    <div className="flex gap-1">
      {Array(Math.ceil(total / offset))
        .fill("")
        .map((v, i) => (
          <div onClick={() => setPage(i + 1)} className={cn("w-10 h-10 flex justify-center items-center cursor-pointer rounded-full", page === i + 1 ? "bg-orange-400 text-white" : "bg-gray-100")}>
            {i + 1}
          </div>
        ))}
    </div>
  );
};

export default Pagination;
