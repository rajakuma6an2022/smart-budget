// src/pages/AuthPage.jsx
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import { useForm } from "react-hook-form";
import InputBox from "../components/common/InputBox";
import Dropdown from "../components/common/Dropdown";
import { motion, AnimatePresence } from "framer-motion";
import banner from "../assets/authBanner.png";
import {
  useSendOtpMutation,
  useSignUpMutation,
  useVerifyOtpMutation,
} from "../redux/api-services/authApi";
import { Toast } from "../components/common/Toast";
import FormErrorMessage from "../components/common/FormErrorMessage";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const currencyOptions = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "INR", label: "INR - Indian Rupee" },
  { value: "GBP", label: "GBP - British Pound" },
];

const AuthPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
    watch,
  } = useForm({ mode: "all" });
  const [isLogin, setIsLogin] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const mobileRef = useRef(null);
  const otpRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // api call
  const [signUp] = useSignUpMutation();
  const [sendOtp] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

  const onSubmit = async (input) => {
    try {
      let body = {
        name: input?.name,
        email: input?.email,
        mobileNumber: input?.mobile,
        currency: input?.currency,
      };
      const response = await signUp(body);
      if (response?.data?.statusCode === 200) {
        Toast.success(response?.data?.message);
        dispatch(
          login({
            user: response.data?.data?.user,
            token: response.data?.data?.user?.token,
          })
        );
        navigate("/dashboard");
      } else {
        Toast.error(response?.data?.message);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleSendOtp = async () => {
    const mobile = watch("mobile");
    if (!mobile || mobile.length < 10) {
      Toast.error("Mobile Number Invalid");
      return;
    }
    try {
      let body = { mobileNumber: mobile, mode: isLogin ? "login" : "signup" };
      const response = await sendOtp(body);
      console.log("response", response);
      if (response?.data?.statusCode === 200) {
        setOtpSent(true);
        otpRef.current?.focus();
        Toast.success(response?.data?.message);
      } else {
        Toast.error(response?.error?.data?.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleVerifyOtp = async () => {
    const otp = watch("otp");
    const mobile = watch("mobile");
    if (!otp || otp.length < 4) {
      Toast.error("Enter a valid OTP");
      return;
    }
    try {
      let body = { mobileNumber: mobile, otp: otp };
      const response = await verifyOtp(body);
      if (response?.data?.statusCode === 200) {
        setOtpSent(true);
        mobileRef.current.markVerified();
        otpRef.current.markVerified();
        Toast.success(response?.data?.message);
        dispatch(
          login({
            user: response.data?.data?.user,
            token: response.data?.data?.user?.token,
          })
        );
        navigate("/dashboard");
      }
    } catch {
      Toast.error(response?.data?.message);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google OAuth triggered");
  };

  // animation variants for form transition
  const formVariants = {
    initial: { opacity: 0, x: 10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-bg">
      <motion.div
        className="flex flex-col md:flex-row w-full lg:rounded-2xl overflow-hidden shadow-2xl border border-border bg-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Banner */}
        <div className="md:w-3/5 w-full hidden md:flex flex-col justify-center items-center bg-primary text-white p-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-heading mb-4">SmartBudget</h1>
            <p className="text-lg max-w-md text-center leading-relaxed">
              Take control of your finances with{" "}
              <span className="font-bold">SmartBudget</span>. Track expenses,
              manage budgets, and achieve your financial goals with ease.
            </p>
            <motion.img
              src={banner}
              alt="Smart Budget Banner"
              className="mt-6 w-72"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Right Form */}
        <div className="md:w-3/5 w-full  h-screen md:h-auto flex justify-center items-start md:items-center p-2 md:p-8">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="block md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="120"
                height="40"
                viewBox="0 0 120 40"
                fill="none"
              >
                <rect width="120" height="40" rx="8" fill="#2563EB" />

                <circle cx="20" cy="20" r="12" fill="#10B981" />
                <text
                  x="16"
                  y="25"
                  fontSize="16"
                  fontWeight="bold"
                  fill="white"
                  fontFamily="Poppins, sans-serif"
                >
                  $
                </text>

                <text
                  x="40"
                  y="27"
                  fontSize="18"
                  fontWeight="bold"
                  fill="white"
                  fontFamily="Poppins, sans-serif"
                >
                  Budget
                </text>
              </svg>
            </div>
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  variants={formVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-lg lg:text-2xl font-heading mt-4 md:mt-0 mb-4 md:text-center text-text">
                    Login
                  </h2>
                  <form>
                    <div>
                      <InputBox
                        ref={mobileRef}
                        label="Mobile Number"
                        placeholder="Enter your mobile"
                        name="mobile"
                        type="tel"
                        register={register("mobile", {
                          required: true,
                          pattern: /^[6-9]\d{9}$/,
                        })}
                        onChange={(e) => setValue("mobile", e.target.value)}
                        error={errors}
                      />
                      <FormErrorMessage
                        error={errors.mobile}
                        messages={{
                          required: "Mobile number is required",
                          pattern: "Enter a valid 10-digit number",
                        }}
                      />
                      {/* {!otpSent && (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          className="w-full bg-primary text-white py-2 rounded-lg mt-5 hover:opacity-90"
                        >
                          Send OTP
                        </button>
                      )} */}
                    </div>
                    {otpSent && (
                      <>
                        <div className="my-2">
                          <InputBox
                            ref={otpRef}
                            label="OTP"
                            placeholder="Enter OTP"
                            name="otp"
                            type="number"
                            className={`${!otpSent ? "cursor-not-allowed bg-gray-100" : ""}`}
                            disabled={!otpSent}
                            register={register("otp", {
                              required: !otpSent ? false : true,
                              pattern: /^\d{4}$/,
                            })}
                            error={errors}
                          />
                          <FormErrorMessage
                            error={errors.otp}
                            messages={{
                              required: "OTP is required",
                              pattern: "Enter a valid OTP",
                            }}
                          />
                        </div>
                      </>
                    )}
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        if (watch("mobile")) {
                          if (!otpSent) {
                            handleSendOtp();
                          } else {
                            handleSubmit(handleVerifyOtp());
                          }
                        } else {
                          Toast.error("Please Enter your Mobile Number");
                        }
                      }}
                      className="w-full bg-primary text-white py-2 rounded-lg mt-2 hover:opacity-90"
                    >
                      {otpSent ? "Login" : "Send OTP"}
                    </button>
                  </form>

                  {/* <div className="mt-4 flex items-center justify-center">
                    <GoogleLogin
                      onSuccess={async (credentialResponse) => {
                        try {
                          const token = credentialResponse.credential;

                          // send to backend
                          const res = await axios.post(
                            "http://localhost:5000/api/auth/google",
                            {
                              token,
                            }
                          );

                          if (res.data.jwt) {
                            // save token in redux + localStorage
                            dispatch(
                              login({
                                user: res.data.user,
                                token: res.data.jwt,
                              })
                            );
                            localStorage.setItem(
                              "smartbudget_token",
                              res.data.jwt
                            );

                            Toast.success("Google login successful");
                            navigate("/dashboard");
                          }
                        } catch (err) {
                          Toast.error("Google login failed");
                          console.error(err);
                        }
                      }}
                      onError={() => {
                        Toast.error("Google Login Failed");
                      }}
                    />
                  </div> */}

                  <p className="mt-4 text-center text-sm text-text">
                    Don’t have an account?{" "}
                    <button
                      className="text-primary font-medium hover:underline"
                      onClick={() => {
                        reset();
                        setIsLogin(false);
                      }}
                    >
                      Signup
                    </button>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  variants={formVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-lg lg:text-2xl font-heading mt-4 md:mt-0 mb-4 md:text-center text-text">
                    Signup
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <InputBox
                        label="Name"
                        placeholder="Enter your name"
                        name="name"
                        register={register("name", {
                          required: "Name is required",
                          pattern: /^(?=.*[a-zA-Z])(?!\s*$).+/,
                        })}
                        error={errors}
                      />
                      <FormErrorMessage
                        error={errors.name}
                        messages={{
                          required: "Name is required",
                          pattern: "Name is Invalid",
                        }}
                      />
                    </div>
                    <div className="my-2">
                      <InputBox
                        label="Email"
                        placeholder="Enter your email"
                        name="email"
                        type="email"
                        register={register("email", {
                          required: "Email is required",
                          pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                        })}
                        error={errors.email}
                      />
                      <FormErrorMessage
                        error={errors.email}
                        messages={{
                          required: "Email is required",
                          pattern: "Email is Invalid",
                        }}
                      />
                    </div>
                    <div className="my-2">
                      <InputBox
                        ref={mobileRef}
                        label="Mobile Number"
                        placeholder="Enter your mobile"
                        name="mobile"
                        type="tel"
                        register={register("mobile", {
                          required: true,
                          pattern: /^[6-9]\d{9}$/,
                        })}
                        onChange={(e) => setValue("mobile", e.target.value)}
                        actionLabel="Send OTP"
                        onAction={handleSendOtp}
                        error={errors}
                      />
                      <FormErrorMessage
                        error={errors.mobile}
                        messages={{
                          required: "Mobile number is required",
                          pattern: "Enter a valid 10-digit number",
                        }}
                      />
                    </div>
                    <div>
                      <Dropdown
                        label="Currency"
                        name="currency"
                        register={register("currency", {
                          required: true,
                        })}
                        options={currencyOptions}
                        error={errors}
                      />
                      <FormErrorMessage
                        error={errors.currency}
                        messages={{
                          required: "Currency is required",
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-white py-2 rounded-lg mt-2 hover:opacity-90"
                    >
                      Signup
                    </button>
                  </form>

                  <p className="mt-4 text-center text-sm text-text">
                    Already have an account?{" "}
                    <button
                      className="text-primary font-medium hover:underline"
                      onClick={() => {
                        reset();
                        setIsLogin(true);
                        setOtpSent(false);
                      }}
                    >
                      Login
                    </button>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
