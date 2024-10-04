import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, { useEffect } from "react";

const Dropdown = ({ data, value, setValue, isVisible, setIsVisible, placeholder, id, dropdownClick, minWidth }) => {
  console.log("datadddd", dropdownClick);

  const handleClick = (item) => {
    setValue((prev) => ({ ...prev, [id]: item.value }));
    setIsVisible(false);
  };

  useEffect(() => {
    setIsVisible(false);
  }, [value]);

  return (
    <>
      <div
        onClick={() => isVisible && setIsVisible(false)}
        className={`absolute top-0 left-0 right-0 bottom-0 w-full h-full  ${isVisible ? "pointer-events-auto bg-gray-100 opacity-50" : "pointer-events-none"}`}
      ></div>
      <div
        className={cn("relative flex gap-1 items-center border hover:border-orange-400 cursor-pointer p-1 px-2 rounded-md", minWidth ? `min-w-[${minWidth}px]` : undefined)}
        onClick={() => {
          setIsVisible((prev) => !prev);
        }}
      >
        <div className="flex gap-2 items-center flex-1">
          {value?.icon}
          <div>{value?.label || placeholder}</div>
        </div>
        {/* {isVisible && ( */}
        <div
          className={cn(
            "absolute border top-[110%] left-1/2 translate-x-[-50%] flex flex-col  z-50 bg-white whitespace-nowrap items-center transition-all w-full max-h-[300px] overflow-y-scroll",
            isVisible ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-[-16px] opacity-0 pointer-events-none"
          )}
        >
          {data.map((v) => {
            return (
              <div
                onClick={
                  dropdownClick
                    ? () => {
                        dropdownClick(v);
                      }
                    : () => handleClick(v)
                }
                key={v.value}
                className="w-full border-b p-2 flex gap-2 items-center"
              >
                {v?.icon}
                <div>{v?.label}</div>
              </div>
            );
          })}
        </div>
        {/* )} */}
        <ChevronDown size={20} />
      </div>
    </>
  );
};

export default Dropdown;
