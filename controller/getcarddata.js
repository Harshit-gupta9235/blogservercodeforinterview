const blogschema=require("../model/blogschema")
const getcarddata=async(req,res)=>{
    try{
        const {id} = req.params;
        const response=await blogschema.findOne({_id:id})
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
module.exports=getcarddata;