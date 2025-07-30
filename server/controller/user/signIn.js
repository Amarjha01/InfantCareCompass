import { asyncHandler } from "../../utils/asyncHandler.js";
import usermodel from "../../models/user/user.js";
import doctormondel from "../../models/user/doctorSchema.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

<<<<<<< HEAD
const signin = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  const modelToUse = role === 'DOCTOR' ? doctormondel : usermodel;
  const user = await modelToUse.findOne({ email });
=======
const signin = asyncHandler(async (req, res, next) => {
    const { email, password, role } = req.body;

    if (role === 'DOCTOR') {
        const doctor = await doctormondel.findOne({ email });
        if (!doctor) {
            return res.status(400).json({
                message: 'user not found'
            });
        }
>>>>>>> upstream/master

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

<<<<<<< HEAD
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
=======
        if (verfyuser) {
            const tokendata = {
                id: doctor._id,
                email: doctor.email
            }
            
            const token = jwt.sign(tokendata, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
            const tokenOption = {
                httpOnly: true,
                secure: true
            }
            res.cookie("token", token, tokenOption).status(200).json({
                message: "login sucessfully",
                data: doctor,
                success: true,
                error: false
            });
        } else {
            res.status(400).json({
                message: "please enter password correctly"
            });
        }

    } else {
        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'user not found'
            });
        }
        const veryfyuser = await bcrypt.compare(password, user.password);

        if (veryfyuser) {
            const tokendata = {
                id: user._id,
                email: user.email
            }
            const token = jwt.sign(tokendata, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
            const tokenOption = {
                httpOnly: true,
                secure: true
            }
            res.cookie("token", token, tokenOption).status(200).json({
                message: "login sucessfully",
                data: user,
                success: true,
                error: false
            });
        } else {
            res.status(400).json({
                message: "please enter password correctly"
            });
        }
    }
>>>>>>> upstream/master
});

export default signin;
