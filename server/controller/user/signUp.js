import usermodel from '../../models/user/user.js'
import doctormondel from '../../models/user/doctorSchema.js'
import bcrypt from 'bcryptjs'
import validator from 'validator'

async function signup(req,res) {
    try {

      //added email and dob to be fetched as well to validate 
        const {email, dob, password,role, contactNumber} = req.body;
        if(!email || !dob|| !password || !contactNumber){
          return res.status(400).json({
            error: true,
            success: false,
            message:"all fields are mandatory to fill"
          });
        }
        //validating password
        if(!validator.isLength(password, {min:8})){
          return res.status(400).json({
            error: true,
            success: false,
            message:"password length must be 8 letters"
          });
        }

        const hasLetters = /[a-zA-Z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);

        if(!(hasLetters && hasNumbers && hasSpecialChar)){
          return res.status(400).json({
              error: true,
              success: false,
              message:"password must contain atleast 1 number, 1 special character, 1 alphabet"})
        }

        //validating email
        if(!validator.isEmail(email)){
          return res.status(400).json({
            error: true,
            success: false,
            message:"please enter a valid email address"
          });
        }
        
        //validating dob
        const today = new Date();
        if(new Date(dob)>today){
          return res.status(400).json({
            error: true,
            success: false,
            message:"date cant be in future"
          })
        }

        //validating contact number to make sure the length doesnt exceed ten
        if(!validator.isLength(contactNumber, {min:10,max:10})){
          return res.status(400).json({
            error: true,
            success: false,
            message:"contact number must be 10 numbers"
          });
        }


       const salt = await bcrypt.genSalt(10);
       const hashedPass = await bcrypt.hash(password,salt);
       const payload = {
        ...req.body,
        password : hashedPass
       }
       if(role === 'DOCTOR'){
        const doctordata = new doctormondel(payload)
        const doctorData = await doctordata.save();
        res.status(200).json({
            data:doctorData,
            error:false,
            sucess:true,
            message:"doctorprofile created successfully now apply for verification"
        });
       }else{
        const userData = new usermodel(payload);
        const saveUser = await userData.save();
        res.status(200).json({
            data:saveUser,
            error:false,
            sucess:true,
            message:"User created successfully"
        });
       }
      
    } catch (err) {
        console.error('error:',err); // Log the error to identify the root cause
        if (err.code === 11000) {
          const duplicateKey = Object.keys(err.keyValue)[0]; // Identify the field causing the error
          return res.status(400).json({
            message: `${duplicateKey} already exists`,
            error: true,
            success: false,
          });
        }
        res.status(500).json({
          message: err.message,
          error: true,
          success: false,
        });
      }
    }      

export default signup;