let UserCollection = require('../models/UserCollection');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
let JWT_SECRET = process.env.JWT_SECRET;
const validator = require('validator')
let randomstring = require("randomstring");
const checkToken = require('../middleware/checkToken');


const registerUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, address, profilePic } = req.body;

    // Validate password before saving
    const isPasswordValid = validator.matches(
      password,
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        error:
          'Password must be at least 8 characters long, and include a letter, a number, and a special character',success:false
      });
    }

    let hashedPassword = bcrypt.hashSync(password,salt)

    // Check if user already exists
    const existingUser = await UserCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already registered' });
    }
    const existingUserPhone = await UserCollection.findOne({phoneNumber})
    if(existingUserPhone){
          return res.status(401).json({error:'phone Number already  exist'})
    }

    // Create new user
    const newUser = await UserCollection.create({
      name,
      email,
      phoneNumber,
      password:hashedPassword, // This will be hashed in the pre-save hook
      address,
      profilePic,
    });

    

    res.status(201).json({ message: 'User registered successfully',newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error',error:error.message });
  }
};


const loginUser =async(req,res)=>{
    const {email,password,phoneNumber}=req.body
   try {
    let existingUser = await UserCollection.findOne({$or:[{email},{phoneNumber}]});
    if (!email && !phoneNumber) {
      return res.status(400).json({ msg: "Email or phone number is required" });
  }
    if (existingUser) {
      let comparePassword = bcrypt.compareSync(password,existingUser.password);
      if (comparePassword){
        let token = jwt.sign({_id:existingUser._id},JWT_SECRET);
        res.status(200).json({msg:"logged successfully",token})
      }
      else{
        res.status(401).json({msg:"password is incorrect"})
      }
    }
   else{
    res.status(404).json({msg:"user not found"})
   }
    
    
   } catch (error) {
    res.status(500).json({msg:"error in login",error:error.message})
   }
}

const updateUser =async(req,res)=>{
    const{name,password,profilePic,address,phoneNumber} = req.body;
     
    let usersId = req.user._id

    try {
      if(password){
        var hashedPassword = bcrypt.hashSync(password,salt);
      }
        let data = await UserCollection.findByIdAndUpdate(usersId,{$set:{name,address,profilePic,phoneNumber,password:hashedPassword}},{new:true})
        res.status(200).json({msg:"user details updated",data})
      
    } catch (error) {
      res.status(500).json({msg:"error in updating",error:error.message})
    }
}    

const deleteUser = async(req,res)=>{
  let userId = req.params._id;
  let tokenId = req.user._id;
  // console.log(userId);
  // console.log('tokenId',tokenId)

 try {
  if(tokenId===userId){
    let user = await UserCollection.findByIdAndDelete(tokenId)
    res.status(201).json({msg:"user Deleted successfully"})
  }
  else{
      res.status(401).json({msg:"not authorized to delete"})
  }
 } catch (error) {
  res.status(500).json({msg:"error in deleting",error:error
    .message
  })
 }
    
}

const getUserDetails = async(req,res)=>{
     
  let userId = req.user._id

  try {
    let user = await UserCollection.findById(userId).select('-password');
    res.status(200).json({msg:"user details fetched successfully",user})


  } catch (error) {
    res.status(500).json({msg:"error in fetching details",error:error.message});
  }
}

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    getUserDetails
}