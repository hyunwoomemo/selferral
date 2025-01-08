"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getCookie } from "cookies-next";
import { useToast } from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import Dropdown from "@/components/exchange/dropdown";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const tabData = [
  {
    label: "조회",
    value: 0,
  },
  {
    label: "신청",
    value: 1,
  },
];

const SearchUid = ({ exchangeData }) => {
  const token = getCookie("token");
  const [exchange, setExchange] = useState(exchangeData[0]);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const [uid, setUid] = useState<number | null>(null);

  const { isLogin } = useUser();

  const { addToast } = useToast();

  return (
    <div className="py-10  md:w-[60%] mx-auto">
      <div className="flex justify-center">
        <p className="max-w-[42rem] mx-auto text-muted-foreground  text-sm md:text-[16px]">셀퍼럴 닷컴을 통해 가입 하지 않은 UID는 등록이 불가능합니다</p>
      </div>
      <div className="flex gap-2 w-full py-6">
        <Dropdown item={exchange} setItem={setExchange} data={exchangeData} isVisible={isVisible} setIsVisible={setIsVisible} />
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-sm hover:border-orange-400 hover:dark:border-orange-200 focus-within:border-orange-400 focus-within:dark:border-orange-200 w-full">
          <form
            className="flex justify-between flex-1 px-4 items-center"
            onSubmit={async (e) => {
              e.preventDefault();

              // if (!isLogin) {
              //   return addToast({ text: "로그인이 필요합니다." });
              // }

              if (!uid || uid.length < 4) {
                return addToast({ text: "UID는 4글자 이상 입력 해주세요" });
              }

              // if (tab === 0) {
              router.push(`/uid?exchange=${exchange.exchange_id}&uid=${uid}`);
              // }

              // if (tab === 1) {
              //   // registerUID({ id: exchange.id, token, uid: uid }).then((res) => {
              //   //
              //   // });
              //   const data = new FormData();

              //   data.append("uid", uid);
              //   fetch(`https://api.xn--3l2b13oekp.com/exchange/affiliate/set/${exchange.exchange_id}`, {
              //     method: "POST",
              //     body: data,
              //     headers: { authorization: `Bearer ${token}` },
              //   }).then((res) =>
              // }
              // const res = await fetch("/api/search");

              //
            }}
          >
            <input placeholder="UID를 입력하세요" onChange={(e) => setUid(e.target.value)} className="bg-transparent outline-none flex-auto placeholder:text-sm" />
            <button className="">
              <Search className={cn("text-gray-600 dark:text-gray-200 size-6 cursor-pointer")} />
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-row justify-center w-full gap-4">
        <Button className="bg-orange-400" onClick={() => window.open("http://pf.kakao.com/_xexhaEn/chat")}>
          고객센터 문의
        </Button>
        <Button className="bg-orange-400" onClick={() => router.push("/exchange")}>
          페이백 계정 만들기
        </Button>
      </div>
    </div>
  );
};

export default SearchUid;
