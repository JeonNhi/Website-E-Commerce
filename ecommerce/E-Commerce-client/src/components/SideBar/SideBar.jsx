/** @format */
import { Link } from "react-router-dom";
import icons from "../../ultils/icons";
import { useSelector } from "react-redux";

const { AiOutlineMenuFold } = icons;

const SideBar = () => {
  const { categories } = useSelector((state) => state.app);

  return (
    <div className="border border-solid border-[#ebebeb]">
      <div className="px-5 py-[10px] bg-main flex gap-2 items-center">
        <AiOutlineMenuFold size={20} color="#fff" />
        <h2 className="text-[16px] text-[#fff] font-semibold">
          ALL COLLECTIONS
        </h2>
      </div>
      <ul className="flex flex-col gap-[6px]">
        {categories?.map((category) => (
          <li
            className="flex px-5 py-[15px] gap-2 text-[#1c1d1d] text-[14px] items-center"
            key={category?._id}
          >
            <div className="w-5 h-5">
              <img
                className="object-contain"
                src={category?.icon}
                alt={category.title}
              />
            </div>
            <Link to={category?.slug} className="hover:text-main">
              {category.title}({category.brand.length})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
