"use client";
export default function TypeButton({ children, type, value, onClick, select }) {
  return (
    <div onClick={onClick} className={`p-2  ${select === value && "bg-gray-400 dark:bg-gray-800"} rounded-sm`}>
      {children}
    </div>
  );
}
