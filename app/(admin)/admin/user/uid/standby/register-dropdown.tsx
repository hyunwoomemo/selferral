"use client";
import { updateUidStatus } from "@/actions/trade/action";
import Dropdown from "@/components/ui/dropdown";
import { useToast } from "@/hooks/useToast";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

const data = [
  {
    label: "등록",
    value: 1,
  },
  {
    label: "거절",
    value: 2,
  },
  {
    label: "삭제",
    value: -1,
  },
];

const RegisterDropdown = ({ id, type }) => {
  console.log("id", id);

  const [isVisible, setIsVisible] = useState(false);
  const [value, setIsValue] = useState();
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
    setIsVisible(false);
  }, [value]);

  return (
    <Dropdown
      data={data.filter((v) => v.value != type)}
      placeholder={data.find((v) => v.value == type)?.label || "선택"}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      value={value}
      setValue={setIsValue}
      id={id}
    />
  );
};

export default RegisterDropdown;
