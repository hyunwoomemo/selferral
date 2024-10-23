import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import React from "react";

const Pagination = ({ page = 1, total, offset = 10, setPage, group, setGroup, totalGroup, setTotalGroup, totalPage }) => {
  if (total / offset <= 1) {
    return;
  }

  const handleMove = (type) => {
    if (type === "prev") {
      // if (page - 1 <= 0) return;

      // if (page % 5 === 1) {
      //   setPage((prev) => prev - 1);
      //   setGroup((prev) => prev - 1);
      // } else {
      //   setPage((prev) => prev - 1);
      // }

      if (group === 1) return;
      setGroup((prev) => prev - 1);
      setPage((group - 2) * 10 + 1);
    } else {
      // if (totalPage < page + 1) return;

      // if (page % 5 === 0) {
      //   setPage((prev) => prev + 1);
      //   setGroup((prev) => prev + 1);
      // } else {
      //   setPage((prev) => prev + 1);
      // }

      if (totalGroup < group + 1) return;

      setGroup((prev) => prev + 1);
      setPage(group * 10 + 1);
    }
  };

  console.log("asdasd", page, group, totalGroup);

  return (
    <div className="flex gap-5 justify-center items-center">
      <ChevronsLeft
        className={page === 1 ? "opacity-20" : "opacity-100"}
        onClick={() => {
          setGroup(1);
          setPage(1);
        }}
      />
      <ChevronLeft className={`${group === 1 ? "opacity-20" : "opacity-100"}`} onClick={() => handleMove("prev")} />
      {Array(totalPage > 10 ? 10 : totalPage)
        .fill("")
        .map((v, i) => {
          if ((group - 1) * 10 + i + 1 > totalPage) return;

          return (
            <div
              key={(group - 1) * 10 + i + 1}
              onClick={() => setPage((group - 1) * 10 + i + 1)}
              className={cn("w-10 h-10 flex justify-center items-center cursor-pointer rounded-full", page === (group - 1) * 10 + i + 1 ? "bg-orange-400 text-white" : "bg-gray-100")}
            >
              {(group - 1) * 10 + i + 1}
            </div>
          );
        })}
      <ChevronRight className={`${totalGroup < group + 1 ? "opacity-20" : "opacity-100"}`} onClick={() => handleMove("next")} />
      <ChevronsRight
        className={page === total ? "opacity-20" : "opacity-100"}
        onClick={() => {
          setGroup(totalGroup);
          setPage(totalPage);
        }}
      />
    </div>
  );
};

export default Pagination;
