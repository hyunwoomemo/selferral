"use client";
import { API_URL } from "@/actions";
import { getExcelLog } from "@/actions/trade/action";
import Table from "@/components/ui/table";
import { ChevronLeft } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";

// http://api.xn--3l2b13oekp.com

const Container = ({ id, data, image_url }) => {
  console.log("datadatadatadata", data);
  const router = useRouter();

  const tableData = useMemo(() => {
    return data.map((v) => {
      return {
        UID: v.uid,
        커미션: v.commision,
        "거래 시간": moment(v.create_at).format("YYYY-MM-DD HH:mm"),
      };
    });
  }, [data]);

  return (
    <div className="p-8 font-bold flex-auto ">
      <div className="flex gap-4 items-center">
        <ChevronLeft onClick={() => router.push("/admin/affiliate/excel")} className="cursor-pointer" />
        <Image src={`http://api.xn--3l2b13oekp.com/${image_url}`} width={40} height={40} alt="image" />
        <div>{data[0].file_name}</div>
      </div>
      <div className="py-4">
        <Table data={tableData} />
      </div>
    </div>
  );
};

export default Container;
