import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { deleteCategoryController,createCategoryController, categoryController, updateCategoryController, singleCategoryController } from '../controllers/CategoryController.js'
const router=express.Router()
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

////for uopdate
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//get route 
router.get('/get-category',categoryController)
router.get('/single-category/:slug',singleCategoryController)
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)


export default router