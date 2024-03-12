const jwt= require("jsonwebtoken")
const authschema=require("../model/Authschema.js")
const verifytoken= async(req,res,next)=>{
    const token=req.headers["authorization"]
   try{
    if(token){
        const bearer=token.split(" ")
        const bearertoken=bearer[1]
        const {id}=await jwt.verify(bearertoken,"thisispassword")
        req.user=await authschema.findById(id).select("--password")
        next()
    }else{
        res.status(400).json({
            success:false,
            error:"token is required"
        })
    }
   }catch(err){
    res.status(400).json({
        success:false,
        error:"invalid token"
    })
   }
}
module.exports=verifytoken;