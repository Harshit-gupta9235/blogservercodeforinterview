const schema=require("../model/blogschema")
const cloudinary=require("cloudinary").v2
require("dotenv").config()
cloudinary.config({
    cloud_name:process.env.CLOUDNAME,
    api_key:process.env.APIKEY,
    api_secret:process.env.APISECRET,
})
const updateblog=async(req,res)=>{
    try{
        const get=await schema.findOne({_id:req.body.id})
        const old_public_id=get.public_id;
        await cloudinary.uploader.destroy(old_public_id,(err,result)=>{
            if(err){
                console.log(err)
                return res.status(400).json({
                    success:false,
                    error:err,
                    message:"images is not uploading please try again",
                })
            }
            else{
                console.log('image deleted successfully',result)
            }
        })
        const resultdata=await schema.findById(req.body.id)
        const{picture,createdat,text,title,public_id,id}=req.body;
        const response=await schema.findOneAndUpdate({_id:id},{title,text,username:resultdata.username,categories:resultdata.categories,createdat,blogs:resultdata.blogs,thumbnail:picture,public_id})
        res.status(200).json({
            success:true,
            data:response,
            message:"blog updated successfully"
        })
    }catch(error){
        res.status(400).json({
            success:false,
            error:error
        })
    }
}
module.exports=updateblog;