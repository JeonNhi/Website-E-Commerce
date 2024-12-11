/** @format */

import React, { memo } from "react";

const RadioForm = ({
  id,
  label,
  validate,
  register,
  options,
  errors,
  disabled,
  style,
}) => {
  return (
    <div className="flex flex-1 items-center">
      {label && (
        <label htmlFor={id} className="min-w-[80px]">
          {label}
        </label>
      )}

      {options?.map((el, index) => (
        <div key={index} className="flex">
          <div className="flex items-center me-4">
            <input
              id={id}
              type="radio"
              value={el?.value}
              {...register(id, validate)}
              disabled={disabled}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
            />
            <label
              htmlFor={id}
              className="ms-2 text-sm font-medium text-gray-900 capitalize"
            >
              {el?.title}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(RadioForm);
