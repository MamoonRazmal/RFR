import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { createProductController, getProductController, productPhotoController, singleProductController,deleteProductController, updateproductController } from '../controllers/ProductController.js';
import formidable from "express-formidable"
const Router=express.Router();

Router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)

Router.get('/get-product',getProductController)
Router.get('/get-product/:slug',singleProductController)

Router.get("/product-photo/:pid",productPhotoController)
Router.delete('/delete-product/:pid',requireSignIn,isAdmin,deleteProductController)
Router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateproductController)
export default Router