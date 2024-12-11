/** @format */

import axios from "../axios";

export const getCategories = () =>
  axios({
    url: "/prodcategory/",
    method: "get",
  });
