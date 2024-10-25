import { cn } from "@/lib/utils";
import React, { createContext, useContext, useEffect } from "react";

export const DropdownContext = createContext(null);

const Dropdown = ({ children, on, setOn, className }) => {
  // useEffect(() => {
  //   if (on) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // }, [on]);

  return (
    <DropdownContext.Provider value={{ on, setOn }}>
      <div
        className={cn(
          "absolute flex flex-col p-1 bg-gray-50 border gap-1 rounded-lg top-[100%] min-w-[30%] transition-all",
          on ? "opacity-100 translate-y-2 z-50 " : "opacity-0 translate-y-0",
          className
        )}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

const DropdownDim = () => {
  const { on, setOn } = useContext(DropdownContext);

  if (on) {
    return <div onClick={() => setOn(false)} className="absolute w-[300vw] h-[300vh] top-[-100vh] left-[-100vw] bg-black opacity-5"></div>;
  }
};

const DropdownContainer = ({ children }) => {
  const { on, setOn } = useContext(DropdownContext);

  return (
    <div className={cn("absolute flex flex-col p-2 bg-gray-50 border gap-2 rounded-lg top-[100%] min-w-[30%] transition-all", on ? "opacity-100 translate-y-2 z-50 " : "opacity-0 translate-y-0")}>
      {children}
    </div>
  );
};

const DropdownItem = ({ children, onClick, className }) => {
  return (
    <div onClick={onClick} className={cn("z-50 whitespace-nowrap p-2 bg-white rounded-md hover:bg-orange-50 cursor-pointer flex justify-center", className)}>
      {children}
    </div>
  );
};

Dropdown.Container = DropdownContainer;
Dropdown.Item = DropdownItem;
Dropdown.dim = DropdownDim;

export default Dropdown;
