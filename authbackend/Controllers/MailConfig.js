const nodeMailer = require("nodemailer")


const sendOTP = (email,otp)=>{
    const transporter = nodeMailer.createTransport({
        host: '',
        port: ,
        auth: {
            user: '',
            pass: ''
        }
    });

    const mailOptions= {
        from:"",
        to:email,
        subject:"The MFA OTP is",
        text:`Your MFA OTP is ${otp}`
    }

    return transporter.sendMail(mailOptions)
}

module.exports = {sendOTP}