/** @format */

import React, { memo } from "react";

const Varriant = ({ title = "", color = "", style, choose }) => {
  console.log("cho", choose);
  return (
    <div
      className={`h-full text-[13px]   py-[10px] px-[18px] border border-solid  hover:text-main hover:border-main ${
        choose ? "text-main border-main" : "text-[#000000cc] border-[#00000017]"
      } cursor-pointer transition-colors delay-50 ${style}`}
    >
      <span>{`${title} ${color}`}</span>
    </div>
  );
};

export default memo(Varriant);
