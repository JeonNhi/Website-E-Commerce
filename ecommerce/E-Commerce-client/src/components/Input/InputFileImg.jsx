/** @format */

import React, { memo } from "react";

const InputFileImg = ({ id, label, register, errors, validate, multiple }) => {
  return (
    <div className="flex flex-col gap-3">
      <span className="min-w-[80px] font-medium">{label}</span>
      <div>
        <label
          htmlFor={id}
          className="flex flex-col items-center justify-center w-[100px] h-[100px] border-2 border-[#d9d9d9] hover:border-blue-500 transition-all delay-100 border-dashed rounded-lg cursor-pointer bg-gray-50 "
        >
          <div className="flex justify-center items-center flex-col gap-5">
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="plus"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
              <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"></path>
            </svg>
            <span>Upload</span>
          </div>
          <input
            {...(validate ? register(id, validate) : register(id))}
            id={id}
            type="file"
            className="hidden"
            multiple={multiple}
          />
        </label>
        {errors[id] && (
          <small className="text-[12px] text-main italic  ">
            {errors[id]?.message}
          </small>
        )}
      </div>
    </div>
  );
};

export default memo(InputFileImg);
