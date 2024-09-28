import React from "react";
import { InputFieldProps } from "../types/employeeTypes";

const InputField = ({
  label,
  type,
  placeholder,
  value,
  className,
  onChange,
  icon,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col relative">
      <label className="mb-1 text-[#2C3345] font-medium text-sm">{label}</label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`border border-gray-300 rounded pl-8 p-2.5 text-sm outline-none w-full ${className}`} // Added padding left
        />
        <span className="absolute left-3 top-3.5 text-gray-400">{icon}</span>
      </div>
    </div>
  );
};

export default InputField;
