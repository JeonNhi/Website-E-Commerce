/** @format */
import { memo } from "react";
const CountDown = ({ unit, number }) => {
  return (
    <div className="py-[10px] w-1/3 px-[5px] flex flex-col gap-[10px] text-[#151515] text-[18px] bg-[#f4f4f4] text-center rounded-sm">
      <span className="font-semibold">{number}</span>
      <span className="text-[12px] text-[#8b8b8b]">{unit}</span>
    </div>
  );
};

export default memo(CountDown);
