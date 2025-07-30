import { asyncHandler } from "../../utils/asyncHandler.js";
import usermodel from "../../models/user/user.js";
import doctormondel from "../../models/user/doctorSchema.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const signin = asyncHandler(async (req, res, next) => {
    const { email, password, role } = req.body;

    if (role === 'DOCTOR') {
        const doctor = await doctormondel.findOne({ email });
        if (!doctor) {
            return res.status(400).json({
                message: 'user not found'
            });
        }

        const verfyuser = await bcrypt.compare(password, doctor.password);

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
});

export default signin;
