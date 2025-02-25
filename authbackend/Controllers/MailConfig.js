const nodeMailer = require("nodemailer")


const sendOTP = (email,otp)=>{
    const transporter = nodeMailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'linnie.von84@ethereal.email',
            pass: 'd4qEQKcvFTRjdxEwAw'
        }
    });

    const mailOptions= {
        from:"linnie.von84@ethereal.email",
        to:email,
        subject:"The MFA OTP is",
        text:`Your MFA OTP is ${otp}`
    }

    return transporter.sendMail(mailOptions)
}

module.exports = {sendOTP}