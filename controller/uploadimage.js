const cloudinary=require("cloudinary").v2
require("dotenv").config()
cloudinary.config({
    cloud_name:process.env.CLOUDNAME,
    api_key:process.env.APIKEY,
    api_secret:process.env.APISECRET
})

const uploadimage=async(req,res)=>{

    try{
        const result=await cloudinary.uploader.upload(req.file.path)
        res.status(200).json({
            success:true,
            public_id:result.public_id,
            url:result.secure_url,
        })
    }catch(error){
        res.status(400).json({
            success:false,
            error:error
        })
    }
}
module.exports=uploadimage;