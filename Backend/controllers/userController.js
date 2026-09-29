import validator from "validator";
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const loginUser = async(req,res)=>{

}

const registerUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body;

        const exists = await userModel.findOne({email})

        if(exists){
            return res.json({success:false,message:"User already exists"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Password must be least 8 latter"})
        }
        
        const salt = await bycrpt.genSalt(10)
        const hashPassword = await bycrpt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password:hashPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id);

        res.json({success:true,token})

    }catch(err){
        console.log(err)
        res.json({success:false,msg:error.message})
    }
}
const adminLogin = async(req,res)=>{

}

export {loginUser,registerUser,adminLogin}
