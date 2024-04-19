/**IMPORTS CONFIG ==================================================== */
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UniqueConstraintError } = require('sequelize')
const nodemailer = require('nodemailer');
const emailService = require('../admin/emailSendController')
require('dotenv').config()



//Index
const index = (req, res) => {
    res.render('auth/register', { title: 'Cadastrar-se' })
}

// Token 
const maxAge = 3 * 24 * 120;
const createToken = (id) => {
    return jwt.sign({ id }, 'emalengue app', { expiresIn: maxAge })
}

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.render('site/error', { error: err })

}

// Email verification sets ====================================================================

// String create fot confirmation
const randString = () => {
    const len = 3;
    let result = '';

    for (let i = 0; i < len; i++) {
        const ch = Math.floor(Math.random() * 100);
        result += ch;
    }
    return result;

}
// transporter for nodemailer
const transporter = nodemailer.createTransport({
    // service: 'gmail',
    host: process.env.SERVICE_DOMAIN,
    port: 465,
    secure: true,
    auth: {
        user: process.env.SERVICO_EMALENGUE_EMAIL,
        pass: process.env.SERVICO_EMALENGUE_PW
    }
})
// Send Email faunctioln for nodemailer
async function sendMial(emailOption) {
    await transporter.sendMail(emailOption, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response)
        }
    })
}


const confirmEmail = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email
    try {
        const verificationCode = randString();
        const mailOption = {
            from: {
                name: 'eMaLENGUE',
                address: process.env.SERVICO_EMALENGUE_EMAIL
            },
            to: `${email}`,
            subject: 'Verificação do Email',
            text: `Olá, ${name}!`,
            html: `<h1> Codigo de confirmação do email </h1>
                    <p>Use este codigo para certificar que este email lhe pertence:</p>
                   <h2> Codigo: ${verificationCode} </h2>
                   <img src="cid:./Logo.png" >
    
            `,
            attachments: [{
                filename: 'Logo.png',
                path: 'public/site/img/Logo.png',
                cid: './Logo.png' //same cid value as in the html img src
            }]
        }
        sendMial(mailOption)

        let regInfo = {
            verificationCode: verificationCode
        }
        res.status(200).json(regInfo)
    } catch (error) {
        console.log('Erro ao verirficar o email: ' + error);
    }
}

//Store
const store = async (req, res, next) => {

    const password = req.body.password
    const encrypted = await bcrypt.hash(password, 10) // Hashed Password
    const email = req.body.email
    const name = req.body.name

    const regInfo = {
        encrypted,
        email,
        name,
    }

    console.log(req.body);
    // Início do método para criara um usuário 
    try {

        const create = await User.create({
            nome: name,
            email: email,
            password: encrypted

        }).then(async () => {
            //cookie

            const user = await User.findOne({ row: true, where: { email } })
            const token = createToken(user.id)
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
            res.status(200).json({ user })

        }).catch((err) => {
            if (err instanceof UniqueConstraintError) {
                const mensagem = 'Já existe uma conta registrada com este email!'
                const id = 1
                const Erro = [id, mensagem]
                res.status(400).json(Erro)
            }
            // errorHandler(err, req, res, next)
        })
    } catch (error) {
        console.log("Fetch Error Back: ", error);
        res.status(400).json(error)
    }



}

/**EXPORT =============================================================== */
module.exports = {
    index,
    store,
    confirmEmail
}