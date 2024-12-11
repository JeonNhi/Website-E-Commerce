/** @format */

import { createSearchParams, useNavigate } from "react-router-dom";
import icons from "../../ultils/icons";
const { GrFormNext } = icons;
import { useSelector } from "react-redux";

const HotCollection = () => {
  const { categories } = useSelector((state) => state.app);
  const navigate = useNavigate();
  const arrCate = categories?.filter((el) => el?.brand.length > 0);
  return (
    <>
      <h2 className="flex gap-5 font-semibold text-[20px] py-5  text-heading uppercase border-b-2 border-main border-solid pb-[15px]">
        Hot Collections
      </h2>
      <div className="mt-5 mb-5 ">
        <ul className="flex flex-wrap mx-[-10px] text-[14px] text-[#505050]">
          {arrCate?.map((cate) => (
            <li
              key={cate?._id}
              className="flex w-1/3 px-[10px] mb-[20px] cursor-pointer "
            >
              <div className="flex w-full gap-5 border-solid border-[#ebebeb] border p-[15px]">
                <img
                  src={cate?.image}
                  className="w-[144px] h-[129px] object-contain pl-5"
                />
                <ul className="text-[#808080]  mb-5">
                  <h3 className="text-[#505050] font-semibold mb-[15px] uppercase">
                    {cate?.title}
                  </h3>
                  {cate?.brand.map((el, index) => (
                    <li
                      onClick={() =>
                        navigate({
                          pathname: `${cate?.title.toLowerCase()}`,
                          search: createSearchParams({ branch: el }).toString(),
                        })
                      }
                      key={index}
                      className="flex  leading-4 gap-1 text-[#808080] pb-[5px] hover:text-main"
                    >
                      <GrFormNext color="#f3f3f3" />
                      <span>{el}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default HotCollection;
