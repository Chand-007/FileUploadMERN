const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
    role:{
        type:String,
        required:true,
    },
    mfaSecret: {
        type: String,  
        required: false
    }
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.comparePassword = function(candidatePassword){
    return bcrypt.compare(candidatePassword,this.password);
}

module.exports = mongoose.model("User",userSchema)