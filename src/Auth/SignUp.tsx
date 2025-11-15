import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { loginSchema } from "../lib/loginvalidation";
import type z from "zod";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  type SignupFormData = z.infer<typeof loginSchema>;

  const onSubmit = (data: SignupFormData) => {
    console.log("Validated Signup Data:", data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-white dark:bg-darkbg p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md">
        <Link to={'/'}>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-greenyy dark:text-greenyy text-2xl font-bold hover:text-greenyy-dark transition-colors"
            aria-label="Close modal"
          >
            ×
          </button>
        </Link>

        <h2 className="text-2xl font-bold mb-6 text-center text-greenyy">
          Signup
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div className="relative">
            <AiOutlineUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-greenyy" />
            <input
              type="text"
              placeholder="Username"
              {...register("username")}
              className="w-full pl-10 px-4 py-2 border border-greenyy rounded-lg focus:outline-none focus:ring-2 focus:ring-greenyy bg-white dark:bg-darkbg text-darkbg dark:text-greenyy"
            />
            {errors.username && (
              <p className="text-greenyy text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <AiOutlineMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-greenyy" />
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full pl-10 px-4 py-2 border border-greenyy rounded-lg focus:outline-none focus:ring-2 focus:ring-greenyy bg-white dark:bg-darkbg text-darkbg dark:text-greenyy"
            />
            {errors.email && (
              <p className="text-greenyy text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <AiOutlineLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-greenyy" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className="w-full pl-10 pr-10 px-4 py-2 border border-greenyy rounded-lg focus:outline-none focus:ring-2 focus:ring-greenyy bg-white dark:bg-darkbg text-darkbg dark:text-greenyy"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-greenyy"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
            {errors.password && (
              <p className="text-greenyy text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="relative">
            <AiOutlineLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-greenyy" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter Password"
              {...register("confirmPassword")}
              className="w-full pl-10 pr-10 px-4 py-2 border border-greenyy rounded-lg focus:outline-none focus:ring-2 focus:ring-greenyy bg-white dark:bg-darkbg text-darkbg dark:text-greenyy"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-greenyy"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </button>
            {errors.confirmPassword && (
              <p className="text-greenyy text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

    
          <div className="mt-4">
            <button
              type="submit"
              className="w-full py-2 rounded-lg font-semibold text-white bg-greenyy hover:bg-greenyy-dark transition-colors"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
