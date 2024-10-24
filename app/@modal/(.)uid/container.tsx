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
import { useToast } from "@/hooks/useToast";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { paybackTestAtom } from "@/app/store/trade";
import Lottie from "react-lottie-player";
import lottieJson from "@/assets/loading.json";
import { useUser } from "@/hooks/useUser";
import { userAtom } from "@/app/store/user";
import Link from "next/link";

const Container = ({ user }) => {
  const token = getCookie("token");
  const params = useSearchParams();
  const uid = params.get("uid");
  const exchange = params.get("exchange");
  const [res, setRes] = useState<any>(null);
  const [exchangeData, setExchangeData] = useState();
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(-1);
  const apply = params.get("apply");

  const setPaybackTest = useSetAtom(paybackTestAtom);

  const { addToast } = useToast();

  let timeInterval;

  const router = useRouter();

  useEffect(() => {
    const fetchUid = async () => {
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("uid", uid);

        if (user && Object.keys(user).length > 0) {
          const res = await fetch(`${API_URL}/exchange/affiliate/get/${exchange}`, {
            headers: { authorization: `Bearer ${token}` },
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          console.log("ddddd", data);

          if (data.CODE === "EAG000") {
            setRes(data.DATA);
          }
        } else {
          const res = await fetch(`${API_URL}/exchange/affiliatenologin/get/${exchange}`, {
            headers: { authorization: `Bearer ${token}` },
            method: "POST",
            body: formData,
          });
          const data = await res.json();

          console.log("ddddd", data);

          if (data.CODE === "EAG000") {
            setRes(data.DATA);
          }
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
    if (!uid) {
      return addToast({ text: "UID 등록에 실패했습니다." });
    }

    const result = await registerUID({ id: exchange, uid });

    if (result.CODE === "EAS000") {
      addToast({ text: "UID 등록 신청되었습니다." });
      setTimeout(() => {
        router.back();
      }, 100);

      // if (apply) {
      //   setTimeout(() => {
      //     router.push("/");
      //   }, 500);
      // }
      // setTimeout(() => {
      //   router.push("/payback/process/1");
      // }, 500);
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
    console.log("rrrr", res);

    if (!res) {
      return <Lottie loop animationData={lottieJson} play />;
    }

    // if (!res || !res.DATA) return;
    if (res && Object.keys(res).length === 0) {
      if (user && Object.keys(user).length > 0) {
        return (
          <div className="rounded-lg">
            <div className="py-4 text-lg font-bold">존재하지 않는 UID입니다.</div>
            <div className="py-4">
              혹시 오늘 셀퍼럴 페이백 계정을 등록 하셨나요? 시스템에 <span className="text-orange-400">등록 되기까지 24시간</span> 정도 소요됩니다!
            </div>
            <div className="font-bold py-4 pb-8">
              <div>UID 조회가 안 되시더라도</div>
              <div className="text-orange-400">모든 거래는 페이백이 적용 돼요!</div>
            </div>

            <div className="w-full flex justify-between gap-8">
              <div className="border border-orange-400 p-2 md:p-3 flex-1 justify-center flex text-sm md:text-[16px] rounded-lg text-orange-400 font-bold cursor-pointer max-w-64">UID 연동하기</div>
              {/* <Button onClick={() => setUid()} className={cn(buttonVariants({ variant: "outline" }), "w-full max-w-64 text-orange-400 border-orange-400  dark:text-orange-200 dark:border-orange-200")}>
                UID 연동하기
              </Button> */}
              {!apply && (
                // <Button
                //   onClick={() => {
                //     router.back();
                //     setTimeout(() => {
                //       router.push(`/payback/process/1?uid=${uid}`);
                //     }, 100);
                //   }}
                //   className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full max-w-64 text-orange-400 border-orange-400 dark:text-orange-200 dark:border-orange-200")}
                // >
                //   예상 페이백 확인하기

                // </Button>
                <div className="border border-orange-400 p-2 md:p-3 flex-1 justify-center flex text-sm md:text-[16px] rounded-lg text-orange-400 font-bold cursor-pointer max-w-64">
                  예상 페이백 확인하기
                </div>
              )}
            </div>
          </div>
        );
      } else {
        return (
          <div className="rounded-lg flex flex-col items-center gap-6 font-bold">
            <div className="text-gray-500 text-[16px]">등록되지 않은 UID 입니다.</div>
            <div className="flex flex-col gap-4 items-center">
              <div className="text-2xl">셀퍼럴닷컴에 가입하여</div>
              <div className="text-2xl">
                <span className="text-orange-600">페이백 혜택</span>을 받아보세요.
              </div>
            </div>
            <div className="text-gray-500">(이미 등록하셨다면, 승인까지 최대 24시간이 소요됩니다.)</div>
            <div
              onClick={() => {
                router.back();
                setTimeout(() => {
                  router.push("/register");
                }, 100);
              }}
              className="cursor-pointer mt-4  p-2 px-8 rounded-lg text-white text-2xl"
              style={{ background: "rgb(235,78,43)" }}
            >
              가입하기
            </div>
          </div>
        );
      }
    }

    if (res && res.hasOwnProperty("exchange")) {
      if (user && Object.keys(user).length > 0) {
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
      } else {
        return (
          <div className="rounded-lg flex flex-col items-center gap-6 font-bold">
            <div className="text-2xl mt-10">
              <span className="text-orange-600">로그인이</span> 필요합니다.
            </div>
            <div className="flex flex-col items-center text-lg">
              <div className="text-gray-500">페이백 조회 및 출금신청은 </div>
              <div className="text-gray-500">아래 버튼을 통해 로그인 후 진행해주세요.</div>
            </div>
            <div
              onClick={() => {
                router.back();
                setTimeout(() => {
                  router.push("/login");
                }, 100);
              }}
              className="cursor-pointer mt-4  p-2 px-8 rounded-lg text-white text-2xl mb-5"
              style={{ background: "rgb(235,78,43)" }}
            >
              로그인
            </div>
          </div>
        );
      }
    }

    if (res && res.hasOwnProperty("order")) {
      if (user && Object.keys(user).length > 0) {
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
      } else {
        return (
          <div className="rounded-lg flex flex-col items-center gap-6 font-bold">
            <div className="text-2xl mt-10">
              <span className="text-orange-600">로그인이</span> 필요합니다.
            </div>
            <div className="flex flex-col items-center text-lg">
              <div className="text-gray-500">페이백 조회 및 출금신청은 </div>
              <div className="text-gray-500">아래 버튼을 통해 로그인 후 진행해주세요.</div>
            </div>
            <div
              onClick={() => {
                router.back();
                setTimeout(() => {
                  router.push("/login");
                }, 100);
              }}
              className="cursor-pointer mt-4  p-2 px-8 rounded-lg text-white text-2xl mb-5"
              style={{ background: "rgb(235,78,43)" }}
            >
              로그인
            </div>
          </div>
        );
      }
    }
  }, [res, leftTime]);

  return (
    <div className="bg-white dark:bg-[rgb(26,26,38)] rounded-lg">
      <div className="p-4  gap-4 h-full w-full">{renderItem()}</div>
    </div>
  );
};

export default Container;
