"use client";
import { editLinksForm } from "@/actions/trade/action";
import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import Switch from "@/components/ui/switch";
import React, { useState } from "react";

const Container = ({ exchangeId }) => {
  const [values, setValues] = useState({});

  console.log("vvv", values);

  const handleAdd = async () => {
    const formData = new FormData();

    for (const key in values) {
      if (values[key]) {
        formData.append(key, values[key]);
      }
    }
    const res = await editLinksForm({ id: exchangeId, linkId: 0, formData });

    console.log("addddd res", res);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-1 flex-col gap-5">
        <Input label={"페이백"} type="number" unit="%" onChange={(e) => setValues((prev) => ({ ...prev, payback: e.target.value }))} />
        <Input label={"할인"} type="number" unit="%" onChange={(e) => setValues((prev) => ({ ...prev, discount: e.target.value }))} />
        <Input label={"지정가"} type="number" unit="%" onChange={(e) => setValues((prev) => ({ ...prev, limit_order: e.target.value }))} />
        <Input label={"시장가"} type="number" unit="%" onChange={(e) => setValues((prev) => ({ ...prev, market_order: e.target.value }))} />
        <Input label={"평균 환급금"} type="number" placeholder="" unit={"만원"} onChange={(e) => setValues((prev) => ({ ...prev, average_refund: e.target.value }))} />
        <Input label={"태그"} placeholder="" onChange={(e) => setValues((prev) => ({ ...prev, tag: e.target.value }))} />
        <Input label={"링크"} onChange={(e) => setValues((prev) => ({ ...prev, affiliate_join_url: e.target.value }))} />
        <div className="flex gap-5">
          <p className="min-w-16">적용</p>
          <Switch active={values?.status} setActive={() => setValues((prev) => ({ ...prev, status: !prev.status }))} />
        </div>
      </div>

      {/* <div className="flex-1">
        <p>미리 보기</p>
      </div> */}
      <Button onClick={handleAdd} disabled={!values || !Object.keys(values).length} className="mt-auto self-start w-24">
        추가
      </Button>
    </div>
  );
};

export default Container;
