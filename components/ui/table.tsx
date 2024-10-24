import { cn } from "@/lib/utils";
import React from "react";

const Table = ({ data, wide = true, headerClassname, bodyClassname, textColor = "black", onClick, hover }) => {
  if (!data) {
    return <div>데이터가 존재하지 않습니다.</div>;
  }

  return (
    <div className={cn(`${wide ? "w-full" : "w-[80%]"}`, "bg-gray-50 my-4")}>
      <div className={`flex border-b p-3 px-5 bg-orange-100  ${headerClassname}`}>
        {data[0] &&
          Object.keys(data[0])
            .filter((v) => v !== "accordion")
            .map((v) => (
              <div className="flex-1 flex justify-center items-center" key={v}>
                {v}
              </div>
            ))}
      </div>
      {data.map((v, rowIndex) => {
        return (
          <div key={v.id || rowIndex} className="bg-white">
            <div onClick={onClick ? () => onClick(v.id) : null} className={`border-b p-5 ${bodyClassname} hover:bg-orange-50 `} style={{ display: "flex", alignItems: "center" }}>
              {Object.entries(v)
                .filter(([key]) => key !== "accordion")
                .map(([key, value], colIndex) => {
                  return (
                    <div id={"tableitem"} className=" flex-1 max-w-full  flex justify-center text-start cursor-pointer" key={`${key}-${colIndex}-${rowIndex}`}>
                      {value}
                    </div>
                  );
                })}
            </div>
            {v.accordion}
          </div>
        );
      })}
    </div>
  );
};

export default Table;
