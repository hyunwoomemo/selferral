"use client";
import { API_URL } from "@/actions";
import Modal from "@/components/ui/modal";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

const Page = () => {
  const token = getCookie("token");
  const params = useSearchParams();
  const uid = params.get("uid");
  const exchange = params.get("exchange");
  const [res, setRes] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  console.log("uid", uid);

  // /exchange/affiliate/:mode/:exchange_id

  useEffect(() => {
    const fetchUid = async () => {
      try {
        setLoading(true);
        const formData = new FormData();

        // formData.append("uid", uid);

        const res = await fetch(`${API_URL}/exchange/affiliate/check/${exchange}`, {
          headers: { authorization: `Bearer ${token}` },
          // body: formData,
          // method: "POST",
        });
        const data = await res.json();

        console.log("data", data);
        if (data.CODE === "EAC000") {
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

  return <Modal>{loading ? "로딩중..." : !res ? "요청에 실패했습니다." : `${res.length}개 조회`}</Modal>;
};

export default Page;
