/** @format */
import { NavLink } from "react-router-dom";
import { navigation } from "../../ultils/constains";
const Navigation = () => {
  return (
    <div className="w-main h-12 px-5">
      <div className="flex gap-8 items-center text-[#1d1d1d] py-2 h-full  border-y border-solid border-[#0000001a]">
        {navigation.map((el) => (
          <NavLink
            to={el.path}
            key={el.id}
            className={({ isActive }) =>
              isActive ? "hover:text-main text-main" : "hover:text-main"
            }
          >
            {el.value}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
