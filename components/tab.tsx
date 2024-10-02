import React from "react";

const Tab = ({ data, tab, setTab, all = false }) => {
  return (
    <div className="flex gap-4">
      {all && (
        <div onClick={() => setTab("all")} className={`px-8 py-2 bg-gray-100 dark:bg-gray-900 rounded-lg ${tab === "all" ? "text-orange-400" : undefined} cursor-pointer`}>
          전체
        </div>
      )}
      {data.map((v) => (
        <div key={v.value} className={`px-8 py-2 bg-gray-100 dark:bg-gray-900 rounded-lg ${tab === v.value ? "text-orange-400" : undefined} cursor-pointer`} onClick={() => setTab(v.value)}>
          {v?.label || v.value}
        </div>
      ))}
    </div>
  );
};

export default Tab;
