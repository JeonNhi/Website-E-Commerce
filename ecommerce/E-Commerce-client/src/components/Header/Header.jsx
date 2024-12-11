/** @format */
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import icons from "../../ultils/icons";
import path from "../../ultils/path";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user/userSlice";
import { memo, useEffect, useState } from "react";
import { Cart } from "../../components";
const { RiPhoneFill, IoMail, BsHandbagFill, FaUserCircle } = icons;

const Header = ({ isMember, w = "w-main", h = "110px" }) => {
  const { isLoggedIn, current, currentCart } = useSelector(
    (state) => state.user
  );
  const [showOptions, setShowOptions] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClickOptions = (e) => {
      const optionEl = document.getElementById("optional");
      if (optionEl) {
        if (!optionEl.contains(e.target)) setShowOptions(false);
      }
    };
    document.addEventListener("click", handleClickOptions);

    return () => {
      document.removeEventListener("click", handleClickOptions);
    };
  }, []);

  return (
    <header
      className={`${w} h-[${h}] py-[35px] flex justify-between px-5 bg-white`}
    >
      <div className="flex items-center">
        <Link to={`/${path.HOME}`}>
          <img src={logo} alt="logo" className="w-[234px] object-contain" />
        </Link>
      </div>
      <div className="flex text-[13px] items-center text-title leading-4">
        {!isMember && (
          <>
            <div className="px-5">
              <div className="flex  gap-[10px]">
                <RiPhoneFill color="red" />
                <span className="font-semibold">(+1800) 000 8808</span>
              </div>
              <span className="text-[12px] ">Mon-Sat 9:00AM - 8:00PM</span>
            </div>
            <div className="border-x border-solid border-[#0000001a] px-5">
              <div className="flex  gap-[10px]">
                <IoMail color="red" />
                <span className="font-semibold">SUPPORT@TADATHEMES.COM</span>
              </div>
              <span className="text-[12px]">Online Support 24/7</span>
            </div>
          </>
        )}
        {isLoggedIn && current && (
          <>
            <div
              className="flex cursor-pointer  gap-[10px] items-center px-5"
              onMouseEnter={() => setShowCart(true)}
              onMouseLeave={() => setShowCart(false)}
            >
              <BsHandbagFill color="red" size={20} />
              <div>
                <span className="relative ">
                  {currentCart?.length || 0} Item
                  {showCart && <Cart data={currentCart} />}
                </span>
              </div>
            </div>
            <div className="relative select-none flex border-l border-solid gap-[10px] border-[#0000001a] px-5  items-center">
              <div
                onClick={() => setShowOptions((prev) => !prev)}
                className="flex items-center gap-2 cursor-pointer"
                id="optional"
              >
                <FaUserCircle color="red" size={25} />
                <span>Profile</span>
              </div>
              <div
                className={` ${
                  !showOptions && "hidden"
                } z-10 absolute top-[100%] mt-2 bg-[#F6F6F6]   rounded-lg shadow w-44 `}
              >
                <ul className="pt-2 text-sm text-gray-700 font-main text-[13px]">
                  <li>
                    <Link to={`${path.MEMBER}/${path.PERSONAL}`}>
                      <span className="block px-4 py-2 hover:bg-gray-200  ">
                        Personal
                      </span>
                    </Link>
                  </li>
                  {current.role === "admin" && (
                    <li>
                      <Link to={`${path.ADMIN}/${path.DASHBOARD}`}>
                        <span className="block px-4 py-2 hover:bg-gray-200  ">
                          Admin Workspace
                        </span>
                      </Link>
                    </li>
                  )}
                </ul>
                <div className="py-2" onClick={() => dispatch(logout())}>
                  <Link to={`/${path.LOGIN}`}>
                    <span className="block px-4 pt-2 pb-1 text-sm  text-gray-700 hover:bg-gray-200 border-t border-solid border-[#ccc]">
                      Sign out
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default memo(Header);
