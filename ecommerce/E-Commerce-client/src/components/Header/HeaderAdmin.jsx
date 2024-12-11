/** @format */

import React from "react";
import { BsFillCaretDownFill } from "react-icons/bs";
import logo from "../../assets/images/logo.png";
import anonymous from "../../assets/images/anonymous.jpg";

const HeaderAdmin = () => {
  return (
    <div className="flex justify-between h-header py-2 px-10 bg-white">
      <div className="flex gap-3 items-center">
        <img
          className="w-[64px] h-[64px] object-contain"
          src={logo}
          alt="logo"
        />
        <div className="text-[24px] text-[#4f7db3] font-semibold">
          <h2 className="uppercase ">DIGITAL WORLD</h2>
          <p className="text-[12px] mt-2">DIGITAL WORLD</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* <img
            className="rounded-full w-[32px] h-[32px] object-contain"
            src={user}
          /> */}
        <img
          className="w-[64px] h-[64px] object-contain"
          src={anonymous}
          alt="anonymous"
        />

        <span className="text-[16px] text-[#4f7db3] font-serif">Admin</span>
        <span className="text-[#4f7db3]">
          <BsFillCaretDownFill size={12} />
        </span>
      </div>
    </div>
  );
};

export default HeaderAdmin;
