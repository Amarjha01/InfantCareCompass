import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const email = params.get("email");
    const role = params.get("role");
    const id = params.get("id");

    if (token && email) {
     
      const userData = {
        id,
        email,
        role: role.toLowerCase() === "doctor" ? "doctor" : "patient",
        token,
        name: email.split("@")[0], 
      };

      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userData));
      dispatch(setUser(userData));

      navigate("/"); 
    } else {
      navigate("/signin"); 
    }
  }, [dispatch, navigate]);

  return <p className="text-center mt-10">Logging you in with GitHub...</p>;
}
