/** @format */

import React, { memo, useEffect, useState } from "react";
import icons from "../../ultils/icons";
import { colors } from "../../ultils/constains";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { apiGetProducts } from "../../apis";
import { formatMoney } from "../../ultils/helper";
import useDebounce from "../../hooks/useDebounce";
const { IoIosArrowDown } = icons;

const SearchItem = ({ name, activeClick, changeActiveClick, type }) => {
  const [selected, setSelected] = useState([]);
  const [bestPrice, setBestPrice] = useState(null);
  const [price, setPrice] = useState({
    from: "",
    to: "",
  });
  const { category } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const onChangeSelected = (item) => {
    const alreadyEl = selected.find((el) => el === item);
    if (alreadyEl) {
      setSelected((prev) => prev.filter((el) => el !== item));
    } else setSelected((prev) => [...prev, item]);
  };

  const fetchBestPriceProduct = async () => {
    const res = await apiGetProducts({ sort: "-price", limit: 1 });
    if (res.success) setBestPrice(res.products[0].price);
  };

  useEffect(() => {
    if (type === "input") {
      fetchBestPriceProduct();
    }
  }, [type]);

  const debouncePriceFrom = useDebounce(price.from, 500);
  const debouncePriceTo = useDebounce(price.to, 500);
  useEffect(() => {
    let param = [{ category }];
    for (let i of params.entries()) param.push(i);

    const queries = {};
    for (let i of params) {
      queries[i[0]] = i[1];
    }
    if (Number(price.from) > 0) queries.from = price.from;
    if (Number(price.to) > 0) queries.to = price.to;
    if (selected.length > 0) queries.color = selected.join(",");
    queries.page = 1;

    navigate({
      pathname: `/${category}`,
      search: createSearchParams({
        ...queries,
      }).toString(),
    });
  }, [debouncePriceFrom, debouncePriceTo, selected]);

  const handleReset = (name) => {
    let param = [{ category }];
    for (let i of params.entries()) param.push(i);

    const queries = {};
    for (let i of params) {
      queries[i[0]] = i[1];
    }
    if (name === "color") {
      setSelected([]);
      delete queries.color;
    } else if (name === "price") {
      delete queries.from;
      delete queries.to;
    }
    navigate({
      pathname: `/${category}`,
      search: createSearchParams({
        ...queries,
      }).toString(),
    });
  };

  return (
    <div className="relative text-[12px] text-[#1a1b18bf]">
      <div
        onClick={() => changeActiveClick(name)}
        className={`${
          activeClick === name ? "shadow-search border-none" : ""
        } cursor-pointer flex items-center  gap-5 justify-between pl-4 pr-2 border-[1px] border-solid border-[#1a1b188c]`}
      >
        <span className="capitalize leading-[45px]  ">{name}</span>
        <IoIosArrowDown size={12} color="#1a1b18bf" />
      </div>
      {activeClick === name && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="z-50 bg-white text-[14px]  absolute bottom-[-5px] translate-y-[100%] w-[348px]   border-[1px] border-solid border-[#1a1b188c]"
        >
          {type === "checkbox" && (
            <>
              <div className="flex justify-between border-b border-solid border-[#1a1b1833] py-[15px] px-3">
                <span>{selected.length} selected</span>
                <label
                  onClick={() => {
                    changeActiveClick(null);
                    handleReset("color");
                  }}
                  className="underline text-[#1a1b18]"
                >
                  Reset
                </label>
              </div>
              <ul className="px-3">
                {colors.map((el, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <input
                      id={el}
                      type="checkbox"
                      value={el}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500    focus:ring-2 "
                      onChange={(e) => onChangeSelected(e.target.value)}
                      checked={selected?.some(
                        (selectedIetm) => selectedIetm === el
                      )}
                      onClick={() => changeActiveClick(null)}
                    />
                    <label
                      htmlFor={el}
                      className="w-full select-none  rounded text-[#505050] capitalize leading-[35px] font-medium"
                    >
                      {el}
                    </label>
                  </li>
                ))}
              </ul>
            </>
          )}
          {type === "input" && (
            <>
              <div className="flex justify-between border-b border-solid border-[#1a1b1833] py-[15px] px-3">
                <span>{`The highest price is ${formatMoney(
                  bestPrice
                )} VND`}</span>
                <label
                  onClick={() => {
                    setPrice({ from: "", to: "" });
                    handleReset("price");
                  }}
                  className="underline text-[#1a1b18]"
                >
                  Reset
                </label>
              </div>
              <div className="px-3 py-5">
                <div className="flex gap-4">
                  <div className="flex flex-1 items-center gap-2 mt-2 rounded-md shadow-sm">
                    <label
                      htmlFor="from"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      From
                    </label>

                    <input
                      name="from"
                      className="block w-full  rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none"
                      placeholder="From"
                      type="text"
                      value={price.from.toLocaleString()}
                      onChange={(e) =>
                        setPrice((prev) => ({
                          ...prev,
                          from: Number(
                            e.target.value
                              .toLocaleString()
                              .replace(/[^0-9.-]+/g, "")
                          ),
                        }))
                      }
                    />
                  </div>
                  <div className="flex flex-1 items-center gap-2 mt-2 rounded-md shadow-sm">
                    <label
                      htmlFor="to"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      To
                    </label>

                    <input
                      name="to"
                      className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none"
                      placeholder="To"
                      type="text"
                      value={price.to.toLocaleString()}
                      onChange={(e) =>
                        setPrice((prev) => ({
                          ...prev,
                          to: Number(
                            e.target.value
                              .toLocaleString()
                              .replace(/[^0-9.-]+/g, "")
                          ),
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(SearchItem);
