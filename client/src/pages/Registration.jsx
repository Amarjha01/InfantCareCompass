import React, { useState, useEffect } from "react";
import BabyImg from "./Baby.png"; 
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  UserCheck,
  Phone,
  MapPin,
  Calendar,
  Baby,
  ArrowRight,
  AlertCircle,
  Check,
  X,
  Home,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import commnApiEndpoint from "../common/backendAPI.jsx";

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
    if (strength <= 4) return "text-blue-500";
    return "text-green-500";
  };

  const getStrengthText = () => {
    if (strength <= 1) return "Very Weak";
    if (strength <= 2) return "Weak";
    if (strength <= 3) return "Fair";
    if (strength <= 4) return "Good";
    return "Strong";
  };

  const getStrengthBarColor = () => {
    if (strength <= 1) return "bg-red-500";
    if (strength <= 2) return "bg-orange-500";
    if (strength <= 3) return "bg-yellow-500";
    if (strength <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  if (!password) return null;

  return (
    <div className="mt-3 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-indigo-800">
          Password Strength:
        </span>
        <span className={`text-sm font-semibold ${getStrengthColor()}`}>
          {getStrengthText()}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${getStrengthBarColor()}`}
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
              <span className={isMet ? "text-green-700" : "text-indigo-800"}>
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
  type,
  placeholder,
  value,
  error,
  isFocused,
  showPassword,
  onToggleShowPassword,
  onChange,
  onFocus,
  onBlur,
  showPasswordStrength = false,
}) => {
  return (
    <div className="relative">
      <Icon
        className={`absolute left-4 top-4 w-5 h-5 transition-colors duration-300 ${
          isFocused
            ? "text-indigo-600"
            : error
            ? "text-red-500"
            : "text-gray-400"
        }`}
      />

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl transition-all duration-300 bg-white ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
            : isFocused
            ? "border-indigo-500 focus:border-indigo-600 focus:ring-indigo-500/20 shadow-lg"
            : "border-gray-200 hover:border-gray-300"
        } focus:outline-none focus:ring-4`}
      />

      {(name === "password" || name === "confirmPassword") && (
        <button
          type="button"
          onClick={onToggleShowPassword}
          className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center animate-slideIn">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}

      {showPasswordStrength && name === "password" && (
        <PasswordStrengthIndicator password={value} />
      )}
    </div>
  );
};

const RoleCard = ({
  value,
  icon: Icon,
  title,
  description,
  isSelected,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
      isSelected
        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
        : "bg-white border-2 border-gray-200 hover:border-indigo-300 hover:shadow-md"
    }`}
  >
    <div className="flex items-center mb-3">
      <div
        className={`p-3 rounded-full ${
          isSelected
            ? "bg-white/20"
            : "bg-gradient-to-r from-indigo-500 to-purple-500"
        }`}
      >
        <Icon className={"w-6 h-6 text-white"} />
      </div>
      <h3
        className={`ml-3 font-semibold ${
          isSelected ? "text-white" : "text-gray-800"
        }`}
      >
        {title}
      </h3>
    </div>
    <p className={`text-sm ${isSelected ? "text-white/90" : "text-gray-600"}`}>
      {description}
    </p>

    {isSelected && (
      <div className="absolute top-3 right-3">
        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
        </div>
      </div>
    )}
  </div>
);

export default function Registration() {
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
  const [focusedField, setFocusedField] = useState(null);
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
      if (!formData.kidName.trim())
        newErrors.kidName = "Child's name is required";
      if (!formData.dob) newErrors.dob = "Date of birth is required";
      if (!formData.fatherName.trim())
        newErrors.fatherName = "Father's name is required";
      if (!formData.motherName.trim())
        newErrors.motherName = "Mother's name is required";
      if (!formData.contactNumber.trim())
        newErrors.contactNumber = "Contact number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const { confirmPassword, ...dataToSend } = formData;

      const response = await fetch(commnApiEndpoint.signup.url, {
        method: commnApiEndpoint.signup.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();
      console.log("Registration response:", data);

      if (response.ok && data.success) {
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else {
        console.error("Registration failed:", data);
        toast.error(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="main-body flex">
        {/* Left Section */}
        <div className="w-2/5 h-screen fixed flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
          <img
            src={BabyImg}
            alt="Baby"
            className="max-w-xs md:max-w-sm lg:max-w-md"
          />
        </div>

        {/* Right Section */}
        <div className="w-3/5 ml-[40%] bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4">
          <div className="w-1/2 max-w-2xl text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-600">
              Join our healthcare community and track your child's health
              journey
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 animate-slideUp w-full max-w-2xl">
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Your Role
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <RoleCard
                    value="PARENTS"
                    icon={Baby}
                    title="Parent"
                    description="Track your child's health and development"
                    isSelected={formData.role === "PARENTS"}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, role: "PARENTS" }))
                    }
                  />

                  <RoleCard
                    value="DOCTOR"
                    icon={UserCheck}
                    title="Doctor"
                    description="Professional dashboard for healthcare providers"
                    isSelected={formData.role === "DOCTOR"}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, role: "DOCTOR" }))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  icon={Mail}
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  error={errors.email}
                  isFocused={focusedField === "email"}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />

                <InputField
                  icon={Phone}
                  name="contactNumber"
                  type="tel"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  error={errors.contactNumber}
                  isFocused={focusedField === "contactNumber"}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("contactNumber")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  icon={Lock}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  error={errors.password}
                  isFocused={focusedField === "password"}
                  showPassword={showPassword}
                  onToggleShowPassword={() => setShowPassword(!showPassword)}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  showPasswordStrength={true}
                />

                <InputField
                  icon={Lock}
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  error={errors.confirmPassword}
                  isFocused={focusedField === "confirmPassword"}
                  showPassword={showConfirmPassword}
                  onToggleShowPassword={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  onChange={handleChange}
                  onFocus={() => setFocusedField("confirmPassword")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              {formData.role === "PARENTS" && (
                <>
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-indigo-800 mb-4">
                      Child Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        icon={Baby}
                        name="kidName"
                        type="text"
                        placeholder="Child's Name"
                        value={formData.kidName}
                        error={errors.kidName}
                        isFocused={focusedField === "kidName"}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("kidName")}
                        onBlur={() => setFocusedField(null)}
                      />

                      <InputField
                        icon={Calendar}
                        name="dob"
                        type="date"
                        placeholder="Date of Birth"
                        value={formData.dob}
                        error={errors.dob}
                        isFocused={focusedField === "dob"}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("dob")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <InputField
                        icon={User}
                        name="fatherName"
                        type="text"
                        placeholder="Father's Name"
                        value={formData.fatherName}
                        error={errors.fatherName}
                        isFocused={focusedField === "fatherName"}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("fatherName")}
                        onBlur={() => setFocusedField(null)}
                      />

                      <InputField
                        icon={User}
                        name="motherName"
                        type="text"
                        placeholder="Mother's Name"
                        value={formData.motherName}
                        error={errors.motherName}
                        isFocused={focusedField === "motherName"}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("motherName")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-indigo-800 mb-4">
                      Address Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <InputField
                        icon={MapPin}
                        name="city"
                        type="text"
                        placeholder="City"
                        value={formData.city}
                        error={errors.city}
                        isFocused={focusedField === "city"}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("city")}
                        onBlur={() => setFocusedField(null)}
                      />

                      <InputField
                        icon={MapPin}
                        name="state"
                        type="text"
                        placeholder="State"
                        value={formData.state}
                        error={errors.state}
                        isFocused={focusedField === "state"}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("state")}
                        onBlur={() => setFocusedField(null)}
                      />

                      <InputField
                        icon={MapPin}
                        name="postalCode"
                        type="text"
                        placeholder="Postal Code"
                        value={formData.postalCode}
                        error={errors.postalCode}
                        isFocused={focusedField === "postalCode"}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("postalCode")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl active:scale-95"
                } focus:outline-none focus:ring-4 focus:ring-indigo-500/50`}
              >
                <div className="flex items-center justify-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>

          <div
            className="text-center mt-8 animate-fadeIn"
            style={{ animationDelay: "0.4s" }}
          >
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href="/signin"
                className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-300"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>

        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(-10px); }
            to { opacity: 1; transform: translateX(0); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out both;
          }
          
          .animate-slideUp {
            animation: slideUp 0.8s ease-out 0.2s both;
          }
          
          .animate-slideIn {
            animation: slideIn 0.3s ease-out;
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>
      </div>
    </>
  );
}
