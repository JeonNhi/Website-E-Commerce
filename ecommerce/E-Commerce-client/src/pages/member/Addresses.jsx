/** @format */

import React, { useState } from "react";
import {
  Address,
  Button,
  CreateAddress,
  UpdateAddress,
} from "../../components";
import icons from "../../ultils/icons";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../redux/app/appSlice";
import { toast } from "react-toastify";
import { apiRemoveAddress, apiUpdateAddress } from "../../apis";
import { getCurrent } from "../../redux/user/userAction";
const { AiOutlinePlus } = icons;

const Addresses = () => {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);

  const handleShowModalCreate = () => {
    dispatch(
      showModal({
        isShowModal: true,
        modalChildren: <CreateAddress />,
        modalCenter: true,
      })
    );
  };

  const handleRemoveAddress = async (id) => {
    const checkDefaultBeforeDelete = current?.address.some(
      (el) => el._id === id && el.defaultAddress
    );
    if (checkDefaultBeforeDelete)
      toast.warning(
        "This address is default, please change your default address first!"
      );
    else {
      const res = await apiRemoveAddress(id);
      console.log("res", res);
      if (res.success) toast.success(res.mes);
      dispatch(getCurrent());
    }
  };
  const handleUpdateAddress = async (id, flag, info) => {
    if (flag === "default") {
      const res = await apiUpdateAddress({ defaultAddress: true }, id);
      dispatch(getCurrent());
    } else if (flag === "update") {
      console.log("id", info);
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: <UpdateAddress info={info} />,
          modalCenter: true,
        })
      );
    }
  };

  return (
    <div className="flex-3 bg-white rounded-[20px]">
      <div className="flex justify-between my-8 mx-10 items-center">
        <h2 className=" text-[24px] font-medium ">My Addresses</h2>
        <div className=" justify-end flex self-center ">
          <Button
            style={
              "bg-main text-[#fff] rounded-none font-normal flex gap-2 leading-6"
            }
            type="submit"
            handleOnClick={() => handleShowModalCreate()}
          >
            <span className="text-[24px]">
              <AiOutlinePlus />
            </span>
            Add a new address
          </Button>
        </div>
      </div>
      <div className="bg-[#efefef] h-[1px] w-full my-3"></div>

      <div className="mt-4 mb-8 mx-10 items-center">
        <h2 className=" text-[18px] mb-4 font-normal ">Address</h2>
        {current?.address.map((el, index) => (
          <div key={index}>
            <Address
              info={el}
              handleRemoveAddress={handleRemoveAddress}
              handleUpdateAddress={handleUpdateAddress}
            />
            <div className="bg-[#efefef] h-[1px] w-full my-5"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Addresses;
