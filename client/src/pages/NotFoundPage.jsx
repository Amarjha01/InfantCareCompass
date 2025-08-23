import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen top-0 bg-gradient-to-b from-[#0c002b] to-[#1a0035] dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center text-center relative overflow-hidden text-white px-4">
    
      {/* Main content */}
      <div className="z-10">
        <h1 className="text-[10rem] font-extrabold bg-gradient-to-r from-pink-500 to-blue-400 text-transparent bg-clip-text leading-none">
          404
        </h1>
        <p className="text-xl sm:text-2xl mb-1">Oops! You've ventured into the</p>
        <p className="text-3xl sm:text-4xl font-semibold text-pink-400 mb-4">digital void</p>
        <p className="text-sm sm:text-base text-gray-300 mb-8">
          This page seems to have escaped to another dimension
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold hover:opacity-90 transition duration-300"
          >
            Return to Reality
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-pink-400 text-pink-400 rounded-full hover:bg-pink-500 hover:text-white transition duration-300"
          >
            Go Back
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-8">Error code: DIMENSION_NOT_FOUND. Please contact us.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
