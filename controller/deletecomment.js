const schema=require("../model/commentschema")
const deletecomment=async(req,res)=>{
    try{
        const {id}=req.params;
        const response=await schema.findOneAndDelete({_id:id})
        res.status(200).json({
            success:true,
            message:"comment deleted successfully",
            data:response
        })
    }
    catch(error){
        res.status(400).json({
            success:false,
            error:error
        })
    }
}
module.exports=deletecomment;