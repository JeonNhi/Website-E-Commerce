/** @format */

import { memo } from "react";

const SelectQuantity = ({ quantity, handleQuantity, handleChangeQuantity }) => {
  console.log("quantity", quantity);
  return (
    <div className="flex items-center">
      <span
        onClick={() => handleChangeQuantity("minus")}
        className="cursor-pointer select-none px-3 bg-[#f6f6f6] py-[8px] text-[#333] border-r-[1px] border-solid  border-[#333]"
      >
        -
      </span>
      <input
        type="text "
        className="outline-none w-[50px] text-center bg-[#f6f6f6] self-stretch  "
        value={quantity}
        onChange={(e) => handleQuantity(e.target.value)}
      />
      <span
        onClick={() => handleChangeQuantity("plus")}
        className="cursor-pointer select-none px-3 bg-[#f6f6f6] py-[8px] text-[#333] border-l-[1px] border-solid  border-[#333]"
      >
        +
      </span>
    </div>
  );
};

export default memo(SelectQuantity);
