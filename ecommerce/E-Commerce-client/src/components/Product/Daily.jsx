/** @format */
import { useEffect, useState, memo } from "react";
import { apiGetProducts } from "../../apis";
import icons from "../../ultils/icons";
import { formatMoney, renderStars } from "../../ultils/helper";
import CountDown from "../CountDown/CountDown";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/user/userSlice";

const { AiFillStar, HiMenu } = icons;
const Daily = () => {
  const [dealDaily, setDealDaily] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [expireTime, setExpireTime] = useState(false);
  const { isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let idInterval;
  const fetchProductDaily = async () => {
    dispatch(setLoading({ isLoading: true }));
    const response = await apiGetProducts({ sort: "-totalRating" });

    if (response?.success) {
      setDealDaily(response.products[0]);
      const h = 24 - new Date().getHours();
      const m = 59 - new Date().getMinutes();
      const s = 59 - new Date().getSeconds();
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }
    dispatch(setLoading({ isLoading: false }));
  };

  useEffect(() => {
    fetchProductDaily();
  }, []);

  useEffect(() => {
    idInterval && clearInterval(idInterval);
    fetchProductDaily();
  }, [expireTime]);

  useEffect(() => {
    idInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      } else {
        if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else {
          if (hours > 0) {
            setHours((prev) => prev - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            setExpireTime(!expireTime);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [hours, minutes, seconds]);

  return (
    <div className="border border-solid border-[#ebebeb] flex-auto">
      <div className="p-5 ">
        <div className="flex items-center justify-between mb-[50px]">
          <span>
            <AiFillStar size={20} color="#d11" />
          </span>
          <h2 className="text-[#505050] text-[20px] font-semibold uppercase">
            Daily Deals
          </h2>
          <span></span>
        </div>

        <img
          src={
            dealDaily?.thumb ||
            "https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150544961.jpg?w=740&t=st=1698167331~exp=1698167931~hmac=0c23ae6263688c5c733f7ebf4bdd37883952dcc3ef7cea365dcb57aa9396ff74"
          }
          alt="deal daily"
          className="mb-[15px] cursor-pointer"
          onClick={() =>
            navigate(
              `/${dealDaily?.category}/${dealDaily?._id}/${dealDaily?.title}`
            )
          }
        />
        <div className="flex flex-col  bg-white z-10 text-center">
          <span className="line-clamp-1 leading-4 mb-[8px] text-[#2b3743]">
            {dealDaily?.title}
          </span>
          <div className="flex justify-center mb-[15px]">
            {renderStars(dealDaily?.totalRating, 20).map((star, index) => (
              <span key={index}>{star}</span>
            ))}
          </div>
          <span className="text-[#333] mb-[15px]">
            {formatMoney(dealDaily?.price)} VND
          </span>
        </div>
        <div className="mb-[15px] flex justify-center gap-1">
          <CountDown unit={"Hours"} number={hours} />
          <CountDown unit={"Minutes"} number={minutes} />
          <CountDown unit={"Seconds"} number={seconds} />
        </div>
        <button
          type="button"
          className="flex w-full gap-2 justify-center items-center bg-main text-white  hover:text-[#333] py-[11px] px-[15px]"
        >
          <span>
            <HiMenu />
          </span>
          <span className="font-lato text-[14px]">OPTIONS</span>
        </button>
      </div>
    </div>
  );
};

export default memo(Daily);
