/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  Button,
  InputFileImg,
  InputForm,
  MarkDown,
  SelectForm,
} from "../../components";
import { setLoading } from "../../redux/user/userSlice";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getBase64, validate } from "../../ultils/helper";
import { toast } from "react-toastify";
import { FiTrash2 } from "react-icons/fi";
import { apiCreateProduct } from "../../apis";

const CreateProduct = () => {
  const { categories } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });
  const [payload, setPayload] = useState({
    description: "",
  });
  const [invalidField, setInvalidField] = useState([]);
  const {
    register,
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleCreate = async (data) => {
    const invalid = validate(payload, setInvalidField);
    if (invalid === 0) {
      dispatch(setLoading({ isLoading: true }));

      data.thumb = preview.thumb.file;
      data.images = preview.images.map((el) => ({
        file: el.file,
      }));
      const finalData = { ...data, ...payload };

      const formData = new FormData();
      for (let i of Object.entries(finalData)) {
        if (i[0] === "images") {
          continue;
        }
        formData.append(i[0], i[1]);
      }
      if (finalData.images) {
        console.log("finalData.images", finalData.images[0].file);
        finalData.images.map((image) => formData.append("images", image.file));
      }
      const res = await apiCreateProduct(formData);
      if (res?.success) toast.success("Creates product is successfully!");
      else toast.info("Something went wrong!");
      dispatch(setLoading({ isLoading: false }));
    }
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

  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );
  console.log("payload", payload);

  return (
    <div className="bg-white mx-4 mt-4 p-5">
      <h1 className="text-[24px] font-semibold">Create New Product</h1>
      <div className="bg-[#0505050f] h-[1px] w-full my-5"></div>
      <form
        onSubmit={handleSubmit(handleCreate)}
        className="mx-5  px-5 pb-5 flex flex-col "
      >
        <div className="flex items-center w-full gap-8">
          <InputForm
            id="title"
            label={"Name"}
            register={register}
            errors={errors}
            validate={{ required: "Need Fill This Field." }}
            placeholder={"Name of product"}
          />
          <InputForm
            id="price"
            label={"Price"}
            register={register}
            errors={errors}
            validate={{ required: "Need Fill This Field." }}
            placeholder={"Price Of New Product"}
            type="number"
          />
        </div>
        <div className="flex items-center w-full gap-8">
          <InputForm
            id="quantity"
            label={"Quantity"}
            register={register}
            errors={errors}
            validate={{ required: "Need Fill This Field." }}
            placeholder={"Quantity Of Product"}
            type="number"
          />
          <InputForm
            id="color"
            label={"Color"}
            register={register}
            errors={errors}
            validate={{ required: "Need Fill This Field." }}
            placeholder={"Color Of New Product"}
          />
        </div>
        <div className="flex items-center w-full gap-8 mb-2">
          <SelectForm
            id={"category"}
            label={"Category"}
            errors={errors}
            register={register}
            validate={{ required: "Need Fill This Field" }}
            options={categories?.map((cate) => ({
              value: cate?.title,
              title: cate?.title,
            }))}
          />
          <SelectForm
            id={"branch"}
            label={"Brand"}
            errors={errors}
            register={register}
            validate={{ required: "Need Fill This Field" }}
            options={categories
              ?.find((el) => el.title === watch("category"))
              ?.brand.map((el) => ({
                value: el,
                title: el,
              }))}
          />
        </div>

        <MarkDown
          name={"description"}
          changeValue={changeValue}
          label={"Description"}
          invalidField={invalidField}
          setInvalidField={setInvalidField}
        />
        <div className="flex items-center justify-between w-full gap-8 mt-8">
          <div className="flex-1 flex ">
            <InputFileImg
              id={"thumb"}
              label={"Thumbnail"}
              errors={errors}
              register={register}
              validate={{ required: "Need Fill tThis Field" }}
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
              validate={{ required: true }}
              multiple
            />
            <div className="flex gap-2 ml-2">
              {preview.images &&
                preview.images.map((el, index) => (
                  <div className="flex items-end relative group" key={index}>
                    <img
                      className="w-[100px] object-contain border-[1px] border-[#d9d9d9] border-solid rounded-lg p-2 cursor-pointer"
                      src={el.url}
                      alt={el.name}
                    />
                    <div className="invisible group-hover:visible  bg-overlay absolute l-0 r-0 b-0 t-0 w-[100px] h-[100px] flex items-center justify-center">
                      <FiTrash2
                        color="#fff"
                        onClick={() =>
                          handleDeletePreview("images", el.uid, el.file.name)
                        }
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <Button w={"w-[200px]"} style={"bg-[#1677ff]"} type="submit">
            Create Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
