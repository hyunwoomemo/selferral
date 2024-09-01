"use client";
import { API_URL } from "@/actions";
import { editExchangeForm, editLinksForm } from "@/actions/trade/action";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import axios from "axios";

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

const Container = ({ data, token, links, exchangeId }) => {
  const [prev, setPrev] = useState(data);
  const [values, setValues] = useState<any>({});
  const [tab, setTab] = useState({ value: 0, label: "기본" });
  const router = useRouter();

  console.log("values", values);

  const handleEdit = async (e) => {
    e.preventDefault();

    const exchangeBody = {};
    const linksBody = {};
    const exchangeData = new FormData();
    const linksData = new FormData();

    for (const key in values) {
      if (basicField.includes(key)) {
        // if (key.includes("image")) {
        //   for (let i = 0; i < exchangeBody[key]?.length; i++) {
        //     exchangeData.append(key, exchangeBody[key][i]);
        //   }
        // } else {
        exchangeBody[key] = values[key];
        // }
      } else {
        console.log("key", key, values[key]);

        linksBody[key] = values[key];
      }
    }

    for (const key in exchangeBody) {
      if (key.includes("image")) {
        for (let i = 0; i < exchangeBody[key]?.length; i++) {
          exchangeData.append(key, exchangeBody[key][i]);
        }
      }
    }

    for (const key in linksBody) {
      if (key.includes("image")) {
        for (let i = 0; i < linksBody[key]?.length; i++) {
          linksData.append(key, linksBody[key][i]);
        }
      }
    }

    if (exchangeBody && Object.keys(exchangeBody).length > 0) {
      for (const key in prev) {
        if (basicField.includes(key)) {
          if (!exchangeBody.hasOwnProperty(key)) {
            exchangeBody[key] = prev[key];
          }
        }
      }

      for (const key in exchangeBody) {
        if (!key.includes("image")) {
          exchangeData.append(key, exchangeBody[key]);
        }
      }

      const res = await axios.post(`${API_URL}/affiliate/Exchange/${data.exchange_id}`, exchangeData, { headers: { Authorization: `Bearer ${token}` } });
      console.log("123123 exchange DAta!!!", res);
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

      const res = await axios.post(`${API_URL}/affiliate/Exchange/links/${data.exchange_id}/${data.id}`, linksData, { headers: { Authorization: `Bearer ${token}` } });

      console.log("123123 links DAta!!!", res);
    }

    // for (const key in values) {
    //   if (basicField.includes(key) && basicField.includes(key1)) {
    //     if (key === key1) {
    //       if (key1.includes("image")) {
    //         for (let i = 0; i < values[key1].length; i++) {
    //           exchangeData.append(key1, values[key1][i]);
    //         }
    //       } else {
    //         exchangeData.append(key, values[key]);
    //       }
    //     } else {
    //       exchangeData.append(key, prev[key]);
    //     }
    //   } else {
    //     if (key === key1) {
    //       if (key1.includes("image")) {
    //         for (let i = 0; i < values[key1].length; i++) {
    //           linksData.append(key1, values[key1][i]);
    //         }
    //       } else {
    //         linksData.append(key, values[key]);
    //       }
    //     } else {
    //       linksData.append(key, prev[key]);
    //     }
    //   }
    // }

    // const exchangeDataLength = getFormDataLength(exchangeData);
    // const linksDataLength = getFormDataLength(linksData);

    // if (exchangeDataLength > 0) {
    //   const res = await axios.post(`${API_URL}/affiliate/Exchange/${data.exchange_id}`, exchangeData, { headers: { Authorization: `Bearer ${token}` } });
    // }

    // if (linksDataLength > 0) {
    //   const res = await axios.post(`${API_URL}/affiliate/Exchange/links/${data.exchange_id}/${data.id}`, linksData, { headers: { Authorization: `Bearer ${token}` } });
    // }

    router.push("/admin/exchange/list");
  };

  const handleUpload = async (e, type) => {
    console.log(e.target.files);
    const formData = new FormData();
    let exchangePrev: any = {};

    for (const key in prev) {
      if (basicField.includes(key) && type !== key) {
        exchangePrev[key] = prev[key];
      }
    }

    for (const key in exchangePrev) {
      formData.append(key, exchangePrev[key]);
    }

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append(type, e.target.files[i]);
    }

    const res = await fetch(`${API_URL}/affiliate/Exchange/${data.exchange_id}`, {
      method: "POST",
      body: formData,
    });
    console.log("res", res);
  };

  return (
    <div>
      <div className="flex gap-8 pb-10">
        {tabData.map((tab) => {
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
        })}
      </div>
      <form onSubmit={handleEdit} style={{ display: "flex", flexDirection: "column", gap: 10, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {data &&
            Object.entries(data).map(([key, item]) => {
              if (key.includes("id")) return;

              if (tab.value === 0) {
                if (!basicField.includes(key) && key !== "status") return;
              }

              if (tab.value !== 0) {
                if (basicField.includes(key) && key !== "status") return;
              }

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
