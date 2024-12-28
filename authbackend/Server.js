const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const authRoutes = require("./Routes/auth")

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/auth",authRoutes)

const PORT = process.env.PORT || 5000

mongoose.connect("mongodb://0.0.0.0:27017/", {useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server Listening on ${PORT}`)
    })
})
.catch((error)=>{
    console.log("Database connection failed",error)
})