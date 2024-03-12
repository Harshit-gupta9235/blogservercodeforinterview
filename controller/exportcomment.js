const schema=require("../model/commentschema")
const exportcomment=async(req,res)=>{
    try{
        const {userid,author,comment}=req.body;
        const response=await schema.create({userid,comment,author})
        res.status(200).json({
            success:true,
            data:response,
            message:"comment added successfully"
            
        })
    }catch(error){
        res.status(400).json({
            success:false,
            error:error
        })
    }
}
module.exports=exportcomment;