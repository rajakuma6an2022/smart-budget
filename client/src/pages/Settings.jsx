import React from "react";
import InputBox from "../components/common/InputBox";
import Dropdown from "../components/common/Dropdown";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import FormErrorMessage from "../components/common/FormErrorMessage";
import { useUpdateUserMutation } from "../redux/api-services/userApi";
import { useNavigate } from "react-router-dom";
import { Toast } from "../components/common/Toast";
import { login } from "../redux/authSlice";

const currencyOptions = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "INR", label: "INR - Indian Rupee" },
  { value: "GBP", label: "GBP - British Pound" },
];

const Settings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
    watch,
  } = useForm();
  const user = useSelector((st) => st.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      reset({
        name: user?.name,
        email: user?.email,
        mobile: user?.mobileNumber,
        currency: user?.currency,
      });
    }
  }, [user]);

  const onSubmit = async (input) => {
    try {
      let body = {
        name: input?.name,
        email: input?.email,
        mobileNumber: input?.mobile,
        currency: input?.currency,
      };
      const response = await updateUser({ id: user?.id, ...body });
      if (response?.data?.statusCode === 200) {
        Toast.success(response?.data?.message);
        dispatch(
          login({
            user: response.data?.data?.user,
            token: response.data?.data?.user?.token || user?.token, // fallback to old token
          })
        );
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  return (
    <div className="p-3 space-y-4">
      <h2 className="text-lg lg:text-2xl font-heading mb-4 text-text">Settings</h2>
      <motion.div
        key="signup"
        // variants={formVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4 }}
      >
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
          <div className="flex justify-end">
            <button
              type="submit"
              className="lg:w-[25%] w-[100%] md:w-[50%] bg-primary text-white text-sm lg:text-base py-2 rounded-lg mt-2 hover:opacity-90"
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Settings;
