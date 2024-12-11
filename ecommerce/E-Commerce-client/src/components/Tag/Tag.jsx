/** @format */

import React, { memo } from "react";

const Tag = ({ children, status = "success", style }) => {
  return (
    <span
      className={`text-[12px] rounded  px-[7px] py-[2px]   border-[1px] border-solid ${
        status === "warning"
          ? `border-[#ffbb96] text-[#d4380d] bg-[#fff2e8] ${
              style ? `${style}` : ""
            }`
          : "border-[#adc6ff] text-[#1d39c4] bg-[#f0f5ff]"
      }`}
    >
      {children}
    </span>
  );
};

export default memo(Tag);
