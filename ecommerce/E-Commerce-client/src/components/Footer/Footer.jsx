/** @format */

import { memo } from "react";
import icons from "../../ultils/icons";
const { IoMail, BsFillTelephoneFill, MdLocationPin } = icons;
const Footer = () => {
  return (
    <footer className="w-full flex flex-col ">
      <div className="w-full h-[104px] bg-[#ee3131] flex  justify-center  text-white py-[25px] px-5">
        <div className="flex w-main  justify-between  text-[20px]">
          <div className="flex flex-col flex-1 mt-[15px]">
            <span className="leading-5 tracking-widest">
              SIGN UP TO NEWSLETTER
            </span>
            <span className="text-[13px] leading-5 opacity-60 ">
              Subscribe now and receive weekly newsletter
            </span>
          </div>
          <div className="flex items-center flex-1 ">
            <input
              className="w-full text-gray-50 placeholder:text-gray-200 text-[14px] outline-none bg-[#f04646] px-5 h-[50px] rounded-l-full"
              type="text"
              placeholder="Email address"
            />
            <span className="bg-[#f04646] w-[50px] h-[50px] flex items-center  rounded-r-full">
              <IoMail />
            </span>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center bg-[#191919] text-white text-[15px] py-[50px] px-5">
        <div className="w-main flex justify-center">
          <div className="flex-2">
            <h2 className="uppercase font-semibold pl-[15px] py-[4px] border-l-[3px] border-solid border-main mb-5">
              About Us
            </h2>
            <ul className="text-[13px] flex flex-col gap-[10px]">
              <li className="flex gap-1 leading-5">
                <div className="flex gap-[5px] items-center">
                  <MdLocationPin />
                  <span>Address: </span>
                </div>
                <span className="text-[#b7b7b7]">
                  474 Ontario St Toronto, ON M4X 1M7 Canada
                </span>
              </li>
              <li className="flex gap-1 leading-5">
                <div className="flex gap-[5px] items-center">
                  <BsFillTelephoneFill />
                  <span>Phone: </span>
                </div>
                <span className="text-[#b7b7b7]">(+1234)56789xxx</span>
              </li>
              <li className="flex gap-1 leading-5">
                <div className="flex gap-[5px] items-center">
                  <IoMail />
                  <span>Mail: </span>
                </div>
                <span className="text-[#b7b7b7]">tadathemes@gmail.com</span>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h2 className="uppercase font-semibold pl-[15px] py-[4px] border-l-[3px] border-solid border-main mb-5">
              INFORMATION
            </h2>
            <ul className="text-[13px] flex flex-col gap-[10px]">
              <li className="flex gap-1 leading-5">
                <span className="text-[#b7b7b7]">Typography</span>
              </li>
              <li className="flex gap-1 leading-5">
                <span className="text-[#b7b7b7]">Gallery</span>
              </li>
              <li className="flex gap-1 leading-5">
                <span className="text-[#b7b7b7]">Store Location</span>
              </li>
              <li className="flex gap-1 leading-5">
                <span className="text-[#b7b7b7]">Today's Deals</span>
              </li>
              <li className="flex gap-1 leading-5">
                <span className="text-[#b7b7b7]">Contact</span>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h2 className="uppercase font-semibold pl-[15px] py-[4px] border-l-[3px] border-solid border-main mb-5">
              WHO WE ARE
            </h2>
            <ul className="text-[13px] flex flex-col gap-[10px]">
              <li className="flex gap-1 leading-5">
                <span className="text-[#b7b7b7]">Help</span>
              </li>
              <li className="flex gap-1 leading-5">
                <span className="text-[#b7b7b7]">Free Shipping</span>
              </li>
              <li className="flex gap-1 leading-5">
                <span className="text-[#b7b7b7]">FAQs</span>
              </li>
              <li className="flex gap-1 leading-5">
                <span className="text-[#b7b7b7]">Return & Exchange</span>
              </li>
              <li className="flex gap-1 leading-5">
                <span className="text-[#b7b7b7]">Testimonials</span>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h2 className="uppercase font-semibold pl-[15px] py-[4px] border-l-[3px] border-solid border-main mb-5">
              #DIGITALWORLDSTORE
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
