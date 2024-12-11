/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import path from "../../ultils/path";
import { Header, MemberSideBar } from "../../components";
const MemberLayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (!isLoggedIn || !current) return <Navigate to={`/${path.LOGIN}`} />;
  return (
    <div className="flex relative flex-col ">
      <Header isMember={true} w="w-full" h="80px" />

      <div className="  flex-auto bg-[#f5f5f5] h-full">
        <div className="flex mt-[30px] mx-[60px] gap-[30px]">
          <MemberSideBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MemberLayout;
