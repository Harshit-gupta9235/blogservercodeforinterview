const schema=require("../model/blogschema")
const commentschema=require("../model/commentschema")
const cloudinary=require("cloudinary").v2
require("dotenv").config()
cloudinary.config({
    cloud_name:process.env.CLOUDNAME,
    api_key:process.env.APIKEY,
    api_secret:process.env.APISECRET,
})
const deleteblogs=async(req,res)=>{
    try{
        const {_id}=req.params;
        const temp=await schema.findOne({_id})
        const result=await cloudinary.uploader.destroy(temp.public_id)
        const response2=await commentschema.deleteMany({userid:_id})
        const response=await schema.deleteOne({_id})
        res.status(200).json({
            success:true,
            data:response,
            message:"blog deleted successfully"
        })

}catch(error){
    res.status(400).json({
        success:false,
        error:error
    })
}
}
module.exports=deleteblogs;