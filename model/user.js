const {Schema, Types,model}= require('mongoose');
const { error } = require('node:console');
const {createJsonWebTocken}= require("../services/auth")
//crypto for hashing:
const { createHmac,randomBytes/*for generating the random*/ } = require('node:crypto');


const userSchema= new Schema({
    fullName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
    },
    /*Salt and pepper hashing in Mongoose using Node.js involves a combination of techniques to securely
     store passwords in your database. */

     salt:{
        type:String,
       /* required:true, */   //never write this as it will give error
     },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        default:"uploads/images/user.jpg"
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],  /*In Node.js, an enum (short for "enumeration") is a way to define a set of named values. */
        default:"USER"
    }
},{timestamps:true})


//using the pre middleware

userSchema.pre("save", function(next){
    const user= this;
    if(!user.isModified("password"))  return;

    const salt=randomBytes(16).toString('hex')
    const hashedPassword=createHmac('sha256', salt)
    .update(user.password)
    .digest('hex');

    this.salt=salt
    this.password=hashedPassword
    next();
})
/*Password storage: Hashing is commonly used to store passwords securely. Instead of storing the actual
 password, a hashed version of the password is stored. When a user attempts to log in, the input password 
 is hashed and compared to the stored hash value. */



 // Creating a virtual property  with a getter and setter that will check the and the value of the pass and email
 //after hashing and matching the hashes of the new one and the old ones in the DBS
userSchema.static("matchPasswordAndGeneateToken", async function(Email,password){
    const user = await this.findOne({Email})
    if(!user) throw error("user not found!!")

    const salt= user.salt
    const hashedPassword= user.password

    const userProvidedHashedPassword= createHmac('sha256', salt)
    .update(password)
    .digest('hex');

    if(hashedPassword!==userProvidedHashedPassword ) throw error("incorrect password")
  //  return {...user ,password:undefined,salt:undefined}
const token= createJsonWebTocken(user)
return token
})









const User= model("user",userSchema)

module.exports=User;