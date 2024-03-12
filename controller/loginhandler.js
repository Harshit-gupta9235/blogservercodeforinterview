const Authschema=require("../model/Authschema")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const loginhandler = async(req,res)=>{
    try{
        const {username,password}=req.body;
        if(username && password){
        const usernameexist= await Authschema.findOne({username})
            if(usernameexist){
                const valid=await bcrypt.compare(password,usernameexist?.password)
                if(valid){
                    const token=await jwt.sign({id:usernameexist._id},"thisispassword",{expiresIn:'2d'})
                    res.setHeader("Authentication",token)
                    res.status(201).json({
                        message:"login successfully",
                        success:true,
                        token,
                        name:username
                        
                    })
                }else{
                    res.status(400).json({
                        success:false,
                        error:"password is not matching"
                    })
                }
            
            }
            else{
                res.status(400).json({
                    success:false,
                    error:"username is not valid"
                })
            }
        
       
    }else{
        res.status(400).json({
            success:false,
            error:"all fields must be filled"
        })
    }
}
    catch(error){
        res.status(400).json({
            success:false,
            error:error
        })
    }
}
module.exports=loginhandler;