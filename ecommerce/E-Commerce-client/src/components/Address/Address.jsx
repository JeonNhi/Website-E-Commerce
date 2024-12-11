/** @format */

import React, { memo, useEffect, useState } from "react";
import Tag from "../Tag/Tag";
import icons from "../../ultils/icons";
import { cities } from "../../ultils/constains";
import { getDistrict, getWard } from "../../ultils/helper";
const { CiEdit, FiTrash2 } = icons;

const Address = ({
  handleRemoveAddress,
  handleUpdateAddress,
  info,
  setDefault = true,
}) => {
  const [address, setAddress] = useState("");
  const getNameAddress = async () => {
    const cityName = cities.find((item) => +item.id === +info.city).city;
    const districts = await getDistrict(info.city);
    const districtName = districts.find(
      (item) => item.idDistrict === info.district
    )?.name;

    const wards = await getWard(info.district);
    const wardName = wards.find((item) => item.idCommune === info.ward)?.name;

    setAddress(`${wardName},${districtName},${cityName}`);
  };

  useEffect(() => {
    getNameAddress();
  }, [info]);
  return (
    <article className="flex justify-between">
      <div className="flex-1">
        <div className="flex flex-col  text-[15px] font-normal leading-5">
          <div className="text-[18px] font-medium leading-6 flex justify-between">
            <div className="flex gap-2 font-normal mb-[2px] text-[16px]">
              {info?.name}
              <div className="w-[1px] h-full bg-[#00000042]"></div>
              <span className="text-[#0000008A] text-[15px]">{info.phone}</span>
            </div>
            <div className="flex gap-5">
              {handleUpdateAddress && (
                <button
                  onClick={() => handleUpdateAddress(info._id, "update", info)}
                  className="flex items-center text-[14px] justify-between gap-1 text-[#1d39c4]"
                >
                  <span className="text-[16px]">
                    <CiEdit />
                  </span>
                  Edit
                </button>
              )}
              {handleRemoveAddress && (
                <button
                  onClick={() => handleRemoveAddress(info._id)}
                  className="flex items-center text-[14px] justify-between gap-1 text-main"
                >
                  <span className="text-[14px]">
                    <FiTrash2 />
                  </span>
                  Delete
                </button>
              )}
            </div>
          </div>
          <div className="text-[#0000008A] mt-1 flex justify-between items-center text-[14px] leading-[18px]">
            <div>
              <p>{info.addressDetail}</p>
              <p>{address}</p>
            </div>
            <div>
              {setDefault && (
                <button
                  onClick={() =>
                    !info.defaultAddress &&
                    handleUpdateAddress(info._id, "default")
                  }
                  className={`${
                    info.defaultAddress ? "" : "text-[#000]"
                  } px-2 py-1 border text-[12px] border-solid border-[#00000042] leading-4`}
                >
                  Set As Default
                </button>
              )}
            </div>
          </div>
          {info.defaultAddress && setDefault && (
            <span className="mt-1">
              <Tag
                status="warning"
                style={"bg-white text-main border-main rounded-none"}
              >
                Default
              </Tag>
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default memo(Address);
