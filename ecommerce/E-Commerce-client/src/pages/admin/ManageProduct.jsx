/** @format */

import React, { useEffect, useState } from "react";
import { apiDeleteProduct, apiGetProducts } from "../../apis";
import { Button, InputForm, Table } from "../../components";
import { formatMoney } from "../../ultils/helper";
import icons from "../../ultils/icons";
import { useForm } from "react-hook-form";
import {
  Link,
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import path from "../../ultils/path";
import useDebounce from "../../hooks/useDebounce";
import UpdateProduct from "./UpdateProduct";
import { AddVarriant } from ".";
import swal from "sweetalert2";

const { FiTrash2, LuPencilLine, TiPlus, MdOutlineDashboardCustomize } = icons;

const ManageProduct = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [showVarriant, setShowVarriant] = useState(false);
  const [dataUpdate, setDataUpdate] = useState([]);
  const [dataVarriant, setDataVarriant] = useState([]);
  const [dataProd, setDataProd] = useState([]);
  const [count, setCount] = useState(null);
  const [params] = useSearchParams();
  const limit = +import.meta.env.VITE_PROD_LIMIT_PROD;
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = +params.get("page") || 1;

  const {
    register,
    watch,
    formState: { errors },
  } = useForm();

  const columns = [
    {
      title: "No",
      key: "no",
      sort: true,
      render: (no) => <span>{+no + 1 + limit * (currentPage - 1)}</span>,
    },
    {
      title: "Thumb",
      key: "thumb",
      render: (path) => <img src={path} className="w-[100px] object-contain" />,
    },
    {
      title: "Title",
      key: "title",
      sort: true,
    },

    {
      title: "Price",
      key: "price",
      sort: true,
      render: (path) => <span>{formatMoney(path)}</span>,
    },
    {
      title: "Quantity",
      key: "quantity",
      sort: true,
    },
    {
      title: "Sold",
      key: "sold",
      sort: true,
    },
    {
      title: "Rating",
      key: "ratings",
      sort: true,
    },
    {
      title: "Brand",
      key: "brand",
      sort: true,
    },
    {
      title: "Category",
      key: "category",
      sort: true,
    },
    {
      title: "Varriants",
      key: "varriants",
    },
    {
      title: "Color",
      key: "color",
    },
    {
      title: "Action",
      key: "action",
      render: (info) => (
        <div className="flex items-center gap-3 cursor-pointer">
          <span>
            <FiTrash2 color="red" onClick={() => handleDelete(info?._id)} />
          </span>
          <span>
            <LuPencilLine
              color="#1677ff"
              onClick={() => {
                setShowUpdate(true);
                setDataUpdate(info);
              }}
            />
          </span>
          <span>
            <MdOutlineDashboardCustomize
              color="#52c41a"
              onClick={() => {
                setShowVarriant(true);
                setDataVarriant(info);
              }}
            />
          </span>
        </div>
      ),
    },
  ];

  const groupButton = [
    {
      id: 1,
      button: (
        <form className="w-[260px]">
          <InputForm
            id={"search"}
            placeholder={"Search by title,color,category,brand "}
            register={register}
            errors={errors}
            validate={{ required: "Need Fill This Field" }}
            fullwidth={true}
          />
        </form>
      ),
    },
    {
      id: 2,
      button: (
        <Button
          style={
            "py-[10px] text-white rounded-md bg-[#1677ff]  font-lato text-[14px]"
          }
        >
          <Link
            to={`/${path.ADMIN}/${path.CREATE_PRODUCT}`}
            className="flex gap-1 items-center"
          >
            <TiPlus />
            Thêm Mới
          </Link>
        </Button>
      ),
    },
  ];

  const fetchData = async (params) => {
    const res = await apiGetProducts(params);
    if (res.success) {
      const data = res.products?.map((el, index) => ({
        no: index,
        title: el.title,
        thumb: el.thumb,
        price: el.price,
        quantity: el.quantity,
        sold: el.sold,
        color: el.color,
        brand: el.branch,
        category: el.category,
        varriants: el?.varriants.length,
        ratings: el.totalRating,
        action: el,
      }));
      setDataProd(data);
      setCount(res.counts);
    }
    console.log("res", res);
  };

  useEffect(() => {
    const queries = Object.fromEntries(params);
    console.log("queri", queries);
    fetchData({ ...queries, limit });
  }, [params, showUpdate, showVarriant]);

  const queryDebounce = useDebounce(watch("search"), 500);
  useEffect(() => {
    if (queryDebounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({
          q: queryDebounce,
        }).toString(),
      });
    } else {
      navigate({
        pathname: location.pathname,
      });
    }
  }, [queryDebounce]);

  const handleDelete = (pid) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await apiDeleteProduct(pid);
          if (res.success) {
            const queries = Object.fromEntries(params);
            queries.page = 1;
            navigate({
              pathname: location.pathname,
              search: createSearchParams(queries).toString(),
            });
            fetchData({ ...queries, limit: import.meta.env.VITE_PROD_LIMIT });

            swal.fire({
              title: "Deleted!",
              text: res?.mes,
              icon: "success",
            });
          } else {
            swal.fire({
              title: "Deleted!",
              text: res?.mes,
              icon: "error",
            });
          }
        }
      });
  };
  return (
    <div>
      {showUpdate && (
        <UpdateProduct dataUpdate={dataUpdate} setShowUpdate={setShowUpdate} />
      )}
      {showVarriant && (
        <AddVarriant
          dataVarriant={dataVarriant}
          setShowVarriant={setShowVarriant}
        />
      )}

      {!(showUpdate || showVarriant) && (
        <div className="mx-4 mt-4 overflow-x-auto">
          <Table
            columns={columns}
            data={dataProd}
            count={count}
            title={"Manage Product"}
            groupButton={groupButton}
            limit={limit}
          />
        </div>
      )}
    </div>
  );
};

export default ManageProduct;
