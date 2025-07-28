import { asyncHandler } from "../../utils/asyncHandler.js"; 

const logOut = asyncHandler(async (req, res, next) => {
  // The logic remains the same, but without the try...catch block.
  res.clearCookie("token");

  return res.status(200).json({
    message: "User logged out successfully",
    error: false,
    success: true,
    data: [],
  });
});

export default logOut;
