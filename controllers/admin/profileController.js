// Imports Config ============================================================
const User = require('../../models/User')
const Freelancer = require('../../models/Freelancer')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

// INDEX PAGE ======================================================
const index = async (req, res) => {
    const userId = req.params.id

    await User.findOne({ where: { id: userId } }).then(user => {
        res.render('admin/profiles/profile', {
            title: 'eMaLENGUE | Profile',
            layout: 'main2',
            profile: user,
        })
    }).catch(err => {
        console.error(err.message)
    })
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


// Email Verification =====
const emailVerification = async (req, res) => {
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
            text: `para o processo de atualização!`,
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
        // sendMial(mailOption)

        let regInfo = {
            verificationCode: verificationCode
        }
        res.status(200).json(regInfo)
    } catch (error) {
        console.log('Erro ao verirficar o email: ' + error);
    }
}


const update = async (req, res) => {
    // Config
    const oldpsw = req.body.password
    const userId = req.params.id
    const name = req.body.name
    const email = req.body.email
    const password = req.body.newPassword
    console.log(password);
    const user = await User.findOne({ where: { id: userId}})

    if (oldpsw) { // Changes pw
        const auth = await bcrypt.compare(oldpsw, user.password)
        if(auth) {

            const alert = {
                id: 1
            }
            res.status(200).json(alert)

        } else {
            const alert = {
                id: 0,
                message: 'A senha está incorreta!'
            }
            res.status(400).json(alert)
        }

    } else if (password){
        console.log(password);
        const encrypted = await bcrypt.hash(password, 10) // Hashed Password
        await user.update({password: encrypted})

        res.status(200).json({message: 'A senha foi atualizada com sucesso'})

    } else if(name) {
        await user.update({
            nome: name
        }).then(()=>{
            const result = {message: 'O nome foi alterado com sucesso!'}
            res.status(200).json(result)
        })
    } else if(email) {
        console.log(email);
        // Check if there is alread someone with this email
        const CheckUser = await User.findOne({ where: {email: email}})
        if (CheckUser) {

            const result = {
                message: 'Já há um usáio com este email no sistema, por favor introduza um outro email ou verifica a sua conta!',
                status: 'error'
            }
            res.status(200).json(result)

        } else {

            await user.update({
                email: email
            }).then(()=>{
                const result = {
                    message: 'O email foi alterado com sucesso!',
                    status: 'sucess'
                }
                res.status(200).json(result)
            })
        }
    } 


}


module.exports = {
    index,
    update,
    emailVerification,
    
}