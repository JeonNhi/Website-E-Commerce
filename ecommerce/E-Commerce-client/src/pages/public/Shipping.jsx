/** @format */

import {
  Address,
  BreadCrumb,
  Button,
  CreateAddress,
  OrderItem,
  UpdateAddress,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import path from "../../ultils/path";
import { formatMoney } from "../../ultils/helper";
import moment from "moment";
import icons from "../../ultils/icons";
import { getCurrent } from "../../redux/user/userAction";
import { apiUpdateAddress } from "../../apis";
import { showModal } from "../../redux/app/appSlice";
import withBaseComponent from "../../hocs/withBaseComponent";
import Swal from "sweetalert2";
const { GrPrevious, AiOutlinePlus } = icons;
const Shipping = ({ dispatch, navigate }) => {
  const { currentCart, current } = useSelector((state) => state.user);

  const totalPrice = () => {
    return currentCart.reduce((acc, curr) => {
      return curr.price * curr.quantity + acc;
    }, 0);
  };

  const handleShowModalCreate = () => {
    dispatch(
      showModal({
        isShowModal: true,
        modalChildren: <CreateAddress />,
      })
    );
  };

  const handleUpdateAddress = async (id, flag, info) => {
    if (flag === "default") {
      await apiUpdateAddress({ defaultAddress: true }, id);
      dispatch(getCurrent());
    } else if (flag === "update") {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: <UpdateAddress info={info} />,
        })
      );
    }
  };

  const handleShipping = () => {
    console.log("curr", current);
    if (current?.address.length > 0)
      navigate(`/${path.CART}/${path.SHIPPING}/${path.PAYMENT}`);
    else {
      Swal.fire({
        title: "Almost...",
        text: "Please Update Address first",
        showCloseButton: true,
        showCancelButton: true,
        icon: "info",
        confirmButtonText: "Go Update",
        cancelButtonText: "Not now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/${path.MEMBER}/${path.ADDRESSES}`);
        }
      });
    }
  };

  return (
    <div className="w-full   flex flex-col items-center pb-16">
      <div className="w-full flex justify-center px-[20px] py-[15px] mb-[20px]  bg-[#f7f7f7] ">
        <div className="w-main px-[20px] flex flex-col items-start">
          <h1 className="text-[18px] text-[#1a162e] font-lato font-medium leading-5">
            Shipping
          </h1>
          <BreadCrumb title={"my-cart"} category={"my-cart"} />
        </div>
      </div>
      <div className="flex justify-center  w-full  ">
        <div className="flex gap-7 w-main px-[20px] py-[15px] mb-[20px]">
          <div className="flex-5 border-solid border-[#f6f6f6] border rounded-[20px] p-7">
            <h2 className="text-[22px] text-[#151515] font-semibold leading-6">
              {`1. Shipping, arrives between ${moment().format(
                "ddd, MMM D"
              )}- ${moment().add(7, "days").format("ddd, MMM D")}`}
            </h2>
            <div className="bg-[#D2D1D6] h-[1px] w-full my-6"></div>

            <div className="flex justify-between my-8  items-center">
              <div className=" text-[18px] font-normal flex flex-col gap-2 ">
                Shipping address
                <span className="text-[15px] text-[#1A162E]">
                  Where should we deliver your order?
                </span>
              </div>

              <div className=" justify-end flex self-center ">
                <Button
                  style={
                    "bg-[#FFB700] text-black  text-[16px] rounded-3xl  flex gap-2 leading-4 items-center"
                  }
                  type="submit"
                  handleOnClick={() => handleShowModalCreate()}
                >
                  <span className="text-[24px] ">
                    <AiOutlinePlus />
                  </span>
                  Add a new address
                </Button>
              </div>
            </div>

            <div className="mt-4 mb-8  items-center">
              {current?.address.map((el, index) => (
                <div key={index} className="mb-5">
                  <Address
                    info={el}
                    handleUpdateAddress={handleUpdateAddress}
                  />
                </div>
              ))}
            </div>

            <div className="bg-[#D2D1D6] h-[1px] w-full my-8"></div>

            <div>
              <h2 className=" text-[16px] mb-6 font-normal ">Items details</h2>

              {currentCart.map((el, index) => (
                <div key={index}>
                  <OrderItem el={el} />
                </div>
              ))}
            </div>
            <div className="flex justify-between items-end font-medium">
              <Link to={`/${path.HOME}`} className="flex gap-3  flex-3 group">
                <span className="translate-x-1 group-hover:translate-x-[0] transition-transform duration-200 ease-in-out">
                  <GrPrevious />
                </span>
                <span>Continue Shopping</span>
              </Link>
              <div className="flex flex-col gap-5 font-lato text-[18px] flex-2 ">
                <div className="flex justify-between ">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-medium">
                    {formatMoney(totalPrice())} VND
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Texes:</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="bg-[#D2D1D6] h-[1px] w-full my-4"></div>

                <div className="flex justify-between font-semibold font-main">
                  <span className="">Total Price</span>
                  <span className="">{formatMoney(totalPrice())} VND</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-2 border-solid border-[#f6f6f6] border rounded-[20px] p-7 h-fit">
            <div className="flex flex-col gap-5 font-lato text-[18px] flex-2 ">
              <div className="flex justify-between font-main text-[16px]">
                <span className="font-medium flex">
                  Subtotal
                  <p className="font-normal"> (items)</p>
                </span>
                <span className="font-semibold">{currentCart.length}</span>
              </div>
              <div className="flex justify-between font-main text-[16px]">
                <span className="font-medium flex">
                  Price
                  <p className="font-normal"> (total)</p>
                </span>
                <span className="font-semibold">
                  {formatMoney(totalPrice())} VND
                </span>
              </div>

              <div className="bg-[#D2D1D6] h-[1px] w-full my-1"></div>

              <div className="flex justify-between font-semibold font-main text-[16px]">
                <span className="">Estimated Total</span>
                <span className="">{formatMoney(totalPrice())} VND</span>
              </div>
              <Button handleOnClick={() => handleShipping()}>
                Continue to checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withBaseComponent(Shipping);
