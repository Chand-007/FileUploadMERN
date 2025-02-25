const multer = require("multer")
const jwt = require("jsonwebtoken")
const path = require("path")
require("dotenv").config()


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + path.extname(file.originalname));
    }
})



const upload = multer({storage:storage});


const authenticateJWT = (req,res,next)=>{

    const token = req.header("Authorization")?.split(" ")[1];

    if(!token){
        return res.status(403).send({message:"Access Denied"})
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return res.status(403).send({message:"Invalid token"})
        }
        req.userId = user.userId;
        next()
    })


}

module.exports = {upload,authenticateJWT}