import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { Link } from "react-router-dom";

type LoginFormData = {
  usernameOrEmail: string;
  password: string;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log("Login Data:", data);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="relative bg-white dark:bg-darkbg p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md">
          <Link to={"/"}>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-greenyy dark:text-greenyy hover:text-greenyy-dark text-xl font-bold"
              aria-label="Close"
            >
              ×
            </button>
          </Link>

          <h2 className="text-2xl font-bold mb-6 text-center text-greenyy">
            Login
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username / Email */}
            <div className="relative">
              <AiOutlineUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-greenyy" />
              <input
                type="text"
                placeholder="Username or Email"
                {...register("usernameOrEmail", {
                  required: "Username or Email is required",
                })}
                className="w-full pl-10 px-4 py-2 border border-greenyy rounded-lg focus:outline-none focus:ring-2 focus:ring-greenyy bg-white dark:bg-darkbg text-darkbg dark:text-greenyy"
              />
              {errors.usernameOrEmail?.message && (
                <p className="text-greenyy text-sm mt-1">
                  {errors.usernameOrEmail.message as string}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <AiOutlineLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-greenyy" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-full pl-10 pr-10 px-4 py-2 border border-greenyy rounded-lg focus:outline-none focus:ring-2 focus:ring-greenyy bg-white dark:bg-darkbg text-darkbg dark:text-greenyy"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-greenyy"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
              {errors.password?.message && (
                <p className="text-greenyy text-sm mt-1">
                  {errors.password.message as string}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link to="/forgot-password">
                <p className="text-sm text-greenyy hover:underline cursor-pointer">
                  Forgot Password?
                </p>
              </Link>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="w-full py-2 rounded-lg font-semibold text-white bg-greenyy hover:bg-greenyy-dark transition-colors"
              >
                Login
              </button>
            </div>
          </form>

          <Link to={"/signup"}>
            <p className="text-center text-sm mt-4 text-greenyy">
              Don’t have an account?{" "}
              <span className="underline cursor-pointer">Create one</span>
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
