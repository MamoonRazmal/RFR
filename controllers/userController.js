import userModel from "../models/userModel.js";
import slugify from "slugify";
export const getUser = async (req, res) => {
  try {
    console.log("something happend");
    // const users = await userModel.find({});
    res.status(200).send({ success: true, message: "got the user", users });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "something went wring in getting users",
      error,
    });
  }
};
