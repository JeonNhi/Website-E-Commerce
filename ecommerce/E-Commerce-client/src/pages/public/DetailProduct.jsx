/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { apiGetProduct, apiGetProducts, apiUpdateCart } from "../../apis";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  BreadCrumb,
  Button,
  CustomSlider,
  ProductInfo,
  SelectQuantity,
  Varriant,
} from "../../components";
import Slider from "react-slick";
import imgEmpty from "../../assets/images/imgEmpty.jpg";
import { formatMoney, renderStars } from "../../ultils/helper";
import ProductExtraInfo from "../../components/Product/ProductExtraInfo";
import { productExtra } from "../../ultils/constains";
import DOMPurify from "dompurify";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import path from "../../ultils/path";
import { getCurrent } from "../../redux/user/userAction";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

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

const DetailProduct = () => {
  const { pid, title, category } = useParams();
  const { current } = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [varriantSelect, setVarriantSelect] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [update, setUpdate] = useState(false);
  const [imageShow, setImageShow] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const fetchProduct = async () => {
    const response = await apiGetProduct(pid);
    if (response.success) {
      setProduct(response.product);
      setImageShow(response.product?.thumb);
    }
  };
  const fetchRelatedProducts = async () => {
    const response = await apiGetProducts({ category });
    if (response.success) {
      setRelatedProducts(response.products);
    }
  };

  useEffect(() => {
    if (pid) {
      fetchProduct();
      fetchRelatedProducts();
    }
    window.scrollTo(0, 0);
  }, [pid]);

  useEffect(() => {
    if (pid) {
      fetchProduct();
    }
  }, [update, varriantSelect]);

  const reRender = useCallback(() => {
    setUpdate((prev) => !prev);
  }, [update]);

  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) {
        return;
      } else setQuantity(number);
    },
    [quantity]
  );

  const handleChangeQuantity = useCallback(
    (action) => {
      if (action === "minus" && quantity == 1) return;
      if (action === "minus") setQuantity((prev) => +prev - 1);
      if (action === "plus") setQuantity((prev) => +prev + 1);
    },
    [quantity]
  );

  const handleShowImage = (e, img) => {
    setImageShow(img);
  };

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
      productData = { ...product, ...variantWithoutId };
    } else {
      productData = { ...product, sku: uuidv4() };
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

  const handleOnclickVarriant = (id) => {
    if (product.varriants.length > 0) {
      setVarriantSelect(product.varriants.find((varr) => varr.sku === id));
    }
  };

  return (
    <div className="w-full   flex flex-col items-center pb-16">
      <div className="w-full flex justify-center px-[20px] py-[15px] mb-[20px]  bg-[#f7f7f7] ">
        <div className="w-main px-[20px] flex flex-col items-start">
          <h1 className="text-[18px] text-[#151515] font-semibold leading-5">
            {varriantSelect?.title || title}
          </h1>
          <BreadCrumb title={title} category={category} />
        </div>
      </div>
      <div className="flex w-main px-[20px] ">
        <div className="flex-4   ">
          <div className="w-[458px] h-[458px] object-cover mb-[30px] border-[#e7e5e5] border-[1px] border-solid">
            <div className="w-full h-full detail-image">
              <img src={varriantSelect?.thumb || imageShow || imgEmpty} />
            </div>
          </div>
          <div className="w-[458px]">
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
                product?.images?.map((img, index) => (
                  <img
                    onClick={(e) => handleShowImage(e, img)}
                    key={index}
                    className="  border-[#e7e5e5] border-[1px] border-solid h-[146px] px-2 object-cover "
                    src={img}
                    alt={product?.title}
                  />
                ))}
            </Slider>
          </div>
        </div>
        <div className="flex-4 ml-10 pr-5">
          <h2 className="text-[#333] text-[32px] font-semibold   mb-[20px]">
            {formatMoney(varriantSelect?.price || product?.price)} VND
          </h2>
          <div className="flex">
            {renderStars(product?.totalRating, 14).map((star, index) => (
              <span key={index}>{star}</span>
            ))}
            <span className="ml-2 text-main italic text-[12px] font-normal">
              (Đã bán: {product?.sold} cái)
            </span>
          </div>
          <ul className=" list-square ml-5 text-[14px] text-[#505050] flex flex-col gap-[5px] mt-5">
            {product?.description.length > 1 &&
              product?.description.map((el, index) => (
                <li className="leading-5" key={index}>
                  {el}
                </li>
              ))}
            {product?.description.length === 1 && (
              <div
                className="leading-5"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description[0]),
                }}
              ></div>
            )}
          </ul>
          <div className="flex gap-3 items-center mt-5 flex-wrap">
            {product?.varriants.length > 0 &&
              product?.varriants.map((el) => (
                <div key={el.sku} onClick={() => handleOnclickVarriant(el.sku)}>
                  <Varriant
                    title={el.title === product.title ? "" : el.title}
                    color={el.color}
                    choose={el.sku === varriantSelect?.sku}
                  />
                </div>
              ))}
          </div>

          <div className="flex gap-5 items-center mt-5 ">
            <span className="font-semibold text-[16px]">Quantity</span>
            <SelectQuantity
              quantity={quantity}
              handleQuantity={handleQuantity}
              handleChangeQuantity={handleChangeQuantity}
            />
          </div>
          <Button
            handleOnClick={() => handleAddToCart()}
            style="w-full max-w-[420px]  bg-main mt-3 text-[16px] font-lato py-3 rounded-none hover:bg-black hover:text-white transition-all ease-in-out duration-200"
          >
            ADD TO CART
          </Button>
        </div>
        <div className="flex-2 flex flex-col gap-[10px]">
          {productExtra?.map((el) => (
            <ProductExtraInfo
              key={el.id}
              title={el.title}
              icon={el.icon}
              subtitle={el.subtitle}
            />
          ))}
        </div>
      </div>
      <div className="mt-[30px] items-start w-main px-[20px]">
        <ProductInfo
          totalRating={product?.totalRating}
          ratings={product?.ratings}
          title={product?.title}
          pid={product?._id}
          reRender={reRender}
        />
      </div>
      <div className="w-main px-5 flex flex-col  mt-5">
        <h2 className="flex gap-5 font-semibold text-[20px] py-5  text-heading uppercase border-b-2 border-main border-solid pb-2 mb-6">
          orthoer customer also by:
        </h2>
        <div className="mt-5 mb-5 mx-[-10px] ">
          <CustomSlider
            slidesToShow={4}
            products={relatedProducts}
            sizeImage={345}
            showDes={true}
            notFlag={true}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
