import React from "react";

const Table = ({ data, wide }) => {
  return (
    <div className={`${wide ? "w-full" : undefined}`}>
      <div className="flex border-b pb-2 mb-3">
        {Object.keys(data[0]).map((v) => (
          <div className="flex-1 flex justify-center" key={v}>
            {v}
          </div>
        ))}
      </div>
      {data.map((v) => {
        return (
          <div key={v} style={{ display: "flex" }}>
            {Object.entries(v).map(([key, value], index) => {
              return (
                <div className="flex-1 flex justify-center border-b pb-3 mb-3" key={`${key} ${value} ${index}`}>
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
