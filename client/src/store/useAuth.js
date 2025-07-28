import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set,get) => ({
    authUser: null, // by default we take user to be unauthenticated

    onlineUsers: [],
    
    isCheckingAuth: true,

    checkAuth: async() => {
        try {
            // console.log("Token before /check call:", localStorage.getItem("token"));
            const res = await axiosInstance.get("/check");
            set({authUser: res.data});
            // console.log("checkAuthUser",get().authUser);
        } catch (error) {
            console.log("Error in checkAuth:",error);
            set({authUser: null});
        } finally{
            set({isCheckingAuth: false});
        }
    },

    register: async(data,navigate) => {
        try {
            const res = await axiosInstance.post("/signup",data);
            set({authUser: res.data.data});
            // console.log("Got this",get().authUser);
            toast.success("🎉 Registered! Redirecting to login...");
            navigate("/signin");
        } catch(error) {
            toast.error(error.response.data.message);
        }
    },

    signin: async(data,navigate) => {
        try {
            const res = await axiosInstance.post("/signin",data);
            set({authUser: res.data.data});
            // console.log("Token from API:", res.data.token);
            localStorage.setItem("token", res.data.token);
            // console.log("Login time AuthUser",get().authUser)
            toast.success("Logged in successfully");
            navigate("/");
        } catch (error) {
            toast.error("Incorrect credentials");
        }
    },

    logout: async(navigate) => {
        try {
            await axiosInstance.post("/logout");
            set({authUser: null});
            localStorage.removeItem("token");
            navigate("/");
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
}))