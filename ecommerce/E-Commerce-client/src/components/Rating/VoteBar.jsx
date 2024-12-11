/** @format */

import React, { memo, useEffect, useRef } from "react";
import icons from "../../ultils/icons";

const { AiFillStar } = icons;

const VoteBar = ({ number, ratingCount, ratingTotal }) => {
  const ratingCountRef = useRef();
  useEffect(() => {
    const percent = Math.round((ratingCount * 100) / ratingTotal) || 0;
    ratingCountRef.current.style.cssText = `right: ${100 - percent}%`;
  }, [ratingCount, ratingTotal]);
  return (
    <div className="flex justify-evenly gap-5 mx-[30px] items-center">
      <div className="flex gap-1 items-center justify-between ">
        <span className="w-2 h-[16px] leading-4 text-center font-semibold">
          {number}
        </span>
        <span>
          <AiFillStar color="#f1b400" />
        </span>
      </div>
      <div className="flex-1">
        <div className="relative h-[6px] w-full rounded-md bg-[#ededed] ">
          <div
            ref={ratingCountRef}
            className="absolute h-[6px] rounded-md inset-0 bg-main right-3"
          ></div>
        </div>
      </div>
      <div className="text-[14px] ">{`${ratingCount || 0}`} reviewers</div>
    </div>
  );
};

export default memo(VoteBar);
