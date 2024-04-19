/** Import Config =================================================*/
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    // service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
        user: 'williamspaindi72@gmail.com',
        pass: 'nktb pifo jspz dswg'
    }
})

module.exports = async function emailService() {

    async function sendMial(emailOption) {
        await transporter.sendMial(emailOption, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Email sent: ' + info.response)
            }
        })
    }

}


// module.exports = sendMial




