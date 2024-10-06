const{Router}=require("express")
const userModel= require('../model/user')
const User = require("../model/user")
const router= Router()

router.get("/signin", async(req,res)=>{
    return res.render("signin")
})

router.get("/signup", (req,res)=>{
    return res.render("signup")
})



router.post("/signup", async (req, res) => {
    const { fullName, Email, password } = req.body;
    if (!fullName || !Email || !password) {
      return res.render("signup", {
        error: "Please enter all the details",
      });
    }
    try {
      await userModel.create({
        fullName,
        Email,
        password,
      });
      res.redirect("/");
    } catch (error) {
      res.render("signup", {
        error: "Error creating user",
      });
    }
  });
router.post("/signin", async(req,res)=>{

    const{Email,password}= req.body
    try {
        const token = await userModel.matchPasswordAndGeneateToken(Email, password);
       // console.log("token", token);
        return res.cookie("token",token).redirect("/");
    } catch (error) {
        res.render("signin",{
            error:"incorrect email or password",
        })
      }
})


router.get("/logout",(req,res)=>{
    res.clearCookie('token').redirect("/user/signin")
})



module.exports=router