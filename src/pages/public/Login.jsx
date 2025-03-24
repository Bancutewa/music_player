import React, { useState, useCallback, useEffect } from "react";
import { InputField, Button } from "../../components/ui";
import { apiLogin, apiRegister } from "../../apis/user";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import path from "../../utils/path";
import { login } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import { validate } from "../../utils/helpers";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    mobile: "",
  });
  const [isRegister, setIsRegister] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  const resetPayload = () =>
    setPayload({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      mobile: "",
    });

  // SUBMIT
  const handleSubmit = useCallback(async () => {
    const { firstName, lastName, mobile, ...data } = payload;
    const inValids = isRegister
      ? validate(payload, setInvalidFields)
      : validate(data, setInvalidFields);
    if (inValids === 0) {
      if (isRegister) {
        const response = await apiRegister(payload);
        response.success
          ? Swal.fire(
              "Congratulations! Please login",
              response.message,
              "success"
            ).then(() => {
              setIsRegister(false);
              resetPayload();
            })
          : Swal.fire(
              "Oops! Something went wrong",
              response.message,
              "error"
            );
      } else {
        const response = await apiLogin(data);
        if (response.success) {
          Swal.fire(
            `Welcome ${response.userData.lastName}!`,
            response.message,
            "success"
          )
            .then(() => {
              dispatch(
                login({
                  isLoggedIn: true,
                  token: response.accessToken,
                  userData: response.userData,
                })
              );
            })
            .then(() => navigate(`/${path.HOME}`));
        } else {
          Swal.fire(
            "Oops! Something went wrong",
            response.message,
            "error"
          );
        }
      }
    }
  }, [payload, isRegister]);
  useEffect(() => {
    resetPayload();
  }, [isRegister]);
  return (
    <div className="w-screen h-screen relative">
      <img
        src="https://static.vecteezy.com/system/resources/previews/011/220/317/non_2x/e-commerce-banner-design-on-light-blue-background-the-icons-are-collected-in-a-honeycomb-like-module-illustration-vector.jpg"
        className="w-full h-full object-cover"
        alt="background"
      />
      <div className="absolute top-0 bottom-0 left-[70px]  flex items-center justify-center">
        <div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[500px] shadow-lg">
          <h1 className="text-[28px] font-semibold text-main mb-8">
            {isRegister ? "Register" : "Login"}
          </h1>
          {isRegister && (
            <div className="flex items-center gap-2">
              <InputField
                value={payload.firstName}
                setValue={setPayload}
                nameKey="firstName"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              <InputField
                value={payload.lastName}
                setValue={setPayload}
                nameKey="lastName"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
            </div>
          )}
          {isRegister && (
            <InputField
              value={payload.mobile}
              setValue={setPayload}
              nameKey="mobile"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
          )}
          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey="email"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey="password"
            type="password"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <Button
            name={isRegister ? "Register" : "Login"}
            handleOnClick={handleSubmit}
            fw
          />
          <div className="flex items-center justify-between my-2 w-full text-sm">
            {!isRegister && (
              <span
                onClick={() => setIsForgotPassword(true)}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Forgot your account?
              </span>
            )}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Go login" : "Create account"}
            </span>
          </div>
          <Link
            className="text-blue-500 text-sm hover:underline cursor-pointer"
            to={`/${path.HOME}`}
          >
            Go home?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
