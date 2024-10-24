"use client";
import { getAdminBanner } from "@/actions/site/action";
import Tab from "@/components/tab";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const Container = ({ banners }) => {
  const router = useRouter();

  const tabData = useMemo(() => {
    return banners?.data?.banner_types.map((v) => ({ value: v.banner_type }));
  }, [banners]);

  const [tab, setTab] = useState("all");
  const [data, setData] = useState(banners);

  useEffect(() => {
    if (tab !== "all") {
      getAdminBanner({ type: tab }).then((res) => {
        setData(res);
      });
    } else {
      setData(banners);
    }
  }, [tab]);

  const renderItem = useCallback(() => {
    return Object.entries(
      data?.data?.list?.reduce((result, cur) => {
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
              <div onClick={() => router.push(`/admin/site/banner/edit/${v.id}`)} key={v.title + i} className="flex justify-center items-center min-w-60 h-40 bg-gray-100 dark:bg-gray-900 rounded-lg">
                {v.banner_image}
                <Image src={`http://api.xn--3l2b13oekp.com${v.path}`} alt="banner-image" width={300} height={100} />
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
