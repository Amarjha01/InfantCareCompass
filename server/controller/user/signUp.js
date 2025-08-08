import { asyncHandler } from "../../utils/asyncHandler.js"; // Adjust path as needed
import usermodel from '../../models/user/user.js';
import doctormodel from '../../models/user/doctorSchema.js';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import path from 'path';


const signup =async(req,res)=>{
    try{
    console.log("controller hit");
    const {...data} = req.body;
    console.log(req.body);
    

    //   added email and dob to be fetched as well to validate 
    if (!data.email) {
        return res.status(400).json({
            error: true,
            success: false,
            message: "all fields are mandatory to fill"
        });
    }
    if (!validator.isEmail(data.email)) {
        return res.status(400).json({
            error: true,
            success: false,
            message: "please enter a valid email address"
        });
    }


    // validating password
    if (!validator.isLength(data.password, { min: 8 })) {
        return res.status(400).json({
            error: true,
            success: false,
            message: "password length must be 8 letters"
        });
    }

    const hasLetters = /[a-zA-Z]/.test(data.password);
    const hasNumbers = /[0-9]/.test(data.password);
    const hasSpecialChar = /[^a-zA-Z0-9]/.test(data.password);

    if (!(hasLetters && hasNumbers && hasSpecialChar)) {
        return res.status(400).json({
            error: true,
            success: false,
            message: "password must contain atleast 1 number, 1 special character, 1 alphabet"
        });
    }


    const hashedPassword = await bcrypt.hash(data.password,10);
    if(data.role === 'doctor'){
        // console.log(req.file);
        const doctordata = new doctormodel({
            role:'doctor',
            firstName:data.firstName,
            lastName:data.lastName,
            document:req.file.path,
            about:data.about,
            email:data.email,
            password:hashedPassword,
            experience:data.experience,
            rating:data.rating,
            status:'pending'
        });
        await doctordata.save();
        return res.status(200).json({
            data: doctordata,
            error: false,
            sucess: true,
            message: "your doctor profile verification pending..."
        });
    }else{
        const today = new Date();
        if (new Date(data.dob) > today) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "date cant be in future"
            });
        }


        // validating contact number to make sure the length doesnt exceed ten
        if (!validator.isLength(data.contactNumber, { min: 10, max: 10 })) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "contact number must be 10 numbers"
            });
        }
        const userdata = new usermodel({
    
            role:'parent',
            kidName:data.kidName,
            dob:data.dob,
            fatherName:data.fatherName,
            motherName:data.motherName,
            email:data.email,
            contactNumber:data.contactNumber,
            city:data.city,
            state:data.state,
            postalCode:data.postalCode,
            password:data.password
        });
        await userdata.save();
        return res.status(200).json({
            data: userdata,
            error: false,
            sucess: true,
            message: "user created successfully"
        });
    }
    }catch(err){
        console.log(err);
        return res.status(400).json({
            error: true,
            success: false,
            message: err
        });

    } else {
        try {
            const userData = new usermodel(payload);
            const saveUser = await userData.save();
            return res.status(200).json({
                data: saveUser,
                error: false,
                success: true,
                message: "User created successfully"
            });
        } catch (error) {
            if (error.code === 11000) {
                return res.status(400).json({
                    error: true,
                    success: false,
                    message: "Email already exists. Please use a different email address."
                });
            }
            throw error;
        }
    }
}

export default signup;


// const signup = asyncHandler(async (req, res, next) => {
//     // added email and dob to be fetched as well to validate 
//     const {  password, role } = req.body;
//     if (!email || !dob || !password || !contactNumber) {
//         return res.status(400).json({
//             error: true,
//             success: false,
//             message: "all fields are mandatory to fill"
//         });
//     }
//     // validating password
//     if (!validator.isLength(password, { min: 8 })) {
//         return res.status(400).json({
//             error: true,
//             success: false,
//             message: "password length must be 8 letters"
//         });
//     }

//     const hasLetters = /[a-zA-Z]/.test(password);
//     const hasNumbers = /[0-9]/.test(password);
//     const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);

//     if (!(hasLetters && hasNumbers && hasSpecialChar)) {
//         return res.status(400).json({
//             error: true,
//             success: false,
//             message: "password must contain atleast 1 number, 1 special character, 1 alphabet"
//         });
//     }

//     // validating email
//     if (!validator.isEmail(email)) {
//         return res.status(400).json({
//             error: true,
//             success: false,
//             message: "please enter a valid email address"
//         });
//     }

//     // validating dob
//     const today = new Date();
//     if (new Date(dob) > today) {
//         return res.status(400).json({
//             error: true,
//             success: false,
//             message: "date cant be in future"
//         });
//     }

//     // validating contact number to make sure the length doesnt exceed ten
//     if (!validator.isLength(contactNumber, { min: 10, max: 10 })) {
//         return res.status(400).json({
//             error: true,
//             success: false,
//             message: "contact number must be 10 numbers"
//         });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPass = await bcrypt.hash(password, salt);
//     const payload = {
//         ...req.body,
//         document : req.file.path,
//         password: hashedPass
//     }
//     if (role === 'DOCTOR') {
//         const doctordata = new doctormondel(payload);
//         const doctorData = await doctordata.save();
//         return res.status(200).json({
//             data: doctorData,
//             error: false,
//             sucess: true,
//             message: "doctorprofile created successfully now apply for verification"
//         });
//     } else {
//         const today = new Date();
//         if (new Date(dob) > today) {
//         return res.status(400).json({
//             error: true,
//             success: false,
//             message: "date cant be in future"
//         });
//     }
//         const userData = new usermodel(payload);
//         const saveUser = await userData.save();
//         return res.status(200).json({
//             data: saveUser,
//             error: false,
//             sucess: true,
//             message: "User created successfully"
//         });
//     }
// });

// export default signup;
