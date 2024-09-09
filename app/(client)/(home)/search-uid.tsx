"use client";
import { API_URL } from "@/actions";
import { registerUID } from "@/actions/trade/action";
import { Button, buttonVariants } from "@/components/ui/button";
import Dropdown from "@/components/ui/dropdown";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { dummyTrade } from "@/dummy";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getCookie } from "cookies-next";
import { useToast } from "@/hooks/useToast";

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

  const { addToast } = useToast();

  console.log("exchangeData", exchangeData);

  return (
    <div className="px-4 py-10 mx-auto">
      <div className="flex gap-4 flex-wrap max-w-screen-md w-full mx-auto pb-5 px-2">
        {/* {tabData.map((v) => (
          <div key={v.value} onClick={() => setTab(v.value)}>
            {v.label}
          </div>
        ))} */}
      </div>
      <div className="flex gap-4 px-2 flex-wrap  w-full mx-auto ">
        <Dropdown item={exchange} setItem={setExchange} data={exchangeData} isVisible={isVisible} setIsVisible={setIsVisible} />
        <div className="flex flex-auto items-center border border-gray-400 dark:border-white p-2 rounded-sm hover:border-orange-400 hover:dark:border-orange-200 focus-within:border-orange-400 focus-within:dark:border-orange-200 md:min-w-[500px]">
          <form
            className="flex justify-between flex-1 px-4 items-center"
            onSubmit={async (e) => {
              e.preventDefault();

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

                console.log("asdasdasd", exchange, exchange.exchange_id);

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
            <input placeholder="UID를 입력하세요" onChange={(e) => setUid(e.target.value)} className="bg-transparent outline-none flex-auto" />
            {tab === 0 && (
              <button className="">
                <Search className="text-black dark:text-white size-6 cursor-pointer" />
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
