/** @format */
import React, { useCallback, useEffect, useState } from "react";

import {
  BreadCrumb,
  SearchItem,
  InputSelect,
  Product,
  Pagination,
} from "../../components";

import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { apiGetProducts } from "../../apis";
import { sorts } from "../../ultils/constains";
import emptyProd from "../../assets/images/emptyProd.jpg";

const Products = () => {
  const { category } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [countProducts, setCountProducts] = useState(null);
  const [activeClick, setActiveClick] = useState(null);
  const [sort, setSort] = useState("-sold");

  const fetchProductByCategory = async (queries) => {
    const response = await apiGetProducts(queries);
    // const response = await apiGetProducts({ ...queries, limit: 8 });
    setProducts(response.products);
    setCountProducts(response.counts);
  };

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    let queryPrice = {};

    if (queries.from) {
      queries.price = { gte: queries.from };
    }

    if (queries.to) {
      queries.price = { lte: queries.to };
    }
    if (queries.from && queries.to) {
      queryPrice = {
        $and: [
          { price: { gte: queries.from } },
          { price: { lte: queries.to } },
        ],
      };
      delete queries.price;
    }
    delete queries.from;
    delete queries.to;

    if (category === "all-product") {
      fetchProductByCategory({ ...queryPrice, ...queries });
    } else {
      fetchProductByCategory({ ...queryPrice, ...queries, category });
    }

    window.scrollTo(0, 0);
  }, [params]);

  const handleChangeActive = useCallback(
    (name) => {
      activeClick === name ? setActiveClick(null) : setActiveClick(name);
    },
    [activeClick]
  );

  const handleChangeValue = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );

  useEffect(() => {
    let param = [{ category }];
    for (let i of params.entries()) param.push(i);

    const queries = {};
    for (let i of params) {
      queries[i[0]] = i[1];
    }

    navigate({
      pathname: `/${category}`,
      search: createSearchParams({
        ...queries,
        sort,
      }).toString(),
    });
  }, [sort]);

  return (
    <div className="w-full   flex flex-col items-center pb-16">
      <div className="w-full flex justify-center px-[20px] py-[15px] mb-[20px]  bg-[#f7f7f7] ">
        <div className="w-main px-[20px] flex flex-col items-start">
          <h1 className="uppercase text-[18px] text-[#151515] font-semibold leading-5">
            {category}
          </h1>
          <BreadCrumb category={category} />
        </div>
      </div>

      {products?.length > 0 ? (
        <div className="w-main">
          <div className="flex justify-between mt-[10px] p-[10px] pb-[20px] border-[1px] border-solid border-[#ebebeb]">
            <div>
              <h3 className="mb-[10px] text-[14px] font-semibold text-[#505050]">
                Filter By
              </h3>
              <div className="flex gap-[5px]">
                <SearchItem
                  activeClick={activeClick}
                  changeActiveClick={handleChangeActive}
                  name="price"
                  type="input"
                />
                <SearchItem
                  activeClick={activeClick}
                  changeActiveClick={handleChangeActive}
                  name="color"
                  type="checkbox"
                />
              </div>
            </div>
            <div className="w-[250px]">
              <h3 className="text-[14px] mb-[10px] font-semibold text-[#505050]">
                Sort By
              </h3>

              <InputSelect
                value={sort}
                onChangeValue={handleChangeValue}
                options={sorts}
              />
            </div>
          </div>
          <div className="mt-5 mb-5 ">
            <ul className="flex flex-wrap mx-[-10px] text-[14px] text-[#505050]">
              {products?.map((prod) => (
                <li
                  key={prod?._id}
                  className="flex w-1/4 px-[10px] mb-[20px] cursor-pointer "
                >
                  <Product productData={prod} showDes={true} />
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full">
            <Pagination totalCount={countProducts} limit={10} />
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col text-[#000000cc] text-[20px] items-center justify-center bg-white min-h-[500px] gap-5">
            <img src={emptyProd} className="w-[40%] h-[40%] " />
            <span>No products found</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
