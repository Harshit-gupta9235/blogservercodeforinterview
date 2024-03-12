const cloudinary=require("cloudinary").v2
require("dotenv").config()
const blogschema=require("../model/blogschema.js")
cloudinary.config({
    cloud_name:process.env.CLOUDNAME,
    api_key:process.env.APIKEY,
    api_secret:process.env.APISECRET
})
const uploadfilehandler=async(req,res)=>{
    try{
        // const upload=await cloudinary.uploader.upload(req.file.path)
        const { title,text,picture,username,createdat,categories,public_id}=req.body;
        const response=new blogschema(
        {
            title:title,
            text:text,
            username:username,
            categories:categories,
            createdat:createdat,
            blogs:req.user._id,
            thumbnail:picture,
            public_id:public_id
        }
        )
        const savedresponse = await response.save()
        res.status(200).json({
            success:true,
            data:savedresponse,
            message:"data stored successfully"
        })
    }catch(error){
        res.status(400).json({
            success:false,
            error:error
        })
    }
}
module.exports=uploadfilehandler;