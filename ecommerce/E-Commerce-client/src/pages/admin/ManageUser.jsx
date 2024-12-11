/** @format */

import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  InputField,
  InputForm,
  RadioForm,
  Table,
  Tag,
} from "../../components";
import icons from "../../ultils/icons";
import { apiDeleteUser, apiGetUsers, apiUpdateUserByAdmin } from "../../apis";
import useDebounce from "../../hooks/useDebounce";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import moment from "moment";
import { useForm } from "react-hook-form";
import { roles, statusBlocks } from "../../ultils/constains";
import { toast } from "react-toastify";
import swal from "sweetalert2";
const { TiPlus, FiTrash2, LuPencilLine, AiOutlineSearch } = icons;

const ManageUser = () => {
  const [listUser, setListUser] = useState([]);
  const [params] = useSearchParams();
  const [count, setCount] = useState(null);
  const [userUpdate, setUserUpdate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [querySearch, setQuerySearch] = useState({
    search: "",
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    email: "",
    firstname: "",
    lastname: "",
    role: "",
    mobile: "",
    isBlocked: "",
  });

  const fetchUser = async (params) => {
    const response = await apiGetUsers(params);
    if (response.success) {
      const data = response?.users?.map((user, index) => ({
        no: index,
        fullname: user.firstname + " " + user.lastname,
        email: user.email,
        role: user.role,
        phone: user.mobile,
        status: user.isBlocked,
        createdAt: user.createdAt,
        action: user,
      }));
      setListUser(data);
      setCount(response.counts);
    }
  };
  const navigate = useNavigate();
  const queriesDebounce = useDebounce(querySearch.search, 500);
  useEffect(() => {
    const queries = Object.fromEntries(params);
    if (queriesDebounce) queries.search = queriesDebounce;

    fetchUser({ ...queries, limit: import.meta.env.VITE_PROD_LIMIT });
  }, [queriesDebounce, params, userUpdate]);

  const columns = [
    {
      title: "No",
      key: "no",
      sort: true,
      render: (no) => (
        <span className="text-[#1677ff] cursor-pointer">{no}</span>
      ),
    },
    { title: "FullName", key: "fullname" },
    { title: "Email", key: "email" },
    { title: "Role", key: "role" },
    { title: "Phone", key: "phone" },
    {
      title: "Status",
      key: "status",
      render: (status) => (
        <Tag
          status={`${status ? "warning" : "success"}`}
          className=" cursor-pointer"
        >
          {status ? "block" : "active"}
        </Tag>
      ),
    },
    {
      title: "CreatedAt",
      key: "createdAt",
      sort: true,
      render: (createdAt) => (
        <span>{moment(createdAt).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (info) => (
        <div className="flex items-center gap-3 cursor-pointer">
          <span onClick={() => handleDelete(info?._id)}>
            <FiTrash2 color="red" />
          </span>
          <span onClick={() => handleShowModal(info)}>
            <LuPencilLine color="#1677ff" />
          </span>
        </div>
      ),
    },
  ];

  const groupButton = [
    {
      id: 1,
      button: (
        <InputField
          value={querySearch.queries}
          setValue={setQuerySearch}
          nameKey="search"
          icon={<AiOutlineSearch />}
        />
      ),
    },
    {
      id: 2,
      button: (
        <Button
          style={
            "py-[10px] text-white rounded-md bg-[#1677ff] flex gap-1 items-center font-lato text-[14px]"
          }
        >
          <TiPlus />
          Thêm mới
        </Button>
      ),
    },
  ];

  const handleUpdate = async (data) => {
    const dataUpdate = {
      ...data,
      isBlocked: data.isBlocked === "active" ? false : true,
    };
    const res = await apiUpdateUserByAdmin(userUpdate?._id, dataUpdate);
    if (res.success) {
      toast.success(res.mes);
      setUserUpdate(null);
      setShowModal(false);
    }
  };

  const handleShowModal = (info) => {
    console.log("info", info);
    setUserUpdate(info);
    setShowModal(true);
  };

  const handleDelete = (uid) => {
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
          const res = await apiDeleteUser(uid);
          if (res.success) {
            const queries = Object.fromEntries(params);
            queries.page = 1;
            navigate({
              pathname: location.pathname,
              search: createSearchParams(queries).toString(),
            });
            fetchUser({ ...queries, limit: import.meta.env.VITE_PROD_LIMIT });

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

  useEffect(() => {
    if (userUpdate) {
      setValue("firstname", userUpdate.firstname);
      setValue("lastname", userUpdate.lastname);
      setValue("email", userUpdate.email);
      setValue("role", userUpdate.role);
      setValue("isBlocked", userUpdate.isBlocked ? "blocked" : "active");
      setValue("mobile", userUpdate.mobile);
    }
  }, [userUpdate]);

  return (
    <div>
      <div className="">
        <div className="mx-4 mt-4">
          <Table
            title="Danh sách user"
            columns={columns}
            data={listUser}
            groupButton={groupButton}
            count={count}
          />
        </div>
      </div>
      {showModal && userUpdate && (
        <div
          className="bg-overlay inset-0 z-50 absolute flex items-center justify-center h-screen"
          onClick={() => {
            setShowModal(false);
            setUserUpdate(null);
          }}
        >
          <form
            className="bg-white w-[700px] pt-8 pb-6 px-8 flex flex-col items-center text-[14px] gap-4"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit(handleUpdate)}
          >
            {/* <h3 className="mt-10 mb-5 text-[16px]">Update Infomation User </h3> */}
            <div className="flex items-center w-full gap-4">
              <InputForm
                id={"firstname"}
                label={"First Name"}
                register={register}
                validate={{ required: "Require Fill" }}
                errors={errors}
                defaultValue={userUpdate.firstname}
              />
              <InputForm
                id={"lastname"}
                label={"Last Name"}
                register={register}
                validate={{ required: "Require Fill" }}
                errors={errors}
                defaultValue={userUpdate.lastname}
              />
            </div>
            <div className="flex items-center w-full gap-4">
              <InputForm
                id={"email"}
                label={"Email"}
                register={register}
                validate={{
                  required: "Require Fill",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "invalid email address",
                  },
                }}
                errors={errors}
                defaultValue={userUpdate?.email}
              />
              <InputForm
                id={"mobile"}
                label={"Phone"}
                register={register}
                validate={{
                  required: "Require Fill",
                  pattern: {
                    value: /^[0-9\-\+]{9,15}$/,
                    message: "Invalid phone number",
                  },
                }}
                errors={errors}
                defaultValue={userUpdate?.mobile}
              />
            </div>
            <div className="flex items-center  w-full gap-4">
              <RadioForm
                id={"role"}
                label={"Role :"}
                register={register}
                validate={{ required: true }}
                errors={errors}
                options={roles}
              />
              <RadioForm
                id={"isBlocked"}
                label={"Status :"}
                register={register}
                validate={{ required: true }}
                errors={errors}
                options={statusBlocks}
              />
            </div>

            <Button type="submit" style={"w-full bg-main mt-5"}>
              Update
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageUser;
