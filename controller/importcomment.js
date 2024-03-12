const schema=require("../model/commentschema")
const importcomment=async(req,res)=>{
    try{
        const {userid}=req.params;
        const response=await schema.find({userid:userid})
        res.status(200).json({
            success:true,
            data:response
        })
    }catch(error){
        res.status(400).json({
            success:false,
            error:error
        })
    }
}
module.exports=importcomment;