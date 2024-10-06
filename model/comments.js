const {Schema,model, Types}= require("mongoose")

const commentSchema= new Schema({
    content:{
        type:String,
        required:true,
    },
    BlogID:{
        type:Schema.Types.ObjectId,
        ref:'blog'        
    },
    CreatedBy:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})

const Comment= model("Comment",commentSchema)


module.exports=Comment