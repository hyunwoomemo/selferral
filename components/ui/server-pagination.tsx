"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const ServerPagination = ({ offset, total, link }) => {
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    router.push(`${link}&page=${page}`);
  }, [page]);

  const pageData = useMemo(() => {
    if (offset > total) return;

    const page = Math.ceil(total / offset);

    return Array(page)
      .fill("")
      .map((_, i) => (
        <div key={i} onClick={() => setPage(i + 1)} className="px-2 py-1 bg-gray-100">
          {i + 1}
        </div>
      ));
  }, [offset, total]);

  if (offset > total) return;

  return <div className="flex gap-3">{pageData}</div>;
};

export default ServerPagination;
