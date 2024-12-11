/** @format */

import React, { useEffect, useState } from "react";
import { Button, InputFileImg, InputForm } from "../../components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import icons from "../../ultils/icons";
const { FiTrash2 } = icons;
import { getBase64 } from "../../ultils/helper";
import { apiGetCurrent, apiUpdateUser } from "../../apis";
import { getCurrent } from "../../redux/user/userAction";
import { toast } from "react-toastify";
const Personal = () => {
  const { current } = useSelector((state) => state.user);
  const [preview, setPreview] = useState({
    avatar: null,
  });
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  console.log("cr", current);
  const dispatch = useDispatch();

  const handleUpdate = async (dataSubmit) => {
    const { address, ...data } = dataSubmit;
    if (preview?.avatar?.file) {
      data.avatar = preview.avatar.file;
    }
    const formData = new FormData();
    for (let i of Object.entries(data)) formData.append(i[0], i[1]);

    const res = await apiUpdateUser(formData);
    if (res.success) {
      toast.success(res.mes);
      dispatch(getCurrent());
    } else toast.error(res.mes);
  };
  const handlePreview = async (file) => {
    const urlImg = await getBase64(file);
    setPreview({
      avatar: {
        url: urlImg,
        file: file,
      },
    });
  };
  const handleDeletePreview = () => {
    setPreview({ thumb: null });
    reset({ avatar: null });
  };
  useEffect(() => {
    console.log("", watch("avatar"));
    if (watch("avatar") && watch("avatar").length > 0) {
      handlePreview(watch("avatar")[0]);
    }
  }, [watch("avatar")]);
  useEffect(() => {
    reset({
      firstname: current.firstname,
      lastname: current.lastname,
      phone: current.mobile,
      email: current.email,
      address:
        current?.address.find((item) => item.defaultAddress === true)
          ?.addressDetail || "Chưa Cập Nhật",
    });
    if (current?.avatar)
      setPreview({
        avatar: {
          url: current?.avatar,
        },
      });
  }, [current]);
  return (
    <div className="flex-3 bg-white rounded-[20px]">
      <h2 className=" text-[24px] font-medium my-10 mx-10">Personal Info</h2>
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="mx-10 my-5 flex flex-col gap-5"
      >
        <div className="flex gap-5">
          <InputForm
            register={register}
            errors={errors}
            validate={{ required: "Need fill this field." }}
            id={"firstname"}
            label={"First Name"}
            customInput={"h-[46px] mt-2"}
            col={true}
            placeholder={"First Name"}
          />
          <InputForm
            register={register}
            errors={errors}
            validate={{
              required: "Need fill this field.",
            }}
            id={"lastname"}
            label={"Last Name"}
            customInput={"h-[46px] mt-2"}
            col={true}
            placeholder={"Last Name"}
          />
        </div>
        <div className="flex gap-5">
          <InputForm
            register={register}
            errors={errors}
            validate={{
              required: "Need fill this field.",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "invalid email address",
              },
            }}
            id={"email"}
            label={"Email"}
            customInput={"h-[46px] mt-2"}
            col={true}
            placeholder={"Email"}
          />
          <InputForm
            register={register}
            errors={errors}
            validate={{ required: "Need fill this field." }}
            id={"phone"}
            label={"Phone"}
            customInput={"h-[46px] mt-2"}
            col={true}
            placeholder={"Phone"}
          />
        </div>
        <div className="flex gap-5">
          <InputForm
            register={register}
            errors={errors}
            id={"address"}
            label={"Address"}
            customInput={"h-[46px] mt-2"}
            col={true}
            disabled={true}
          />
        </div>
        <div className="flex-1 flex ">
          <InputFileImg
            id={"avatar"}
            label={"Avatar"}
            errors={errors}
            register={register}
          />

          {preview?.avatar && preview?.avatar?.url && (
            <div className="flex items-end ml-2 cursor-pointer relative group">
              <img
                className="w-[100px]  object-contain border-[1px]  border-[#d9d9d9] border-solid rounded-lg p-2"
                src={preview.avatar.url}
                alt={"avatar"}
              />
              <div className="invisible group-hover:visible  bg-overlay absolute l-0 r-0 b-0 t-0 w-[100px] h-[100px] flex items-center justify-center">
                <FiTrash2 color="#fff" onClick={() => handleDeletePreview()} />
              </div>
            </div>
          )}
        </div>
        <div className="mt-5 justify-end flex">
          <Button style={"bg-[#FFB700] text-[#000]"} type="submit">
            Update Info
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Personal;
