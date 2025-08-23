import React from "react";
import { useForm } from "react-hook-form";

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Email Submitted: ", data);
    // Handle forgot password logic, such as sending a verification email
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
        <p className="text-center text-gray-600 mb-4">
          Enter your email address, and we will send you a link to reset your password.
        </p>
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Remember your password?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Go back to login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
