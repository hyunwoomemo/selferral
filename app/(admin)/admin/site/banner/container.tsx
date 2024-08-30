"use client";
import { getAdminBanner } from "@/actions/site/action";
import Tab from "@/components/tab";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const Container = ({ banners, token }) => {
  console.log("banners", banners);

  const tabData = useMemo(() => {
    return banners?.data?.banner_types.map((v) => ({ value: v.banner_type }));
  }, [banners]);

  const [tab, setTab] = useState("all");
  const [data, setData] = useState(banners);

  useEffect(() => {
    if (tab !== "all") {
      console.log("token", token);
      getAdminBanner({ type: tab, token: token }).then((res) => {
        console.log("res", res);
        setData(res);
      });
    } else {
      setData(banners);
    }
  }, [tab]);

  console.log("data", data);

  const renderItem = useCallback(() => {
    return Object.entries(
      data.data.list.reduce((result, cur) => {
        if (!result.hasOwnProperty(cur.position)) {
          result[cur.position] = [cur];
        } else {
          result[cur.position] = [...result[cur.position], cur];
        }

        return result;
      }, {})
    ).map(([type, data]) => {
      return (
        <div key={type} className="py-4">
          <h1 className="px-4 py-4 text-2xl">{type}</h1>
          <div className="flex gap-4 py-5">
            {data.map((v, i) => (
              <div key={v.title + i} className="flex justify-center items-center min-w-60 h-40 bg-gray-100 dark:bg-gray-900 rounded-md">
                {v.title}
              </div>
            ))}
          </div>
        </div>
      );
    });
  }, [data, tab]);

  if (!banners) return;

  return (
    <div className="">
      <Tab data={tabData} tab={tab} setTab={setTab} all />
      {renderItem()}
    </div>
  );
};

export default Container;
