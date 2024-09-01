"use client";
import { toastAtom } from "@/store/toast/atom";
import { useAtom, useAtomValue } from "jotai";
import clsx from "clsx";
import ToastItem from "./toast-tiem";

const ToastContainer = () => {
  const [toast, setToast] = useAtom(toastAtom);

  console.log("toast", toast);

  if (toast.length === 0) {
    return;
  }

  // position: "fixed",
  // top: 10,
  // left: "50%",
  // transform: "translate(-50%, 0)",
  // zIndex: 9999,
  // clsx(styles.toastContainer, {
  //   pointerEvents: toast.length > 0 ? "auto" : "none",
  // })

  return (
    <div className={`fixed top-[10px] left-[50%] translate-x-[-50%] z-50 ${toast.length > 0 ? "pointer-events-auto" : "pointer-events-none"}`}>
      {toast.map((item, index) => (
        <ToastItem key={item.id} data={item} />
      ))}
    </div>
  );
};

export default ToastContainer;

// 토스트

// jotai로 관리?
// 배열에 담고
