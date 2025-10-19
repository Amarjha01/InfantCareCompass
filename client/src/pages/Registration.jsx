import React, { useState, useEffect } from "react";
import {
  User,
  UserCheck,
  Mail,
  Lock,
  Phone,
  MapPin,
  Calendar,
  Heart,
  Eye,
  EyeOff,
  Check,
  X,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Password Strength Indicator Component
const PasswordStrengthIndicator = ({ password }) => {
  const requirements = [
    { test: (pwd) => pwd.length >= 8, label: "At least 8 characters" },
    { test: (pwd) => /[A-Z]/.test(pwd), label: "One uppercase letter (A–Z)" },
    { test: (pwd) => /[a-z]/.test(pwd), label: "One lowercase letter (a–z)" },
    { test: (pwd) => /[0-9]/.test(pwd), label: "One number (0–9)" },
    {
      test: (pwd) => /[!@#$%^&*]/.test(pwd),
      label: "One special character (!@#$%^&*)",
    },
  ];

  const metRequirements = requirements.filter((req) => req.test(password));
  const strength = metRequirements.length;

  const getStrengthColor = () => {
    if (strength <= 1) return "text-red-500";
    if (strength <= 2) return "text-orange-500";
    if (strength <= 3) return "text-yellow-500";
    if (strength <= 4) return "text-sky-500";
    return "text-green-500";
  };

  const getStrengthText = () => {
    if (strength <= 1) return "Very Weak";
    if (strength <= 2) return "Weak";
    if (strength <= 3) return "Fair";
    if (strength <= 4) return "Good";
    return "Strong";
  };

  if (!password) return null;

  return (
    <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Password Strength:
        </span>
        <span className={`text-sm font-semibold ${getStrengthColor()}`}>
          {getStrengthText()}
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor().replace(
            "text-",
            "bg-"
          )}`}
          style={{ width: `${(strength / 5) * 100}%` }}
        ></div>
      </div>
      <div className="space-y-2">
        {requirements.map((req, index) => {
          const isMet = req.test(password);
          return (
            <div key={index} className="flex items-center text-sm">
              {isMet ? (
                <Check className="w-4 h-4 text-green-500 mr-2" />
              ) : (
                <X className="w-4 h-4 text-red-400 mr-2" />
              )}
              <span className={isMet ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                {req.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const InputField = ({
  icon: Icon,
  name,
  type = "text",
  placeholder,
  value,
  error,
  onChange,
  endIcon: EndIcon,
  onEndIconClick,
  ...props
}) => (
  <div className="relative">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
    <input
      name={name}
      type={type}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full pl-12 py-3 border rounded-xl shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white dark:focus:bg-gray-900 ${
        EndIcon ? "pr-12" : "pr-4"
      }`}
      {...props}
    />
    {EndIcon && (
      <EndIcon
        className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
        onClick={onEndIconClick}
      />
    )}
    {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
  </div>
);


export default function Registration() {
  useEffect(() => {
    const styleId = 'react-toastify-css';
    if (!document.getElementById(styleId)) {
        const link = document.createElement('link');
        link.id = styleId;
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/react-toastify@9.1.3/dist/ReactToastify.min.css';
        document.head.appendChild(link);
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "PARENTS",
    kidName: "",
    dob: "",
    fatherName: "",
    motherName: "",
    contactNumber: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    if (formData.role === "PARENTS") {
      if (!formData.kidName.trim()) newErrors.kidName = "Child's name is required";
      if (!formData.dob) newErrors.dob = "Date of birth is required";
      if (!formData.fatherName.trim()) newErrors.fatherName = "Father's name is required";
      if (!formData.motherName.trim()) newErrors.motherName = "Mother's name is required";
      if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { confirmPassword, ...dataToSend } = formData;
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        dataToSend
      );

      if (response.data.success) {
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="main-body flex min-h-screen">
      {/* Left Section - Image */}
      <div className="hidden lg:flex w-2/5 h-screen fixed items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <img src="https://placehold.co/500x500/e9d5ff/8b5cf6?text=Welcome!\nInfantCare&font=lora" alt="Cute baby illustration" className="max-w-xs md:max-w-sm lg:max-w-md rounded-full" />
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-3/5 lg:ml-[40%] bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Join our community and start your child's health journey.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800/50 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() =>
                    handleChange({ target: { name: "role", value: "PARENTS" } })
                  }
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center ${
                    formData.role === "PARENTS"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/50 dark:border-blue-400"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <Heart className={`w-6 h-6 mb-2 ${formData.role === 'PARENTS' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`} />
                  <span className={`font-semibold ${formData.role === 'PARENTS' ? 'text-blue-800 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>Parent</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleChange({ target: { name: "role", value: "DOCTOR" } })
                  }
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center ${
                    formData.role === "DOCTOR"
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-900/50 dark:border-purple-400"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <UserCheck className={`w-6 h-6 mb-2 ${formData.role === 'DOCTOR' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'}`} />
                  <span className={`font-semibold ${formData.role === 'DOCTOR' ? 'text-purple-800 dark:text-purple-300' : 'text-gray-700 dark:text-gray-300'}`}>Doctor</span>
                </button>
              </div>
              {/* Common Fields */}
              <InputField
                icon={Mail}
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <InputField
                icon={Lock}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                endIcon={showPassword ? EyeOff : Eye}
                onEndIconClick={() => setShowPassword(!showPassword)}
              />
                <InputField
                icon={Lock}
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                endIcon={showConfirmPassword ? EyeOff : Eye}
                onEndIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />

              {formData.password && !errors.password && !errors.confirmPassword && (
                <PasswordStrengthIndicator password={formData.password} />
              )}
              {/* Role-specific fields */}
              {formData.role === "PARENTS" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      icon={Heart}
                      name="kidName"
                      placeholder="Child's Name"
                      value={formData.kidName}
                      onChange={handleChange}
                      error={errors.kidName}
                    />
                    <InputField
                      icon={Calendar}
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleChange}
                      error={errors.dob}
                      className="dark:[color-scheme:dark]" // Hint for dark mode date picker
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      icon={User}
                      name="fatherName"
                      placeholder="Father's Name"
                      value={formData.fatherName}
                      onChange={handleChange}
                      error={errors.fatherName}
                    />
                    <InputField
                      icon={User}
                      name="motherName"
                      placeholder="Mother's Name"
                      value={formData.motherName}
                      onChange={handleChange}
                      error={errors.motherName}
                    />
                  </div>
                  <InputField
                    icon={Phone}
                    name="contactNumber"
                    placeholder="Contact Number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    error={errors.contactNumber}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField
                      icon={MapPin}
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      error={errors.city}
                    />
                    <InputField
                      icon={MapPin}
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      error={errors.state}
                    />
                    <InputField
                      icon={MapPin}
                      name="postalCode"
                      placeholder="Postal Code"
                      value={formData.postalCode}
                      onChange={handleChange}
                      error={errors.postalCode}
                    />
                  </div>
                </>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-xl font-semibold text-white transition-all text-base ${
                  isSubmitting
                    ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                }`}
              >
                {isSubmitting ? "Registering..." : "Create Account"}
              </button>
            </form>
            <div className="text-center mt-8">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/signin")}
                  className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>
          <ToastContainer position="top-center" autoClose={3000} theme="colored"/>
        </div>
      </div>
    </div>
  );
}

