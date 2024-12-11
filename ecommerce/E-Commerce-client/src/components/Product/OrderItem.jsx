/** @format */

import React, { memo, useEffect, useState } from "react";
import { SelectQuantity, Varriant } from "../../components";
import icons from "../../ultils/icons";
import { formatMoney } from "../../ultils/helper";
import { updateCart } from "../../redux/user/userSlice";
import { apiRemoveCart } from "../../apis";
import { getCurrent } from "../../redux/user/userAction";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const { FaRegHeart, FiTrash2 } = icons;
const OrderItem = ({ el, select = true }) => {
  const [quantity, setQuantity] = useState(() => el.quantity);
  const dispatch = useDispatch();

  const handleChangeQuantity = (action) => {
    if (action === "minus" && quantity == 1) return;
    if (action === "minus") setQuantity((prev) => +prev - 1);
    if (action === "plus") setQuantity((prev) => +prev + 1);
  };
  const handleQuantity = (number) => {
    if (!Number(number) || Number(number) < 1) {
      return;
    } else setQuantity(number);
  };

  const handleDeleteCart = async (pid, sku) => {
    const res = await apiRemoveCart(pid, sku);
    console.log("pid", pid);
    console.log("res", res);
    // console.log()
    if (res.success) toast.success(res.mes);
    dispatch(getCurrent());
  };
  useEffect(() => {
    console.log("el", el);
    dispatch(updateCart({ pid: el.product._id, quantity, sku: el.sku }));
  }, [quantity]);
  return (
    <>
      <article className="flex gap-7">
        <a className="w-[175px] h-[175px] " href="/">
          <img src={el?.thumb} alt="" className="w-full h-full object-cover" />
        </a>
        <div className="flex justify-between text-[18px] font-medium leading-7 flex-1">
          <div className="flex flex-2 flex-col justify-between">
            <h3 className="max-w-[374px] ">
              <a
                href={`/${el?.product?.category}/${el?.product?._id}/${el?.title}`}
                className="capitalize"
              >
                {el.title}
              </a>
            </h3>
            <span className="flex items-center justify-between">
              {formatMoney(el?.price)} VND
            </span>
            <div className="flex gap-4">
              {el?.color && (
                <div className="cart-item__input">
                  <Varriant style={"py-[7px]"} color={el?.color} />
                </div>
              )}
              {select && (
                <div className="cart-item__input">
                  <SelectQuantity
                    handleChangeQuantity={handleChangeQuantity}
                    handleQuantity={handleQuantity}
                    quantity={quantity}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-3 flex-col justify-between items-end">
            <p className="font-bold text-[22px] text-right">
              {formatMoney(el?.price * quantity)} VND
            </p>
            <div className="flex gap-7 text-[18px] text-[#9E9DA8]">
              <button className="flex gap-[10px] items-center">
                <FaRegHeart size={20} />
                Save
              </button>
              <button
                className="flex gap-[10px] items-center"
                onClick={() => handleDeleteCart(el?.product._id, el?.sku)}
              >
                <FiTrash2 size={20} />
                Delete
              </button>
            </div>
          </div>
        </div>
      </article>
      <div className="bg-[#D2D1D6] h-[1px] w-full my-7"></div>
    </>
  );
};

export default memo(OrderItem);
