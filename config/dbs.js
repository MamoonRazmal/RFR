import mongoose from "mongoose"
import  Color  from "colors"
export default async function dbs (){
  
   try{
const conn= await mongoose.connect(process.env.MONGO_URL)
console.log(`connected to database ${conn.connection.host} `)
   }
   catch(error){
    console.log(`error in mongodb ${error} `.bgRed.white)

   } 
}
