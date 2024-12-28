const mongoose = require("mongoose")
const User = require('./User')

const fileMetaDataSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    filePath:{
        type: String,
        required:false,
    },
    originalName:{
        type: String,
        required:false
    },
    fileSize:{
        type:String,
        required:false
    },
    fileType:{
        type:String,
        required:false
    },
    uploadedDate:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("FileAttributes",fileMetaDataSchema)