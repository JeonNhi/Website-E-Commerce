/** @format */

import React from "react";

import { useDispatch } from "react-redux";
import { showModal } from "../../redux/app/appSlice";
const Modal = ({ children, center }) => {
  const dispatch = useDispatch();

  return (
    <div
      className={`bg-overlay inset-0 z-50 absolute flex  ${
        center ? "items-center" : "items-start"
      } justify-center`}
      onClick={() =>
        dispatch(showModal({ isShowModal: false, modalChildren: null }))
      }
    >
      {children}
    </div>
  );
};

export default Modal;
