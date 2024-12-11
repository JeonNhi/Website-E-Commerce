/** @format */

import React, { memo } from "react";
import { Button } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { formatMoney } from "../../ultils/helper";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { apiRemoveCart } from "../../apis";
import { toast } from "react-toastify";
import { getCurrent } from "../../redux/user/userAction";
import path from "../../ultils/path";
const Cart = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalPrice = data.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  const handleDeleteCart = async (pid, sku) => {
    const res = await apiRemoveCart(pid, sku);
    if (res.success) toast.success(res.mes);
    dispatch(getCurrent());
  };
  console.log("data", data);
  return (
    <div className="shadow-cart absolute z-50  bg-white rounded-[16px] p-6 pb-3  text-[#1A162E] text-[20px] font-normal right-[-100%] top-[40px] before:content-['']   before:absolute  before:top-[0] before:right-[50px] before:translate-y-[-100%]  before:border-solid before:border-r-[8px] before:border-l-[24px]  before:border-[transparent] before:border-b-[#e6e5e5]  before:border-y-[12px] after:content-[''] after:absolute after:w-full after:pt-5 after:left-0 after:right-0 after:top-[0] after:translate-y-[-100%]">
      <div className="flex justify-between mb-7">
        <h3 className="font-medium ">You have {data?.length} item</h3>
        <span
          className="text-[#0071DC] text-[18px] "
          onClick={() => navigate(`/${path.CART}`)}
        >
          See All
        </span>
      </div>
      <div className=" max-w-[410px] min-w-[300px] w-full  select-none">
        <div className="flex gap-5  overflow-x-scroll  w-full scroll-hidden">
          {data.length > 0 ? (
            <>
              {data?.map((el, index) => (
                <article
                  onClick={() =>
                    navigate(
                      `/${el?.product?.category}/${el?.product?._id}/${el?.title}`
                    )
                  }
                  key={index}
                  className="cursor-pointer"
                >
                  <div className="relative  group max-w-[100%] min-w-[120px] h-[120px] mb-3 border-solid border-[#d2d1d6] border rounded-[10px]">
                    <img
                      className="w-full h-full object-cover p-1"
                      src={el?.thumb}
                      alt=""
                    />
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="invisible group-hover:visible  bg-overlay w-full h-full absolute l-[50%]  top-0 translate-[50%,50%]  flex items-center justify-center"
                    >
                      <FiTrash2
                        color="#fff"
                        onClick={() =>
                          handleDeleteCart(el?.product?._id, el?.sku)
                        }
                      />
                    </div>
                  </div>
                  <h4 className="text-[14px] leading-5 line-clamp-1">
                    {el?.title}
                  </h4>
                  <span className="text-[12px] font-medium leading-6 flex justify-between">
                    {formatMoney(el?.price)} VND
                    <p className="text-[12px] font-medium leading-6 text-main ">
                      x{el?.quantity}
                    </p>
                  </span>
                </article>
              ))}
            </>
          ) : (
            <span className="leading-6 text-center text-[14px] text-main">
              Chưa có sản phẩm nào !
            </span>
          )}
        </div>
      </div>
      <div className="bg-[#D2D1D6] h-[1px] w-full my-5"></div>
      <div className="flex flex-col gap-5 font-lato text-[18px]">
        <div className="flex justify-between">
          <span className="">Subtotal:</span>
          <span className="">{formatMoney(totalPrice)} VND</span>
        </div>
        <div className="flex justify-between">
          <span className="">Texes:</span>
          <span className="">Free</span>
        </div>

        <div className="flex justify-between font-semibold font-main">
          <span className="">Total Price</span>
          <span className="">{formatMoney(totalPrice)} VND</span>
        </div>
      </div>
      <div className="bg-[#D2D1D6] h-[1px] w-full my-5"></div>
      <div className="flex justify-end">
        <Button
          style={"bg-[#FFB700] px-4 py-3 text-[16px] font-medium"}
          handleOnClick={() => navigate(`/${path.CART}`)}
        >
          Shopping Cart
        </Button>
      </div>
    </div>
  );
};

export default memo(Cart);
