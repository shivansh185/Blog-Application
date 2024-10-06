const{Schema,model}= require("mongoose")


const blogSchema= new Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    coverImageURL:{
        type:String,
        required:false,
    },
    CreatedBy:{
        type:Schema.Types.ObjectId,
        ref:"user",
    },
  
},{timestamps:true})



const BlogModel= model("blogModel",blogSchema)

module.exports=BlogModel