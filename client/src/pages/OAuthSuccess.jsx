import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import commnApiEndpoint from "../common/backendAPI";
import { Toaster, toast } from "react-hot-toast";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(commnApiEndpoint.getUserInfo.url, {
      method: commnApiEndpoint.getUserInfo.method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then(async res => {
        const data = await res.json();
        if (res.ok && data.success && data.data) {
          localStorage.setItem("userData", JSON.stringify(data.data));
          dispatch(setUser(data.data));
          toast.success("GitHub login successful!");
          setTimeout(() => navigate("/"), 1200);
        } else {
          console.error("OAuthSuccess error:", data);
          toast.error(data.message || "GitHub login failed. Please try again.");
          setTimeout(() => navigate("/signin"), 1500);
        }
      })
      .catch((err) => {
        console.error("OAuthSuccess network error:", err);
        toast.error("Network error. Please try again.");
        setTimeout(() => navigate("/signin"), 1500);
      });
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-4">Completing GitHub login...</h2>
      <p className="text-gray-600">Please wait while we log you in.</p>
    </div>
  );
}
