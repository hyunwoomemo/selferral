import { bottomSheetAtom } from "@/app/store/common";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import React, { useEffect } from "react";

const BottomSheet = ({}) => {
  const [bottomSheet, setBottomSheet] = useAtom(bottomSheetAtom);

  // const { width, height } = useWindowDimensions();

  // useEffect(() => {}, []);

  useEffect(() => {
    if (bottomSheet.isVisible) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [bottomSheet]);

  return (
    <>
      {bottomSheet.isVisible && (
        <div onClick={() => setBottomSheet((prev) => ({ ...prev, isVisible: false }))} className={"pointer-events-auto fixed top-0 bottom-0 left-0 right-0 bg-gray-50 opacity-50"}></div>
      )}
      <div
        className={cn(
          "pointer-events-auto absolute  left-0 right-0  bg-white rounded-t-lg border transition-all overflow-y-scroll",

          bottomSheet.isVisible ? `bottom-0 ${bottomSheet.height ? bottomSheet.height : "h-2/3"}` : "bottom-0 h-0 overflow-hidden"
        )}
      >
        {bottomSheet.contents && <div className="py-2  h-full">{bottomSheet.contents()}</div>}
      </div>
    </>
  );
};

export default BottomSheet;
