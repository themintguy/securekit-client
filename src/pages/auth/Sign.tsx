import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { signUpSchema } from "../../schema/signupSchema";
import AuthLayout from "../../components/AuthLayout";
import AuthFormCard from "../../components/AuthFormCard";
import FormInput from "../../components/FormInput";
import SubmitButton from "../../components/SubmitButton";
import { signup as signupApi } from "../../api/authService";
import toast from 'react-hot-toast';

const Sign = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function getPasswordStrength(password: string) {
    if (!password) return null;
    if (password.length < 8) return "weak";
    if (password.length < 12) return "medium";
    return "strong";
  }

  const passwordStrength = getPasswordStrength(formData.password);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

   
    const result = signUpSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      const flattened = result.error.flatten();

      Object.entries(flattened.fieldErrors).forEach(([key, value]) => {
        if (value && value.length > 0) {
          fieldErrors[key] = value[0];
        }
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const response = await signupApi({
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200 || response.status === 201) {
        
        toast.success('Please check your email to verify your account!');
        navigate("/login", {
          state: { message: "Account created successfully! Please check your email to verify." },
          replace: true
        });
      } else {
        setError(response.message || "Signup failed");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Secure Kit" subtitle="Create your secure account">
      <AuthFormCard onSubmit={handleSubmit}>
    
        <FormInput
          icon={<HiOutlineMail className="text-emerald-400" />}
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <div>
          <FormInput
            icon={<HiOutlineLockClosed className="text-emerald-400" />}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
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

          {passwordStrength && (
            <p
              className={`text-sm mt-1 ${passwordStrength === "weak"
                ? "text-error"
                : passwordStrength === "medium"
                  ? "text-warning"
                  : "text-success"
                }`}
            >
              Password strength: {passwordStrength}
            </p>
          )}
        </div>

  
        <FormInput
          icon={<HiOutlineLockClosed className="text-emerald-400" />}
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          endAdornment={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <HiOutlineEyeOff className="text-text-muted" />
              ) : (
                <HiOutlineEye className="text-text-muted" />
              )}
            </button>
          }
        />

    
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}


        <SubmitButton disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Secure Account"}
        </SubmitButton>

  
        <p className="text-center text-text-muted text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-400 hover:text-emerald-300 transition-colors pointer-events-auto">
            Login
          </Link>
        </p>
      </AuthFormCard>
    </AuthLayout>
  );
};

export default Sign;
