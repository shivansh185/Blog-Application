const {validateTocken}=require("../services/auth")

function checkForAuthencationCookie(cookieName){
    return(req,res,next)=>{
        const tokencookieValue= req.cookies[cookieName]

        if(!tokencookieValue){
            return next()
        }

        try{
            const userpayload= validateTocken(tokencookieValue)
            req.user=userpayload

        }
        catch{}
        return next()
    }
}


module.exports={
    checkForAuthencationCookie,
}