/** @format */
import { formatMoney, renderStars } from "../../ultils/helper";
import trending from "../../assets/images/trending.png";
import newImage from "../../assets/images/new.png";
import { QuickView, SlideOption } from "../../components";
import icons from "../../ultils/icons";
import { v4 as uuidv4 } from "uuid";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../redux/app/appSlice";
import { useRef } from "react";
import Swal from "sweetalert2";
import path from "../../ultils/path";
import { apiRemoveCart, apiUpdateCart, apiUpdateWishList } from "../../apis";
import { getCurrent } from "../../redux/user/userAction";
import { toast } from "react-toastify";

const { AiFillHeart, FaEye, BsFillCartPlusFill, BsCartCheckFill } = icons;
const Product = ({ productData, isActive, sizeImage, showDes, notFlag }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { current } = useSelector((state) => state.user);
  const showDetailBtnRef = useRef();
  const handleWishList = async (e, id) => {
    e.stopPropagation();
    console.log("id", id);
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
          <div className="bg-[#D2D1D6] h-[1px] w-full my-5"></div>;
          navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({
              redirect: location.pathname,
            }).toString(),
          });
        }
      });
    } else {
      const res = await apiUpdateWishList({ pid: id });
      if (res.success) toast.success(res.mes);
      dispatch(getCurrent());
    }
  };

  const handleUpdateCart = async (e, flag, sku) => {
    e.stopPropagation();
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
          <div className="bg-[#D2D1D6] h-[1px] w-full my-5"></div>;
          navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({
              redirect: location.pathname,
            }).toString(),
          });
        }
      });
    } else {
      if (flag === "remove") {
        const res = await apiRemoveCart(productData?._id);
        if (res.success) toast.success(res.mes);
      } else {
        const res = await apiUpdateCart({
          pid: productData?._id,
          color: productData?.color,
          title: productData?.title,
          price: productData?.price,
          thumb: productData?.thumb,
          sku: uuidv4(),
        });
        if (res.success) toast.success(res.mes);
      }
      dispatch(getCurrent());
    }
  };
  const handleQuickView = (e) => {
    showDetailBtnRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    e.stopPropagation();
    dispatch(
      showModal({
        isShowModal: true,
        modalChildren: <QuickView data={productData} top={e.pageY} />,
      })
    );
  };
  return (
    <div className="group cursor-pointer  bg-white z-10 relative w-full  flex flex-col border-solid border-[1px] border-[#ebebeb] text-[16px] text-[#2b3743]">
      <div
        onClick={() =>
          navigate(
            `/${productData?.category}/${productData?._id}/${productData?.title}`
          )
        }
      >
        <img
          src={
            productData?.thumb ||
            "https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150544961.jpg?w=740&t=st=1698167331~exp=1698167931~hmac=0c23ae6263688c5c733f7ebf4bdd37883952dcc3ef7cea365dcb57aa9396ff74"
          }
          className={`w-full h-full object-contain pt-[15px] px-[15px] h-[${sizeImage}px] ${
            showDes ? "group-hover:invisible" : ""
          } `}
        />
        {showDes && (
          <div
            className={`w-full bg-white absolute top-0 left-0 right-0 bottom-0 group-hover:opacity-100 opacity-0 transition-opacity ease-in-out duration-200`}
          >
            <div className="flex justify-between py-5 border-b border-solid  border-[#ebebeb]  px-5 ">
              <span className="line-clamp-1 leading-4">
                {productData?.title}
              </span>
              <span className="text-[#333] text-right">
                {formatMoney(productData?.price)}
                <br />
                VND
              </span>
            </div>
            <ul className="p-5  line-clamp-[9]">
              {productData?.description.length > 1 &&
                productData?.description.map((el, index) => (
                  <li
                    className="text-[#505050] text-[13px] leading-5 "
                    key={index}
                  >
                    {el}
                  </li>
                ))}
              {productData?.description.length === 1 && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(productData?.description[0]),
                  }}
                  className="text-[#505050] text-[13px] leading-5"
                ></div>
              )}
            </ul>
          </div>
        )}
        {!notFlag && (
          <img
            className={`absolute top-[15px] right-[15px] w-[75px] h-[25px] ${
              showDes ? "group-hover:hidden" : ""
            }`}
            src={isActive === 1 ? trending : newImage}
            alt="label"
          />
        )}
        <div
          className={`${
            showDes ? "justify-start px-5" : "justify-center"
          } flex gap-[12px]   opacity-0 group-hover:opacity-100 group-hover:translate-y-[-20px] duration-500   transition-all ease-in-out  z-1 translate-y-[30px] `}
        >
          {current?.wishlist.some(
            (prod) => prod._id.toString() === productData?._id
          ) ? (
            <>
              <span onClick={(e) => handleWishList(e, productData?._id)}>
                <SlideOption choose={true} icon={<AiFillHeart size={18} />} />
              </span>
            </>
          ) : (
            <>
              <span onClick={(e) => handleWishList(e, productData?._id)}>
                <SlideOption icon={<AiFillHeart size={18} />} />
              </span>
            </>
          )}

          {current?.cart.some(
            (prod) => prod.product?._id === productData?._id
          ) ? (
            <>
              <span onClick={(e) => handleUpdateCart(e, "remove")}>
                <SlideOption
                  choose={true}
                  icon={<BsCartCheckFill size={18} />}
                />
              </span>
            </>
          ) : (
            <>
              <span onClick={(e) => handleUpdateCart(e)}>
                <SlideOption icon={<BsFillCartPlusFill size={18} />} />
              </span>
            </>
          )}
          <span ref={showDetailBtnRef} onClick={(e) => handleQuickView(e)}>
            <SlideOption icon={<FaEye size={16} />} />
          </span>
        </div>
      </div>
      <div
        className={`${
          showDes ? "group-hover:invisible" : ""
        } flex flex-col gap-[10px] bg-white z-10 mb-[10px] px-[15px] pb-[15px]`}
      >
        <span className="line-clamp-1 leading-4">{productData?.title}</span>
        <div className="flex">
          {renderStars(productData?.totalRating).map((star, index) => (
            <span key={index}>{star}</span>
          ))}
        </div>
        <span className="text-[#333]">
          {formatMoney(productData?.price)} VND
        </span>
      </div>
    </div>
  );
};

export default Product;
