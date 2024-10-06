const JWT= require("jsonwebtoken")
const secret= "Shivansh123"
function createJsonWebTocken(user){
    const payload={
        _id: user._id,
        email:user.email,
        profileImage:user.profileImage,
        role:user.role,
    }
    const token= JWT.sign(payload,secret)
    return token
}

function validateTocken(token){
    const payload= JWT.verify(token,secret)
    return payload
}

module.exports={
    createJsonWebTocken,
    validateTocken
}