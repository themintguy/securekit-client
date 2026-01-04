import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../hooks/useAuth";
import AuthLayout from "../../components/AuthLayout";
import AuthFormCard from "../../components/AuthFormCard";
import FormInput from "../../components/FormInput";
import SubmitButton from "../../components/SubmitButton";
import { login as loginApi } from "../../api/authService";
import toast from 'react-hot-toast';
import { isAxiosError } from "axios";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();


  const from = location.state?.from?.pathname || "/";
  const successMessage = location.state?.message;

  const [formData, setFormData] = useState({
    email: "",
    password: "",

  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await loginApi({
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        toast.success('Successfully logged in!');
        login();
        navigate(from, { replace: true });
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err: unknown) {
        if (isAxiosError(err)) {
          setError(
            err.response?.data?.message || "An error occurred during login"
          );
        } else if (err instanceof Error) {
          setError(err.message || "An unknown error occurred");
        } else {
          setError("An unexpected error occurred");
        }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    window.location.href = `${apiUrl}/v1/auth/google`;
  };

  return (
    <AuthLayout title="Secure Kit" subtitle="Welcome back to your secure account">
      <AuthFormCard onSubmit={handleSubmit}>
        <FormInput
          icon={<HiOutlineMail className="text-emerald-400" />}
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
        />

        <div>
          <FormInput
            icon={<HiOutlineLockClosed className="text-emerald-400" />}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            endAdornment={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <HiOutlineEyeOff className="text-text-muted" />
                ) : (
                  <HiOutlineEye className="text-text-muted" />
                )}
              </button>
            }
          />
          <div className="flex justify-end mt-1">
            <a href="#" className="text-sm text-text-muted hover:text-emerald-400 transition-colors">
              Forgot Password?
            </a>
          </div>
        </div>
        {successMessage && (
          <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 px-4 py-3 rounded-lg text-sm">
            {successMessage}
          </div>
        )}


        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

    
        <SubmitButton disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login to Account"}
        </SubmitButton>


        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-xs text-text-muted uppercase tracking-wider">Or</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FcGoogle size={22} />
            <span>Login with Google</span>
          </button>
        </div>

      
        <p className="text-center text-text-muted text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-emerald-400 hover:text-emerald-300 transition-colors pointer-events-auto">
            Sign up
          </Link>
        </p>
      </AuthFormCard>
    </AuthLayout>
  );
};

export default Login;