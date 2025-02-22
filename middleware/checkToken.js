const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const checkToken = async(req,res,next)=>{
try {
    let token = req.headers.authorization;
    if(!token){
        return res.json({msg:"provide a token",success:false})
    }
    let decode = jwt.verify(token,JWT_SECRET);
    req.user = decode;
    next();
} catch (error) {
    return res.json({msg:"token is not valid",success:false,error:error.message})
}
}

module.exports = checkToken