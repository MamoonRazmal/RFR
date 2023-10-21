import productModel from "../models/productModel.js"
import slug from "slugify"
import fs from 'fs'
import slugify from "slugify"
export const createProductController=async(req,res)=>{
    try{
const{name,slug,description,price,category,quantity,shipping}=req.fields
const{photo}=req.files
if(!name || !description || !price || !category ||!quantity || photo && photo.size > 1000000){
    return res.status(500).send({error:"same thing is missing"})
   
}
const products=new productModel({...req.fields,slug:slugify(name)})
if(photo){
    products.photo.data=fs.readFileSync(photo.path)
    products.photo.contentType=photo.type
        }

        await products.save()
        res.status(201).send({
            success:true,
            message:"product created successfully",
            products
        })
    }

    catch(error){
        res.status(500).send({
            success:false,
            message:"Production saving failed",
            error
        })

    }

}