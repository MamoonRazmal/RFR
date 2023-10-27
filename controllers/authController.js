import { comparePassword, hashpassword } from "../helpers/authHelper.js";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body; // Destructuring correctly

    // validation
    if (!name || !email || !password || !phone || !address || !answer) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // existing user check
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .send({ success: false, message: "Already registered, please login" });
    }

    const hashedPassword = await hashpassword(password);

    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save(); // Corrected function call

    res
      .status(201)
      .send({ success: true, message: "User registered successfully", user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in registration", error });
  }
};
//POst login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation accur
    if (!email || !password) {
      res.status(404).send({
        sucess: false,
        message: "Invalid Email or Password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        sucess: false,
        message: "User not valid",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //token
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      sucess: true,
      message: "Login sucessfully",
      user: {
        user: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in logins",
      error: error,
    });
  }
};
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "password is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    ///check the user
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "wrong Email or answer",
      });
    }
    const hashed = await hashpassword(newPassword);
    await userModel.findOneAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};
//test controller
export const testController = (req, res) => {
  res.send("protected Routes");
};
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    if (password && password.length < 6) {
      return res.json({ error: "password is required and 6 character long" });
    }
    const hashPassword = password ? await hashpassword(password) : undefined;
    const updateUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashPassword || user.password,
        email: email || user.email,
        address: address || user.address,
        phone: phone || user.phone,
      },
      { new: true }
    );
    res
      .status(200)
      .send({ success: true, message: "updated successfuly", updateUser });
  } catch (error) {
    res.status(400).send({
      success: true,
      message: "some thing went wrong in updating profile",
      error,
    });
  }
};
