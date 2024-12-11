/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { Address, BreadCrumb, Button, Congrat, Paypal } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { formatMoney } from "../../ultils/helper";
import moment from "moment";
import { CiEdit } from "react-icons/ci";
import paymentImg from "../../assets/images/online-payment.svg";
import { getCurrent } from "../../redux/user/userAction";
const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSuccessed, setIsSuccessed] = useState(false);

  const { currentCart, current } = useSelector((state) => state.user);
  const totalPrice = () => {
    return currentCart.reduce((acc, curr) => {
      return curr.price * curr.quantity + acc;
    }, 0);
  };

  useEffect(() => {
    if (isSuccessed) {
      dispatch(getCurrent());
    }
  }, [isSuccessed]);

  return (
    <>
      {isSuccessed && <Congrat />}
      <div className="w-full   flex flex-col items-center pb-16">
        <div className="w-full flex justify-center px-[20px] py-[15px] mb-5  bg-[#f7f7f7] ">
          <div className="w-main px-[20px] flex flex-col items-start">
            <h1 className="text-[18px] text-[#1a162e] font-lato font-semibold leading-5">
              Shipping
            </h1>
            <BreadCrumb />
          </div>
        </div>
        <div className="flex justify-center  w-full  ">
          <div className="flex gap-7 w-main px-[20px] py-[15px] mb-[20px]">
            <div className="flex-3 ">
              <img src={paymentImg} />
            </div>
            <div className="flex-4 border-solid border-[#f6f6f6] border rounded-[20px] p-7 h-fit">
              <div className=" justify-between items-center flex  mb-8">
                <h2 className="text-[22px] text-[#151515] font-medium leading-6">
                  {`1. Shipping, arrives between ${moment().format(
                    "ddd, MMM D"
                  )}- ${moment().add(7, "days").format("ddd, MMM D")}`}
                </h2>
                <button
                  onClick={() => navigate(`/${path.CART}/${path.SHIPPING}`)}
                  className="flex items-center text-[18px] justify-between gap-1 text-[#333] font-lato"
                >
                  <span className="text-[22px]">
                    <CiEdit />
                  </span>
                  Edit
                </button>
              </div>
              <div className="my-5  items-center bg-[#f6f6f6] p-5 rounded-[20px]">
                {current?.address.map((el, index) => {
                  if (el.defaultAddress) {
                    return (
                      <div key={index} className="">
                        <Address info={el} setDefault={false} />
                      </div>
                    );
                  }
                })}
              </div>

              <div className="flex justify-between items-center bg-[#f6f6f6] p-5 mb-5 rounded-[20px]">
                <div>
                  <h2 className=" text-[16px] mb-3 font-normal ">
                    Items details
                  </h2>
                  <span>{currentCart.length} items</span>
                </div>
                <button
                  onClick={() => navigate(`/${path.CART}/${path.SHIPPING}`)}
                  className="flex items-center text-[14px] justify-between gap-1 text-[#1d39c4] font-lato"
                >
                  View Detail
                </button>
              </div>
              <div className="flex border-solid border-[#f6f6f6] border p-5 flex-col gap-5 font-lato text-[18px] flex-2 ">
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
                {/* <Button>Continue to checkout</Button> */}
                <div>
                  <Paypal
                    payload={{
                      products: currentCart,
                      total: Math.floor(totalPrice() / 23500),
                      address: current?.address?.find(
                        (el) => el.defaultAddress === true
                      ).addressDetail,
                      status: "Processing",
                    }}
                    setIsSuccessed={setIsSuccessed}
                    amount={Math.floor(totalPrice() / 23500)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
