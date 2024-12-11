/** @format */

import { memo, useCallback, useEffect, useState } from "react";
import { tabs } from "../../ultils/constains";
import { VoteBar, Button, VoteOption, Comment } from "../../components";
import { renderStars } from "../../ultils/helper";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../redux/app/appSlice";
import { apiRatings } from "../../apis";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { toast } from "react-toastify";
const ProductInfo = ({ totalRating, ratings, title, pid, reRender }) => {
  console.log("ra", ratings);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);
  const [isActiveTab, setIsActiveTab] = useState(0);

  const handleSubmitVote = useCallback(
    async ({ chosenVote, comment }) => {
      if (!chosenVote || !comment || !pid) {
        toast.warning("Please comment when vote");
        return;
      }

      await apiRatings({
        star: chosenVote,
        comment,
        pid,
      });
      reRender();

      dispatch(
        showModal({
          isShowModal: false,
          modalChildren: null,
        })
      );
    },
    [pid]
  );
  const handleVoteNow = () => {
    if (!isLoggedIn) {
      Swal.fire({
        title: "Oops!",
        text: "Please Login to Vote",
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "Go Login",
        cancelButtonText: "Cancle",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/${path.LOGIN}`);
        }
      });
    } else {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <VoteOption title={title} handleSubmitVote={handleSubmitVote} />
          ),
          modalCenter: true,
        })
      );
    }
  };
  return (
    <div className="flex flex-col">
      <ul className="flex gap-2 bottom-[-1px] translate-y-[1px]">
        {tabs?.map((tab, index) => (
          <li
            onClick={() => setIsActiveTab(tab.id)}
            key={tab.id}
            className={`${
              isActiveTab === tab.id ? "bg-white" : "bg-[#f1f1f1]"
            }  cursor-pointer text-[15px] uppercase px-5 py-[9px] text-black border-[1px] border-solid border-b-0 border-[#ebebeb]`}
          >
            {tab.title}
          </li>
        ))}
      </ul>
      <div className="border-[1px] border-solid  border-[#ebebeb] p-5 text-[14px] text-[#505050] leading-5">
        <p>{tabs?.find((tab) => isActiveTab === tab.id)?.content}</p>
      </div>
      <div className="flex-col flex  gap-6 mt-5">
        <div className="flex">
          <div className="flex-2 flex flex-col items-center gap-[10px] justify-center border-r-[1px] border-solid border-[#e5e7eb] pr-6">
            <div className="text-[28px] text-[#262626] font-semibold flex items-center text-center ">
              {totalRating}
              <span className="text-[18px]">/</span>5
            </div>
            <div className="flex gap-2">
              {renderStars(totalRating, 20).map((star, index) => (
                <span key={index}>{star}</span>
              ))}
            </div>
            <div className="text-[#0c53b7] underline text-[18px]">
              <span className="font-semibold">{ratings?.length || 0} </span>
              reviewers and commentors
            </div>
          </div>
          <div className="flex-3 flex flex-col gap-1">
            {Array.from(Array(5).keys())
              .reverse()
              .map((el) => (
                <VoteBar
                  key={el}
                  number={el + 1}
                  ratingCount={
                    ratings?.filter((rating) => rating.star === el + 1)?.length
                  }
                  ratingTotal={ratings?.length}
                />
              ))}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-semibold mb-3">Do you review this products ?</p>
          <Button style={"bg-main px-5"} handleOnClick={() => handleVoteNow()}>
            Vote now !
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          {ratings?.map((el, index) => (
            <div key={index}>
              <Comment
                name={`${el?.postedBy?.lastname} ${el?.postedBy?.firstname}`}
                updatedAt={el?.updatedAt}
                avatar={el?.postedBy?.avatar}
                comment={el.comment}
                star={el.star}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(ProductInfo);
