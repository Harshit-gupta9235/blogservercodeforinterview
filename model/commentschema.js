const mongoose=require("mongoose")
const commentschema=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
})
module.exports=mongoose.model("comment",commentschema)