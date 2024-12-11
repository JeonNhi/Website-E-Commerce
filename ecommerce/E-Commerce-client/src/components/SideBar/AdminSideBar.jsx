/** @format */

import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { adminSideBar } from "../../ultils/constains";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const activeClass =
  "flex items-center gap-2  hover:bg-[#1677ff] hover:text-white py-3 rounded-md  pl-6";
const AdminSideBar = () => {
  const location = useLocation();
  const [activeTabs, setActiveTabs] = useState([]);
  const [path, setPath] = useState(location.pathname);
  const handleShowTab = (tabId) => {
    if (activeTabs.some((tab) => tab === tabId))
      setActiveTabs((prev) => prev.filter((tab) => tab !== tabId));
    else setActiveTabs((prev) => [...prev, tabId]);
  };

  return (
    <aside className="w-[200px] fixed top-0 bottom-0 bg-[#001529] text-white h-full">
      <Link to={`/`} className="flex items-center flex-col  mt-5">
        <img
          className="w-[160px] h-[100px] object-contain"
          src={logo}
          alt="logo"
        />
        <h2 className="  w-[150px] break-words text-center text-[16px] leading-5">
          Admin Workplace
        </h2>
      </Link>
      <ul className="mt-6 flex flex-col gap-2 select-none">
        {adminSideBar.map((el) => (
          <li
            key={el.id}
            className="text-[#ffffffa6]"
            onClick={() => setPath(el.path)}
          >
            {el.type === "SINGLE" ? (
              <NavLink to={el.path}>
                <span
                  className={`${
                    path === el.path ? "bg-[#1677ff] text-white" : ""
                  } mx-1 ${activeClass}`}
                >
                  <span className="text-[18px]">{el.icon} </span>
                  {el.text}
                </span>
              </NavLink>
            ) : (
              <>
                <div
                  className={`justify-between  mx-1 ${activeClass}`}
                  onClick={() => {
                    handleShowTab(el.id);
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[18px]">{el.icon} </span>
                    {el.text}
                  </span>

                  <span className="mr-2 text-[20px]">
                    {activeTabs.some((tab) => tab === el.id) ? (
                      <IoMdArrowDropup />
                    ) : (
                      <IoMdArrowDropdown />
                    )}
                  </span>
                </div>
                {activeTabs.some((tab) => tab === el.id) && (
                  <ul className="flex flex-col gap-2 mx-1 text-[14px]">
                    {el.submenu.map((item, index) => (
                      <li
                        key={index}
                        className={`${
                          path === item.path ? "bg-[#1677ff] text-white" : ""
                        } pl-10 ${activeClass}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setPath(item.path);
                        }}
                      >
                        <NavLink to={item.path}>{item.text}</NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AdminSideBar;
