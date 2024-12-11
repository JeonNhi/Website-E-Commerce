/** @format */

import React, { useState } from "react";
import avatar from "../../assets/images/anonymous.jpg";
import bgAvatar from "../../assets/images/bg-avatar.png";
import { memberSideBar } from "../../ultils/constains";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
const activeClass =
  "flex items-center gap-2  hover:bg-[#ebebeb]  py-3 rounded-md  pl-3";
const MemberSideBar = () => {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  const { current } = useSelector((state) => state.user);

  return (
    <aside className="flex-1   text-white h-full rounded-[20px] bg-white">
      <div
        className={`relative flex items-center bg-cover bg-center rounded-tl-[20px] rounded-tr-[20px] flex-col     h-[246px]`}
        style={{ backgroundImage: `url(${bgAvatar})` }}
      >
        <div className="flex flex-col items-center absolute pt-[40px] px-[20px] pb-[20px] inset-0 bg-gradient-to-b from-transparent to-[#1a162e]">
          <img
            className="w-[116px] h-[116px] rounded-full border-[5px]  border-solid border-[#DFD2FA]  object-contain"
            src={current?.avatar || avatar}
            alt="avatar"
          />
          <div className="text-[18px] font-semibold leading-6 text-center mt-3">
            <p>{`${current.firstname} ${current.lastname}`}</p>
            <span className="text-[14px] font-normal leading-5">
              Registered: {moment(current.createdAt).format("Do MMM  YYYY")}
            </span>
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-medium text-[20px]  text-[#1a162e] mt-[30px] leading-6 ml-[30px]">
          Manage Account
        </h2>
      </div>
      <ul className="mt-4 flex flex-col gap-2 select-none mx-[30px] mb-4">
        {memberSideBar.map((el) => (
          <li
            key={el.id}
            className="text-[#1a162e]"
            onClick={() => setPath(el.path)}
          >
            <NavLink to={el.path}>
              <div
                className={`${
                  path === el.path ? "bg-[#ebebeb] " : ""
                } mx-1 ${activeClass}`}
              >
                <img src={el.icon} className="w-[18px] h-[20px] " />
                <span className="text-[16px]">{el.text}</span>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default MemberSideBar;
