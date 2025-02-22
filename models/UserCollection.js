const mongoose = require('mongoose');
const validator = require('validator')
const userSchema = new mongoose.Schema({
    name:{
       type: String,
    required:[true,'name is required'],
    },
    email:{
        type:String,
        unique:true,
        required:[true,'email is required'],
        lowercase:true,
        trim:true,
        validate: {
            validator: (email) => validator.isEmail(email),
            message: (props) => `${props.value} is not a valid email address!`,
          },
    },
    phoneNumber:{
      type:String,
      trim:true,
      require:true,
      unique:true,
      minlenght:10,
      maxlength:10,
      validate: {
        validator: (number) => /^\d{10}$/.test(number), // Validates 10-digit phone numbers
        message: 'Phone number must contain only digits and be 10 digits long',
      },
    },
    password: {
        type: String
       
      },
    address:{
      type:String
    },


    isAdmin:{
     type:Boolean,
     default:false
    },

    profilePic:{
        type: String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf49fton7yztt_1Xmzro_oc-xSEV9oa-JzXg&s'
    
     },
     resetToken:{
        type:String,
        default:null
     },
     resetTokenValidity:{
      type:Date
     },
},{timestamps:true})

module.exports = mongoose.model('users',userSchema)