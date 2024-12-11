/** @format */

import React, { memo, useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo.png";
import { voteOptions } from "../../ultils/constains";
import icons from "../../ultils/icons";
import { Button } from "../../components";
const { AiFillStar } = icons;
const VoteOption = ({ title, handleSubmitVote }) => {
  const voteRef = useRef();
  const [chosenVote, setChosenVote] = useState(null);
  const [comment, setComment] = useState("");
  useEffect(() => {
    voteRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);
  return (
    <div
      ref={voteRef}
      className="bg-white w-[700px] pt-8 pb-6 px-8 flex flex-col items-center text-[14px]"
      onClick={(e) => e.stopPropagation()}
    >
      <img src={logo} alt="logo" />
      <h3 className="mt-10 mb-5 text-[16px]">Voting product {title}</h3>

      <textarea
        rows="2"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-blue-500"
        placeholder="Write your thoughts here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      <span className="my-4 self-stretch ">How do you like this product?</span>
      <div className="flex gap-4 ">
        {voteOptions.map((el) => (
          <div
            className="w-[100px] py-4 flex flex-col bg-gray-200 hover:bg-gray-300  gap-3 items-center cursor-pointer"
            key={el?.id}
            onClick={() => setChosenVote(el.id)}
          >
            <AiFillStar
              color={`${
                chosenVote && chosenVote >= el.id ? "#f1b400" : "#333"
              }`}
            />
            <span>{el?.title}</span>
          </div>
        ))}
      </div>
      <Button
        style={"w-full bg-main mt-5"}
        handleOnClick={() => {
          handleSubmitVote({ chosenVote, comment });
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default memo(VoteOption);
