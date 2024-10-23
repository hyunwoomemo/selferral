"use client";
import { setBanner } from "@/actions/site/action";
import Calendar from "@/components/calendar";
import Input from "@/components/input";
import { Button, buttonVariants } from "@/components/ui/button";
import Dropdown from "@/components/ui/dropdown";
import Switch from "@/components/ui/switch";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import { CalendarCheck, CalendarCheck2Icon, CalendarDaysIcon } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const fields = ["title", "memo", "order", "starttime", "endtime", "status", "banner_image", "banner_type"];

const Container = ({ banners, exchanges, banner, id }) => {
  const [values, setValues] = useState({ status: 1, order: banners.length + 1 });
  const [isVisibleDate, setIsVisibleDate] = useState(false);
  const { addToast } = useToast();
  const router = useRouter();
  const [previewUrls, setPreviewUrls] = useState({});
  const [dates, setDates] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const arr = ["title", "memo", "order", "starttime", "endtime", "status", "path", "link", "exchange_id"];

    const temp = {};
    for (const key in banner) {
      if (arr.includes(key)) {
        temp[key] = banner[key];
      }
    }

    setValues(temp);

    const exchange = exchanges.find((v) => v.exchange_id === banner.exchange_id);

    setExchange({ label: exchange.name, value: exchange.exchange_id, icon: <Image width={30} height={30} alt="logo" src={exchange.image_thumb} /> });

    const dates = [new Date(banner.starttime), new Date(banner.endtime)];
    setDates(dates);
  }, [banner]);

  const handleDropdownClick = (value) => {
    setExchange(value);
  };

  const dropdownData = useMemo(() => {
    return exchanges.map((v) => ({ label: v.name, value: v.exchange_id, icon: <Image width={30} height={30} alt="logo" src={v.image_thumb} /> }));
  }, [exchanges]);

  const [exchange, setExchange] = useState(dropdownData[0]);

  const handleChange = (type, value) => {
    setValues((prev) => ({ ...prev, [type]: value }));

    if (type.includes("banner_image")) {
      const selectedFile = value;
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls((prev) => ({ ...prev, [type]: reader.result }));
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    if (dates.length === 2) {
      setValues((prev) => ({ ...prev, starttime: dates[0], endtime: dates[1] }));
    }
  }, [dates]);

  useEffect(() => {
    setValues((prev) => ({ ...prev, exchange_id: exchange.value }));
  }, [exchange]);

  const handleAdd = async () => {
    const formData = new FormData();

    for (const key in values) {
      if (values[key]) {
        formData.append(key, values[key]);
      }
    }

    const res = await setBanner({ data: formData, bannerType: "event", id });

    // if (res.exchange_id) {
    //   router.push("/admin/exchange/list");
    //   addToast({ text: "거래소가 수정되었습니다." });
    // }
  };

  return (
    <>
      <div className="flex gap-10 relative">
        <div className="flex flex-col gap-2">
          <Input type="file" onChange={(e) => handleChange("banner_image", e.target.files[0])} label={"이미지"} inputClassname={"max-w-[215px]"} />
          <Input value={values.title} onChange={(e) => handleChange("title", e.target.value)} label={"타이틀"} />
          <Input value={values.memo} onChange={(e) => handleChange("memo", e.target.value)} label={"내용"} />
          <Input value={values.link} onChange={(e) => handleChange("link", e.target.value)} label={"링크"} />
          {/* <Input onChange={(e) => handleChange('starttime', e.target.value)} label={"시작일"} />
        <Input onChange={(e) => handleChange('title', e.target.value)} label={"종료일"} /> */}
          <Input value={values.order} onChange={(e) => handleChange("order", e.target.value)} label={"순서"} type="number" />
          <div className="py-4 flex gap-4 items-center">
            <p>거래소 선택</p>
            <div className="flex w-60">
              <Dropdown
                value={exchange}
                placeholder={"거래소를 선택해주세요."}
                dropdownClick={handleDropdownClick}
                data={dropdownData}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                minWidth={160}
              />
            </div>
          </div>

          <div className="flex items-center">
            <p className="min-w-20">사용</p>
            <Switch active={values.status} setActive={() => setValues((prev) => ({ ...prev, status: prev.status === 1 ? 0 : 1 }))} />
          </div>
          <Button className={cn(buttonVariants({ variant: "secondary" }))} onClick={() => setIsVisibleDate((prev) => !prev)}>
            {dates.length === 2 ? `${moment(dates[0]).format("YYYY-MM-DD")} ~ ${moment(dates[1]).format("YYYY-MM-DD")}` : "날짜 선택"}
          </Button>
        </div>
        <div className="flex-1 w-full">
          <p>미리 보기</p>
          {values && Object.keys(values).length > 0 && values.path && (
            <div className="pt-10">
              <div className="flex flex-col gap-2 w-[200px] cursor-pointer" onClick={() => values.link.length > 0 && window.open(values.link)}>
                {previewUrls.banner_image ? (
                  <Image className="rounded-2xl" src={previewUrls.banner_image} width={200} height={200} alt="preview-thumb" />
                ) : values.path ? (
                  <Image className="rounded-2xl" src={`http://api.xn--3l2b13oekp.com${values.path}`} width={200} height={200} alt="logo" />
                ) : undefined}
                <p className="text-gray-400 font-bold">{values.title}</p>
                <p className="font-bold text-xl break-keep">{values.memo}</p>
                <div className="flex gap-1 text-xs items-center">
                  <CalendarDaysIcon size={16} />
                  <p>{moment(values.starttime).format("YYYY-MM-DD")}</p>
                  <p>~</p>
                  <p>{moment(values.endtime).format("YYYY-MM-DD")}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {isVisibleDate && <Calendar dates={dates} setDates={setDates} setIsVisibleDate={setIsVisibleDate} />}
      </div>
      <div style={{ marginTop: 60 }}>
        <Button onClick={handleAdd} disabled={Object.keys(values).length < 9 || dates.length !== 2}>
          수정
        </Button>
      </div>
    </>
  );
};

export default Container;
