const{Router}=require("express")
const router= Router()
const multer= require("multer")
const path = require("path")
const blog= require("../model/blogs")
const Comment= require("../model/comments")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve("./public/uploads"))
    },
    filename: function (req, file, cb) {
        const fileName=`${Date.now}-${file.originalname}`
        cb(null,fileName)
    }
  })
  
  const upload = multer({ storage: storage })


  router.get("/add-new",(req,res)=>{
    return res.render("addblog",{
        user:req.user,
    })
})

router.get("/:id", async (req,res) => {
    const Blog= await blog.findById(req.params.id).populate(" CreatedBy")
    const comments= await Comment.find({BlogID:req.params.id}).populate("CreatedBy")
    return res.render("blog",{
        user:req.user,
        Blog,
        comments,
    })
})

router.post("/Comment/:BlogID", async (req,res) => {
    const comment= await Comment.create({
        content: req.body.content,
        BlogID:req.params.BlogID,
        CreatedBy:req.user._id,
    })
    return res.redirect(`/blog/${req.params.BlogID}`)
})


router.post("/",upload.single("coverimage"),async(req,res)=>{
const {title,body}= req.body
const Blog= await blog.create({
    body,
    title,
    createdby:req.user._id,
    coverImageURL:`/uploads/${req.file.filename}`
})
    return res.redirect(`/`)/*/blog/${Blog._id} */
})

module.exports= router