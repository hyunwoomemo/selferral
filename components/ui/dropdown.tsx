import React from "react";

const Dropdown = ({ data, value, setValue, isVisible, setIsVisible, placeholder, id }) => {
  const handleClick = (item) => {
    setValue((prev) => ({ ...prev, [id]: item.value }));
    setIsVisible(false);
  };

  console.log(isVisible);

  return (
    <>
      <div
        onClick={() => isVisible && setIsVisible(false)}
        className={`absolute top-0 left-0 right-0 bottom-0 w-full h-full  ${isVisible ? "pointer-events-auto bg-gray-100 opacity-50" : "pointer-events-none"}`}
      ></div>
      <div className="relative">
        <div className="" onClick={(prev) => setIsVisible(true)}>
          {placeholder}
        </div>
        {isVisible && (
          <div className="absolute border top-full left-1/2 translate-x-[-50%] flex flex-col  z-50 bg-white whitespace-nowrap items-center">
            {data.map((v) => {
              return (
                <div onClick={() => handleClick(v)} key={v.value} className="border-b p-2">
                  {v.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
