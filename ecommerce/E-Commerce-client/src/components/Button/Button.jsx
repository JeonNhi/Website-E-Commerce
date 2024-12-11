/** @format */
import { memo } from "react";
const Button = ({ children, handleOnClick, style, type = "button", w }) => {
  return (
    <button
      type={type}
      className={`px-4 py-3 ${w} text-[#fff] font-semibold rounded-md outline-none hover:opacity-90 ${
        style ? `${style}` : "bg-[#FFB700]"
      } `}
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
    >
      {children}
    </button>
  );
};

export default memo(Button);
