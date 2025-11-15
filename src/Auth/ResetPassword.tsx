import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";

type ResetFormData = {
  email: string;
};

const ResetPassword = () => {
  const [isOpen, setIsOpen] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>();

  const onSubmit = (data: ResetFormData) => {
    console.log("Reset Password Email:", data);
    // Here you can call your API to send a reset link
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-white dark:bg-darkbg p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md">
        <Link to={'/'}>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-greenyy dark:text-greenyy text-xl font-bold hover:text-greenyy-dark"
            aria-label="Close"
          >
            ×
          </button>
        </Link>

        <h2 className="text-2xl font-bold mb-6 text-center text-greenyy">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <AiOutlineMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-greenyy" />
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="w-full pl-10 px-4 py-2 border border-greenyy rounded-lg focus:outline-none focus:ring-2 focus:ring-greenyy bg-white dark:bg-darkbg text-darkbg dark:text-greenyy"
            />
            {errors.email?.message && (
              <p className="text-greenyy text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full py-2 rounded-lg font-semibold text-white bg-greenyy hover:bg-greenyy-dark transition-colors"
            >
              Send Reset Link
            </button>
          </div>
        </form>

        <Link to="/login">
          <p className="text-center text-sm mt-4 text-greenyy hover:underline cursor-pointer">
            Back to Login
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
