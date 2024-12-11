/** @format */
import icons from "./icons";
const { AiFillStar, AiOutlineStar } = icons;
import { apiAddresses as apiUrl } from "./constains";
import axios from "axios";
export const formatMoney = (number) =>
  Number(number?.toFixed(1)).toLocaleString();

export const renderStars = (number, size) => {
  const arrStar = [];

  for (let i = 0; i < number; i++)
    arrStar.push(<AiFillStar color="#f1b400" size={size || 16} />);
  for (let i = 5; i > number; i--)
    arrStar.push(<AiOutlineStar color="#f1b400" size={size || 16} />);

  return arrStar;
};

export const validate = (payload, setInvalidFields) => {
  let invalid = 0;
  const formatPayload = Object.entries(payload);
  for (let arr of formatPayload) {
    if (arr[1].trim() === "") {
      invalid++;
      setInvalidFields((prev) => [
        ...prev,
        { name: arr[0], mes: "Require this field" },
      ]);
    }
  }
  for (let arr of formatPayload) {
    switch (arr[0]) {
      case "email":
        const regex = new RegExp(
          '^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
        );

        if (!arr[1].match(regex)) {
          invalid++;
          setInvalidFields((prev) => [
            ...prev,
            { name: arr[0], mes: "Invalid Email" },
          ]);
        }
        break;
      case "password":
        if (arr[1].length < 6) {
          invalid++;
          setInvalidFields((prev) => [
            ...prev,
            { name: arr[0], mes: "Password minimum 6 characters" },
          ]);
        }
        break;
      default:
        break;
    }
  }

  return invalid;
};

export const formatPrice = (number) => Math.round(number / 1000) * 1000;
export const generateRange = (start, end) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, index) => index + start);
};

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export const getDistrict = async (idProvince) => {
  const res = await axios.get(`${apiUrl}/district/?idProvince=` + idProvince);

  return res.data;
};

export const getWard = async (idDistrict) => {
  const res = await axios.get(`${apiUrl}/commune/?idDistrict=` + idDistrict);
  return res.data;
};
