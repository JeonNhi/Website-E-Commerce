/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import path from "../../ultils/path";
import { AdminSideBar, HeaderAdmin } from "../../components";

const AdminLayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (!isLoggedIn || !current || !(current.role === "admin"))
    return <Navigate replace={true} to={`/${path.LOGIN}`} />;

  return (
    <div className="flex relative ">
      <div className="w-[200px] flex-none">
        <AdminSideBar />
      </div>

      <div className="flex-auto bg-[#f5f5f5] h-screen">
        <HeaderAdmin />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
