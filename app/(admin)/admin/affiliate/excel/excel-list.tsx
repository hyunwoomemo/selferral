"use client";
import { getExcel } from "@/actions/trade/action";
import Pagination from "@/components/pagination";
import Table from "@/components/ui/table";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";

const ExcelList = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState();

  const [total, setTotal] = useState(1);

  useEffect(() => {
    getExcel({ num: 10, page: page || 1 }).then((res) => {
      setData(res.data.list);
      setTotal(res.data.total);
    });

    window?.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  console.log("data", data);

  const tableData = useMemo(() => {
    if (!data) return;

    return data.map((v) => ({
      날짜: moment(v.create_at).add(9, "hour").format("YYYY-MM-DD HH:mm"),
      파일명: v.file_name,
      상태: v.status
        .split(",")
        .filter((v) => Number(v.slice(v.lastIndexOf("|") + 1) > 0))
        .map((v, i, arr) => ` ${v.slice(0, v.indexOf("|"))} ${v.slice(v.lastIndexOf("|") + 1)} ${arr.length - 1 !== i ? "/" : ""}`),
    }));
  }, [data]);

  return (
    <div className="pt-10">
      <p>업로드 내역</p>

      <div>
        {/* {data?.map((v) => (
          <div className="py-1 flex gap-2">
            <p>{v.file_name}</p>
            <p>{moment(v.create_at).format("YYYY-MM-DD HH:mm")}</p>
          </div>
        ))} */}
        <Table data={tableData} />
      </div>
      <div className="pt-10">
        <Pagination total={total} page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default ExcelList;
