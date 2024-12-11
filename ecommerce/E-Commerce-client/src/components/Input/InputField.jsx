/** @format */

import { memo } from "react";

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFied,
  setInvalidField,
  icon,
  w,
  style,
}) => {
  // console.log("va", value);
  return (
    <div className={`${style}`}>
      <div
        className={` bg-white border border-solid border-[#d2d1d6] flex justify-between items-center rounded-md ${
          w ? `w-[${w}px]` : ""
        }`}
      >
        <input
          type={type || "text"}
          className="outline-none text-[16px] px-4 py-2 w-full rounded-md placeholder:text-[14px] bg-transparent"
          placeholder={nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
          value={value}
          onChange={(e) =>
            setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
          }
          onFocus={() => setInvalidField && setInvalidField([])}
        />

        <span className="text-[#d2d1d6] pr-2 text-[20px]">{icon}</span>
      </div>
      {invalidFied?.some((el) => el.name === nameKey) && (
        <small className="text-[12px] text-main italic mt-[2px]">
          {invalidFied?.find((el) => el.name === nameKey).mes}
        </small>
      )}
    </div>
  );
};
//[name:"password",mes:""]

export default memo(InputField);
