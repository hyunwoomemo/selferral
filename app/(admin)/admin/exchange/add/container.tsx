"use client";
import { editExchangeForm, editLinksForm } from "@/actions/trade/action";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

const tabData = [
  {
    value: 0,
    label: "기본",
  },
  {
    value: 1,
    label: "상세",
  },
];

const basicField = ["name", "nameExt", "image_thumb", "image_big", "image_logo", "round_image", "square_image", "status", "order", "blog_url", "customer_url", "createtime"];
const allField = [...basicField, "payback", "dioscount", "market_order", "limit_order", "tag", "average_refund", "custom_image", "affiliate_join_url"];

const Container = ({ token, exchanges }) => {
  const [values, setValues] = useState<any>({});
  const [tab, setTab] = useState({ value: 0, label: "기본" });
  const router = useRouter();

  console.log("values", values);

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    let exchangeBody = {};
    let linksBody = {};

    for (const key in values) {
      console.log("key", key);
      if (basicField.includes(key) && key !== "status") {
        if (values[key] === "null") return;
        exchangeBody[key] = values[key];
      } else {
        if (values[key] === "null") return;
        linksBody = { [key]: values[key] };
      }
    }

    exchangeBody["status"] = values.status;
    linksBody["status"] = values.status;
    exchangeBody["order"] = values.order || exchanges.data.length + 1;

    // const promises = [];

    if (exchangeBody && Object.keys(exchangeBody).length > 0) {
      const res = await editExchangeForm({ id: 0, token: token, body: exchangeBody });
      console.log("res", res);

      if (linksBody && Object.keys(linksBody).length > 0) {
        const res1 = await editLinksForm({ id: res.exchange_id, linkId: 0, token: token, body: linksBody });

        console.log("res1", res1);
      }
    }

    // if (linksBody && Object.keys(linksBody).length > 0) {
    //   promises.push(editLinksForm({ id: 0, linkId: 0, token: token, body: linksBody }));
    // }

    // try {
    //   const res = await Promise.all(promises);
    //   console.log("add res", res);
    //   router.push("/admin/exchange/list");
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div>
      <div className="flex gap-8 pb-10">
        {tabData.map((tab) => {
          return (
            <div key={tab.value} onClick={() => setTab(tab)}>
              {tab.label}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {allField &&
            allField.map((item) => {
              if (item.includes("id")) return;

              if (tab.value === 0) {
                if (!basicField.includes(item) && item !== "status") return;
              }

              if (tab.value !== 0) {
                if (basicField.includes(item) && item !== "status") return;
              }

              if (item.includes("image")) {
                return (
                  <div key={item} className="flex gap-2 items-center">
                    <span>{item}</span>
                    <input
                      type={"file"}
                      onChange={(e) => {
                        console.log(e.target.files[0]);
                        setValues((prev) => ({ ...prev, files: prev.files ? [...prev.files, e.target.files[0]] : [e.target.files[0]] }));
                      }}
                      placeholder={item}
                      name={item}
                      style={{ border: "1px solid gray", background: "none", padding: 10 }}
                    />
                  </div>
                );
              }

              return (
                <div key={item} className="flex gap-2 items-center">
                  <span>{item}</span>
                  <input
                    placeholder={item}
                    onChange={(e) => setValues((prev) => ({ ...prev, [item]: e.target.value }))}
                    name={item}
                    style={{ border: "1px solid gray", background: "none", padding: 10 }}
                    // defaultValue={prev[item]}
                    value={values[item]}
                  />
                </div>
              );
            })}
        </div>
        <button onClick={handleAdd}>저장하기</button>
      </div>
    </div>
  );
};

export default Container;
