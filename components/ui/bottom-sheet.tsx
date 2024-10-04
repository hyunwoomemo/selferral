import { bottomSheetAtom } from "@/app/store/common";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import React, { useEffect } from "react";

const BottomSheet = ({}) => {
  const [bottomSheet, setBottomSheet] = useAtom(bottomSheetAtom);

  console.log("bottomSheetbottomSheet", bottomSheet);

  useEffect(() => {
    if (bottomSheet.isVisible) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [bottomSheet]);

  return (
    <>
      {bottomSheet.isVisible && <div onClick={() => setBottomSheet((prev) => ({ ...prev, isVisible: false }))} className={"absolute top-0 bottom-0 left-0 right-0 bg-gray-50 opacity-50"}></div>}
      <div className={cn("absolute left-0 right-0  bg-white rounded-t-lg border transition-all overflow-y-scroll", bottomSheet.isVisible ? "bottom-0 h-2/3" : "top-full h-0 overflow-hidden")}>
        {bottomSheet.contents && <div className="py-2  h-full">{bottomSheet.contents()}</div>}
      </div>
    </>
  );
};

export default BottomSheet;
