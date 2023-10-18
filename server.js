import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'

import morgan from 'morgan'
import dbs from "./config/dbs.js"
dotenv.config()
dbs()
const app=express();
app.use(express.json())
app.use(morgan('dev'))
app.get('/',(req,res)=>{
    res.send({message:"welcome to ecommerce app"})
})
const port=process.env.PORT||8080
app.listen(port,()=>{
    console.log(`server running on ${process.env.DEV_MODE} ${port }`.bgCyan.white)
})