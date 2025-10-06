import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Stethoscope,
  Baby,
  ArrowRight,
  AlertCircle,
  Check,
  X,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice.jsx";
import { Toaster, toast } from 'react-hot-toast';
import commnApiEndpoint from "../common/backendAPI.jsx";

const PasswordStrengthIndicator = ({ password }) => {
  const requirements = [
    { test: (pwd) => pwd.length >= 8, label: "At least 8 characters" },
    { test: (pwd) => /[A-Z]/.test(pwd), label: "One uppercase letter (A–Z)" },
    { test: (pwd) => /[a-z]/.test(pwd), label: "One lowercase letter (a–z)" },
    { test: (pwd) => /[0-9]/.test(pwd), label: "One number (0–9)" },
    { test: (pwd) => /[!@#$%^&*]/.test(pwd), label: "One special character (!@#$%^&*)" },
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
    <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700">Password Strength:</span>
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
              <span className={isMet ? "text-green-700" : "text-gray-600"}>
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
          isFocused ? "text-indigo-600" : error ? "text-red-500" : "text-gray-400"
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
        aria-label={placeholder}
        className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl transition-all duration-300 bg-white ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
            : isFocused
            ? "border-indigo-500 focus:border-indigo-600 focus:ring-indigo-500/20 shadow-lg"
            : "border-gray-200 hover:border-gray-300"
        } focus:outline-none focus:ring-4`}
      />

      {name === "password" && (
        <button
          type="button"
          onClick={onToggleShowPassword}
          aria-label="Toggle password visibility"
          className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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

const RoleCard = ({ value, icon: Icon, title, description, isSelected, onClick }) => (
  <div
    onClick={onClick}
    role="button"
    tabIndex={0}
    aria-pressed={isSelected}
    aria-label={`Select ${title} role: ${description}`}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    }}
    className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
      isSelected
        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
        : "bg-white border-2 border-gray-200 hover:border-indigo-300 hover:shadow-md"
    }`}
  >
    <div className="flex items-center mb-3">
      <div
        className={`p-3 rounded-full ${
          isSelected ? "bg-white/20" : "bg-gradient-to-r from-indigo-500 to-purple-500"
        }`}
      >
        <Icon className={"w-6 h-6 text-white"} />
      </div>
      <h3 className={`ml-3 font-semibold ${isSelected ? "text-white" : "text-gray-800"}`}>
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

export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "PARENTS",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // In SignIn.jsx
  const handleGitHubLogin = () => {
    const backendUrl = import.meta.env.VITE_API_BASE_URL;
    if (!backendUrl) {
      console.error("VITE_API_BASE_URL is not defined!");
      return;
    }

    // This is the correct route: /api/auth/github
    window.location.href = `${backendUrl}/api/auth/github`; 

    // The old, now-missing route: window.location.href = `${backendUrl}/api/github/oauth/login`;
  };
  
  

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else {
      const password = formData.password;
      const passwordRequirements = [
        { test: password.length >= 8, message: "Password must be at least 8 characters long" },
        { test: /[A-Z]/.test(password), message: "Password must contain at least one uppercase letter" },
        { test: /[a-z]/.test(password), message: "Password must contain at least one lowercase letter" },
        { test: /[0-9]/.test(password), message: "Password must contain at least one number" },
        {
          test: /[!@#$%^&*]/.test(password),
          message: "Password must contain at least one special character (!@#$%^&*)",
        },
      ];

      const failedRequirements = passwordRequirements.filter((req) => !req.test);
      if (failedRequirements.length > 0) {
        newErrors.password = failedRequirements[0].message;
      }
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    const token = localStorage.getItem("token");
    try {
      console.log("Attempting login with:", { 
        email: formData.email, 
        role: formData.role 
      });
      
      const response = await fetch(commnApiEndpoint.signin.url, {
        method: commnApiEndpoint.signin.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formData.role
        }),
        credentials: 'include', // Include cookies in the request
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (response.ok && data.success) {
        // Store the token if it exists
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        
        // Determine user role based on the login type and data structure
        let userRole;
        if (formData.role === 'DOCTOR') {
          userRole = 'doctor';
        } else if (formData.role === 'PARENTS') {
          userRole = 'patient';
        } else {
          userRole = 'patient'; // default
        }
        
        // Create user object for Redux
        const userData = {
          id: data.data._id,
          email: data.data.email,
          name: data.data.firstName ? `${data.data.firstName} ${data.data.lastName}` : data.data.kidName || data.data.email,
          role: userRole,
          token: data.token,
          ...data.data
        };
        
        console.log("Setting user data in Redux:", userData);
        
        // Store user data in localStorage for persistence
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Set user data in Redux
        dispatch(setUser(userData));
        
        toast.success(`Welcome ${userData.name}! Login successful.`);
        
        // Navigate to home page
        setTimeout(() => {
          navigate("/");
        }, 1000);
        
      } else {
        console.error("Login failed:", data);
        toast.error(data.message || "Login failed. Please check your credentials.");
      }
      
    } catch (error) {
      console.error("Login error:", error);
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-7 pb-8 flex-col">
      <div className="w-full ">
      <button
              onClick={() => navigate("/")}
              className={`w-3/2 mt-6 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl active:scale-95
                 focus:outline-none focus:ring-4 focus:ring-indigo-500/50`}
            >
              <div className="flex items-center justify-center space-x-2">
                    <Home className="w-5 h-5" />
              </div>
            </button>
      </div>
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-6 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 animate-slideUp">
          <div className="space-y-6">
            <InputField
              icon={Mail}
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              error={errors.email}
              isFocused={focusedField === 'email'}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
            />

            <InputField
              icon={Lock}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              error={errors.password}
              isFocused={focusedField === 'password'}
              showPassword={showPassword}
              onToggleShowPassword={() => setShowPassword(!showPassword)}
              onChange={handleChange}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              showPasswordStrength={false}
            />

            

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Your Role
              </label>

              <div className="flex flex-row gap-3">
                <RoleCard
                  value="PARENTS"
                  icon={Baby}
                  title="Parents"
                  description="Access parental resources and child care information"
                  isSelected={formData.role === 'PARENTS'}
                  onClick={() => setFormData(prev => ({ ...prev, role: 'PARENTS' }))}
                />

                <RoleCard
                  value="DOCTOR"
                  icon={Stethoscope}
                  title="Doctor"
                  description="Professional dashboard for healthcare providers"
                  isSelected={formData.role === 'DOCTOR'}
                  onClick={() => setFormData(prev => ({ ...prev, role: 'DOCTOR' }))}
                />
              </div>
            </div>

            <button onClick={handleGitHubLogin} className="w-full mb-4 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" aria-label="Sign in with GitHub account"> <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"> <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" /> </svg> Continue with GitHub </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform ${isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl active:scale-95'
                } focus:outline-none focus:ring-4 focus:ring-indigo-500/50`}
              aria-label="Sign in to your Infant Care Compass account"
            >
              <div className="flex items-center justify-center space-x-2">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </div>
            </button>
          </div>
        </div>

        <div className="text-center mt-8 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a
              href="/registration"
              className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-300"
            >
              Register here
            </a>
          </p>
        </div>

        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

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