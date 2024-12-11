/** @format */

import React, { memo } from "react";
import anonymous from "../../assets/images/anonymous1.png";
import moment from "moment";
import { renderStars } from "../../ultils/helper";

const Comment = ({
  name = "Anonymous",
  avatar = anonymous,
  star,
  comment,
  updatedAt,
}) => {
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img
            src={avatar}
            alt="avatar"
            className="w-[36px] h-[36px] object-cover rounded-full"
          />
          <span className="text-[16px] font-semibold text-[#000]">{name}</span>
        </div>
        <span className="text-[12px] italic">
          {moment(updatedAt).fromNow()}
        </span>
      </div>
      <div className="px-6 py-4 ml-[48px] border-[1px] border-solid border-[#ccc] bg-[#f9f8f8] ">
        <div className="flex gap-3 mb-2">
          <span className="text-[16px] font-semibold text-[#000]">Vote:</span>
          <div className="flex gap-1">
            {renderStars(star).map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </div>
        </div>
        <div className="flex gap-3 ">
          <span className="text-[16px] font-semibold leading-5 text-[#000]">
            Comment:
          </span>
          <p className="text-[16px] leading-5 text-[#333]">{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default memo(Comment);
