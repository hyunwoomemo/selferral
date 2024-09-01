"use client";
import { API_URL } from "@/actions";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import axios from "axios";
import { editLinksForm } from "@/actions/trade/action";

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
const allField = [...basicField, "payback", "discount", "market_order", "limit_order", "tag", "average_refund", "custom_image", "affiliate_join_url"];

const Container = ({ data, token, links, exchangeId }) => {
  const [prev, setPrev] = useState(data);
  const [values, setValues] = useState<any>({});
  const [tab, setTab] = useState({ value: 1, label: "기본" });
  const router = useRouter();

  console.log("dddddd", prev, data);

  const handleEdit = async (e) => {
    e.preventDefault();

    const linksBody = {};
    const linksData = new FormData();

    for (const key in values) {
      console.log("key", key, values[key]);

      linksBody[key] = values[key];
    }

    for (const key in linksBody) {
      if (key.includes("image")) {
        for (let i = 0; i < linksBody[key]?.length; i++) {
          linksData.append(key, linksBody[key][i]);
        }
      }
    }

    if (linksBody && Object.keys(linksBody).length > 0) {
      for (const key in prev) {
        if (!basicField.includes(key)) {
          if (!linksBody.hasOwnProperty(key)) {
            linksBody[key] = prev[key];
          }
        }
      }

      for (const key in linksBody) {
        if (!key.includes("image")) {
          console.log("key", key, linksBody[key]);
          linksData.append(key, linksBody[key]);
        }
      }

      if (!linksData.has("status")) linksData.append("status", prev["status"]);

      const res = await editLinksForm({ id: data.exchange_id, linkId: data.id, token: token, formData: linksData });

      console.log("123123 links DAta!!!", res);
    }

    router.push("/admin/exchange/list");
  };

  return (
    <div>
      <div className="flex gap-8 pb-10">
        {/* {tabData.map((tab) => {
          return (
            <div
              key={tab.value}
              onClick={() => {
                tab.value === 1 ? router.push(`/admin/exchange/${exchangeId}/edit/link`) : undefined;
              }}
            >
              {tab.label}
            </div>
          );
        })} */}
      </div>
      <form onSubmit={handleEdit} style={{ display: "flex", flexDirection: "column", gap: 10, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {data &&
            Object.entries(data).map(([key, item]) => {
              if (key.includes("id")) return;

              if (basicField.includes(key) && key !== "status") return;

              if (key.includes("image")) {
                return (
                  <div key={key} className="flex gap-2 items-center">
                    <span>{key}</span>
                    <input
                      type={"file"}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, [key]: e.target.files }));
                        // handleUpload(e, key);
                      }}
                      placeholder={key}
                      name={key}
                      style={{ border: "1px solid gray", background: "none", padding: 10 }}
                    />
                  </div>
                );
              }

              return (
                <div key={key} className="flex gap-2 items-center">
                  <span>{key}</span>
                  <input
                    placeholder={key}
                    onChange={(e) => setValues((prev) => ({ ...prev, [key]: e.target.value }))}
                    name={key}
                    style={{ border: "1px solid gray", background: "none", padding: 10 }}
                    defaultValue={prev[key]}
                    value={values[key]}
                  />
                </div>
              );
            })}
        </div>
        <button>저장하기</button>
      </form>
    </div>
  );
};

export default Container;
