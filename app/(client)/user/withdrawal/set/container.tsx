"use client";
import { setWithdrawal } from "@/actions/trade/action";
import { bottomSheetAtom } from "@/app/store/common";
import { Button, buttonVariants } from "@/components/ui/button";
import Dropdown from "@/components/ui/dropdown";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { useAtom } from "jotai";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const Container = ({ data, exchangeId }) => {
  const { addToast } = useToast();
  const [bottomSheet, setBottomSheet] = useAtom(bottomSheetAtom);

  const dropdownData = useMemo(() => {
    return data.map((v) => ({ label: `${v.name}-${v.user_uid} (${v.point})`, value: v.exchange_id, icon: <Image width={30} height={30} alt="logo" src={v.image_thumb} /> }));
  }, [data]);

  const [exchange, setExchange] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [values, setValues] = useState({});
  const token = getCookie("token");
  const router = useRouter();

  console.log("dropdownData", exchangeId);

  useEffect(() => {
    setExchange(dropdownData.find((v) => v.value == exchangeId));
  }, [dropdownData, exchangeId]);

  const handleSubmit = async () => {
    if (exchange.point < 100) {
      return addToast({ text: "최소 100USDT 이상부터 출금신청 가능합니다" });
    }

    const res = await setWithdrawal({ token, data: { exchange_id: exchange.id, point: exchange.point, usdt_address: exchange.uid } });

    if (res.data === "aleady") {
      return window.alert("이미 등록되어있습니다.");
    }

    if (res.data === "ok") {
      addToast({ text: "출금 신청이 완료되었습니다." });
      router.back();
      setTimeout(() => {
        router.refresh();
      }, 100);
    }
  };

  const handleDropdownClick = (value) => {
    setExchange(value);
  };

  const handleTradeClick = () => {
    setBottomSheet((prev) => ({
      ...prev,
      isVisible: true,
      contents: () => (
        <div className="p-2 h-full">
          <p className="text-sm flex justify-end text-orange-400">* 100USDT 이상의 아이템만 선택 가능합니다.</p>
          {/* <p className="text-lg font-bold text-gray-600">거래소 선택</p> */}
          {data.map((v) => {
            if (v.status == 1) {
              return (
                <div
                  onClick={() => {
                    setExchange({ id: v.exchange_id, uid: v.user_uid, image_thumb: v.image_thumb, name: v.name, maxPoint: v.point });
                    setBottomSheet((prev) => ({ ...prev, isVisible: false }));
                  }}
                  key={data.user_uid}
                  className={cn("p-4 my-2 rounded-md bg-white bg-gray-50", v.point > 0 ? "bg-white cursor-pointer hover:bg-orange-50" : "cursor-default opacity-50 pointer-events-none")}
                >
                  <div className="flex gap-4 items-center">
                    {v.image_thumb && <Image src={v.image_thumb} alt="logo" width={30} height={30} style={{ objectFit: "contain" }} />}
                    <div className="flex flex-col gap-1 ">
                      <p className="text-gray-600">{v.name}</p>
                      <p>{v.user_uid}</p>
                    </div>
                    {v.point > 0 && (
                      <div className="flex-1 ml-auto flex flex-col items-end justify-center ">
                        <p className="text-sm text-gray-400">출금 가능 금액</p>
                        <p className="text-lg font-bold">{v.point}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            }
          })}
        </div>
      ),
    }));
  };

  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="py-4 flex gap-4 flex-col">
        <p>거래소</p>
        <div className="flex w-60">
          {exchange?.name ? (
            <div className="flex gap-2 items-center cursor-pointer" onClick={() => setExchange((prev) => ({}))}>
              <Image src={exchange.image_thumb} width={30} height={30} alt="logo" />
              <p>{exchange.name}</p>
            </div>
          ) : (
            <Button onClick={handleTradeClick}>거래소 선택</Button>
          )}
          {/* <Dropdown value={exchange} placeholder={"거래소를 선택해주세요."} dropdownClick={handleDropdownClick} data={dropdownData} isVisible={isVisible} setIsVisible={setIsVisible} minWidth={160} /> */}
        </div>
      </div>
      <div className="py-4 flex gap-4 flex-col">
        <div className="flex flex-col gap-2">
          <p>출금 금액</p>
          {exchange?.maxPoint && <p className="text-sm text-gray-400">{`(출금 가능 금액: ${exchange?.maxPoint})`}</p>}
        </div>
        <div className="flex w-60">
          <input
            className="bg-transparent p-3 border border-gray-400 rounded-lg"
            placeholder="금액을 입력해주세요."
            type="number"
            value={exchange?.point || ""}
            onChange={(e) =>
              setExchange((prev) => {
                if (e.target.value > Number(exchange.maxPoint)) {
                  addToast({ text: "출금 가능 금액을 초과했습니다." });
                  return { ...prev, point: "" };
                } else {
                  return { ...prev, point: e.target.value };
                }
              })
            }
          />
        </div>
      </div>
      <div className="py-4 flex gap-4 flex-col">
        <p>USDT 주소</p>
        <div className="flex w-80">
          <input
            className="bg-transparent p-3 border border-gray-400 rounded-lg"
            placeholder="주소를 입력해주세요."
            value={exchange?.uid || ""}
            onChange={(e) => setExchange((prev) => ({ ...prev, uid: e.target.value }))}
          />
        </div>
      </div>
      <Button
        disabled={!exchange || !exchange.point || !exchange.uid}
        onClick={handleSubmit}
        // onClick={handleSetWithdrawal}
        className={cn(
          buttonVariants({ size: "lg", variant: "outline" }),
          "max-w-52   md:min-w-40  my-5 py-5 border border-orange-400 text-orange-400 text-lg dark:border-orange-200 dark:text-orange-200"
        )}
      >
        {"출금 신청"}
      </Button>
    </div>
  );
};

export default Container;
