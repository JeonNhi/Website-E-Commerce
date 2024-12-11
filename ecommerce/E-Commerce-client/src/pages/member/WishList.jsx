/** @format */

import React, { memo, useEffect, useState } from "react";
import { Button, SelectCustom, Varriant } from "../../components";
import { apiUpdateCart, apiUpdateWishList } from "../../apis";
import imgItems from "../../assets/images/orderItem.jpg";
import heart from "../../assets/images/HeartRed.svg";
import withBaseComponent from "../../hocs/withBaseComponent";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { formatMoney } from "../../ultils/helper";
import { toast } from "react-toastify";
import { getCurrent } from "../../redux/user/userAction";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { IoReload } from "react-icons/io5";
const WishList = ({ location, navigate, dispatch }) => {
  const { current } = useSelector((state) => state.user);
  const [wishlist, setWishlist] = useState(current.wishlist);
  const { categories } = useSelector((state) => state.app);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = categories?.map((cate) => ({
    value: cate.title,
    label: cate.title,
  }));
  const handleUpdateCart = async (productData) => {
    if (!current) {
      Swal.fire({
        title: "Almost...",
        text: "Please Login first",
        showCloseButton: true,
        showCancelButton: true,
        icon: "info",
        confirmButtonText: "Go Login",
        cancelButtonText: "Not now!",
      }).then((result) => {
        if (result.isConfirmed) {
          <div className="bg-[#D2D1D6] h-[1px] w-full my-5"></div>;
          navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({
              redirect: location.pathname,
            }).toString(),
          });
        }
      });
    }
    const res = await apiUpdateCart({
      pid: productData?._id,
      color: productData?.color,
      title: productData?.title,
      price: productData?.price,
      thumb: productData?.thumb,
      sku: uuidv4(),
    });
    if (res.success) toast.success(res.mes);
    dispatch(getCurrent());
  };
  console.log("selectedOption", selectedOption);

  const handleRemovewWishlist = async (id) => {
    const res = await apiUpdateWishList({ pid: id });
    setWishlist((prev) => {
      return prev.filter((prod) => prod._id !== id);
    });
    if (res.success) toast.success(res.mes);
    dispatch(getCurrent());
  };

  useEffect(() => {
    if (selectedOption?.value) {
      const newWishList = current?.wishlist?.filter(
        (el) => el.category === selectedOption.value
      );
      setWishlist([...newWishList]);
    }
  }, [selectedOption, current]);

  return (
    <div className="flex-3 bg-white rounded-[20px]">
      <div className="flex justify-between my-8 mx-10 items-center">
        <h2 className=" text-[24px] font-medium ">My WishList</h2>
        <div className="min-w-[250px] flex gap-5 items-center">
          <div className="flex-1">
            <SelectCustom
              options={options}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          </div>
          <span
            className="text-[22px] text-[#333] cursor-pointer"
            onClick={() => {
              setWishlist(current.wishlist);
              setSelectedOption(null);
            }}
          >
            <IoReload />
          </span>
        </div>
      </div>
      <div className="bg-[#efefef] h-[1px] w-full my-3"></div>

      <div className="mt-4 mb-8 mx-10 items-center">
        <h2 className=" text-[18px] mb-4 font-normal ">List Items</h2>
        <div className="flex flex-col text-[14px] cursor-pointer ">
          <span>
            {wishlist?.length > 0 ? (
              wishlist.map((el) => (
                <div key={el._id}>
                  <article className="flex gap-7">
                    <a className="w-[120px] h-[120px] " href="/">
                      <img
                        src={el?.thumb}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </a>
                    <div className="flex justify-between text-[16px] font-medium leading-5 flex-1">
                      <div className="flex flex-2 flex-col justify-center gap-5">
                        <div className="flex justify-between items-center">
                          <a
                            href={`/${el?.product?.category}/${el?.product?._id}/${el?.title}`}
                            className="capitalize"
                          >
                            {el.title}
                          </a>
                          <div onClick={() => handleRemovewWishlist(el._id)}>
                            <img src={heart} className="" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          {formatMoney(el?.price)} VND
                          <Button
                            handleOnClick={() => handleUpdateCart(el)}
                            style={
                              "bg-[#FFB700] text-black font-normal  rounded-xl"
                            }
                          >
                            Add To Cart
                          </Button>
                        </div>
                        {el?.color && (
                          <div className="flex gap-4">
                            <div className="cart-item__input">
                              <Varriant style={"py-[7px]"} color={el?.color} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                  <div className="bg-[#00000017] h-[1px] w-full my-4"></div>
                </div>
              ))
            ) : (
              <div className="flex flex-col text-[#000000cc] text-[20px] items-center justify-center bg-white min-h-[500px] gap-5">
                <img src={imgItems} className="w-[40%] h-[40%] " />
                <span>No items in wishlist </span>
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default withBaseComponent(WishList);
