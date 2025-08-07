import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    'kidName':String,
    'dob':{
        type:String,
        require:true
    },
    'fatherName':{
        type:String,
        require:true
    },
    'motherName':{
        type:String,
        require:true
    },
    'email':{
        type:String,
        require:true,
        unique:true
    },
    'contactNumber':{
        type:Number,
        require:true
    },
    'city':String,
    'state':String,
    'postalCode':Number,
    'password':{
        type:String,
        require:true
    }
});

const usermodel = new mongoose.model('user',userSchema);

export default usermodel;