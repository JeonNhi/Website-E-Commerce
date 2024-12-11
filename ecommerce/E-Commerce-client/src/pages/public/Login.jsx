/** @format */
import loginImage from "../../assets/images/login.png";
import logoImage from "../../assets/images/IconLogo.png";
import icons from "../../ultils/icons";
import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";
import { InputField, Button } from "../../components";
import {
  apiLogin,
  apiRegister,
  apiForgotPassword,
  apiFinalRegister,
} from "../../apis";
import swal from "sweetalert2";
import { useNavigate, useSearchParams } from "react-router-dom";
import path from "../../ultils/path";
import { login, setLoading } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { validate } from "../../ultils/helper";
const { HiOutlineMail, BiLock, FiUser, RiPhoneFill } = icons;
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const [isRegister, setIsRegister] = useState(false);
  const [isVerifyToken, setIsVerifyToken] = useState(false);
  const [isForgotPassWord, setIsForgotPassWord] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: "",
  });

  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      mobile: "",
    });
  };

  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload;
    const invalids = isRegister
      ? validate(payload, setInvalidFields)
      : validate(data, setInvalidFields);
    if (invalids === 0) {
      dispatch(setLoading({ isLoading: true }));
      if (isRegister) {
        const rs = await apiRegister(payload);
        if (rs.success) {
          swal.fire("Congralation", rs?.mes, "success").then(() => {
            setIsVerifyToken(true);
            setIsRegister(true);
            resetPayload();
          });
        } else {
          swal.fire("Oops!", rs?.mes, "error");
        }
      } else {
        const rs = await apiLogin(data);
        if (rs.success) {
          dispatch(
            login({
              isLoggedIn: true,
              token: rs.accessToken,
              current: rs.userData,
            })
          );
          searchParams.get("redirect")
            ? navigate(searchParams.get("redirect"))
            : navigate(`/${path.HOME}`);
        } else swal.fire("Oops!", rs?.mes, "error");
      }
      dispatch(setLoading({ isLoading: false }));
    }
  }, [payload, isRegister]);

  const handleForgot = async () => {
    const response = await apiForgotPassword({ email });
    if (response?.success) toast.success(response.mes);
    else toast.info(response.mes);
  };

  const finalRegister = async () => {
    const res = await apiFinalRegister(token);
    if (res.success) {
      swal.fire("Congralation", res?.mes, "success").then(() => {
        setIsVerifyToken(false);
        setIsRegister(false);
        resetPayload();
      });
    } else swal.fire("Oops!", res?.mes, "error");
    setToken("");
  };

  useEffect(() => {
    resetPayload();
    setInvalidFields([]);
  }, [isRegister]);

  return (
    <div className="relative flex items-center justify-around h-screen">
      {isVerifyToken && (
        <div className="absolute left-0 right-0 bottom-0 top-0 bg-overlay">
          <div
            id="content"
            role="main"
            className="w-full max-w-md mx-auto p-6  "
          >
            <div className="mt-7 bg-white  rounded-xl shadow-lg">
              <div className="p-4 sm:p-7">
                <div className="text-center">
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    We sent a code to your email.Please check your email and
                    enter your code in here.
                  </p>
                </div>

                <div className="mt-5">
                  <div className="grid gap-y-4">
                    <div>
                      <input
                        type="email"
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                        onChange={(e) => setToken(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        style="text-white bg-[#FFB700]"
                        handleOnClick={() => finalRegister()}
                      >
                        Submit
                      </Button>

                      <Button
                        style="text-white bg-blue-500"
                        handleOnClick={() => setIsVerifyToken(false)}
                      >
                        Back
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isForgotPassWord && (
        <div className="absolute bg-white z-50 top-0 left-0 right-0 bottom-0 flex flex-col items-center pt-12 ">
          <div className="flex flex-col gap-4">
            <label htmlFor="email">Enter your email:</label>
            <input
              type="text"
              id="email"
              className=" w-[800px] pb-2 border-b border-solid outline-none placeholder:text-sm"
              placeholder="Exp:email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button
                style="bg-blue-500 text-white w-[100px]"
                handleOnClick={() => handleForgot()}
              >
                Submit
              </Button>
              <Button
                style="text-white bg-[#FFB700] w-[100px]"
                handleOnClick={() => setIsForgotPassWord(false)}
              >
                Back
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col justify-center items-center mx-[150px] ">
        <img src={loginImage} alt="login" />
        <p className="font-medium text-[18px] text-[#1A162E] leading-6 mt-8 text-center">
          The best of luxury brand values, high quality products, and innovative
          services
        </p>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center px-[130px]">
        <div className="flex gap-2 items-center mb-[50px]">
          <img
            className="w-[32px] h-[32px] object-contain"
            src={logoImage}
            alt="logo"
          />
          <p className="text-[18px] font-bold">grocerymart</p>
        </div>
        <div className="text-center mb-[60px]">
          <h1 className="text-[30px] font-medium mb-[10px] leading-6">
            {isRegister ? "Sign Up " : "Hello Again!"}
          </h1>
          <p className="text-[#9E9DA8] font-medium text-[14px] leading-6">
            {isRegister
              ? "Let’s create your account and Shop like a pro and save money."
              : "Welcome back to sign in. As a returning customer, you have access to your previously saved all information."}
          </p>
        </div>
        <form className="flex flex-col  ">
          {isRegister && (
            <div className="flex gap-5 w-[480px] mb-[30px]">
              <InputField
                value={payload.firstname}
                setValue={setPayload}
                nameKey="firstname"
                icon={<FiUser />}
                invalidFied={invalidFields}
                setInvalidField={setInvalidFields}
              />
              <InputField
                value={payload.lastname}
                setValue={setPayload}
                nameKey="lastname"
                icon={<FiUser />}
                invalidFied={invalidFields}
                setInvalidField={setInvalidFields}
              />
            </div>
          )}
          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey="email"
            icon={<HiOutlineMail />}
            w={480}
            style={"mb-[30px]"}
            invalidFied={invalidFields}
            setInvalidField={setInvalidFields}
          />
          {isRegister && (
            <InputField
              value={payload.mobile}
              setValue={setPayload}
              nameKey="mobile"
              icon={<RiPhoneFill />}
              w={480}
              style={"mb-[30px]"}
              invalidFied={invalidFields}
              setInvalidField={setInvalidFields}
            />
          )}
          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey="password"
            icon={<BiLock />}
            w={480}
            type="password"
            style={"mb-[20px]"}
            invalidFied={invalidFields}
            setInvalidField={setInvalidFields}
          />

          <div className="flex justify-between text-[#0071DC] text-[14px] font-medium mb-[50px]">
            {!isRegister && (
              <span
                className="cursor-pointer"
                onClick={() => setIsForgotPassWord(true)}
              >
                Forgot your account ?
              </span>
            )}
            {isRegister ? (
              <span
                className="cursor-pointer"
                onClick={() => setIsRegister(false)}
              >
                Back Home
              </span>
            ) : (
              <span
                className="cursor-pointer"
                onClick={() => setIsRegister(true)}
              >
                Create Account
              </span>
            )}
          </div>
          <Button handleOnClick={handleSubmit}>
            {isRegister ? "Sign Up" : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
