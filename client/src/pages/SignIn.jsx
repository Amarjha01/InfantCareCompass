import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import backendAPI from '../common/backendAPI.jsx'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { userinfo } from "../store/slices/userSlice.jsx";

export default function Signin() {
  const [isActive, setIsActive] = useState(false);
  const [role, setRole] = useState(""); // State to manage selected role
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate(); 

  // Handle form submission
  const onSubmit = async(data) => {
    console.log("Submitted Data: ", data);
    // Include the selected role in the payload
    const payload = { 
      ...data, 
      role: role || 'PARENTS' // Default to PARENTS if no role is selected
    };
    
    try {
      const signinResponse = await fetch('http://localhost:3000/api/signin', {
        method: "post",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (signinResponse.ok) {
        const responseData = await signinResponse.json();
        console.log('response data:',responseData);
        console.log('response data user id:', responseData.data?._id);
        
        // Update user state with role and activation status
        const statePayload = {
          ...responseData.data,
          
          isActive: true,
        };
        dispatch(userinfo(statePayload));

        // Redirect to the home page
        navigate("/");
      } else {
        console.error("Signin failed!");
        alert("Invalid email or password. Please try again.");
      }
    
    } catch (error) {
      console.error("Signin error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Signin</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Email Field */}
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Role Selection (Doctor or Parent) */}
          <div>
            <label className="block font-medium">Select Role</label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="DOCTOR"
                  checked={role === "DOCTOR"}
                  onChange={() => setRole("DOCTOR")}
                  className="form-radio"
                />
                <span className="ml-2">Doctor</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="PARENTS"
                  checked={role === "PARENTS"}
                  onChange={() => setRole("PARENTS")}
                  className="form-radio"
                />
                <span className="ml-2">Parents</span>
              </label>
            </div>
            {role === "" && (
              <p className="text-red-500 text-sm">Role is required</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            disabled={role === ""}
          >
            Signin
          </button>
        </form>

        {/* Additional Options */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="/registration" className="text-blue-500 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
