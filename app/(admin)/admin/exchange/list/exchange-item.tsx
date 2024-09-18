"use client";
import { getLinks } from "@/actions/trade/action";
import Switch from "@/components/ui/switch";
import Table from "@/components/ui/table";
import { ChevronDown, Edit, Link2, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const ExchangeItem = ({ exchanges, token }) => {
  const [links, setLinks] = useState();
  const [exchange, setExchange] = useState();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const params = useSearchParams();

  useEffect(() => {
    if (params.get("exchangeId")) {
      setExchange(Number(params.get("exchangeId")));
      router.replace("/admin/exchange/list");
    }
  }, [params]);

  useEffect(() => {
    getLinks({ token, exchange_id: exchange })
      .then((res) => setLinks(res.data))
      .finally(() => setLoading(false));
  }, [exchange]);

  console.log("exchanges", exchange);

  const handleExchangeClick = (id) => {
    setLoading(true);
    setExchange((prev) => {
      if (prev === id) {
        return -1;
      } else {
        return id;
      }
    });
  };

  const tableData = useMemo(() => {
    if (links && links.length > 0) {
      return links.map((v) => ({
        id: v.id,
        태그: v.tag,
        페이백: v.payback,
        할인: v.discount,
        지정가: v.limit_order,
        시장가: v.market_order,
        // 링크: (
        //   <div className="truncate max-w-20" aria-label={v.affiliate_join_url} content={v.affiliate_join_url}>
        //     <span>{v.affiliate_join_url}</span>
        //   </div>
        // ),
        상태: <Switch active={v.status === 1} />,
      }));
    }
  }, [exchange, links]);

  console.log("loading", loading);

  const render = () => {
    return exchanges.data.map((v) => {
      return (
        <div key={v.exchange_id} className="p-3 bg-white rounded-md" onClick={() => handleExchangeClick(v.exchange_id)}>
          <div className="px-3 pr-5 flex bg-white min-h-20  gap-5 items-center">
            <div className="flex justify-center items-center">
              <Image src={v.image_thumb} width={50} height={50} alt="logo" />
            </div>
            <div className="font-bold text-gray-600">{v.name}</div>
            {v.nameExt && <div className="text-xs p-1 px-2 bg-orange-100 rounded-md">{v.nameExt}</div>}
            <div className="ml-auto flex gap-5">
              <Edit
                className="hover:text-orange-400"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/admin/exchange/${v.exchange_id}/edit`);
                }}
              />
              <ChevronDown />
            </div>
          </div>
          {exchange === v.exchange_id && (
            <>
              {loading ? (
                <div className="flex justify-center min-h-20 items-center">
                  <Loader className={`${loading ? "animate-spin" : undefined}`} />
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {tableData && tableData.length > 0 && <Table hover onClick={(id) => router.push(`/admin/exchange/${v.exchange_id}/link/${id}`)} data={tableData} headerClassname={"bg-gray-100"} />}
                  <Link href={`/admin/exchange/${v.exchange_id}/add/link`} className="w-full flex justify-center p-3 hover:bg-gray-100">
                    추가하기
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      );
    });
  };

  return <div className="flex flex-col gap-3">{render()}</div>;
};

export default ExchangeItem;
