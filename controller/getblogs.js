const blogschema=require("../model/blogschema")
const fetchallblogs=async(req,res)=>{
    try{
        const response=await blogschema.find({blogs:req.user._id})
        res.status(200).json({
            success:true,
            data:response,
            message:"fetched data successfully"
        })
    }catch(error){
        res.status(400).json({
            success:false,
            error:error
        })
    }
}
module.exports=fetchallblogs;