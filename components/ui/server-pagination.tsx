"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const ServerPagination = ({ offset, total, link }) => {
  const [page, setPage] = useState(1);
  const router = useRouter();

  console.log("page", page);

  useEffect(() => {
    router.push(`${link}&page=${page}`);
  }, [page]);

  const pageData = useMemo(() => {
    if (offset > total) return;

    const totalPage = Math.ceil(total / offset);

    return Array(totalPage)
      .fill("")
      .map((_, i) => (
        <div
          key={i}
          onClick={() => setPage(i + 1)}
          className={cn("w-10 h-10 flex justify-center items-center cursor-pointer rounded-full", page == i + 1 ? "bg-orange-400 text-white" : "bg-gray-100")}
        >
          {i + 1}
        </div>
      ));
  }, [offset, total, page]);

  if (offset > total) return;

  return <div className="flex gap-3">{pageData}</div>;
};

export default ServerPagination;
