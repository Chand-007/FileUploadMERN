const express = require("express")
const {register,login,logout,authenticate,getAllRecord,verifyOTP,uploadHandle,getUserFiles,deleteFileById,downloadFileById,getAllOtherFiles} = require("../Controllers/authController")
const {upload,authenticateJWT} = require("../Controllers/FileUpload")
const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)
router.get("/authenticated",authenticate,(req,res)=>{
    res.status(200).json({message:"Authenticated"})
})
router.get("/getAllRecords",getAllRecord)
router.post("/verifyotp",verifyOTP)
router.post("/fileupload",authenticateJWT,upload.single("file"),uploadHandle)
router.get("/getfiles",authenticateJWT,getUserFiles)
router.delete("/deletefile/:id",authenticateJWT,deleteFileById)
router.get("/download/:id",authenticateJWT,downloadFileById)
router.get("/getAllOtherFiles",authenticateJWT,getAllOtherFiles)
module.exports = router