import React from "react";

const Table = ({ data, wide, headerClassname, bodyClassname, textColor = "black", onClick, hover }) => {
  if (!data) {
    return <div>데이터가 존재하지 않습니다.</div>;
  }

  console.log("dddd", data);

  return (
    <div className={`${wide ? "w-full" : undefined}`}>
      <div className={`flex border-b p-3 px-5 ${headerClassname}`}>
        {Object.keys(data[0]).map((v) => (
          <div className="flex-1 flex justify-center items-center" key={v}>
            {v}
          </div>
        ))}
      </div>
      {data.map((v) => {
        return (
          <div onClick={onClick ? () => onClick(v.id) : null} key={v.value} className={`border-b p-5 ${bodyClassname} hover:bg-orange-50`} style={{ display: "flex", alignItems: "center" }}>
            {Object.entries(v).map(([key, value], index) => {
              return (
                <div className="flex-1 flex justify-center cursor-pointer" key={`${key} ${value} ${index}`}>
                  {value}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Table;
