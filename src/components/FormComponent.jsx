import React from "react";

const FormComponent = ({ title, onSubmit, children, btnTitle }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      {children}
      <button
        type="submit"
        className="w-full bg-blue-500 cursor-pointer text-white p-2 rounded hover:bg-blue-600"
      >
        {btnTitle}
      </button>
    </form>
  );
};

export default FormComponent;
