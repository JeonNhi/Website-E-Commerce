/** @format */

import React, { memo, useEffect, useState } from "react";
import { Button, Tab, Varriant } from "../../components";
import { statusOrder } from "../../ultils/constains";
import { apiGetOrders, apiUpdateCart } from "../../apis";
import imgItems from "../../assets/images/orderItem.jpg";
import withBaseComponent from "../../hocs/withBaseComponent";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { formatMoney } from "../../ultils/helper";
import moment from "moment";
import { toast } from "react-toastify";
import { getCurrent } from "../../redux/user/userAction";
import { v4 as uuidv4 } from "uuid";

const History = ({ location, navigate, dispatch }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [status, setStatus] = useState("");
  const [orders, setOrders] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(false);
  const [params] = useSearchParams();

  console.log("or", orders);
  const handleBuyAgian = async (index) => {
    for (let i = 0; i < orders[index].products.length; i++) {
      const res = await apiUpdateCart({
        pid: orders[index].products[i].product,
        color: orders[index].products[i].color,
        title: orders[index].products[i].title,
        price: orders[index].products[i].price,
        thumb: orders[index].products[i].thumb,
        sku: uuidv4(),
      });
    }
    toast.success("Add Product Again To Cart is Success!");
    dispatch(getCurrent());
  };
  const tabs = statusOrder.map((el) => ({
    label: <span onClick={() => setStatus(el.value)}>{el.status}</span>,
    content: (
      <div className="flex flex-col text-[14px] cursor-pointer ">
        <span>
          {orders?.length > 0 ? (
            orders?.map((order, index) => (
              <div key={order._id} className="my-3 bg-white py-2 px-4">
                {order?.products?.map((el) => (
                  <div key={el._id}>
                    <article className="flex gap-7">
                      <a className="w-[120px] h-[120px] " href="/">
                        <img
                          src={el?.thumb}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </a>
                      <div className="flex justify-between text-[16px] font-medium leading-5 flex-1">
                        <div className="flex flex-2 flex-col justify-center gap-5">
                          <div className="flex justify-between">
                            <a
                              href={`/${el?.product?.category}/${el?.product?._id}/${el?.title}`}
                              className="capitalize"
                            >
                              {el.title}
                            </a>
                            <span className="text-main font-normal text-[14px]">
                              {moment(order?.createdAt).format("DD/MM/YYYY")}
                            </span>
                          </div>
                          <span className="flex items-center justify-between">
                            {formatMoney(el?.price)} VND
                          </span>
                          {el?.color && (
                            <div className="flex gap-4">
                              <div className="cart-item__input">
                                <Varriant
                                  style={"py-[7px]"}
                                  color={el?.color}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                    <div className="bg-[#00000017] h-[1px] w-full my-4"></div>
                  </div>
                ))}
                <div className="flex flex-col gap-3  items-end justify-end py-3 px-6 bg-[#fffefb]">
                  <div className="text-[14px] font-normal">
                    Order Total : &nbsp;
                    <span className="text-main text-[22px] font-semibold">
                      {formatMoney(order.total * 23500)} VND
                    </span>
                  </div>
                  <Button
                    handleOnClick={() => handleBuyAgian(index)}
                    style={"bg-main"}
                  >
                    Buy Again
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col text-[#000000cc] text-[20px] items-center justify-center bg-white min-h-[500px] gap-5">
              <img src={imgItems} className="w-[40%] h-[40%] " />
              <span>No orders yet</span>
            </div>
          )}
        </span>
      </div>
    ),
  }));

  const stickyHeaderFuc = () => {
    if (window.scrollY >= 80) {
      setScrollPosition(true);
    } else {
      setScrollPosition(false);
    }
  };
  const fetchDataOrder = async (params) => {
    const res = await apiGetOrders(params);
    if (res.success) setOrders(res?.orders);
  };

  useEffect(() => {
    window.addEventListener("scroll", stickyHeaderFuc);
    return () => {
      window.removeEventListener("scroll", stickyHeaderFuc);
    };
  }, [scrollPosition]);

  useEffect(() => {
    const queriesFormat = Object.fromEntries([...params]);
    delete queriesFormat.status;

    if (status) {
      queriesFormat.status = status;
    }

    navigate({
      pathname: location.pathname,
      search: createSearchParams(queriesFormat).toString(),
    });
    fetchDataOrder({ ...queriesFormat });
  }, [status]);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="flex-3  rounded-[20px]">
      <div className="mx-10 py-5 flex flex-col gap-5">
        <Tab
          handleTabClick={handleTabClick}
          tabs={tabs}
          activeTab={activeTab}
          heightContent={500}
          scrollPosition={scrollPosition}
        />
      </div>
    </div>
  );
};

export default withBaseComponent(History);
