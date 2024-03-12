const mongoose=require("mongoose")
require("dotenv").config()
const connectdb=async()=>{
    try{
        await mongoose.connect(`${process.env.DB_URL}`)
        console.log("database connected successfully")
    }catch(err)
    {
            console.log(`database is not connected and error is 
            ${err.message}`)
    }
}
module.exports=connectdb;