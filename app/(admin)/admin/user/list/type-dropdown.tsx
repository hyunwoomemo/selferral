"use client";
import { updateUidStatus } from "@/actions/trade/action";
import Dropdown from "@/components/ui/dropdown";
import { useToast } from "@/hooks/useToast";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

const data = [
  {
    label: "관리자",
    value: "UT02",
  },
  {
    label: "일반 회원",
    value: "UT01",
  },
];

const TypeDropdown = ({ id, type }) => {
  console.log("id", id);

  const [isVisible, setIsVisible] = useState(false);
  const [value, setIsValue] = useState();
  const { addToast } = useToast();

  // useEffect(() => {
  //   console.log("value", value);
  //   if (value && value[id] === 1) {
  //     updateUidStatus({ status: 1, order_id: id });
  //     addToast({ text: "UID 등록이 처리되었습니다." });
  //   } else if (value && value[id] === 2) {
  //     updateUidStatus({ status: 2, order_id: id });
  //     addToast({ text: "UID 거절 처리되었습니다." });
  //   } else if (value && value[id] === -1) {
  //     updateUidStatus({ status: -1, order_id: id }).finally(() => addToast({ text: "UID 삭제 처리되었습니다." }));
  //   }
  //   setIsVisible(false);
  // }, [value]);

  return (
    <Dropdown data={data.filter((v) => v.value != type)} placeholder={getUserTypeText(type) || "선택"} isVisible={isVisible} setIsVisible={setIsVisible} value={value} setValue={setIsValue} id={id} />
  );
};

export default TypeDropdown;
