/** @format */

import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import path from "../../ultils/path";
import { useEffect } from "react";
const FinalRegister = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "failed")
      Swal.fire("Oops!", "Đăng ký không thành công !", "error").then(() => {
        navigate(`/${path.LOGIN}`);
      });
    if (status === "success")
      Swal.fire("Congration!", "Đăng ký  thành công !", "success").then(() => {
        navigate(`/${path.LOGIN}`);
      });
  }, []);
  return <div className="h-screen w-screen bg-gray-100"></div>;
};

export default FinalRegister;
