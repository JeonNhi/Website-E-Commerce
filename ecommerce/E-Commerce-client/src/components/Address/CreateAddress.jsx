/** @format */

import React, { memo, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { apiAddresses as apiUrl, cities } from "../../ultils/constains";
import { Button, InputForm, Tab } from "../../components";
import icons from "../../ultils/icons";
import { getDistrict, getWard } from "../../ultils/helper";
import { apiAddAddress } from "../../apis";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getCurrent } from "../../redux/user/userAction";
import { showModal } from "../../redux/app/appSlice";
const { IoIosArrowDown } = icons;
const CreateAddress = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  const [selectedCity, setSelectedCity] = useState(null);

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState(null);
  const createAddressRef = useRef();
  const tabs = [
    {
      label: <span>City</span>,
      content: (
        <div className="flex flex-col text-[14px] cursor-pointer ">
          {cities.map((el, index) => (
            <span
              className="hover:bg-gray-100 py-2 px-4"
              key={index}
              onClick={() => {
                setSelectedCity({ id: el.id, name: el.city });
                setSelectedDistrict(null);
                setSelectedWard(null);
              }}
            >
              {el.city}
            </span>
          ))}
        </div>
      ),
    },
    {
      label: (
        <span className={`${!selectedCity && "cursor-not-allowed"}`}>
          District
        </span>
      ),
      content: (
        <div className="flex flex-col text-[14px] cursor-pointer ">
          {districts.map((el, index) => (
            <span
              className="hover:bg-gray-100 py-2 px-4"
              key={index}
              onClick={() => {
                setSelectedDistrict({ id: el.idDistrict, name: el.name });
                setSelectedWard(null);
              }}
            >
              {el.name}
            </span>
          ))}
        </div>
      ),
    },
    {
      label: (
        <span className={`${!selectedDistrict && "cursor-not-allowed"}`}>
          Ward
        </span>
      ),
      content: (
        <div className="flex flex-col text-[14px] cursor-pointer ">
          {wards.map((el, index) => (
            <span
              className="hover:bg-gray-100 py-2 px-4"
              key={index}
              onClick={() => {
                setSelectedWard({ id: el.idCommune, name: el.name });
                setShowTab(false);
              }}
            >
              {el.name}
            </span>
          ))}
        </div>
      ),
    },
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showTab, setShowTab] = useState(false);

  const handleChangeCity = async () => {
    const districts = await getDistrict(selectedCity.id);
    setDistricts(districts);
    setActiveTab(1);
  };
  const handleChangeWard = async () => {
    const wards = await getWard(selectedDistrict.id);
    setWards(wards);
    setActiveTab(2);
  };

  const handleSubmitAddress = async (data) => {
    if (!selectedCity || !selectedDistrict || !selectedWard)
      toast.warning("Vui lòng chọn địa chỉ");
    const res = await apiAddAddress({
      ...data,
      city: selectedCity?.id,
      district: selectedDistrict?.id,
      ward: selectedWard?.id,
    });
    if (res.success) toast.success(res.mes);
    dispatch(getCurrent());
    dispatch(
      showModal({
        isShowModal: false,
        modalChildren: null,
      })
    );
  };
  const handleTabClick = (index) => {
    if ((index == 1 && selectedCity) || (index == 2 && selectedWard))
      setActiveTab(index);
  };

  useEffect(() => {
    if (selectedCity) {
      handleChangeCity();
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      handleChangeWard();
    }
  }, [selectedDistrict]);
  useEffect(() => {
    createAddressRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, []);
  return (
    <div
      ref={createAddressRef}
      className="min-h-screen flex items-center justify-center"
    >
      <div
        className="min-w-[650px] p-7 bg-[#fff] rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={handleSubmit(handleSubmitAddress)}
          action=""
          className="font-normal text-[14px] text-[#1a162e]"
        >
          <h2 className="font-medium text-[20px] leading-6 mb-7">
            Add new shipping address
          </h2>
          <div className="modal__body">
            <div className="flex justify-between gap-4 mb-6">
              <InputForm
                id="name"
                label={"Name"}
                register={register}
                errors={errors}
                validate={{ required: "Need Fill This Field." }}
                placeholder={"Name"}
                col={true}
              />
              <InputForm
                id="phone"
                label={"Phone"}
                register={register}
                errors={errors}
                validate={{
                  required: "Require Fill",
                  pattern: {
                    value: /^[0-9\-\+]{9,15}$/,
                    message: "Invalid phone number",
                  },
                }}
                placeholder={"Phone"}
                col={true}
              />
            </div>
            <div className="mb-6 flex flex-col">
              <label htmlFor="city" className="mb-2">
                City/District/Town
              </label>
              <div
                onClick={() => setShowTab((prev) => !prev)}
                className={`${
                  selectedCity?.id ? "text-[#333]" : "text-[#bbb]"
                }   mb-2 bg-gray-50 border  border-gray-300 border-solid font-normal rounded-lg text-sm px-2 py-2.5 text-center flex justify-between items-center `}
              >
                {selectedCity?.id ? selectedCity.name : "City,District,Ward"}
                {selectedDistrict?.id && `,${selectedDistrict.name}`}
                {selectedWard?.id && `,${selectedWard.name}`}

                <span>
                  <IoIosArrowDown />
                </span>
              </div>

              {showTab && (
                <div className="flex relative  leading-6 ">
                  <div className="absolute top-0 bg-white border border-solid border-[#00000024] w-full">
                    <Tab
                      setActiveTab={setActiveTab}
                      activeTab={activeTab}
                      tabs={tabs}
                      heightContent={"max-h-[240px]"}
                      handleTabClick={handleTabClick}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-between gap-4 mb-6">
              <InputForm
                id="addressDetail"
                label={"Street Name, Building, House No."}
                register={register}
                errors={errors}
                validate={{ required: "Need Fill This Field." }}
                placeholder={"Street Name, Building, House No."}
                col={true}
                area={true}
              />
            </div>

            <div className="form__group form__group--inline">
              <label className="flex gap-1 items-center">
                <div className="w-5">
                  <InputForm
                    id="defaultAddress"
                    register={register}
                    errors={errors}
                    type="checkbox"
                    col={true}
                  />
                </div>
                <span className="form__checkbox-label flex-1">
                  Set as default address
                </span>
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-5 pt-10">
            <Button
              style={"bg-none text-black "}
              handleOnClick={() =>
                dispatch(
                  showModal({
                    isShowModal: false,
                    modalChildren: null,
                  })
                )
              }
            >
              Cancel
            </Button>
            <Button type="submit" style={"bg-[#FFB700] text-black"}>
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(CreateAddress);
