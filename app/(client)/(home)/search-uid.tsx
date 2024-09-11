"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getCookie } from "cookies-next";
import { useToast } from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import Dropdown from "@/components/exchange/dropdown";

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
  const [tab, setTab] = useState(0);

  const { isLogin } = useUser();

  const { addToast } = useToast();

  console.log("exchangeData", exchangeData);

  return (
    <div className="py-10  md:w-[60%] mx-auto">
      <div className="flex gap-2 w-full">
        <Dropdown item={exchange} setItem={setExchange} data={exchangeData} isVisible={isVisible} setIsVisible={setIsVisible} />
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-sm hover:border-orange-400 hover:dark:border-orange-200 focus-within:border-orange-400 focus-within:dark:border-orange-200 w-full">
          <form
            className="flex justify-between flex-1 px-4 items-center"
            onSubmit={async (e) => {
              e.preventDefault();

              if (!isLogin) {
                return addToast({ text: "로그인이 필요합니다." });
              }

              if (!uid || uid.length < 4) {
                return addToast({ text: "UID는 4글자 이상 입력 해주세요" });
              }

              if (tab === 0) {
                router.push(`/uid?exchange=${exchange.exchange_id}&uid=${uid}`);
              }

              if (tab === 1) {
                // registerUID({ id: exchange.id, token, uid: uid }).then((res) => {
                //   console.log("res!!!", res);
                // });
                const data = new FormData();

                data.append("uid", uid);
                fetch(`https://api.xn--3l2b13oekp.com/exchange/affiliate/set/${exchange.exchange_id}`, {
                  method: "POST",
                  body: data,
                  headers: { authorization: `Bearer ${token}` },
                }).then((res) => console.log(res));
              }
              // const res = await fetch("/api/search");

              // console.log("res", res);
            }}
          >
            <input placeholder="UID를 입력하세요" onChange={(e) => setUid(e.target.value)} className="bg-transparent outline-none flex-auto placeholder:text-sm" />
            {tab === 0 && (
              <button className="">
                <Search className="text-gray-600 dark:text-gray-200 size-6 cursor-pointer" />
              </button>
            )}
            {tab === 1 && (
              <button className="">
                신청
                {/* <Search className="text-black dark:text-white size-6 cursor-pointer" /> */}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchUid;
