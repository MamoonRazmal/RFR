import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { createProductController } from '../controllers/ProductController.js';
import formidable from "express-formidable"
const Router=express.Router();

Router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)




export default Router