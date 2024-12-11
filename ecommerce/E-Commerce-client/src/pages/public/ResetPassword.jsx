/** @format */

import React, { useState } from "react";
import { Button } from "../../components";
import { useParams } from "react-router-dom";
import { apiResetPassword } from "../../apis";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");

  const { token } = useParams();
  const handleResetPassword = async () => {
    const rs = await apiResetPassword({ token, password: newPassword });

    if (rs?.success) toast.success(rs.mes, { theme: "colored" });
    else toast.info(rs.mes, { theme: "colored" });
  };
  return (
    <div className="absolute bg-white z-50 top-0 left-0 right-0 bottom-0 flex flex-col items-center pt-12 ">
      <div className="flex flex-col gap-4">
        <label htmlFor="email">Enter your new password:</label>
        <input
          type="text"
          id="email"
          className=" w-[800px] pb-2 border-b border-solid outline-none placeholder:text-sm"
          placeholder="Exp:email@gmail.com"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <Button
            style="bg-blue-500 text-white "
            handleOnClick={() => handleResetPassword()}
          >
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
