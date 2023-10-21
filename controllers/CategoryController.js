import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"
//import { CategoryController } from './CategoryController.js';
export const createCategoryController=async(req,res)=>{
    try{
const {name}=req.body
if(!name){
    return res.status(401).send({message:'name is required'})

}
const existing= await categoryModel.findOne({name})
if(existing){
    return res.status(200).send({
        success:true,
        message:"category Already Exists"
    })
}
const category=await new categoryModel({name,slug:slugify(name)}).save()
    
    res.status(201).send({
        success:true,
        message:"New Category Created",
        category
    })}
    catch(error){
        res.status(500).send({
            success:false,
            error,
            message:'Erro in category'
        })

    }

}
//
export const updateCategoryController=async(req,res)=>{

    try{
        const {name}=req.body
        const {id} = req.params
        const category=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({success:true,
            message:"category updated successfully",
            category,
        })
    }
    catch(error){
        res.status(500).send({
            success:false,
            error,
            message:"error while updating category"
        })

    }

}
//get cat
export const categoryController=async(req,res)=>{
    try{
const category=await categoryModel.find({})
res.status(200).send({
    success:true,
    message:"All categories List",
    category,
})
    }
    catch(error){
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting categories"
        })

    }

}
export const singleCategoryController=async(req,res)=>{
   
    try{
        const singleCategory=await categoryModel.find({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"getting single category successfull",
            singleCategory
        })

    }

    catch(error){
        res.status(500).send({
            success:false,
            message:"something wenth wring in getting single category",
            error
        })
    }
}
export const deleteCategoryController=async(req,res)=>{
    try{
        const {id}=req.params
           await categoryModel.findByIdAndDelete(id)

           res.status(200).send({
            success:true,
            message:"delete successfully"
           })
    }
    catch(error){
        res.status(500).send({
            success:false,
            message:"Delete category is not successful",
            error
        })
    }
}