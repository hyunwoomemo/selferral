"use client";
import Tab from "@/components/tab";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const data = [
  {
    label: "등록 대기",
    value: 0,
  },
  {
    label: "등록 완료",
    value: 1,
  },
  {
    label: "등록 거절",
    value: 2,
  },
];

const Container = () => {
  const [tab, setTab] = useState(data[0].value);
  const router = useRouter();

  useEffect(() => {
    router.push(`/admin/user/uid?type=${tab}`);
  }, [tab]);

  return (
    <div>
      <Tab data={data} tab={tab} setTab={setTab} />
    </div>
  );
};

export default Container;
