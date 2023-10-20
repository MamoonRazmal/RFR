import { comparePassword, hashpassword } from "../helpers/authHelper.js"
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js"

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body; // Destructuring correctly

        // validation
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        // existing user check
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({ success: false, message: 'Already registered, please login' });
        }

        const hashedPassword = await hashpassword(password);

        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword
        }).save(); // Corrected function call

        res.status(201).send({ success: true, message: 'User registered successfully', user });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Error in registration', error });
    }
}
//POst login
export const loginController=async(req,res)=>{
try{
    const {email,password}=req.body
    //validation accur
    if(!email || !password){
        res.status(404).send({
            sucess:false,
            message:"Invalid Email or Password"
        })
    }

const user=await userModel.findOne({email})
if(!user){
    return res.status(404).send({
        sucess:false,
        message:"User not valid"
    })
}
const match=await comparePassword(password,user.password)
if(!match){
    return res.status(200).send({
        success:false,
        message:"Invalid Password"
    })
}

//token
const token=await jwt.sign({_id:user._id}, process.env.JWT_SECRET,{expiresIn:"7d"})
res.status(200).send({
    sucess:true,
    message:"Login sucessfully",
    user:{
        user:user.name,
        email:user.email,
        phone:user.phone,
        address:user.address

    },
    token
})
}
catch(error){
    console.log(error)
    res.status(500).send({
        sucess:false,
        message:'Error in logins',
        error:error
    })

}

};
export const testController=(req,res)=>{
    res.send("protected Routes")
    
}