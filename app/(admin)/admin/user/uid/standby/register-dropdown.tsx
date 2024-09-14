"use client";
import { updateUidStatus } from "@/actions/trade/action";
import Dropdown from "@/components/ui/dropdown";
import { useToast } from "@/hooks/useToast";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

const data = [
  {
    label: "처리 완료",
    value: 1,
  },
  {
    label: "확인되지 않음",
    value: 2,
  },
];

const RegisterDropdown = ({ id }) => {
  console.log("id", id);

  const [isVisible, setIsVisible] = useState(false);
  const [value, setIsValue] = useState(null);
  const { addToast } = useToast();

  const token = getCookie("token");

  useEffect(() => {
    console.log("value", value);
    if (value && value[id] === 1) {
      updateUidStatus({ status: 1, order_id: id, token });
      addToast({ text: "UID 등록이 처리되었습니다." });
    } else if (value && value[id] === 2) {
      updateUidStatus({ status: 2, order_id: id, token });
      addToast({ text: "UID 거절 처리되었습니다." });
    }
  }, [value]);

  return <Dropdown data={data} placeholder={"등록"} isVisible={isVisible} setIsVisible={setIsVisible} value={value} setValue={setIsValue} id={id} />;
};

export default RegisterDropdown;
