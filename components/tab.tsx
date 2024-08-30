import React from "react";

const Tab = ({ data, tab, setTab, all = false }) => {
  return (
    <div className="flex gap-4 py-10">
      {all && (
        <div onClick={() => setTab("all")} className={`px-8 py-2 bg-gray-100 dark:bg-gray-900 rounded-md ${tab === "all" ? "text-orange-400" : undefined}`}>
          전체
        </div>
      )}
      {data.map((v) => (
        <div key={v.value} className={`px-8 py-2 bg-gray-100 dark:bg-gray-900 rounded-md ${tab === v.value ? "text-orange-400" : undefined}`} onClick={() => setTab(v.value)}>
          {v?.label || v.value}
        </div>
      ))}
    </div>
  );
};

export default Tab;
