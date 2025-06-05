import React from "react";

const InputBox = ({
  type = "text",
  name,
  value,
  checked,
  onChange,
  placeholder,
  required = false,
  className = "",
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full p-2 border border-gray-300 rounded ${className}`}
    />
  );
};

export default InputBox;
