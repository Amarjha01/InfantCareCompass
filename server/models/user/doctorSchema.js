import mongoose from 'mongoose';


const doctorScheme = new mongoose.Schema(
    {
        'role':{
            "type":String,
            "required":true
        },
        'firstName': {
          "type": String,
          "required": true
        },
        'lastName': {
          "type": String,
          "required": true
        },
        'document':{
          "type":String,
          "required":true
        },
        'about': {
          "type": String,
          "required": true
        },
        'email':{
            type:String,
            require:true,
            unique:true
        },
        'password': {
          "type": String,
          "required": true
        },
     
        "experience": {
          "type": Number,
          "required": true
        },
     
        "rating": {
          "type": Number,
          "required": true,
          default : 0
        },
        status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
        }

     
      }
    )
const doctormondel = new mongoose.model('doctorsData',doctorScheme);
    export default doctormondel;