import React from "react";

const Tab = ({ data }) => {
  return (
    <div className="flex gap-2">
      {data.map((v) => {
        return <div key={v.value}>{v.label}</div>;
      })}
    </div>
  );
};

export default Tab;
