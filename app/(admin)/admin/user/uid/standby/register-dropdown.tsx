"use client";
import { updateUidStatus } from "@/actions/trade/action";
import { modalAtom } from "@/app/store/modal";
import Dropdown from "@/components/dropdown";
// import Dropdown from "@/components/ui/dropdown";
import { useToast } from "@/hooks/useToast";
import { getCookie } from "cookies-next";
import { useAtom } from "jotai";
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
  const [isVisible, setIsVisible] = useState(false);
  const [value, setIsValue] = useState();
  const { addToast } = useToast();
  const [modal, setModal] = useAtom(modalAtom);

  const typeText = data.find((v) => v.value == type)?.label;

  useEffect(() => {
    if (value && value[id] === 1) {
      updateUidStatus({ status: 1, order_id: id });
      addToast({ text: "UID 등록이 처리되었습니다." });
    } else if (value && value[id] === 2) {
      updateUidStatus({ status: 2, order_id: id });
      addToast({ text: "UID 거절 처리되었습니다." });
    } else if (value && value[id] === -1) {
      setModal({
        visible: true,
        contents: () => (
          <div className="pt-20 flex gap-4 font-bold">
            <button className="p-1 px-4 rounded-md flex-1 bg-gray-50" onClick={() => setModal({ visible: false })}>
              취소
            </button>
            <button
              onClick={() => {
                setModal({ visible: false });
                updateUidStatus({ status: -1, order_id: id }).finally(() => addToast({ text: "UID 삭제 처리되었습니다." }));
              }}
              className="p-1 px-4 rounded-md flex-1 bg-orange-400 text-white"
            >
              삭제
            </button>
          </div>
        ),
        title: "정말 삭제하시겠습니까?",
      });

      // updateUidStatus({ status: -1, order_id: id }).finally(() => addToast({ text: "UID 삭제 처리되었습니다." }));
    }
    setIsVisible(false);
  }, [value]);

  return (
    // <Dropdown
    //   data={data.filter((v) => v.value != type)}
    //   placeholder={data.find((v) => v.value == type)?.label || "선택"}
    //   isVisible={isVisible}
    //   setIsVisible={setIsVisible}
    //   value={value}
    //   setValue={setIsValue}
    //   id={id}
    // />
    <div className="relative" onClick={() => setIsVisible((prev) => !prev)}>
      <div className="border p-1 px-4 rounded-md">{typeText || "선택"}</div>
      <Dropdown className={"left-[-25%]"} on={isVisible} setOn={setIsVisible}>
        {data
          .filter((v) => v.value != type)
          .map((v) => {
            return (
              <Dropdown.Item className={"min-w-20"} key={v.value} onClick={() => setIsValue((prev) => ({ ...prev, [id]: v.value }))}>
                {v.label || "선택"}
              </Dropdown.Item>
            );
          })}
      </Dropdown>
    </div>
  );
};

export default RegisterDropdown;
