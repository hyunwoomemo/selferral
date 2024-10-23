"use client";

import { toastAtom } from "@/store/toast/atom";
import { useAtom } from "jotai";

interface IToast {
  id: number;
  contents: string;
}

export const useToast = () => {
  const [toast, setToast] = useAtom(toastAtom);

  const addToast = ({
    text,
    type = "info",
    remain = false,
    time = 3000,
    cta,
  }: {
    text: string;
    type?: "success" | "warning" | "info" | "loading";
    remain?: boolean;
    time?: number;
    cta?: { label: string; action: () => void }[];
  }) => {
    const id = Date.now();

    if (remain) {
      setToast((prev) => {
        // '텍스트!!' 컨텐츠를 가진 이전 아이템은 제거
        const filteredPrev = prev.filter((v) => v.contents !== text);

        // 새로운 아이템 추가
        const newToast = [{ id: id, contents: text, type: type, remain, time, cta }, ...filteredPrev];

        // 상태 업데이트 후 반환
        setToast(newToast);
        return newToast;
      });
    } else {
      setToast((prev) => {
        // '텍스트!!' 컨텐츠를 가진 이전 아이템은 제거
        const filteredPrev = prev.filter((v) => v.contents !== text);

        // 새로운 아이템 추가
        const newToast = [{ id: id, contents: text, time, type, remain, cta }, ...filteredPrev];

        // 상태 업데이트 후 반환
        setToast(newToast);

        // 3초 후 해당 아이템 제거
        // setTimeout(() => {
        //   setToast((current) => current.filter((v) => v.id !== id));
        // }, options.time);

        return newToast;
      });
    }

    return id;
  };

  const removeToast = (id: number) => {
    setToast((prev) => {
      return prev.filter((v: IToast) => v.id !== id);
    });
  };

  const loadingToast = () => {
    const id = Date.now();

    setToast((prev) => [{ id: id, type: "loading" }, ...prev]);

    return id;
  };

  // const promiseToast= ({ successCode, fn }) => {
  //   const id = addToast({ text: "Loading..." });
  //   return new Promise((resolve, reject) => {
  //     fn().then((res) => {
  //
  //       if (res.CODE === successCode) {
  //         resolve(() => modifyToast({ id, text: "성공", type: "success" }));
  //       } else {
  //         reject(() => modifyToast({ id, text: "실패", type: "warning" }));
  //       }
  //     });
  //   });
  // }

  const modifyToast = ({
    id,
    text,
    type = "info",
    remain = false,
    time = 3000,
    cta,
  }: {
    id: number;
    text: string;
    type?: "success" | "warning" | "info" | "loading";
    remain?: boolean;
    time?: number;
    cta?: { label: string; action: () => void }[];
  }) => {
    if (!remain) {
      const newId = Date.now();
      setToast((prev) => {
        setTimeout(() => {
          setToast((current) => current.filter((v) => v.id !== newId));
        }, time);

        return [...prev.filter((v: IToast) => v.id !== id), { id: newId, contents: text, type: type, remain, time, cta, modify: true }];
      });
    } else {
      setToast((prev) => {
        return [...prev.filter((v: IToast) => v.id !== id), { id: Date.now(), contents: text, type: type, remain, time, cta, modify: true }];
      });
    }
  };

  return { addToast, removeToast, modifyToast, loadingToast };
};
