/** @format */

import React, { useCallback, useEffect, useState } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Button, SelectQuantity, Varriant } from "../../components";
import Slider from "react-slick";
import imgEmpty from "../../assets/images/imgEmpty.jpg";
import { formatMoney, renderStars } from "../../ultils/helper";
import DOMPurify from "dompurify";
import { useDispatch, useSelector } from "react-redux";
import { apiUpdateCart } from "../../apis";
import { v4 as uuidv4 } from "uuid";
import path from "../../ultils/path";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { getCurrent } from "../../redux/user/userAction";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  className: "detail-slider",
};

const QuickView = ({ data, top }) => {
  console.log("data", data);
  // const { pid, title, category } = useParams();

  const [varriantSelect, setVarriantSelect] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [imageShow, setImageShow] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);
  const handleShowImage = (e, img) => {
    setImageShow(img);
  };

  const handleChangeQuantity = useCallback(
    (action) => {
      if (action === "minus" && quantity == 1) return;
      if (action === "minus") setQuantity((prev) => +prev - 1);
      if (action === "plus") setQuantity((prev) => +prev + 1);
    },
    [quantity]
  );

  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) {
        return;
      } else setQuantity(number);
    },
    [quantity]
  );

  const handleAddToCart = async () => {
    if (!current) {
      Swal.fire({
        title: "Almost...",
        text: "Please Login first",
        showCloseButton: true,
        showCancelButton: true,
        icon: "info",
        confirmButtonText: "Go Login",
        cancelButtonText: "Not now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({
              redirect: location.pathname,
            }).toString(),
          });
        }
      });
    }
    let productData;
    if (varriantSelect) {
      const { _id, images, ...variantWithoutId } = varriantSelect;
      productData = { ...data, ...variantWithoutId };
    } else {
      productData = { ...data, sku: uuidv4() };
    }
    // console.log("quan", quantity);
    const res = await apiUpdateCart({
      pid: productData._id,
      color: productData.color,
      title: productData.title,
      price: productData.price,
      thumb: productData.thumb,
      sku: productData.sku,
      quantity,
    });
    if (res.success) toast.success(res.mes);

    dispatch(getCurrent());
  };

  useEffect(() => {
    if (data) {
      setImageShow(data.thumb);
    }
  }, [data, top]);
  const handleOnclickVarriant = (id) => {
    if (data.varriants.length > 0) {
      setVarriantSelect(data.varriants.find((varr) => varr.sku === id));
    }
  };

  return (
    <div
      className={`flex max-w-[80%] min-w-[800px] p-5 bg-white translate-y-[-50%]`}
      style={{ marginTop: `${top}px` }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="   ">
        <div className="w-[360px] h-[360px] object-cover mb-[30px] border-[#e7e5e5] border-[1px] border-solid">
          <div className="w-full h-full detail-image">
            <img src={varriantSelect?.thumb || imageShow || imgEmpty} />
          </div>
        </div>
        <div className="w-[360px]">
          <Slider {...settings}>
            {varriantSelect?.images.length > 0 &&
              varriantSelect.images.map((img, index) => (
                <img
                  onClick={(e) => handleShowImage(e, img)}
                  key={index}
                  className="  border-[#e7e5e5] border-[1px] border-solid h-[146px] px-2 object-cover "
                  src={img}
                  alt={""}
                />
              ))}
            {(!varriantSelect || varriantSelect?.images.length === 0) &&
              data?.images?.map((img, index) => (
                <img
                  onClick={(e) => handleShowImage(e, img)}
                  key={index}
                  className="  border-[#e7e5e5] border-[1px] border-solid h-[146px] px-2 object-cover "
                  src={img}
                  alt={data?.title}
                />
              ))}
          </Slider>
        </div>
      </div>
      <div className=" ml-10 pr-5">
        <h2 className="text-[#333] text-[20px] font-semibold   mb-[20px]">
          {data.title}
        </h2>
        <ul className=" list-square  text-[14px] text-[#505050] flex flex-col gap-[5px] mt-5">
          {data?.description.length > 1 &&
            data?.description.map((el, index) => (
              <li className="leading-5" key={index}>
                {el}
              </li>
            ))}
          {data?.description.length === 1 && (
            <div
              className="leading-5"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.description[0]),
              }}
            ></div>
          )}
        </ul>
        <h2 className="text-[#333] text-[20px] font-semibold  mb-3 mt-[20px]">
          {formatMoney(varriantSelect?.price || data?.price)} VND
        </h2>

        <div className="flex gap-5 items-center mt-5 ">
          <span className="font-semibold text-[14px]">Quantity</span>
          <SelectQuantity
            quantity={quantity}
            handleQuantity={handleQuantity}
            handleChangeQuantity={handleChangeQuantity}
          />
        </div>
        <div className="flex gap-3 items-center mt-5 flex-wrap">
          {data?.varriants.length > 0 &&
            data?.varriants.map((el) => (
              <div key={el.sku} onClick={() => handleOnclickVarriant(el.sku)}>
                <Varriant
                  title={el.title === data.title ? "" : el.title}
                  color={el.color}
                  choose={el.sku === varriantSelect?.sku}
                />
              </div>
            ))}
        </div>

        <Button
          handleOnClick={() => handleAddToCart()}
          style="max-w-[125px]  bg-main mt-5 text-[14px] font-lato py-3 rounded-none hover:bg-black hover:text-white transition-all ease-in-out duration-200"
        >
          ADD TO CART
        </Button>
      </div>
    </div>
  );
};

export default QuickView;
