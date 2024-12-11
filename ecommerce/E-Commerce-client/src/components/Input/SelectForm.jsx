/** @format */

import React, { memo } from "react";

const SelectForm = ({
  id,
  label,
  errors,
  register,
  options,
  validate,
  disabled,
  fullwidth,
  style,
}) => {
  return (
    <div className={`${style} flex-1`}>
      <div
        className={` bg-white  flex justify-between items-center  ${
          fullwidth ? `w-full` : ""
        }`}
      >
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-900 min-w-[80px] "
        >
          {label}
        </label>
        <div className="flex flex-col justify-center gap-2 w-full min-h-[80px]">
          <select
            disabled={disabled}
            id={id}
            {...register(id, validate)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block p-2 "
          >
            <option value={""}>Choose a {label}</option>
            {options?.map((el, index) => (
              <option key={index} value={el?.value}>
                {el?.title}
              </option>
            ))}
          </select>
          {errors[id] && (
            <small className="text-[12px] text-main italic  ">
              {errors[id]?.message}
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(SelectForm);
