/** @format */

import { formatMoney, renderStars } from "../../ultils/helper";

const ProductCard = ({ title, price, rating, image }) => {
  return (
    <div className="flex p-[15px] gap-5 border-[#ebebeb] border-solid border">
      <img
        src={image}
        alt={title}
        className="w-[85px] h-[85px] object-contain"
      />
      <div className="flex flex-col gap-[10px] ">
        <span className="line-clamp-1 leading-4 text-[90%] text-[#2b3743] ">
          {title}
        </span>
        <div className="flex">
          {renderStars(rating, 14).map((star, index) => (
            <span key={index}>{star}</span>
          ))}
        </div>
        <span className="text-[#333] text-[80%] mb-[20px]">
          {formatMoney(price)} VND
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
