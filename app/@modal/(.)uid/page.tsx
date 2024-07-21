"use client";
import Modal from "@/components/ui/modal";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const params = useSearchParams();
  const uid = params.get("uid");
  const exchange = params.get("exchange");
  const [res, setRes] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUid = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/search/${exchange?.toLowerCase()}?uid=${uid}`);
        const data = await res.json();

        console.log("data", data);
        if (data.CODE === "US000") {
          setRes(data.DATA);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchUid();
    }
  }, [uid]);

  return <Modal>{loading ? "로딩중..." : !res ? "요청에 실패했습니다." : res.retMsg ? res.retMsg : res.result.uid + " 조회에 성공했습니다."}</Modal>;
};

export default Page;
