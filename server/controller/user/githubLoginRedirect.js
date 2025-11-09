

import { asyncHandler } from "../../utils/asyncHandler.js";

const githubLoginRedirect = asyncHandler(async (req, res) => {
    // Ensure credentials are set
    if (!process.env.GITHUB_CLIENT_ID || !process.env.VITE_API_BASE_URL) {
        console.error("GitHub CLIENT_ID or BACKEND_URL is missing in environment variables");
        return res.status(500).json({ message: "Server configuration error" });
    }

    // Construct the GitHub authorization URL
    const redirectUri = "https://github.com/login/oauth/authorize" +
        `?client_id=${process.env.GITHUB_CLIENT_ID}` +
        // The callback URL MUST match the route you defined in routes.js
        `&redirect_uri=${process.env.BACKEND_URL}/api/auth/github/callback` + 
        `&scope=user:email`;
        
    // Redirect the user to GitHub
    return res.redirect(redirectUri);
});

// The export name should match the import name used in routes.js
export default githubLoginRedirect;


// src/pages/auth/GitHubLoginRedirect.jsx
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Toaster, toast } from "react-hot-toast";

// const GitHubLoginRedirect = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Ensure backend URL and GitHub client ID are defined
//     const backendURL = process.env.VITE_API_BASE_URL || "http://localhost:5000";
//     const githubClientId = process.env.GITHUB_CLIENT_ID;

//     if (!backendURL || !githubClientId) {
//       console.error("GitHub CLIENT_ID or BACKEND_URL is missing in environment variables");
//       toast.error("GitHub login is not configured. Contact support.");
//       navigate("/signin"); // fallback to signin page
//       return;
//     }

//     const backendOAuthURL = `${backendURL}/api/auth/github`;

//     try {
//       // Redirect user to backend OAuth route
//       window.location.href = backendOAuthURL;
//     } catch (error) {
//       console.error("GitHub login redirect failed:", error);
//       toast.error("Failed to initiate GitHub login. Please try again.");
//       navigate("/signin"); // fallback to signin page
//     }
//   }, [navigate]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//       <Toaster position="top-right" />
//       <div className="text-center p-6 bg-white rounded-3xl shadow-xl">
//         <h2 className="text-2xl font-bold mb-4 text-indigo-600">Redirecting to GitHub...</h2>
//         <p className="text-gray-600">If you are not redirected automatically, click the button below.</p>
//         <button
//           onClick={() => {
//             const backendURL = process.env.VITE_API_BASE_URL || "http://localhost:5000";
//             window.location.href = `${backendURL}/api/auth/github`;
//           }}
//           className="mt-4 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300"
//         >
//           Login with GitHub
//         </button>
//       </div>
//     </div>
//   );
// };

// export default githubLoginRedirect;


// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Toaster, toast } from "react-hot-toast";

// const githubLoginRedirect = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const backendURL = process.env.VITE_API_BASE_URL || "http://localhost:5000";

//     const githubClientId = process.env.GITHUB_CLIENT_ID;

//     if (!backendURL || !githubClientId) {
//       console.error("GitHub CLIENT_ID or BACKEND_URL is missing in environment variables");
//       toast.error("GitHub login is not configured. Contact support.");
//       navigate("/signin"); // fallback to signin page
//       return;
//     }

//     const backendOAuthURL = `${backendURL}/api/auth/github`;

//     try {
//       window.location.href = backendOAuthURL; // redirect to backend
//     } catch (error) {
//       console.error("GitHub login redirect failed:", error);
//       toast.error("Failed to initiate GitHub login. Please try again.");
//       navigate("/signin");
//     }
//   }, [navigate]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//       <Toaster position="top-right" />
//       <div className="text-center p-6 bg-white rounded-3xl shadow-xl">
//         <h2 className="text-2xl font-bold mb-4 text-indigo-600">Redirecting to GitHub...</h2>
//         <p className="text-gray-600">If you are not redirected automatically, click the button below.</p>
//         <button
//           onClick={() => {
//             const backendURL = process.env.VITE_API_BASE_URL || "http://localhost:5000";
//             window.location.href = `${backendURL}/api/auth/github`;
//           }}
//           className="mt-4 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300"
//         >
//           Login with GitHub
//         </button>
//       </div>
//     </div>
//   );
// };

// export default githubLoginRedirect;
