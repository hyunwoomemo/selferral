import React from "react";

const Input = ({ label, unit, inputClassname, ...rest }) => {
  return (
    <div className="flex gap-2 items-center">
      <p className="min-w-20">{label}</p>
      <input className={`bg-gray-50 border p-2 rounded-md outline-orange-400 ${inputClassname}`} {...rest} />
      <p>{unit}</p>
    </div>
  );
};

export default Input;
