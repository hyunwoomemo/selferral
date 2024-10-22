"use client";
import { getExcel } from "@/actions/trade/action";
import Pagination from "@/components/pagination";
import Table from "@/components/ui/table";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

const ExcelList = ({ exchanges }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState();

  const [total, setTotal] = useState(1);

  console.log("exchangesexchanges", exchanges);

  useEffect(() => {
    getExcel({ num: 10, page: page || 1 }).then((res) => {
      setData(res.data.list);
      setTotal(res.data.total);
    });

    window?.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  console.log("getExcelgetExcelgetExcel", data);

  const tableData = useMemo(() => {
    if (!data) return;

    return data.map((v) => ({
      날짜: moment(v.create_at).add(9, "hour").format("YYYY-MM-DD HH:mm"),
      거래소: exchanges.find((v1) => v1.id == v.exchange_id) && (
        <Image width={40} height={40} src={`http://api.xn--3l2b13oekp.com${exchanges.find((v1) => v1.id === v.exchange_id).image_thumb}`} alt="exchangelogo" />
      ),
      파일명: v.file_name,
      // 상태: v.status
      //   .split(",")
      //   .filter((v) => Number(v.slice(v.lastIndexOf("|") + 1) > 0))
      //   .map((v, i, arr) => ` ${v.slice(0, v.indexOf("|"))} ${v.slice(v.lastIndexOf("|") + 1)} ${arr.length - 1 !== i ? "/" : ""}`),
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
        {data ? <Table wide={false} data={tableData} /> : <div className="py-4">데이터가 존재하지 않습니다.</div>}
      </div>
      <div className="pt-10">
        <Pagination total={total} page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default ExcelList;
