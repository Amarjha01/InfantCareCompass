import { asyncHandler } from "../../utils/asyncHandler.js";
import usermodel from "../../models/user/user.js";
import doctormondel from "../../models/user/doctorSchema.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const signin = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  const modelToUse = role === 'DOCTOR' ? doctormondel : usermodel;
  const user = await modelToUse.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  const tokendata = {
    id: user._id,
    email: user.email
  };

  const token = jwt.sign(tokendata, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

  const tokenOptions = {
    httpOnly: true,
    secure: true
  };

  res.cookie("token", token, tokenOptions).status(200).json({
    message: "Login successfully",
    data: user,
    success: true,
    error: false
  });
});

export default signin;
