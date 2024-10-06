const express = require("express")


const userRoutes= require("./routes/routes")
const blogs= require("./routes/blogroute")




const Blogs= require("./model/blogs")


const mongoose= require('mongoose')
const cookieParser= require("cookie-parser")

mongoose
.connect("mongodb://127.0.0.1:27017/blogify")
.then((e)=>console.log("mongoose connceted"))

mongoose.set('strictPopulate', false);
//setting the express application
const app= express()
const port=8000

const path= require("path")
const { checkForAuthencationCookie } = require("./middlewares/checkauth")
const User = require("./model/user")
const { assert } = require("console")


//setting the ejs views application
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))


app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthencationCookie("token"))
app.use(express.static(path.resolve("./public")))



app.use("/user",userRoutes)
app.use("/blog",blogs)



//rendering the home page on the frontend
app.get("/",async(req,res)=>{
    const allblogs= await Blogs.find({})
    res.render("home",{user:req.user,blog:allblogs,
    })
})


app.listen( port,()=>console.log(`listining to port ${port}`))