/** @format */

import axios from "../axios";
export const apiRegister = (data) =>
  axios({
    url: "/user/register",
    method: "post",
    data,
    withCredentials: true,
  });

export const apiFinalRegister = (token) =>
  axios({
    url: "/user/finalregister/" + token,
    method: "put",
  });

export const apiLogin = (data) =>
  axios({
    url: "/user/login",
    method: "post",
    data,
  });

export const apiForgotPassword = (data) =>
  axios({
    url: "/user/forgotpassword",
    method: "post",
    data,
  });

export const apiResetPassword = (data) =>
  axios({
    url: "/user/resetpassword",
    method: "put",
    data,
  });

export const apiGetCurrent = () =>
  axios({
    url: "/user/current",
    method: "get",
  });
export const apiGetUsers = (params) =>
  axios({
    url: "/user",
    method: "get",
    params,
  });

export const apiUpdateUserByAdmin = (uid, data) =>
  axios({
    url: "/user/" + uid,
    method: "put",
    data,
  });
export const apiDeleteUser = (uid) =>
  axios({
    url: "/user/" + uid,
    method: "delete",
  });
export const apiUpdateUser = (data) =>
  axios({
    url: "/user/current",
    method: "put",
    data,
  });
export const apiUpdateCart = (data) =>
  axios({
    url: "/user/cart",
    method: "put",
    data,
  });
export const apiUpdateWishList = (data) =>
  axios({
    url: "/user/wishlist",
    method: "put",
    data,
  });
export const apiRemoveCart = (pid, sku) =>
  axios({
    url: `/user/remove-cart/${pid}/${sku}`,
    method: "delete",
  });
export const apiAddAddress = (data) =>
  axios({
    url: "/user/add-address",
    method: "put",
    data,
  });
export const apiRemoveAddress = (id) =>
  axios({
    url: "/user/remove-address/" + id,
    method: "delete",
  });

export const apiUpdateAddress = (data, id) =>
  axios({
    url: "/user/update-address/" + id,
    method: "put",
    data,
  });
export const apiCreateOrder = (data) =>
  axios({
    url: "/order",
    method: "post",
    data,
  });

export const apiGetOrders = (params) =>
  axios({
    url: "/order",
    method: "get",
    params,
  });
