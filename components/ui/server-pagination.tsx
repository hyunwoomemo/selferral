"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const ServerPagination = ({ offset, total, link, serverPage, home }) => {
  const [page, setPage] = useState(1);
  const [group, setGroup] = useState(1);
  const [totalGroup, setTotalGroup] = useState(1);

  console.log("totalGroup", totalGroup, group);

  const router = useRouter();
  const totalPage = Math.ceil(total / offset);

  console.log("page", page, serverPage);

  // useEffect(() => {
  //   if (!serverPage && home) {
  //     router.replace(home);
  //   }
  // }, [serverPage, home]);

  useEffect(() => {
    // if (page == 1) return;

    if (link.includes("?")) {
      router.replace(`${link}&page=${page}`);
    } else {
      router.replace(`${link}?page=${page}`);
    }
  }, [page]);

  const pageData = useMemo(() => {
    if (offset > total) return;

    setTotalGroup(Math.ceil(totalPage / 10));

    return Array(totalPage > 10 ? 10 : totalPage)
      .fill("")
      .map((_, i) => (
        <div
          key={(group - 1) * 10 + i + 1}
          onClick={() => setPage((group - 1) * 10 + i + 1)}
          className={cn("w-10 h-10 flex justify-center items-center cursor-pointer rounded-full", (serverPage || page) == (group - 1) * 10 + i + 1 ? "bg-orange-400 text-white" : "bg-gray-100")}
        >
          {(group - 1) * 10 + i + 1}
        </div>
      ));
  }, [offset, total, page, serverPage]);

  if (offset > total) return;

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

  return (
    <div className="flex gap-3 justify-center">
      <div className="flex gap-5 items-center">
        <ChevronLeft className={`${group === 1 ? "opacity-20" : "opacity-100"}`} onClick={() => handleMove("prev")} />
        {pageData}
        {/* <div>...</div>
        <div
          key={totalPage}
          onClick={() => setPage(totalPage)}
          className={cn("w-10 h-10 flex justify-center items-center cursor-pointer rounded-full", serverPage == totalPage ? "bg-orange-400 text-white" : "bg-gray-100")}
        >
          {totalPage}
        </div> */}
        <ChevronRight className={`${totalGroup < group + 1 ? "opacity-20" : "opacity-100"}`} onClick={() => handleMove("next")} />
      </div>
    </div>
  );
};

export default ServerPagination;
