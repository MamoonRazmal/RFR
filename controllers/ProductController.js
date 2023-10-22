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
export const getProductController=async(req,res)=>{
    try{
const products=await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1})
res.status(200).send({
    success:true,
    counttotal:products.length,
    message:"All Products",
    products,
    
})
    }
    catch(error){
        res.status(500).send({
            success:false,
            message:"getting product not successsful",
            error
        })
    }
}
export const singleProductController=async(req,res)=>{
    try{
const singleProduct=await productModel.findOne({slug:req.params.slug}).select('-photo').populate("category")
res.status(200).send({
    success:true,
    message:"get single product successfully",
    singleProduct
})
    }
    catch(error){
        res.status(500).send({
            success:false,
            message:"getting single product has faild",
            error
        })
    }


}
export const productPhotoController=async(req,res)=>{
    try{
        
        const product=await productModel.findById(req.params.pid).select("photo")
    if(product.photo.data){
        res.set('content-type',product.photo.contentType)
        return res.status(200).send(product.photo.data)
    }
    }
    catch(error){
        res.status(500).send({
            success:false,
            message:"not sucessfull for getting photo",
            error
        })
    }
}
export  const deleteProductController=async(req,res)=>{
    try{
const {id}=req.params.pid
await productModel.findByIdAndDelete(id).select("-photo")
res.status(200).send({
    success:true,
    message:"product deleted successfully"
})
    }
    catch(error){
        res.status(500).send({
            success:false,
            message:"deleting product not sucessfull",
            error
        })
    }

}
export const updateproductController=async(req,res)=>{
    try{
        const{name,slug,description,price,category,quantity,shipping}=req.fields
        const{photo}=req.files
        if(!name || !description || !price || !category ||!quantity || photo && photo.size > 1000000){
            return res.status(500).send({error:"same thing is missing"})
           
        }
        const products=await productModel.findByIdAndUpdate(req.params.pid,{
            ...req.fields,slug:slugify(name)},{new:true})
        if(photo){
            products.photo.data=fs.readFileSync(photo.path)
            products.photo.contentType=photo.type
                }
        
                await products.save()
                res.status(201).send({
                    success:true,
                    message:"product update successfully",
                    products
                })
            }
    catch(error){
        res.status(500).send({
            success:false,
            message:"update product not successfully",
            error
        })
    }
}