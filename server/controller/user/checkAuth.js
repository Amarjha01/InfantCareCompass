import usermodel from "../../models/user/user.js";

export const checkAuth = async (req, res) => {
    try {
        const user = await usermodel.findById(req.id).select("-password"); // exclude password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}