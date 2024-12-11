/** @format */

import React, { useCallback, useState } from "react";
import { BreadCrumb, Button, OrderItem } from "../../components";
import { useSelector } from "react-redux";
import icons from "../../ultils/icons";
import { Link } from "react-router-dom";
import path from "../../ultils/path";
import { formatMoney } from "../../ultils/helper";
import withBaseComponent from "../../hocs/withBaseComponent";
import imgItems from "../../assets/images/orderItem.jpg";

const { GrPrevious } = icons;
const MyCart = ({ navigate }) => {
  const { currentCart } = useSelector((state) => state.user);
  console.log("curr", currentCart);
  const totalPrice = () => {
    return currentCart.reduce((acc, curr) => {
      return curr.price * curr.quantity + acc;
    }, 0);
  };

  return currentCart.length > 0 ? (
    <>
      <div className="w-full   flex flex-col items-center pb-16">
        <div className="w-full flex justify-center px-[20px] py-[15px] mb-[20px]  bg-[#f7f7f7] ">
          <div className="w-main px-[20px] flex flex-col items-start">
            <h1 className="text-[18px] text-[#151515] font-semibold leading-5">
              My Cart
            </h1>
            <BreadCrumb title={"Home"} category={"my-cart"} />
          </div>
        </div>
        <div className="flex justify-center  w-full  ">
          <div className="flex gap-7 w-main px-[20px] py-[15px] mb-[20px]">
            <div className="flex-5 border-solid border-[#f6f6f6] border rounded-[20px] p-7">
              {currentCart.map((el, index) => (
                <div key={index}>
                  <OrderItem el={el} />
                </div>
              ))}

              <div className="flex justify-between items-end font-medium">
                <Link to={`/${path.HOME}`} className="flex gap-3  flex-3 group">
                  <span className="translate-x-1 group-hover:translate-x-[0] transition-transform duration-200 ease-in-out">
                    <GrPrevious />
                  </span>
                  <span>Continue Shopping</span>
                </Link>
                <div className="flex flex-col gap-5 font-lato text-[18px] flex-2 ">
                  <div className="flex justify-between ">
                    <span className="font-medium">Subtotal:</span>
                    <span className="font-medium">
                      {formatMoney(totalPrice())} VND
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Texes:</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="bg-[#D2D1D6] h-[1px] w-full my-4"></div>

                  <div className="flex justify-between font-semibold font-main">
                    <span className="">Total Price</span>
                    <span className="">{formatMoney(totalPrice())} VND</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-2 border-solid border-[#f6f6f6] border rounded-[20px] p-7 h-fit">
              <div className="flex flex-col gap-5 font-lato text-[18px] flex-2 ">
                <div className="flex justify-between font-main text-[16px]">
                  <span className="font-medium flex">
                    Subtotal
                    <p className="font-normal"> (items)</p>
                  </span>
                  <span className="font-semibold">{currentCart.length}</span>
                </div>
                <div className="flex justify-between font-main text-[16px]">
                  <span className="font-medium flex">
                    Price
                    <p className="font-normal"> (total)</p>
                  </span>
                  <span className="font-semibold">
                    {formatMoney(totalPrice())} VND
                  </span>
                </div>

                <div className="bg-[#D2D1D6] h-[1px] w-full my-1"></div>

                <div className="flex justify-between font-semibold font-main text-[16px]">
                  <span className="">Estimated Total</span>
                  <span className="">{formatMoney(totalPrice())} VND</span>
                </div>
                <Button
                  handleOnClick={() =>
                    navigate(`/${path.CART}/${path.SHIPPING}`)
                  }
                >
                  Continue to checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="flex flex-col text-[#000000cc] text-[20px] items-center justify-center bg-white min-h-[500px] gap-5">
        <img src={imgItems} className="w-[40%] h-[40%] " />
        <span>No orders yet</span>
      </div>
    </>
  );
};

export default withBaseComponent(MyCart);
