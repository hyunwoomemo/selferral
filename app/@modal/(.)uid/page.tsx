"use client";
import { API_URL } from "@/actions";
import Modal from "@/components/ui/modal";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getCookie } from "cookies-next";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getExchange, registerUID } from "@/actions/trade/action";
import { CircleDollarSign } from "lucide-react";

const Page = () => {
  const token = getCookie("token");
  const params = useSearchParams();
  const uid = params.get("uid");
  const exchange = params.get("exchange");
  const [res, setRes] = useState<any>(null);
  const [exchangeData, setExchangeData] = useState();
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(-1);
  let timeInterval;

  const router = useRouter();

  // /exchange/affiliate/:mode/:exchange_id

  useEffect(() => {
    const fetchUid = async () => {
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("uid", uid);
        const res = await fetch(`${API_URL}/exchange/affiliate/get/${exchange}`, {
          headers: { authorization: `Bearer ${token}` },
          method: "POST",
          body: formData,
        });
        const data = await res.json();

        if (data.CODE === "EAG000") {
          setRes(data.DATA);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchUid();
    }
  }, [uid]);

  const setUid = async () => {
    // const formData = new FormData();

    // formData.append("uid", uid);

    // const res = await fetch(`${API_URL}/exchange/affiliate/set/${exchange}`, {
    //   method: "POST",
    //   body: formData,
    //   headers: {
    //     authorization: `Bearer ${token}`,
    //   },
    // });

    // const result = await res.json();

    const result = await registerUID({ id: exchange, token, uid });

    if (result.CODE === "EAS000") {
      router.back();

      setTimeout(() => {
        router.push("/payback/process/1");
      }, 500);
    }
  };

  useEffect(() => {
    if (res && res?.order?.left_second) {
      setTime(parseInt(res.order.left_second));
    }
  }, [res]);

  useEffect(() => {
    if (time) {
      timeInterval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);

      return () => {
        clearInterval(timeInterval);
      };
    }
  }, [time]);

  const leftTime = useMemo(() => {
    if (time) {
      const hour = Math.abs(parseInt(time / 3600));
      const minute = parseInt((time - hour * 3600) / 60);
      const second = time - hour * 3600 - minute * 60;

      if (hour > 0) {
        return `${hour}시간 ${minute}분 ${second}초`;
      } else {
        if (minute > 0) {
          return `${minute}분 ${second}초`;
        } else {
          return `${second}초`;
        }
      }
    }
  }, [time]);

  const renderItem = useCallback(() => {
    if (!res) {
      return <div>로딩..</div>;
    }

    // if (!res || !res.DATA) return;
    if (res && Object.keys(res).length === 0) {
      return (
        <div className="rounded-lg">
          <div className="py-4 text-lg font-bold">존재하지 않는 UID입니다.</div>
          <div className="py-4">
            혹시 오늘 셀퍼럴 페이백 계정을 등록 하셨나요? 시스템에 <span className="text-orange-400">등록 되기까지 5시간</span> 정도 소요됩니다!
          </div>
          <div className="font-bold py-4 pb-8">
            <div>UID 조회가 안 되시더라도</div>
            <div className="text-orange-400">모든 거래는 페이백이 적용 돼요!</div>
          </div>

          <Button
            onClick={() => setUid()}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full max-w-64 text-orange-400 border-orange-400 dark:text-orange-200 dark:border-orange-200")}
          >
            1분만에 확인하기
          </Button>
        </div>
      );
    }

    if (res && res.hasOwnProperty("exchange")) {
      return (
        <div>
          <div className="py-4 text-lg font-bold">존재하는 UID</div>
          <div className="flex gap-4 text-md py-4 font-bold">
            <div className="flex gap-2 ">
              <CircleDollarSign />
              <div>커미션</div>
            </div>
            <div className="text-orange-400">{res.exchange.point} USDT</div>
          </div>
        </div>
      );
    }

    if (res && res.hasOwnProperty("order")) {
      return (
        <div>
          {res.order.status < 1 && (
            <>
              <div className="py-4 text-lg font-bold">처리 중입니다.</div>
              <div>{leftTime}</div>
            </>
          )}
          {res.order.status === 1 && (
            <>
              <div className="py-4 text-lg font-bold">등록되었습니다.</div>
            </>
          )}
        </div>
      );
    }
  }, [res, leftTime, setUid]);

  return (
    <div className="bg-white dark:bg-[rgb(26,26,38)] rounded-lg">
      <div className="p-4 flex gap-4 h-full">{renderItem()}</div>
    </div>
  );
};

export default Page;
