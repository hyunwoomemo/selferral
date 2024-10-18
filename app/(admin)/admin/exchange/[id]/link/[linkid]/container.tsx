"use client";
import { editLinksForm } from "@/actions/trade/action";
import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import Switch from "@/components/ui/switch";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const keys = ["payback", "discount", "market_order", "limit_order", "tag", "status", "average_refund", "affiliate_join_url", "refund"];

const Container = ({ exchangeId, link, linkId }) => {
  const [values, setValues] = useState({});
  const { addToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const data = {};

    for (const key in link) {
      if (keys.includes(key)) {
        data[key] = link[key];
      }
    }

    setValues(data);
  }, [link]);

  console.log("vvv", values);

  const handleAdd = async () => {
    const formData = new FormData();

    for (const key in values) {
      if (values[key]) {
        formData.append(key, values[key]);
      }
    }
    const res = await editLinksForm({ id: exchangeId, linkId: linkId, formData });

    console.log("addddd res", res);

    if (res && res.link_id) {
      addToast({ text: "수정되었습니다." });
      router.push(`/admin/exchange/list?exchangeId=${exchangeId}`);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-1 flex-col gap-5">
        <Input value={values.payback} label={"페이백"} type="number" unit="%" onChange={(e) => setValues((prev) => ({ ...prev, payback: e.target.value }))} />
        <Input value={values.discount} label={"할인"} type="number" unit="%" onChange={(e) => setValues((prev) => ({ ...prev, discount: e.target.value }))} />
        <Input value={values.limit_order} label={"지정가"} type="number" unit="%" onChange={(e) => setValues((prev) => ({ ...prev, limit_order: e.target.value }))} />
        <Input value={values.market_order} label={"시장가"} type="number" unit="%" onChange={(e) => setValues((prev) => ({ ...prev, market_order: e.target.value }))} />
        <Input value={values.refund} label={"환급률"} type="number" unit="%" onChange={(e) => setValues((prev) => ({ ...prev, refund: e.target.value }))} />
        <Input value={values.average_refund} label={"평균 환급금"} type="number" placeholder="" unit={"만원"} onChange={(e) => setValues((prev) => ({ ...prev, average_refund: e.target.value }))} />
        <Input value={values.tag} label={"태그"} onChange={(e) => setValues((prev) => ({ ...prev, tag: e.target.value }))} />
        <Input value={values.affiliate_join_url} label={"가입 링크"} onChange={(e) => setValues((prev) => ({ ...prev, affiliate_join_url: e.target.value }))} />
        <div className="flex gap-5">
          <p className="min-w-16">적용</p>
          <Switch active={values?.status} setActive={() => setValues((prev) => ({ ...prev, status: prev.status ? 0 : 1 }))} />
        </div>
      </div>

      {/* <div className="flex-1">
        <p>미리 보기</p>
      </div> */}
      <Button onClick={handleAdd} disabled={!values || !Object.keys(values).length} className="mt-auto self-start w-24">
        수정
      </Button>
    </div>
  );
};

export default Container;
