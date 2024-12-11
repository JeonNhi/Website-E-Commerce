/** @format */

import React, { memo, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, InputFileImg, InputForm } from "../../components";
import { useForm } from "react-hook-form";
import { getBase64, validate } from "../../ultils/helper";
import { toast } from "react-toastify";
import { FiTrash2 } from "react-icons/fi";
import { apiUpdateVarriant } from "../../apis";
import swal from "sweetalert2";
const AddVariant = ({ dataVarriant, setShowVarriant }) => {
  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });

  const {
    register,
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleUpdateVarriant = async (data) => {
    data.thumb = preview?.thumb?.file;
    data.images = preview?.images.map((el) => ({
      file: el.file,
    }));
    console.log("data", data);
    console.log("dataVarriant", dataVarriant);

    const formData = new FormData();
    for (let i of Object.entries(data)) {
      if (i[0] === "images") {
        continue;
      }
      formData.append(i[0], i[1]);
    }
    if (data.images) {
      console.log("finalData.images", data?.images[0]?.file);
      data.images.map((image) => formData.append("images", image.file));
    }
    if (
      data?.title === dataVarriant?.title &&
      data?.color === dataVarriant.color
    ) {
      swal.fire({
        title: "Some things went wrong!",
        text: "You cannot set the title and color to match the original",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
      });
      return;
    }

    const res = await apiUpdateVarriant(formData, dataVarriant._id);
    if (res.success) {
      setShowVarriant(false);
      toast.success(res.mes);
    } else toast.warning(res.mes);
  };

  const handlePreviewThumb = async (file) => {
    const urlImg = await getBase64(file);
    setPreview((prev) => ({
      ...prev,
      thumb: {
        url: urlImg,
        uid: uuidv4(),
        file: file,
      },
    }));
  };

  const handlePreviewImage = async (files) => {
    let imgPreview = [];

    if (preview.images.length > 0) imgPreview = [...preview.images];

    for (let file of files) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        toast.warning("File not supported");
        return;
      }

      if (
        imgPreview.length > 0 &&
        imgPreview.some((el) => el.file.name === file.name)
      ) {
        // toast.warning(`File ${file.name} has existed`);
        continue;
      }
      const urlImg = await getBase64(file);
      imgPreview.push({
        url: urlImg,
        file: file,
        uid: uuidv4(),
      });
    }
    if (imgPreview.length > 0)
      setPreview((prev) => ({ ...prev, images: [...imgPreview] }));
  };

  const handleDeletePreview = (type, uid, name) => {
    if (type === "thumb") {
      reset({ thumb: {} });
      setPreview((prev) => ({ ...prev, thumb: null }));
    } else {
      setPreview((prev) => ({
        ...prev,
        images: preview.images.filter((image) => image.uid !== uid),
      }));

      try {
        setValue(
          "images",
          watch("images").filter((img) => img.name !== name)
        );
      } catch (error) {
        console.log("ẻ", error);
      }
    }
  };

  useEffect(() => {
    if (watch("thumb")[0]) handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);

  useEffect(() => {
    if (watch("images") && watch("images").length > 0) {
      handlePreviewImage(watch("images"));
    }
  }, [watch("images")]);
  console.log("image", watch("images"));
  console.log("thumb", watch("thumb"));
  console.log("preview", preview);

  useEffect(() => {
    reset({
      title: dataVarriant.title,
      color: dataVarriant.color,
      price: dataVarriant.price,
    });
  }, [dataVarriant]);

  return (
    <div className="bg-white mx-4 mt-4 p-5">
      <div className=" flex justify-between">
        <h2 className="text-[24px] font-semibold">Add New Varriant Product</h2>
        <Button handleOnClick={() => setShowVarriant(false)}>
          Back to Manage Product
        </Button>
      </div>
      <div className="bg-[#0505050f] h-[1px] w-full my-5"></div>
      <form
        onSubmit={handleSubmit(handleUpdateVarriant)}
        className="mx-5  px-5 pb-5 flex flex-col "
      >
        <div className="flex items-center w-full mb-5">
          <InputForm
            id="title"
            label={"Original name"}
            register={register}
            errors={errors}
            validate={{ required: "Need Fill This Field." }}
            placeholder={"Name of product"}
            col={true}
          />
        </div>
        <div className="flex items-center w-full gap-8">
          <InputForm
            id="price"
            label={"Price Varriant"}
            register={register}
            errors={errors}
            validate={{ required: "Need Fill This Field." }}
            placeholder={"Price Of New Product"}
            type="number"
            col={true}
          />
          <InputForm
            id="color"
            label={"Color Varriant"}
            register={register}
            errors={errors}
            validate={{ required: "Need Fill This Field." }}
            placeholder={"Color Of New Product"}
            col={true}
          />
        </div>

        <div className="flex items-center justify-between w-full gap-8 mt-8">
          <div className="flex-1 flex ">
            <InputFileImg
              id={"thumb"}
              label={"Thumbnail"}
              errors={errors}
              register={register}
            />

            {preview?.thumb && preview?.thumb?.url && (
              <div className="flex items-end ml-2 cursor-pointer relative group">
                <img
                  className="w-[100px]  object-contain border-[1px]  border-[#d9d9d9] border-solid rounded-lg p-2"
                  src={preview.thumb.url}
                  alt={preview.thumb.name}
                />
                <div className="invisible group-hover:visible  bg-overlay absolute l-0 r-0 b-0 t-0 w-[100px] h-[100px] flex items-center justify-center">
                  <FiTrash2
                    color="#fff"
                    onClick={() =>
                      handleDeletePreview("thumb", preview.thumb.uid)
                    }
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex-3 flex ">
            <InputFileImg
              id={"images"}
              label={"Slider"}
              errors={errors}
              register={register}
              multiple
            />
            <div className="flex gap-2 ml-2">
              {preview.images &&
                preview.images.map((el, index) => (
                  <div className="flex items-end relative group" key={index}>
                    <img
                      className="w-[100px] h-[100px] object-contain border-[1px] border-[#d9d9d9] border-solid rounded-lg p-2 cursor-pointer"
                      src={el.url}
                      alt={el.name}
                    />
                    <div className="invisible group-hover:visible  bg-overlay absolute l-0 r-0 b-0 t-0 w-[100px] h-[100px] flex items-center justify-center">
                      <FiTrash2
                        color="#fff"
                        onClick={() => handleDeletePreview("images", el.uid)}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <Button w={"w-[240px]"} style={"bg-[#1677ff]"} type="submit">
            Update Varriant Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default memo(AddVariant);
