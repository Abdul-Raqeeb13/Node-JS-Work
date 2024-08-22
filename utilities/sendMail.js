const nodemailer = require('nodemailer')
require('dotenv').config()

exports.sendMail = (email, otp) => {
    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.smtpemail,
        pass: process.env.smtppasskey,
    },
    tls: {
        rejectUnauthorized: false
    }

})

const info = {
    from: process.env.smtpemail,
    to: email,
    subject: "Welcome to Raqeeb MAIL SERVICE",
    html: `
    <h1>Verify Account</h1>
    <p>your otp is : ${otp}</p>   
    `

}

transporter.sendMail(info, (err, result) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log(result);
        
    }
})
}