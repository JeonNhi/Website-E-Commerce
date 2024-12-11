/** @format */

import { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import path from "../../ultils/path";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "../../redux/user/userAction";
import icons from "../../ultils/icons";
import { logout } from "../../redux/user/userSlice";
const { FiLogOut } = icons;
const TopHeader = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, current } = useSelector((state) => state.user);
  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        dispatch(getCurrent());
      }, 1000);
    }
  }, [isLoggedIn]);

  return (
    <div className="w-full flex justify-center items-center  h-[38px] bg-main text-[12px] text-white">
      <div className="w-main p-[10px] flex justify-between px-5">
        <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
        {isLoggedIn && current ? (
          <small className="flex gap-2 items-center">
            <span>{`Welcome,${current?.firstname} ${current?.lastname}`}</span>
            <FiLogOut
              size={16}
              className="cursor-pointer"
              onClick={() => dispatch(logout())}
            />
          </small>
        ) : (
          <Link to={`/${path.LOGIN}`}>Sign In or Create Account</Link>
        )}
      </div>
    </div>
  );
};

export default memo(TopHeader);
