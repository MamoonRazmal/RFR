import express from "express";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { getUser } from "../controllers/userController.js";

const Router = express.Router();

Router.get("/getuser", getUser);
export default Router;
