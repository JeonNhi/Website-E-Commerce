/** @format */

import React, { memo, useEffect } from "react";
import Button from "../Button/Button";
import InputForm from "../Input/InputForm";

const UpdateFormUser = ({ info, handleSubmit, register, errors }) => {
  return (
    <form
      className="bg-white w-[700px] pt-8 pb-6 px-8 flex flex-col items-center text-[14px] gap-4"
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit}
    >
      {/* <h3 className="mt-10 mb-5 text-[16px]">Update Infomation User </h3> */}
      <div className="flex items-center w-full gap-4">
        <InputForm
          id={"firstname"}
          label={"First Name"}
          register={register}
          validate={{ require: true }}
          errors={errors}
          defaultValue={info?.firstname}
        />
        <InputForm
          id={"lastname"}
          label={"Last Name"}
          register={register}
          validate={{ require: true }}
          errors={errors}
          defaultValue={info?.lastname}
        />
      </div>
      <div className="flex items-center w-full gap-4">
        <InputForm
          id={"email"}
          label={"Email"}
          register={register}
          validate={{ require: true }}
          errors={errors}
          defaultValue={info?.email}
        />
        <InputForm
          id={"mobile"}
          label={"Phone"}
          register={register}
          validate={{ require: true }}
          errors={errors}
          defaultValue={info?.mobile}
        />
      </div>
      <div className="flex items-center w-full gap-4">
        <InputForm
          id={"role"}
          label={"Role"}
          register={register}
          validate={{ require: true }}
          errors={errors}
          defaultValue={info?.role}
        />
        <div className="flex-1"></div>
      </div>

      <Button
        type="submit"
        style={"w-full bg-main mt-5"}
        handleOnClick={() => {
          // handleSubmit({ chosenVote, comment });
        }}
      >
        Update
      </Button>
    </form>
  );
};

export default memo(UpdateFormUser);
