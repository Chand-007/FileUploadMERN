const User = require("../Models/User")
const FileAttributes = require("../Models/FileMetaData")
const jwt = require('jsonwebtoken')
const {sendOTP} = require("./MailConfig")
const speakeasy = require("speakeasy");
const fs = require("fs")
const path = require("path")


const register = async (req,res)=>{
    console.log("Hitting register URL")
    const {username,email,password,role} = req.body

    try{
        const existingUSer = await User.findOne({email})
        if(existingUSer){
            return res.status(400).json({message:"User Already Exists"})
        }

        const newUser = new User({username,email,password,role})
        await newUser.save()
        return res.status(201).json({message:"User Registered Successfully"})
    }
    catch(error){
        return res.status(500).json({message:`Server Error ${error}`})
    }
}

const login = async (req,res)=>{
    console.log("Hitting Login URL")
    const {email,password} = req.body

    try{
        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }

        const isMatch = await user.comparePassword(password)
        
        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        const secret = speakeasy.generateSecret({length:20})
        const otp = speakeasy.totp({ secret: secret.base32, encoding: 'base32' });
        console.log("Logging OTP",otp)
        user.mfaSecret = secret.base32;
        await user.save();
        await sendOTP(user.email, otp);
        res.status(200).json({ message: "OTP sent", mfaRequired: true });
    }
    catch(error){
        return res.status(500).json({message:"Server Error"})
    }
}


const verifyOTP = async (req,res)=>{
    const {email,otp} = req.body
    console.log("Adding Logging Statements",email,otp)
    const user = await User.findOne({email})
    console.log("Logging other attributes",user.email,user.mfaSecret)

    if(!user || !user.mfaSecret){
        return res.status(400).json({message:"User not found or MFA not enabled"})
    }

    const isValidOTP = speakeasy.totp.verify({
        secret: user.mfaSecret,
        encoding: 'base32',
        token: otp,
        window: 1 // Allow for a slight time window (to account for clock drift)
    });

    if (!isValidOTP) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    const token = jwt.sign(
        { userId: user._id, email: user.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );

    try{
        user.mfaSecret=''
        await user.save()
    }
    catch(error){
        console.log("Unable to update user model schema",error)
    }

    res.status(200).json({ message: "Authenticated successfully", token });
}

const logout = (req, res) => {
    console.log("Hitting Logout URL")
    return res.status(200).json({ message: "Logged out successfully" });
  };


const authenticate = (req,res,next)=>{
    console.log("Hitting Authenticate URL")
    const token = req.header("Authorization")?.replace("Bearer","").trim();

    if(!token){
        return res.status(401).json({message:"No Token Provided"})
    }

    jwt.verify(token,"#Enter your secret here",(error,decoded)=>{
        if(error){
            return res.status(401).json({message:"Token is Invalid"})
        }

        req.userId = decoded.userId
        next()
    })
}

const getAllRecord = async (req,res)=>{
    const allRecords = await User.find()
    return res.status(200).json({AllRecords:allRecords})

}

const uploadHandle = async (req,res)=>{
    if(! req.file){
        return res.status(400).send({message:"No File Uploaded"})
    }

    const fileMetadata = new FileAttributes({
    userId: req.userId,  // Use the user ID from the JWT token
    filePath: req.file.path,  // Store the file path
    originalName: req.file.originalname,
    fileSize: req.file.size,
    fileType: req.file.mimetype,
    })


    try{
        const savedFile = await fileMetadata.save()
        res.status(200).send({
            message:"File Uploaded Successfully",
            fileMetadata:savedFile
        })
    }
    catch(error){
        res.status(500).send({message:"error saving file metadata",error:error.message})
    }
}

const getUserFiles = async (req,res)=>{
    try{
        if(req.userId){
            const files = await FileAttributes.find({userId:req.userId})
            res.status(200).json(files)
        }
        else{
            res.status(400).send({message:"You need to Login to GET files"})
        }
        
    }
    catch(error){
        res.status(500).send({message:"ErrorRetrieving Files",error:error.message})
    }
}

const deleteFileById = async (req,res)=>{
    const fileId = req.params.id

    try{
        const file = await FileAttributes.findById(fileId)

        if(!file){
            return res.status(404).send({message:"File not Found"})
        }

        fs.unlinkSync(file.filePath)

        await FileAttributes.findByIdAndDelete(fileId)

        res.status(200).send({message:"File deleted Successfully"})
    }

    catch(error){
        res.status(500).send({message:"error deleting file",error:error.message})
    }
}

const downloadFileById = async (req,res)=>{
    const fileId = req.params.id
    try{
        const file = await FileAttributes.findById(fileId)
        if(!file){
            return res.status(404).json({error:"File not Found"})
        }

        res.download(path.join("#Enter you folder path here",file.filePath),file.originalName,(err)=>{
            if(err){
                res.status(500).send("Error downloading file")
            }
        })

    }
    catch(error){
        res.status(500).json({error:"Error fetching file"})
    }
}

const getAllOtherFiles = async(req,res) =>{
    try{
        const files = await FileAttributes.find({userId:{$ne:req.userId}})
        res.status(200).json(files)
    }
    catch(error){
        res.status(500).send({message:"Error Retrieving Others Files",error:error.message})
    }
    
}

module.exports = {register,login,logout,authenticate,getAllRecord,verifyOTP,uploadHandle,getUserFiles,deleteFileById,downloadFileById,getAllOtherFiles}