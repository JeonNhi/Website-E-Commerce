/** @format */

import { memo } from "react";

const InputSelect = ({ value, onChangeValue, options }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChangeValue(e.target.value)}
      className="cursor-pointer w-full text-[12px] text-[#1a1b18bf] pl-4 pr-5 border-[1px] border-solid border-[#1a1b188c] leading-[45px] h-[45px] outline-none"
    >
      {options?.map((el) => (
        <option key={el.id} value={el.value}>
          {el.title}
        </option>
      ))}
    </select>
  );
};

export default memo(InputSelect);
